from rest_framework import serializers
from django.contrib.auth.models import User

class MinoristaSerializer(serializers.ModelSerializer):
    """
        Crea un Minorista como un User
    """
    #contacto = serializers.CharField(required=True, allow_blank=False, max_length=16)

    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'username', 'email', 'password')
    
    def create(self, validated_data):
        user = User.objects.create(**validated_data)
        #Profile.objects.create(user=user, **profile_data)
        return user

class UserSerializer(serializers.ModelSerializer):
    """
        Crea un User y con el dato restante el Minorista
    """
    contacto = serializers.CharField(required=True, allow_blank=False, max_length=16)

    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'username', 'email', 'password', 'contacto')
    
    def create(self, validated_data):
        contacto = validated_data.pop('contacto')
        user = User.objects.create(**validated_data)
        #Profile.objects.create(user=user, **profile_data)
        return user
