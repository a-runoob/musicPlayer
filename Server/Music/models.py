from django.db import models

# Create your models here.

class Song(models.Model):
	name = models.CharField(max_length=50, help_text="歌曲名字")
	songer = models.CharField(max_length=50, help_text="歌手名字")
	icon = models.ImageField(upload_to="song_icon", null=True)
	url = models.FileField(upload_to="song_url", null=True)

	def __str__(self):
		return self.name
