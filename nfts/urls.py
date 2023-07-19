from django.urls import path
from .views import *

app_name = 'nfts'

urlpatterns = [
    path("nftsList/", NFTListView.as_view(), name='nftsList'),
]