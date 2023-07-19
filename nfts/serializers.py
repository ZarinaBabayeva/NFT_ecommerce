from rest_framework import serializers
from .models import *

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'title')

class NFTSerializer(serializers.ModelSerializer):
    category = CategorySerializer()

    class Meta:
        model = NFT
        fields = ('id', 'name', 'addTime', 'category', 'price', 'image')
