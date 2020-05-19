from django.http import HttpResponse, Http404, FileResponse
from django.shortcuts import render,HttpResponse,redirect,HttpResponseRedirect
from django.contrib import messages
import xlrd, xlwt
from openpyxl import Workbook
from openpyxl.utils import get_column_letter
from testpackdb.models import Cases, Project, Topology, Parameter, recentTest
import datetime, time, json, os, sys, json, random, zipfile

def temp1(request):
  name = '2stc_2dut_type01'
  topo = Topology.objects.all().filter(name=name)[0]
  value_json = json.loads(topo.value)
  return HttpResponse(value_json)
  # return HttpResponse(value_json['labServer']['sessionName'])

def test1(request):
  context = {}
  # return HttpResponseRedirect('/testpack_project')
  response = FileResponse(open('./logs/mef_20200518225203.zip', 'rb'))
  response['content_type'] = "application/octet-stream"
  response['Content-Disposition'] = 'attachment; filename=' + os.path.basename('./logs/mef_20200518225203.zip')
  return response
  return render(request, './testpack/test1.html', context)

def test2(request):
  context = {}
  value_topo = Topology.objects.get(name='2stc_2dut_type01').value
  context = json.loads(value_topo)
  context['topology_value'] = value_topo
  context['testbed_name'] = '2stc_2dut_type01_testbed01'
  context['nameProject'] = 'sda'
  return render(request, './testpack/test2.html', context)

def test3(request):
  context = {}
  return HttpResponse('pass')

def testpack(request):
  context = {}
  return render(request, './testpack/testpack.html', context)

def testpack_result_stas(request):
  context = {}
  return render(request, './testpack/testpack_result_stas.html', context)

def testpack_recent(request):
  context = {}
  recentResult = recentTest.objects.all()
  context['projectInfoList'] = []
  for result in recentResult:
    total = result.total
    passed = result.passed
    ratio = str(passed) + '/' + str(total) + '(' +str(int(float("{0:.2f}".format(passed/total)) * 100)) + '%)'
    context['projectInfoList'].append((result.name, result.execution, result.duration, ratio, result.logPath))
  return render(request, './testpack/testpack_recent.html', context)

def testpack_running(request):
  context = {}
  projectResult = Project.objects.all()
  context['projectInfoList'] = []
  for project in projectResult:
    if project.state == 'running':
      total = 0
      finished = 0
      maps = json.loads(project.maps)
      for key, value in maps.items():
        total+=1
      time_start = project.lastRun
      # time_now = datetime.datetime.now()
      time_now = datetime.datetime.now() + datetime.timedelta(minutes=1600)
      elapsed_days = (time_now - time_start).days
      elapsed_seconds = (time_now - time_start).seconds
      m, s = divmod(elapsed_seconds, 60)
      h, m = divmod(m, 60)
      elapsed_time = "{0}d:{1}h:{2:02d}m:{3:02d}s".format(elapsed_days, h, m, s)
      finished = project.finished
      # print ('----finished is ', finished)
      # print ('----total is ', total)
      percentage = str(int(float("{0:.2f}".format(finished/total)) * 100))
      progress = '(' + str(finished) + '/' + str(total) + ')' + percentage + '%'
      context['projectInfoList'].append((project.name, project.lastRun, elapsed_time, progress, percentage))
  return render(request, './testpack/testpack_running.html', context)

def testpack_case_dis(request):
  context = {}
  return render(request, './testpack/testpack_case_dis.html', context)

def testpack_project(request):
  context = {}
  projectResult = Project.objects.all()
  context['projectInfoList'] = []
  for project in projectResult:
    context['projectInfoList'].append((project.name, project.state))
  return render(request, './testpack/testpack_project.html', context)

def cteate_project(request):
  context = {}
  nameProject = request.GET.get('nameProject', 'noProject')
  if Project.objects.all().filter(name=nameProject):
    context['repeatProject'] = 'yes'
    context['repeatProjectName'] = nameProject
    return render(request, './testpack/testpack_project.html', context)
  elif nameProject != 'noProject':
    Project.objects.create(name=nameProject, area='area', maps='map', testbed='testbed')
  return HttpResponseRedirect('/testpack_project_start?nameProject=' + nameProject)

