"""Cases URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin
from django.views.generic import RedirectView
from . import view, testpack
 
urlpatterns = [
    url(r'^favicon.ico$',RedirectView.as_view(url=r'static/favicon.ico')),
    url(r'^testpack$', testpack.testpack),
    url(r'^testpack_result_stas$', testpack.testpack_result_stas),
    url(r'^testpack_recent$', testpack.testpack_recent),
    url(r'^testpack_running$', testpack.testpack_running),
    url(r'^testpack_case_dis$', testpack.testpack_case_dis),
    url(r'^testpack_project$', testpack.testpack_project),
    url(r'^testpack_project_start$', testpack.testpack_project_start),
    url(r'^testpack_project_view$', testpack.testpack_project_view),
    url(r'^testpack_case_content$', testpack.testpack_case_content),
    url(r'^getLog$', testpack.getLog),
    url(r'^viewConsole$', testpack.viewConsole),
    url(r'^editProject$', testpack.editProject),
    url(r'^deleteProject$', testpack.deleteProject),
    url(r'^startProject$', testpack.startProject),
    url(r'^stopProject$', testpack.stopProject),
    url(r'^getTestResult$', testpack.getTestResult),
    url(r'^cloneProject$', testpack.cloneProject),
    url(r'^exportProject$', testpack.exportProject),
    url(r'^importProject$', testpack.importProject),
    url(r'^returnTopology$', testpack.returnTopology),
    url(r'^viewTopology$', testpack.viewTopology),
    url(r'^viewTestbed$', testpack.viewTestbed),
    url(r'^editTestbed$', testpack.editTestbed),
    url(r'^saveTestbed$', testpack.saveTestbed),
    url(r'^saveProject$', testpack.saveProject),
    url(r'^testpack_cases$', testpack.testpack_cases),
    url(r'^deleteCases$', testpack.deleteCases),
    url(r'^cteate_project$', testpack.cteate_project),
    url(r'^deleteProjects$', testpack.deleteProjects),
    url(r'^importCases$', testpack.importCases),
    url(r'^importTopos$', testpack.importTopos),
    url(r'^test1$', testpack.test1),
    url(r'^test2$', testpack.test2),
    url(r'^test3$', testpack.test3),
    url(r'^temp1$', testpack.temp1),
]