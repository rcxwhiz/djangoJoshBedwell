from django.db import models


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