def getLog(request):
  log_name = request.GET.get('log_name', 'noLog')
  response = FileResponse(open('./logs/' + log_name + '.zip', 'rb'))
  response['content_type'] = "application/octet-stream"
  response['Content-Disposition'] = 'attachment; filename=' + os.path.basename('./logs/' + log_name + '.zip')
  return response

def viewConsole(request):
  context = {}
  context['lineInfoList'] = []
  nameProject = request.GET.get('nameProject', 'noProject')
  console = Project.objects.get(name=nameProject).console
  lineList = console.split('\n')
  # return HttpResponse(console)
  for line in lineList:
    context['lineInfoList'].append(line)
  return render(request, './testpack/console.html', context)
  # return render(request, './testpack/' + name_topo + '.html', context)

def startProject(request):
  context = {}
  check_cases = []
  nameProject = request.GET.get('nameProject', 'noProject')
  Project.objects.filter(name=nameProject).update(state='running')
  Project.objects.filter(name=nameProject).update(lastRun=datetime.datetime.now())
  maps = json.loads(Project.objects.get(name=nameProject).maps)
  area = Project.objects.get(name=nameProject).area
  passed = 0
  finished = 0
  total = 0
  str_console = ''
  for key, value in maps.items():
    check_cases.append(key)
  total = len(check_cases)
  log_project = nameProject + '_' +time.strftime("%Y%m%d%H%M%S", time.localtime())
  log_dir = './logs/' + log_project
  os.mkdir(log_dir)
  fo = open(log_dir + "/bll.log", "w")
  fo.write( "="*20 + 'bll logs' + "="*20 +"\n")
  fo.close()
  fo = open(log_dir + "/il.log", "w")
  fo.write( "="*20 + 'il logs' + "="*20 +"\n")
  fo.close()
  fo = open(log_dir + "/test_log.txt", "w")
  fo.write( "="*100 + "\n")
  str_console = str_console +  "="*100 + "\n"
  fo.write( " "*20 + "project: " + nameProject + "\n")
  str_console = str_console +   " "*20 + "project: " + nameProject + "\n"
  fo.write( " "*20 + "area: " + area + "\n")
  str_console = str_console + " "*20 + "area: " + area + "\n"
  fo.write( " "*20 + "start: " + time.strftime("%Y-%m-%d %H:%M:%S", time.localtime()) + "\n")
  str_console = str_console + " "*20 + "start: " + time.strftime("%Y-%m-%d %H:%M:%S", time.localtime()) + "\n"
  fo.write( "="*100+"\n")
  str_console = str_console + "="*100+"\n" 
  Project.objects.filter(name=nameProject).update(console=str_console)
  time.sleep(1)
  for case in check_cases:
    fo.write(case + " "*10 + ".\n")
    fo.write("Attaching stc ports...done.\n")
    str_console = str_console + case + " "*10 + ".\n"
    str_console = str_console + "Attaching stc ports...done.\n"
    Project.objects.filter(name=nameProject).update(console=str_console)
    time.sleep(1)
    fo.write("Configuring stc ports...done.\n")
    str_console = str_console + "Configuring stc ports...done.\n"
    Project.objects.filter(name=nameProject).update(console=str_console)
    time.sleep(1)
    fo.write("Performing ARP...done.\n")
    str_console = str_console + "Performing ARP...done.\n"
    Project.objects.filter(name=nameProject).update(console=str_console)
    time.sleep(1)
    if (random.randint(1,6) % 2) == 0:
      fo.write("Clear all results for all ports...done.\n")
      str_console = str_console + "Clear all results for all ports...done.\n"
      Project.objects.filter(name=nameProject).update(console=str_console)
      time.sleep(1)
      fo.write("Start command sequencer......done.\n")
      str_console = str_console + "Start command sequencer......done.\n"
      Project.objects.filter(name=nameProject).update(console=str_console)
    else:
      fo.write("Start all protocols...done.\n")
      str_console = str_console + "Start all protocols...done.\n"
      Project.objects.filter(name=nameProject).update(console=str_console)
      time.sleep(1)
      fo.write("Start streams......done.\n")
      str_console = str_console + "Start streams......done.\n"
      Project.objects.filter(name=nameProject).update(console=str_console)
    time.sleep(1)
    if (random.randint(1,6) % 5) == 0:
      fo.write("Final test state is FAILED\n")
      str_console = str_console + "Final test state is FAILED\n"
      Project.objects.filter(name=nameProject).update(console=str_console)
    else:
      passed+=1
      fo.write("Final test state is PASSED\n")
      str_console = str_console + "Final test state is PASSED\n"
    fo.write( "-"*100+"\n")
    str_console = str_console +  "-"*100+"\n"
    Project.objects.filter(name=nameProject).update(console=str_console)
    time.sleep(1)
    state = Project.objects.get(name=nameProject).state
    finished+=1
    Project.objects.filter(name=nameProject).update(passed=passed)
    Project.objects.filter(name=nameProject).update(finished=finished)
    if state == 'idle':
      fo.write( "Project " + nameProject +" is stopped by user.\n")
      str_console = str_console +  "Project " + nameProject +" is stopped by user.\n"
      Project.objects.filter(name=nameProject).update(console=str_console)
      break
  time.sleep(1)
  fo.write( "Project " + nameProject +" is finished.\n")
  fo.write( "="*100+"\n")
  str_console = str_console +  "Project " + nameProject +" is finished.\n" +  "="*100+"\n"
  Project.objects.filter(name=nameProject).update(console=str_console)
  fo.close()
  Project.objects.filter(name=nameProject).update(finished=0)
  Project.objects.filter(name=nameProject).update(state='idle')
  time_start = Project.objects.get(name=nameProject).lastRun
  time_now = datetime.datetime.now()
  elapsed_days = (time_now - time_start).days
  elapsed_seconds = (time_now - time_start).seconds
  m, s = divmod(elapsed_seconds, 60)
  h, m = divmod(m, 60)
  elapsed_time = "{0}d:{1}h:{2:02d}m:{3:02d}s".format(elapsed_days, h, m, s)
  zipFile = zipfile.ZipFile(log_dir + '.zip', 'w', zipfile.ZIP_DEFLATED)
  for dirpath, dirnames, filenames in os.walk(log_dir):
    for filename in filenames:
      zipFile.write(os.path.join(dirpath,filename), filename)
  recentTest.objects.create(name=nameProject, execution=time_start, duration=elapsed_time, passed=passed, total=total, logPath=log_project)
  return HttpResponse('start project successfully!')

