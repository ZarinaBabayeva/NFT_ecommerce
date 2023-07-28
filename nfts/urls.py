from django.urls import path
from .views import *

app_name = 'nfts'

urlpatterns = [
    path("nfts_list/", NFTListView.as_view(), name='nfts-list'),
    path('nft/<int:nft_id>/start_auction/', StartAuctionView.as_view(), name='start-auction'),
    path('nft/<int:nft_id>/place_bid/', PlaceBidView.as_view(), name='place-bid'),
    path('nft/<int:nft_id>/end_auction/', EndAuctionView.as_view(), name='end-auction'),
    path("cart/", CartItemView.as_view(), name="cart"),
    path("cart/<int:nft_id>/", CartItemView.as_view(), name="cart-item"),
]