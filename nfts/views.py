from rest_framework import generics,status
from django.utils import timezone
from .models import *
from .serializers import *
from rest_framework.views import APIView
from rest_framework.response import Response


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