def stopProject(request):
  context = {}
  nameProject = request.GET.get('nameProject', 'noProject')
  Project.objects.filter(name=nameProject).update(state='idle')
  Project.objects.filter(name=nameProject).update(finished=0)
  return HttpResponse('stop project successfully!')

def getTestResult(request):
  context = {}
  nameProject = request.GET.get('nameProject', 'noProject')
  fo = open(nameProject+".txt", "w")
  fo.write( "=====test1 start\n")
  time.sleep(3)
  # fo.write( "=====test1 stop\n")
  # time.sleep(3)
  # fo.write( "=====test2 start\n")
  # time.sleep(3)
  # fo.write( "=====test2 stop\n")
  # time.sleep(3)
  # fo.write( "=====test suite finish\n")
  fo.close()
  return HttpResponse('start project successfully!')

def exportProject(request):
  context = {}
  nameProject = request.GET.get('nameProject', 'noProject')
  area = Project.objects.get(name=nameProject).area
  maps = Project.objects.get(name=nameProject).maps
  testbed = Project.objects.get(name=nameProject).testbed
  project = {}
  project['name'] = nameProject
  project['area'] = area
  project['maps'] = json.loads(maps)
  project['testbed'] = json.loads(testbed)
  project_file = './projects/' + nameProject + '.json'
  with open(project_file, 'w') as file_obj:
    json.dump(project, file_obj, indent=2)
  # log_name = 'sda_20200519132803'
  response = FileResponse(open(project_file, 'rb'))
  response['content_type'] = "application/octet-stream"
  response['Content-Disposition'] = 'attachment; filename=' + os.path.basename(project_file)
  return response
  # return HttpResponse('export project successfully!')

def importProject(request):
  context = {}
  nameProject = request.GET.get('nameProject', 'noProject')
  return HttpResponse('import project successfully!')

