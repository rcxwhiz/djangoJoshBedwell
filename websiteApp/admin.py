from django.contrib import admin

from .models import Project, PreviousJob, BlogPost, CourseTaken, FishSpecies, FishTank

admin.site.register(Project)
admin.site.register(PreviousJob)
admin.site.register(BlogPost)
admin.site.register(CourseTaken)
admin.site.register(FishSpecies)
admin.site.register(FishTank)
