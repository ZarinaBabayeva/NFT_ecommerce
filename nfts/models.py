from django.db import models

class Category(models.Model):
    title = models.CharField(max_length=255)
    def __str__(self):
        return self.title
    
class NFT(models.Model):
    name = models.CharField(max_length=500)
    addTime = models.DateTimeField(auto_now_add=True)
    category = models.ForeignKey(Category , on_delete=models.CASCADE)
    price = models.FloatField()
    image = models.ImageField()
    def __str__(self):
        return f'{self.name} | {self.category}'