def cloneProject(request):
  context = {}
  nameProject = request.GET.get('nameProject', 'noProject')
  newProject = request.GET.get('newProject', 'noNewProject')
  area = Project.objects.get(name=nameProject).area
  maps = Project.objects.get(name=nameProject).maps
  testbeds = Project.objects.get(name=nameProject).testbed
  Project.objects.create(name=newProject, area=area, maps=maps, testbed=testbeds)
  return HttpResponse('clone project successfully!')

def deleteProject(request):
  context = {}
  nameProject = request.GET.get('nameProject', 'noProject')
  Project.objects.get(name=nameProject).delete()
  return HttpResponse('delete project successfully!')

def editProject(request):
  context = {}
  check_cases = []
  nameProject = request.GET.get('nameProject', 'noProject')
  area = Project.objects.get(name=nameProject).area
  maps = json.loads(Project.objects.get(name=nameProject).maps)
  testbeds = json.loads(Project.objects.get(name=nameProject).testbed)
  caseResult = Cases.objects.all().filter(area=area)
  context['area'] = area
  context['nameProject'] = nameProject
  context['caseInfoList'] = []
  context['testbedInfoList'] = []
  context['mapInfoList'] = []
  context['testbedInfoList'].append(['topology', 'testbed', 'testbed', 'none', 'none'])
  context['mapInfoList'].append(['map', [['parameter', '100', 'none']], 'none', 'none'])
  index = 0
  for key, value in maps.items():
    check_cases.append(key)
    index+=1
    paraList = []
    paraList.append(['parameter', '100', 'none'])
    for key_para, value_para in value['parameter'].items():
      paraList.append([key_para, value_para, ''])
    context['mapInfoList'].append([key, paraList, '', value['testbed']])
  for key, value in testbeds.items():
    name_testbed = key
    name_topo = name_testbed[:name_testbed.rindex('_')]
    if name_testbed.count('testbed01') == 0:
      context['testbedInfoList'].append([name_topo, name_testbed, value, '', 'none'])
    else:
      context['testbedInfoList'].append([name_topo, name_testbed, value, '', ''])
  for case in caseResult:
    if check_cases.count(case.name) == 0:
      context['caseInfoList'].append([case.name, case.area, case.topology, case.priority, case.test_type, case.parameter, ''])
    else:
      context['caseInfoList'].append([case.name, case.area, case.topology, case.priority, case.test_type, case.parameter, 'checked'])
  # print ('======testbedInfoList is ', context['testbedInfoList'])
  return render(request, './testpack/testpack_project_start.html', context)

def testpack_case_content(request):
  context = {}
  nameCase = request.GET.get('nameCase', 'noCaseName')
  # nameCase = 'TestCase002'
  case = Cases.objects.get(name=nameCase)
  context['identifier'] = case.identifier
  context['name'] = case.name
  context['test_type'] = case.test_type
  context['duration'] = case.duration
  context['timeout'] = case.timeout
  procedure = case.procedure
  procedure_list = procedure.split(',')
  context['procedure_list'] = procedure_list
  context['equipment_list'] = []
  equip = case.equipment
  equip_list = equip.split(',')
  for para in equip_list:
    para = para[1:-1]
    para_list = para.split(';')
    tc_list_temp = []
    for tc in para_list:
      tc_list = tc.split(':')
      tc_list_temp.append(tc_list[1])
    context['equipment_list'].append(tc_list_temp)
  context['parameter_list'] = []
  para = case.parameter
  if para != '':
    para_list = para.split(',')
    for para in para_list:
      list_temp = para.split(':')
      context['parameter_list'].append(list_temp)
  return render(request, './testpack/testpack_case_content.html', context)

def testpack_project_start(request):
  context = {}
  nameProject = request.GET.get('nameProject', 'noProject')
  area = request.GET.get('area','noArea')
  if area == 'noArea':
    caseResult = Cases.objects.all().filter(area='SD-WAN')
  else:
    caseResult = Cases.objects.all().filter(area=area)
  context['area'] = area
  context['nameProject'] = nameProject
  context['caseInfoList'] = []
  context['testbedInfoList'] = []
  context['mapInfoList'] = []
  for case in caseResult:
    context['caseInfoList'].append([case.name, case.area, case.topology, case.priority, case.test_type, case.parameter, ''])
  context['testbedInfoList'].append(['topology', 'testbed', 'testbed', 'none', ''])
  context['mapInfoList'].append(['map', [['parameter', '100', 'none']], 'none', 'none'])
  return render(request, './testpack/testpack_project_start.html', context)

