from django.shortcuts import render
from django.http import JsonResponse,HttpResponse
from .models import *
# Create your views here.

def userList(request):
	uList = Profile.objects.all()
	print(uList)
	data = []
	# media_url = "http://127.0.0.1:8000"
	for u in uList:
		data.append({
			'wxNick':u.wxNick,
			'wxIcon':u.wxIcon
		})
	return JsonResponse({'users':data,'msg':'ok'})
def collectList(request):
	cList=Collect.objects.all()
	print(cList)
	data=[]
	for c in cList:
		data.append({
			'wxNick':c.user.wxNick,
			'songName':c.song.name
		})
	return JsonResponse({'collect':data,'msg':'ok'})
def adduser(request):
	nick=request.GET.get("nick")
	icon=request.GET.get("icon")
	if not Profile.objects.filter(wxNick=nick):
		Profile.objects.create(wxNick=nick,wxIcon=icon)
		msg="用户信息保存成功!"
	else:
		msg="用户已存在!"
	return JsonResponse({'msg':msg})
