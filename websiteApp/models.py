from django.db import models
from django.contrib.postgres.fields import ArrayField


class Project(models.Model):
	order: models.IntegerField = models.IntegerField()
	name: models.CharField = models.CharField(max_length=200)
	language: models.CharField = models.CharField(max_length=200, blank=True)
	description: models.TextField = models.TextField()
	source_code_link: models.CharField = models.CharField(max_length=200, blank=True)
	demo_link: models.CharField = models.CharField(max_length=200, blank=True)

	def __str__(self) -> str:
		return str(self.name)


class PreviousJob(models.Model):
	order: models.IntegerField = models.IntegerField()
	title: models.CharField = models.CharField(max_length=200)
	work_place: models.CharField = models.CharField(max_length=200)
	start_date: models.CharField = models.CharField(max_length=200)
	end_date: models.CharField = models.CharField(max_length=200)
	bullets: models.TextField = models.TextField(blank=True)

	def __str__(self) -> str:
		return f'{self.title} - {self.work_place}'


class BlogPost(models.Model):
	title: models.CharField = models.CharField(max_length=200)
	url: models.CharField = models.CharField(max_length=200)
	posted_date: models.DateField = models.DateField()
	edited_date: models.DateField = models.DateField()
	edited: models.BooleanField = models.BooleanField()
	published: models.BooleanField = models.BooleanField()
	tags: ArrayField = ArrayField(models.CharField(max_length=200))
	content: models.TextField = models.TextField(blank=True)

	def __str__(self) -> str:
		return str(self.title)