def testpack_project_view(request):
  context = {}
  nameProject = request.GET.get('nameProject', 'noProject')
  if Project.objects.get(name=nameProject).testbed == 'testbed':
    return HttpResponse('Project is empty, please edit it firstly!')
  maps = json.loads(Project.objects.get(name=nameProject).maps)
  area = Project.objects.get(name=nameProject).area
  context['nameProject'] = nameProject
  context['case_area'] = area
  context['mapInfo'] = []
  index = 0
  for key, value in maps.items():
    index+=1
    paraList = []
    for key_para, value_para in value['parameter'].items():
      para_string = key_para + ': ' + value_para
      paraList.append(para_string)
    context['mapInfo'].append([key, value['testbed'], paraList])
  return render(request, './testpack/testpack_project_view.html', context)

def testpack_cases(request):
  context = {}
  caseResult = Cases.objects.all()
  context['caseInfoList'] = []
  for case in caseResult:
    context['caseInfoList'].append((case.name, case.area, case.topology, case.priority, case.test_type))
  return render(request, './testpack/testpack_cases.html', context)

def viewTopology(request):
  context = {}
  name_topo = request.GET.get('name_topo','noTopo')
  value_topo = Topology.objects.get(name=name_topo).value
  context=json.loads(value_topo)
  return render(request, './testpack/' + name_topo + '.html', context)

def returnTopology(request):
  value_topo = {}
  # name_topo = request.GET.get('name_topo','noTopo')
  topos = Topology.objects.all()
  for topo in topos:
    value_topo[topo.name] = topo.value
  value_string = json.dumps(value_topo)
  return HttpResponse(value_string)

def viewTestbed(request):
  context = {}
  nameProject = request.GET.get('nameProject', 'noProject')
  name_testbed = request.GET.get('name_testbed','noTestbed')
  name_topo = name_testbed[:name_testbed.rindex('_')]
  testbeds = json.loads(Project.objects.get(name=nameProject).testbed)
  value_testbed = testbeds[name_testbed]
  # value_testbed = request.GET.get('value_testbed','noTestbedValue')
  value_topo = Topology.objects.get(name=name_topo).value
  if value_testbed == 'testbed':
    value_testbed = value_topo
  context = json.loads(value_testbed)
  context['edit_testbed'] = 'no'
  context['topology_value'] = value_topo
  context['testbed_name'] = name_testbed
  context['nameProject'] = nameProject
  return render(request, './testpack/' + name_topo + '.html', context)

def editTestbed(request):
  context = {}
  nameProject = request.GET.get('nameProject', 'noProject')
  name_topo = request.GET.get('name_topo', 'noTopo')
  name_testbed = request.GET.get('name_testbed','noTestbed')
  value_testbed = request.GET.get('value_testbed','noTestbedValue')
  value_topo = Topology.objects.get(name=name_topo).value
  if value_testbed == 'testbed':
    value_testbed = value_topo
  context = json.loads(value_testbed)
  context['topology_value'] = value_topo
  context['testbed_name'] = name_testbed
  context['nameProject'] = nameProject
  return render(request, './testpack/' + name_topo + '.html', context)

def saveTestbed(request):
  context = {}
  nameProject = request.GET.get('nameProject', 'noProject')
  testbed_all = Project.objects.get(name=nameProject).testbed
  json_data_testbed_all = json.loads(testbed_all)
  testbed_string = request.GET.get('testbed_string', 'noTestbedString')
  testbed_name = request.GET.get('testbed_name', 'noTestbed')
  json_data_testbed_all[testbed_name] = testbed_string
  json_string_testbed_all = json.dumps(json_data_testbed_all)
  Project.objects.filter(name=nameProject).update(testbed=json_string_testbed_all)
  return HttpResponse('save testbed successfully!')

