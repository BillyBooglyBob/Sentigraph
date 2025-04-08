from django.shortcuts import render
# from django.contrib.auth.models import User
# from rest_framework import generics
# from .serializers import UserSerializer
# from rest_framework.permissions import IsAuthenticated, AllowAny

from django.http import HttpResponse

# class CreateUserView(generics.CreateAPIView):
#     # Access all objects for the view, helps prevent duplicate records
#     queryset = User.objects.all()
    
#     # Tells the view what data to accept to create a user
#     serializer_class = UserSerializer
    
#     # Allow anyone to create a user
#     permission_classes = [AllowAny]
    
def home(request):
    return HttpResponse("This is a message") 