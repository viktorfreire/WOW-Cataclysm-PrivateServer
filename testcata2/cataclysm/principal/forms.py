#encoding:utf-8

from django.forms import ModelForm
from django import forms
from django.contrib.admin.widgets import AdminDateWidget
from django.forms.fields import DateField
#from principal.models import account, usuarios

SEXO = (
    ('1', 'Hombre'),
    ('2', 'Mujer'),
    ('3', 'Gay'),
)

class Registro_auth_user_Form(ModelForm):
    username        = forms.CharField(label='Usuario')
    first_name      = forms.CharField(label='Nombres')
    last_name       = forms.CharField(label='Apellidos')
    email           = forms.EmailField(label='e-Mail')
    password        = forms.CharField(label='Contraseña', widget=forms.PasswordInput(render_value=False))
    date_bourne     = forms.DateField(input_formats=['%Y-%m-%d',], label='Fecha de Nacimiento', widget=forms.TextInput(attrs={'class':'date', 'name':'date','id':'date'}))
    skype           = forms.CharField(label='Skype')
    #avatar          = forms.ImageField(widget=forms.FileInput(attrs={'size':'30'}),label=('Avatar'))
    sexo            = forms.ChoiceField(choices=SEXO, label='Sexo')
    class Meta:
        model   = usuarios
        fields  = ('username', 'password', 'email', 'first_name', 'last_name', 'date_bourne', 'skype', 'sexo')

class Registro_account_Form(ModelForm):
    username        = forms.CharField(label='Usuario', widget=forms.TextInput(attrs={'name':'usuario', 'id':'usuario', 'type':'usuario'}))
    sha_pass_hash   = forms.CharField(label='Contraseña', widget=forms.PasswordInput(render_value=False, attrs={'name':'password', 'id':'password'}))
    email           = forms.EmailField(label='e-Mail', widget=forms.TextInput(attrs={'name':'email', 'id':'email', 'type':'email'}))
    class Meta:
        model = account
        fields = ('username', 'sha_pass_hash', 'email')
        
