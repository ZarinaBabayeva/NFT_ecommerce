from rest_framework import generics
from .models import *
from .serializers import *

# Create your views here.
class NFTListView(generics.ListAPIView):
    queryset = NFT.objects.order_by('-addTime')
    serializer_class = NFTSerializer