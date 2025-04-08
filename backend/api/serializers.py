from django.contrib.auth.models import User
from rest_framework import serializers

# Converts between JSON and Python Objects
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        
        # Fields to accept and return for a user
        fields = ["id", "username", "password"]
        
        # Ensures password can only be written to (accepted), 
        # and will never be returned
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        print(validated_data)
        
        # create_user will automatically hash the password for security
        user = User.objects.create_user(**validated_data)
        return user
