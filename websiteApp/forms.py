from django import forms


class ColorPaletteForm(forms.Form):
	image = forms.FileField()
	num_colors = forms.IntegerField()
	whiten = forms.BooleanField()
	show_text = forms.BooleanField()
	full_set = forms.BooleanField()
