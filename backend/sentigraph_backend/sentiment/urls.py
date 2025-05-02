# Tells Django which function to call
# when a request is made to a specific URL

from django.urls import path

from . import api

urlpatterns = [
    path("company/<str:company>/", api.get_company, name="get_company"),
    path(
        "aspect/<str:aspect>/<str:timeframe>/",
        api.get_aspect_company_sentiment,
        name="get_aspect_company_sentiment",
    ),
]

# 1st path example call
# GET /api/company/Apple/

# 2nd path example call
# GET /api/aspect/sustainability/90d/?companies=Apple&companies=Tesla
