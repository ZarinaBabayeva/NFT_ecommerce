from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Category(models.Model):
    title = models.CharField(max_length=255)
    def __str__(self):
        return self.title
    
class NFT(models.Model):
    artist = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=500)
    addTime = models.DateTimeField(auto_now_add=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    price = models.FloatField()
    image = models.ImageField()
    is_auction = models.BooleanField(default=False) 
    auction_start_time = models.DateTimeField(null=True, blank=True)  
    auction_end_time = models.DateTimeField(null=True, blank=True)  
    highest_bid = models.FloatField(null=True, blank=True) 
    highest_bidder = models.ForeignKey(User, related_name='highest_bids', null=True, blank=True, on_delete=models.SET_NULL)  

    def __str__(self):
        return f'{self.name} | {self.category}'
