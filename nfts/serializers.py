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
        fields = "__all__"

class StartAuctionSerializer(serializers.ModelSerializer):
    class Meta:
        model = NFT
        fields = ['id', 'is_auction', 'auction_start_time', 'auction_end_time']

class NFTBidSerializer(serializers.ModelSerializer):
    class Meta:
        model = NFT
        fields = ['id', 'highest_bid', 'highest_bidder']

class CartItemSerializer(serializers.ModelSerializer):
    nft = NFTSerializer()
    class Meta:
        model = CartItem
        fields = "__all__"