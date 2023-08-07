from rest_framework import generics,status
from django.utils import timezone
from .models import *
from .serializers import *
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import render, HttpResponse
from django.core.mail import send_mail
from django.conf import settings



class NFTListView(generics.ListAPIView):
    queryset = NFT.objects.order_by('-addTime')
    serializer_class = NFTSerializer

class StartAuctionView(APIView):
    def put(self, request, nft_id):
        try:
            nft = NFT.objects.get(pk=nft_id)
            serializer = StartAuctionSerializer(nft, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save(is_auction=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except NFT.DoesNotExist:
            return Response({"message": "NFT not found."}, status=status.HTTP_404_NOT_FOUND)
        
class PlaceBidView(APIView):
    def post(self, request, nft_id):
        try:
            nft = NFT.objects.get(pk=nft_id)
            current_time = timezone.now()
            if nft.auction_start_time <= current_time <= nft.auction_end_time:
                highest_bid = request.data.get('highest_bid')
                highest_bidder = request.user
                if highest_bid is not None and highest_bid > nft.highest_bid:
                    nft.highest_bid = highest_bid
                    nft.highest_bidder = highest_bidder
                    nft.save()
                    serializer = NFTBidSerializer(nft)
                    return Response(serializer.data, status=status.HTTP_200_OK)
                else:
                    return Response({"message": "Bid should be higher than the current highest bid."},
                                    status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({"message": "Auction is not currently active."},
                                status=status.HTTP_400_BAD_REQUEST)
        except NFT.DoesNotExist:
            return Response({"message": "NFT not found."}, status=status.HTTP_404_NOT_FOUND)
    
    
class EndAuctionView(APIView):
    def post(self, request, nft_id):
        try:
            nft = NFT.objects.get(pk=nft_id)
            current_time = timezone.now()
            if nft.auction_end_time < current_time and nft.is_auction:
                highest_bid = nft.highest_bid
                highest_bidder = nft.highest_bidder
                if highest_bidder:
                    nft.sold = True
                    nft.is_auction = False
                    nft.save()
                    serializer = NFTBidSerializer(nft)
                    return Response(serializer.data, status=status.HTTP_200_OK)
                else:
                    return Response({"message": "No bids were made for this NFT."},
                                    status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({"message": "Auction is still active."},
                                status=status.HTTP_400_BAD_REQUEST)
        except NFT.DoesNotExist:
            return Response({"message": "NFT not found."}, status=status.HTTP_404_NOT_FOUND)
        
class CartItemView(APIView):
    def get(self, request):
        cart_items = CartItem.objects.filter(user=request.user)
        serializer = CartItemSerializer(cart_items, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        nft_id = request.data.get("nft_id")
        quantity = request.data.get("quantity", 1)

        try:
            nft = NFT.objects.get(pk=nft_id)
        except NFT.DoesNotExist:
            return Response({"message": "NFT not found."}, status=status.HTTP_404_NOT_FOUND)

        cart_item, created = CartItem.objects.get_or_create(user=request.user, nft=nft)
        cart_item.quantity += quantity
        cart_item.save()

        serializer = CartItemSerializer(cart_item)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def delete(self, request, nft_id):
        try:
            cart_item = CartItem.objects.get(user=request.user, nft__id=nft_id)
            cart_item.delete()
            return Response({"message": "Item removed from cart."}, status=status.HTTP_204_NO_CONTENT)
        except CartItem.DoesNotExist:
            return Response({"message": "Item not found in cart."}, status=status.HTTP_404_NOT_FOUND)
        



class EmailAPI(APIView):
    def contact_page(request):
        if request.method == "POST":
            name = request.POST.get['name'] 
            email = request.POST.get['email']
            message = request.POST.get['message']

        if name is None and email is None and message  is None:
            return Response({'message': 'There must be a name and email or message'}, status=200)
        elif name is None and email is None:
            return Response({'message': 'Name and email are required.'}, status=200)
        elif email  is None:
            return Response({'message': 'Email required.'}, status=200)
        elif message is None:
            return Response({'message': 'Message required.'}, status=200)
        else:
            send_mail(
                name,
                message,
                settings.EMAIL_HOST_USER, 
                ['nftwebsite23@outlook.com'],
                fail_silently=False,
            )

            return HttpResponse("<h1> Your message successfully sent </h1>")
      
      
