from django.conf.urls import patterns, include, url
from django.contrib import admin
from django.conf import settings

# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Uncomment the admin/doc line below to enable admin documentation:
    url(r'^$','principal.views.home'),
    url(r'^Registro/$','principal.views.registro'),
    url(r'^robots/$','principal.views.robots'),
    url(r'^google5108e5cfbaeef7d6/$','principal.views.google5108e5cfbaeef7d6'),
    url(r'^sitemaps/$','principal.views.sitemaps'),
    url(r'^Registro/$','principal.views.registro'),
    url(r'^Cerrar/$','principal.views.cerrar'),
    url(r'^Registro/Thanks/$','principal.views.thanks'),
    url(r'^Armeria/$','principal.views.armeria'),
    url(r'^Donaciones/$','principal.views.construccion'),
    url(r'^Foros/$','principal.views.construccion'),
    #url(r'^Juego/$','principal.views.juego'),
    url(r'^Medios/$','principal.views.construccion'),
    url(r'^Staff/$','principal.views.staff'),
    url(r'^admin/doc/', include('django.contrib.admindocs.urls')),
    # Uncomment the next line to enable the admin:
    url(r'^admin/', include(admin.site.urls)),
    url(r'^media/(?P<path>.*)$','django.views.static.serve',
        {'document_root':settings.MEDIA_ROOT,}
    ),
)
