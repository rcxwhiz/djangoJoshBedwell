from django.db import models
from django.utils.translation import gettext_lazy as _

charfield_length = 200


class Project(models.Model):
    order = models.IntegerField()
    name = models.CharField(max_length=charfield_length)
    language = models.CharField(max_length=charfield_length, blank=True)
    description = models.TextField()
    source_code_link = models.CharField(max_length=charfield_length, blank=True)
    demo_link = models.CharField(max_length=charfield_length, blank=True)

    def __str__(self) -> str:
        return str(self.name)


class PreviousJob(models.Model):
    order = models.IntegerField()
    title = models.CharField(max_length=charfield_length)
    work_place = models.CharField(max_length=charfield_length)
    start_date = models.CharField(max_length=charfield_length)
    end_date = models.CharField(max_length=charfield_length)
    bullets = models.TextField(blank=True)

    def __str__(self) -> str:
        return f'{self.title} - {self.work_place}'


class BlogPost(models.Model):
    title = models.CharField(max_length=charfield_length)
    url = models.CharField(max_length=charfield_length)
    posted_date = models.DateField()
    edited_date = models.DateField()
    edited = models.BooleanField()
    published = models.BooleanField()
    tags = models.TextField(blank=True)
    content = models.TextField(blank=True)

    def __str__(self) -> str:
        return str(self.title)


class CourseTaken(models.Model):
    num = models.CharField(max_length=charfield_length)
    title = models.CharField(max_length=charfield_length)
    description = models.TextField()
    at_byu = models.BooleanField()
    was_ta = models.BooleanField()
    genre = models.CharField(max_length=charfield_length)

    def __str__(self) -> str:
        return str(self.num)
