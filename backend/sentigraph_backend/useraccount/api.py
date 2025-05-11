from django.http import JsonResponse
from django.utils.dateparse import parse_date
from rest_framework.decorators import (
    api_view,
    authentication_classes,
    permission_classes,
)
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from .models import User
from .serializers import UserInfoSerializer


# Get user information
@api_view(["GET"])
@authentication_classes([SessionAuthentication, BasicAuthentication])
@permission_classes([IsAuthenticated])
def get_user_information(request, email):
    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return JsonResponse({"error": "User not found."}, status=404)

    # Only allow access if the requester is the user themselves or an admin
    if (
        request.user.email != email
        and not request.user.is_staff
        and not request.user.is_superuser
    ):
        return JsonResponse(
            {"error": "You do not have permission to access this user's information."},
            status=403,
        )

    serializer = UserInfoSerializer(user)
    return JsonResponse({"data": serializer.data})
