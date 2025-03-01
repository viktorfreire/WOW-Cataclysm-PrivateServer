from models import account
from principal.forms import Registro_auth_user_Form
from django.db.models import Q
from django.contrib.auth.models import User
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render_to_response, get_object_or_404
from django.template import RequestContext
from django.core.mail import EmailMessage
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.decorators import login_required
import hashlib

# Vistas de acceso a los datos de rastreo de los motores web
def robots(request):
    
    return render_to_response("robots.txt", context_instance=RequestContext(request))

def google5108e5cfbaeef7d6(request):
    
    return render_to_response("google5108e5cfbaeef7d6.html", context_instance=RequestContext(request))

def sitemaps(request):
    
    return render_to_response("sitemaps.xml", context_instance=RequestContext(request))

# Fin de las Vistas

def home(request):
    
    if request.user.is_anonymous():
        session = 'NO'
    else:
        session = 'SI'
    
    return render_to_response("home.html", {"session": session}, context_instance=RequestContext(request))

def ingresar(request):
    if not request.user.is_anonymous():
        return HttpResponseRedirect('/home')
    if request.method == 'POST':
        AGS_Form = AuthenticationForm(request.POST)
        if AGS_Form.is_valid:
            usuario = request.POST['username']
            clave    = request.POST['password']
            acceso    = authenticate(username=usuario, password=clave)
            if acceso is not None:
                if acceso.is_active:
                    login(request, acceso)
                    return HttpResponseRedirect('/home')
                else:
                    return render_to_response('noactivo.html', context_instance=RequestContext(request))
            else:
                return render_to_response('nousuario.html', context_instance=RequestContext(request))
    else:
        formulario = AuthenticationForm()
    return render_to_response('page-register.html',{'AGS_Form':AGS_Form}, context_instance=RequestContext(request))


def cerrar(request):
    logout(request)
    return HttpResponseRedirect('/')

def registro(request):
    
    if request.method == 'POST':
        
        AGS_Form = Registro_auth_user_Form(request.POST)
        
        if AGS_Form.is_valid():
            
            AGS                 = AGS_Form.save(commit=False)
            AGS.is_staff        = 0
            AGS.is_active       = 1
            AGS.is_superuser    = 0
            AGS.avatar          = 'imagenes/avatars/0.jpg'
            
            usuario     = request.POST.get('username', '')
            contrasena  = hashlib.sha1(usuario+':'+request.POST.get('password', '')).hexdigest()
            email       = request.POST.get('email', '')
            AGS_Form2 = account(username=usuario, sha_pass_hash=contrasena, email=email)
            
            if AGS_Form.save():
                AGS_Form2.save(using='auth')
            
            return HttpResponseRedirect('Thanks/')
        
    else:
            
        AGS_Form = Registro_auth_user_Form()            
       
    return render_to_response("page-register.html", {"AGS_Form":AGS_Form, "session": 'NO', "registro":'SI'}, context_instance=RequestContext(request))


def thanks(request):
    
    if not request.user.is_anonymous():
        session = 'NO'
    else:
        session = 'SI'
    
    return render_to_response("thanks.html", {"session": session}, context_instance=RequestContext(request))

def armeria(request):
    
    return render_to_response("armeria.html", context_instance=RequestContext(request))

def juego(request):
    
    return render_to_response("info-server.html", context_instance=RequestContext(request))

def staff(request):
    
    return render_to_response("staff.html", context_instance=RequestContext(request))

def construccion(request):
    
    return render_to_response("pagina_construccion.html", context_instance=RequestContext(request))