from typing import Any, Dict

from django import forms

from django.db.models import QuerySet
from django.http import HttpResponse
from django.views.generic import TemplateView

from websiteApp import models
from websiteApp.models import Project, PreviousJob
from websiteApp.forms import ColorPaletteForm

from websiteApp import colorpalette


class Index(TemplateView):
    template_name: str = 'websiteApp/index/index.html'


class Projects(TemplateView):
    template_name: str = 'websiteApp/projects/projects.html'

    def get_context_data(self, **kwargs) -> Dict[str, Any]:
        context: Dict[str, Any] = super().get_context_data(**kwargs)
        context['projects'] = Project.objects.order_by('order')
        return context


class CourseWork(TemplateView):
    template_name: str = 'websiteApp/coursework/coursework.html'


class Resume(TemplateView):
    template_name: str = 'websiteApp/resume/resume.html'

    def get_context_data(self, **kwargs) -> Dict[str, Any]:
        context: Dict[str, Any] = super().get_context_data(**kwargs)
        context['jobs']: QuerySet[PreviousJob] = PreviousJob.objects.order_by('order')
        job: PreviousJob
        for job in context['jobs']:
            job.bullets = str(job.bullets).split('\n')
        return context


class ColorPalette(TemplateView):
    template_name: str = 'websiteApp/projects/colorpalette/colorpalette.html'

    def get_context_data(self, **kwargs) -> Dict[str, Any]:
        context: Dict[str, Any] = super().get_context_data(**kwargs)
        context['form']: forms.Form = ColorPaletteForm()
        return context

    def post(self, request, *args, **kwargs) -> HttpResponse:
        form: forms.Form = ColorPaletteForm(request.POST, request.FILES)
        if form.is_valid():
            response_string: bytes = colorpalette.post(request.FILES['image'], request.POST['num_colors'], request.POST['show_text'] == 'on', request.POST['whiten'] == 'on',
                                                       request.POST['full_set'] == 'on')
            response: HttpResponse = HttpResponse(response_string, content_type='image/png')
            return response
        else:
            return HttpResponse(status=500)


class FarkleBot(TemplateView):
    template_name: str = 'websiteApp/projects/farklebot/farklebot.html'


class Blog(TemplateView):
    template_name: str = 'websiteApp/blog/blog.html'

    def get_context_data(self, **kwargs) -> Dict[str, Any]:
        context: Dict[str, Any] = super().get_context_data(**kwargs)
        context['posts'] = models.BlogPost.objects.filter(published=True).order_by('posted_date')
        return context


class BlogPost(TemplateView):
    template_name: str = 'websiteApp/blog/post.html'

    def get_context_data(self, **kwargs) -> Dict[str, Any]:
        context: Dict[str, Any] = super().get_context_data(**kwargs)
        post_url: str = kwargs['post']
        context['post'] = models.BlogPost.objects.get(url=post_url)
        return context
