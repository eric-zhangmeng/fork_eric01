from django.db import models
import datetime

# Create your models here.
class Cases(models.Model):
  identifier = models.CharField(max_length=60, null=True, unique=True)
  name = models.CharField(max_length=50, null=True, unique=True)
  area = models.CharField(max_length=30, null=True, unique=False)
  topology = models.CharField(max_length=30, null=True, unique=False)
  parameter = models.CharField(max_length=200, null=True, unique=False)
  priority = models.CharField(max_length=10, null=True, unique=False)
  test_type = models.CharField(max_length=30, null=True, unique=False)
  equipment = models.TextField(null=True, unique=False)
  duration = models.CharField(max_length=30, null=True, unique=False)
  timeout = models.CharField(max_length=30, null=True, unique=False)
  procedure = models.TextField(null=True, unique=False)
  modifyTime = models.DateTimeField(auto_now=True)

class Project(models.Model):
  name = models.CharField(max_length=50, null=False, unique=True)
  state = models.CharField(max_length=30, null=False, unique=False, default='idle')
  area = models.CharField(max_length=30, null=False, unique=False)
  maps = models.TextField(null=False, unique=False)
  passed = models.IntegerField(null=True, unique=False, default=0)
  finished = models.IntegerField(null=True, unique=False, default=0)
  testbed = models.TextField(null=False, unique=False)
  lastRun = models.DateTimeField(null=True, auto_now=False)
  modifyTime = models.DateTimeField(auto_now=True)
  console = models.TextField(null=True, unique=False)

class Topology(models.Model):
  name = models.CharField(max_length=50, null=False, unique=True)
  value = models.TextField(null=False, unique=False)

class Parameter(models.Model):
  name = models.CharField(max_length=50, null=False, unique=True)
  value = models.TextField(null=False, unique=False)

class recentTest(models.Model):
  name = models.CharField(max_length=50, null=False, unique=False)
  execution = models.DateTimeField(auto_now=False)
  duration = models.CharField(max_length=30, null=False, unique=False)
  passed = models.IntegerField(null=True, unique=False)
  total = models.IntegerField(null=True, unique=False)
  logPath = models.TextField(null=False, unique=False)
