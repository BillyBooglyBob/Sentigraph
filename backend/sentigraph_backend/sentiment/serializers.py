# Convert Python objects to JSON and vice versa
# so it can be sent via API

from rest_framework import serializers
from .models import Company, CompanyAspectSentiment


""" 
TODO: 
- Return how many tweets belong to each company
- How many users follow the company

"""


class CompanySerializer(serializers.ModelSerializer):
    follower_count = serializers.IntegerField(source="followers.count", read_only=True)
    # tweet_count = serializers.IntegerField(source='tweets.count', read_only=True)

    class Meta:
        model = Company
        fields = ["id", "name", "follower_count"]


# Return sentiment of an aspect of multiple companies
# Return sentiment of an aspect of a single company
class CompanyAspectSentimentSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanyAspectSentiment
        fields = (
            "id",
            "tweet",
            "company",
            "aspect",
            "date",
            "sentiment",
            "sentiment_type",
        )
