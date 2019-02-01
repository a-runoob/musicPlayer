from django.contrib import admin
from .models import *
# Register your models here.
from Music.models import Song
class ProfileAdmin(admin.ModelAdmin):
	list_display = ('wxNick',)
class CollectAdmin(admin.ModelAdmin):
	list_display = ('user','song')

admin.site.register(Profile, ProfileAdmin)
admin.site.register(Collect, CollectAdmin)