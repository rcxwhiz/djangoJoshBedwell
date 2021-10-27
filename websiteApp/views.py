from django.shortcuts import render
from django.views.generic import TemplateView


class Index(TemplateView):
	template_name = 'websiteApp/index/index.html'


class CourseWork(TemplateView):
	template_name = 'websiteApp/coursework/coursework.html'


class Resume(TemplateView):
	template_name = 'websiteApp/resume/resume.html'
