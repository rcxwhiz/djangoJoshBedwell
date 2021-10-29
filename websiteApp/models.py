from django.db import models


class Project(models.Model):
	order = models.IntegerField()
	name = models.CharField(max_length=200)
	language = models.CharField(max_length=200, blank=True)
	description = models.TextField()
	source_code_link = models.CharField(max_length=200, blank=True)
	demo_link = models.CharField(max_length=200, blank=True)

	def __str__(self):
		return self.name


class PreviousJob(models.Model):
	order = models.IntegerField()
	title = models.CharField(max_length=200)
	work_place = models.CharField(max_length=200)
	start_date = models.CharField(max_length=200)
	end_date = models.CharField(max_length=200)
	bullets = models.TextField(blank=True)

	def __str__(self):
		return f'{self.title} - {self.work_place}'
