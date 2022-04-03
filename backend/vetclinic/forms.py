from django import forms


class LoginForm(forms.Form):
    email = forms.CharField(label='email', max_length=180)
    password = forms.CharField(label='password', max_length=180)
