from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

def upload_nfts(instance, filename):
    return f"nfts/{instance.artist}/{filename}"

class Category(models.Model):
    title = models.CharField(max_length=255)
    def __str__(self):
        return self.title
    
class NFT(models.Model):
    artist = models.ForeignKey(User, on_delete=models.CASCADE, default=None, limit_choices_to={'role': 'artist'})
    name = models.CharField(max_length=500)
    addTime = models.DateTimeField(auto_now_add=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    price = models.FloatField()
    image = models.ImageField(upload_to=upload_nfts)
    is_auction = models.BooleanField(default=False) 
    auction_start_time = models.DateTimeField(null=True, blank=True)  
    auction_end_time = models.DateTimeField(null=True, blank=True)  
    highest_bid = models.FloatField(null=True, blank=True) 
    highest_bidder = models.ForeignKey(User, related_name='highest_bids', null=True, blank=True, on_delete=models.SET_NULL,limit_choices_to={'role': 'buyer'} )  

    def __str__(self):
        return f'{self.name} | {self.category}'

class CartItem(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    nft = models.ForeignKey(NFT, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=0)
    added_at = models.DateTimeField(auto_now_add=True)
  

    def __str__(self):
        return f"{self.user.username} - {self.nft.name} x {self.quantity}"
    
class Favorite(models.Model):
    nft = models.ForeignKey(NFT, on_delete=models.CASCADE)
    user = models.ForeignKey (User, on_delete=models.CASCADE)

    def __str__(self):
        return self.nft.name
    
class Contact(models.Model):
    name = models.CharField(max_length=250)
    email = models.EmailField()
    message = models.TextField()
    
    def __str__(self):
        return self.name


