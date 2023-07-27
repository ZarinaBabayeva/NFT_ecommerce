from django.urls import path
from .views import *

app_name = 'nfts'

urlpatterns = [
    path("nfts_list/", NFTListView.as_view(), name='nfts-list'),
    path('nft/<int:nft_id>/start_auction/', StartAuctionView.as_view(), name='start-auction'),
    path('nft/<int:nft_id>/place_bid/', PlaceBidView.as_view(), name='place_bid'),
]