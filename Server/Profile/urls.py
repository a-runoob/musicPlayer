from django.contrib import admin
from django.urls import path, re_path
from . import views

urlpatterns = [
	path("user/", views.userList),
	path("collect/",views.collectList),
	path("adduser/",views.adduser)
]
