from django import forms


class ColorPaletteForm(forms.Form):
	image: forms.FileField = forms.FileField()
	num_colors: forms.IntegerField = forms.IntegerField()
	whiten: forms.BooleanField = forms.BooleanField()
	show_text: forms.BooleanField = forms.BooleanField()
	full_set: forms.BooleanField = forms.BooleanField()
