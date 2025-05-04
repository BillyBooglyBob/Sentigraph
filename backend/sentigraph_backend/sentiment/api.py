# Define what the API actually does
# - Handles incoming requests
# - Fetches data from the database using Django ORM (Models)
# - Returns data in JSON format
#   - by converting data from Python objects to JSON using serializers

import re
from datetime import datetime, timedelta

from django.http import JsonResponse
from django.utils.dateparse import parse_date
from rest_framework.decorators import (
    api_view,
    authentication_classes,
    permission_classes,
)

from .models import Aspect, ClassifiedTweet, Company, CompanyAspectSentiment, RawTweet
from .serializers import (
    CompanySerializer,
    RawTweetSerializer,
)

@api_view(["GET"])
@authentication_classes([])
@permission_classes([])
def get_raw_tweet_data(request):
    tweets = RawTweet.objects.all()
    serializer = RawTweetSerializer(tweets, many=True)
    
    return JsonResponse(
        {
            "count": len(tweets),
            "data": serializer.data,
        }
    )
    


@api_view(["GET"])
@authentication_classes([])
@permission_classes([])
def get_company(request, company):
    # Deal with compapny not in database yet.
    # if not Company.objects.filter(name=company).exists():
    #     return JsonResponse({"error": "Company not found"}, status=404)
    # Need to find all the tweets for this company from RawTweet
    # and save them in ClassifiedTweet.

    tweets = RawTweet.objects.all()

    if not Company.objects.filter(name=company).exists():
        company_obj = Company.objects.create(name=company)
        # Get all tweets for this company by checking with regex
        for tweet in tweets:
            if re.search(r"\b" + re.escape(company) + r"\b", tweet.text, re.IGNORECASE):
                ClassifiedTweet.objects.create(
                    date=tweet.date,
                    text=tweet.text,
                    company=company_obj,
                )

    company = Company.objects.get(name=company)
    serializer = CompanySerializer(company)
    return JsonResponse(
        {
            "data": serializer.data,
        }
    )


# --- Abstracted ML sentiment analyzer ---
def get_sentiment_for_aspect(text, aspect):
    """
    Placeholder for ML model.
    Return a float (e.g. -1.0 to 1.0).
    """
    return 0.0  # Dummy value for now


# Get the date range from the request
# - timeframe is a string in the format "90d"
def parse_date_range(timeframe: str) -> list[datetime]:
    end_date = datetime.strptime("2010-12-26", "%Y-%m-%d").date()

    days = int(timeframe[:-1])  # Extract the number of days from the timeframe
    start_date = end_date - timedelta(days=days)

    return start_date, end_date


# Generate a list of dates between start_date and end_date
def generate_date_range(timeframe: str):
    start_date, end_date = parse_date_range(timeframe)

    delta = (end_date - start_date).days
    return [(start_date + timedelta(days=i)).isoformat() for i in range(delta + 1)]


@api_view(["GET"])
@authentication_classes([])
@permission_classes([])
def get_aspect_company_sentiment(request, aspect, timeframe):
    # Extract query parameters
    company_names = request.GET.getlist("companies")
    if not company_names:
        return JsonResponse({"error": "Missing companies parameter"}, status=400)

    date_range = generate_date_range(timeframe)

    # Get sentiment for the specified aspect for each company
    # - company: [sentiment for each day in the date range]
    result = {}

    # Get all raw tweets in case we need to filter them to
    # find tweets for specific company
    tweets = RawTweet.objects.all()
    for company in company_names:
        # If company does not exist, create it.
        # - Create the Company object
        # - From RawTweet, get all tweets for this company & save
        #  them in ClassifiedTweet.
        if not Company.objects.filter(name=company).exists():
            company_obj = Company.objects.create(name=company)
            # Get all tweets for this company by checking with regex
            for tweet in tweets:
                if re.search(
                    r"\b" + re.escape(company) + r"\b", tweet.text, re.IGNORECASE
                ):
                    ClassifiedTweet.objects.create(
                        date=tweet.date,
                        text=tweet.text,
                        company=company_obj,
                    )

        # If aspect does not exist, create it.
        # - Create the Aspect object
        if not Aspect.objects.filter(name=aspect).exists():
            aspect_obj = Aspect.objects.create(name=aspect)
            
        # Get the company & aspect objects
        company_obj = Company.objects.get(name=company)
        aspect_obj = Aspect.objects.get(name=aspect)

        # If sentiment data for this combination of aspect & company
        # does not exist, create it.
        # - Go through each tweet for this company (from ClassifiedTweet)
        # - Get the sentiment for the aspect
        # - Save the sentiment in CompanyAspectSentiment.
        if not CompanyAspectSentiment.objects.filter(
            company=company_obj, aspect=aspect_obj
        ).exists():
            # Get all tweets for this company
            company_tweets = ClassifiedTweet.objects.filter(company=company_obj)
            for tweet in company_tweets:
                sentiment_score = get_sentiment_for_aspect(tweet.text, aspect)
                CompanyAspectSentiment.objects.create(
                    tweet=tweet,
                    company=tweet.company,
                    aspect=aspect_obj,
                    date=tweet.date,
                    sentiment=sentiment_score,
                )

        # Get sentiment for each day in the date range, imputate if needed
        # & add it to result (where sentiments for other companies are stored)
        # - For through each day of the time range
        # - Get the sentiment for the tweets on that day (average them)
        #   - If no tweet on the day, set sentiment to None
        #   (for now, maybe have to do some trend imputation to
        #   make it smooth on the chart, maybe delegate this
        #   to the frontend)
        # - Save the sentiment in CompanyAspectSentiment.

        # List to store sentiment for this company,
        # ordered by date for every single day between start_date and end_date
        company_sentiment = []
        for date in date_range:
            # Get all sentiment data on the aspect for this company on this day
            company_tweets = CompanyAspectSentiment.objects.filter(
                company=company_obj, aspect=aspect_obj, date=date
            )
            # If no sentiment data for this date, set it to None
            if not company_tweets.exists():
                company_sentiment.append(None)
                continue

            # Get the sentiment for this date
            avg_sentiment_score = 0.0
            for tweet in company_tweets:
                avg_sentiment_score += tweet.sentiment
            avg_sentiment_score /= len(company_tweets)

            company_sentiment.append(avg_sentiment_score)

        # Add the company sentiment to the result
        result[company] = company_sentiment

    # Format the data for the response
    # - in the form [{date, company1: sentiment, company2: sentiment}, ...]
    # - Current form is: {company1: [sentiment1, sentiment2, ...],
    #                     company2: [sentiment1, sentiment2, ...]}
    result = [
        {
            "date": date,
            **{company: result[company][i] for company in company_names},
        }
        for i, date in enumerate(date_range)
    ]

    return JsonResponse(
        {
            "aspect": aspect,
            "companies": company_names,
            "count": len(result),
            "data": result,
        }
    )
