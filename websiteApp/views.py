from django.http import HttpResponse
from django.views.generic import TemplateView

from websiteApp.models import Project, PreviousJob
from websiteApp.forms import ColorPaletteForm

from websiteApp import colorpalette


class Index(TemplateView):
	template_name = 'websiteApp/index/index.html'


class Projects(TemplateView):
	template_name = 'websiteApp/projects/projects.html'

	def get_context_data(self, **kwargs):
		context = super().get_context_data(**kwargs)
		context['projects'] = Project.objects.order_by('order')
		return context


class CourseWork(TemplateView):
	template_name = 'websiteApp/coursework/coursework.html'


class Resume(TemplateView):
	template_name = 'websiteApp/resume/resume.html'

	def get_context_data(self, **kwargs):
		context = super().get_context_data(**kwargs)
		context['jobs'] = PreviousJob.objects.order_by('order')
		for job in context['jobs']:
			job.bullets = job.bullets.split('\n')
		return context


class ColorPalette(TemplateView):
	template_name = 'websiteApp/projects/colorpalette/colorpalette.html'

	def get_context_data(self, **kwargs):
		context = super().get_context_data(**kwargs)
		context['form'] = ColorPaletteForm()
		return context

	def post(self, request, *args, **kwargs):
		print('GOT A POST REQUEST')
		form = ColorPaletteForm(request.POST, request.FILES)
		if form.is_valid():
			print('FORM IS VALID')
			response_string = colorpalette.post(request.FILES['image'], request.POST['num_colors'], request.POST['show_text'] == 'on', request.POST['whiten'] == 'on', request.POST['full_set'] == 'on')
			print('GOT RESPONSE STRING')
			response = HttpResponse(response_string, content_type='image/png')
			print('MADE RESPONSE')
			return response
		else:
			return HttpResponse(status=500)
