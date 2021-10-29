from django.views.generic import TemplateView

from websiteApp.models import Project, PreviousJob


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

