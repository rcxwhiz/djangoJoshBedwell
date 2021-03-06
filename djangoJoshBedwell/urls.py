"""djangoJoshBedwell URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path

from websiteApp.views import (
	Index,
	Projects,
	CourseWork,
	Resume,
	ColorPalette,
	FarkleBot,
	Blog,
	BlogPost,
)

urlpatterns = [
	path('admin/', admin.site.urls),
	path('', Index.as_view(), name='index'),
	path('projects/', Projects.as_view(), name='projects'),
	path('coursework/', CourseWork.as_view(), name='coursework'),
	path('resume/', Resume.as_view(), name='resume'),
	path('projects/colorpalette/', ColorPalette.as_view(), name='colorpalette'),
	path('projects/farklebot/', FarkleBot.as_view(), name='farklebot'),
	path('blog/', Blog.as_view(), name='blog'),
	path('blog/<str:post>/', BlogPost.as_view(), name='blogpost'),
]
