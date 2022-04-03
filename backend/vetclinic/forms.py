from django import forms


class LoginForm(forms.Form):
    username = forms.CharField(label='Username', max_length=180)
    password = forms.CharField(label='Password', max_length=180)
