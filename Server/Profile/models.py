from django.db import models
from Music.models import Song
# Create your models here.

class Profile(models.Model):
	wxNick = models.CharField(max_length=50,null=True)
	wxIcon = models.CharField(max_length=500, help_text="wx头像路径")

	def __str__(self):
		return self.wxNick

class Collect(models.Model):
	user = models.ForeignKey(Profile, on_delete=models.CASCADE)
	song = models.ForeignKey(Song, on_delete=models.CASCADE)
	add_time = models.DateTimeField(auto_now=True)

	def __str__(self):
		return self.song.name