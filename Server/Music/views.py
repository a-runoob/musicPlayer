import json
from django.shortcuts import render
from django.http import JsonResponse
from .models import *


def songList(request):
	sList = Song.objects.all()
	print(sList)
	data = []
	media_url = "http://127.0.0.1:8000"
	for s in sList:
		data.append({
			'name':s.name,
			'songer':s.songer,
			'icon':media_url+s.icon.url,
			'url':media_url+s.url.url
		})
	return JsonResponse({'songs':data,'msg':'ok'})