def saveProject(request):
  context = {}
  project_string = request.GET.get('project_string', 'noProject')
  project = json.loads(project_string)
  Project.objects.filter(name=project['name']).update(testbed=json.dumps(project['testbed']), area=project['area'], maps=json.dumps(project['maps']))
  return HttpResponse('save project successfully!')

def deleteCases(request):
  for case in Cases.objects.all():
    case.delete()
  return HttpResponse('delete cases')

def deleteProjects(request):
  for project in Project.objects.all():
    project.delete()
  return HttpResponse('delete projects')

def deleteRecents(request):
  for recent in recentTest.objects.all():
    recent.delete()
  return HttpResponse('delete recents')

def importCases(request):
  context = {}
  for case in Cases.objects.all():
    case.delete()
  fileHandle = request.FILES.get('fileUpload')
  workBook = xlrd.open_workbook(filename='./testpack.xlsx')
  table = workBook.sheets()[0]
  rowNumber = table.nrows
  colNumber = table.ncols
  for row in range(1,rowNumber):
    caseTemp = Cases(identifier=table.row_values(row)[0], name=table.row_values(row)[1], area=table.row_values(row)[2], topology=table.row_values(row)[3], parameter=table.row_values(row)[4], priority=str(int(table.row_values(row)[5])), \
    test_type=table.row_values(row)[6], equipment=table.row_values(row)[7], duration=table.row_values(row)[8], timeout=table.row_values(row)[9], procedure=table.row_values(row)[10], modifyTime=datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S'))
    caseTemp.save()
  return HttpResponse('add cases')

def importTopos(request):
  context = {}
  for topo in Topology.objects.all():
    topo.delete()
  name = '2stc_2dut_type01'
  value_json = {
    "labServer" : {
      "ip" : "", "sessionName" : "testpack001"
    },
    "stcLocalHead" : {
      "location": "", "speed" : "default", "phy" : "default",
      "device1" : {
        "name" : "local_head",
        "ipv4If" : {"address" : "192.168.1.1", "gateway" : "192.168.1.254", "prefixLength" : "24"},
        "ipv6If" : {"address" : "2001::1", "gateway" : "2001::2", "prefixLength" : "64"}
      },
      "device2" : {
        "name" : "local_device1",
        "ipv4If" : {"address" : "101.0.0.1"}
      }
    },
    "stcRemoteHead" : {
      "location": "", "speed" : "default", "phy" : "default",
      "device1" : {
        "name" : "remote_head",
        "ipv4If" : {"address" : "192.168.2.1", "gateway" : "192.168.2.254", "prefixLength" : "24"},
        "ipv6If" : {"address" : "2002::1", "gateway" : "2002::2", "prefixLength" : "64"}
      },
      "device2" : {
        "name" : "remote_device1",
        "ipv4If" : {"address" : "201.0.0.1"}
      }
    } 
  }
  value = json.dumps(value_json)
  topoTemp = Topology(name=name, value=value)
  topoTemp.save()
  name = '3stc_3dut_type02'
  value_json = {
    "labServer" : {
      "ip" : "", "sessionName" : "testpack001"
    },
    "stcSiteA" : {
      "location": "", "speed" : "default", "phy" : "default",
      "deviceSiteADefault" : {
        "name" : "site-a_default",
        "ipv4If" : {"address" : "192.168.1.1", "gateway" : "192.168.1.254", "prefixLength" : "24"}
      }
    },
    "stcSiteB" : {
      "location": "", "speed" : "default", "phy" : "default",
      "deviceSiteBDefault" : {
        "name" : "site-b_default",
        "ipv4If" : {"address" : "192.168.2.1", "gateway" : "192.168.2.254", "prefixLength" : "24"}
      }
    },
    "stcSiteC" : {
      "location": "", "speed" : "default", "phy" : "default",
      "deviceSiteCDefault" : {
        "name" : "site-c_default",
        "ipv4If" : {"address" : "192.168.3.1", "gateway" : "192.168.3.254", "prefixLength" : "24"}
      }
    } 
  }
  value = json.dumps(value_json)
  topoTemp = Topology(name=name, value=value)
  topoTemp.save()
  return HttpResponse('add topology')