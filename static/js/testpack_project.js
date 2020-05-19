window.onload = function(){
  if ($("#repeatProject").text() == 'yes') {
    window.alert('Project name of "' + $("#repeatProjectName").text() + '" has been used, please create project with another name.' );
  }
  var run_flag = 'false';
  for (var i=0; i<$("#projects").children('tr').length; i++) {
    state = $("#projects").children('tr').eq(i).children('td').eq(2).text();
    // console.log('state of project is ' + state);
    if (state == 'running') {
      $("#projects").children('tr').eq(i).children('td').eq(6).children('button').eq(0).removeClass('btn-success').addClass('btn-light');
      $("#projects").children('tr').eq(i).children('td').eq(6).children('button').eq(0).attr("disabled", true);
      $("#projects").children('tr').eq(i).children('td').eq(7).children('button').eq(0).removeClass('btn-light').addClass('btn-danger');
      $("#projects").children('tr').eq(i).children('td').eq(7).children('button').eq(0).attr("disabled", false);
      $("#projects").children('tr').eq(i).children('td').eq(3).children('button').eq(0).removeClass('btn-info2').addClass('btn-light');
      $("#projects").children('tr').eq(i).children('td').eq(3).children('button').eq(0).attr("disabled", true);
      $("#projects").children('tr').eq(i).children('td').eq(4).children('button').eq(0).removeClass('btn-danger').addClass('btn-light');
      $("#projects").children('tr').eq(i).children('td').eq(4).children('button').eq(0).attr("disabled", true);
      $("#projects").children('tr').eq(i).children('td').eq(5).children('button').eq(0).removeClass('btn-yellow').addClass('btn-light');
      $("#projects").children('tr').eq(i).children('td').eq(5).children('button').eq(0).attr("disabled", true);
      $("#projects").children('tr').eq(i).children('td').eq(8).children('button').eq(0).removeClass('btn-info').addClass('btn-light');
      $("#projects").children('tr').eq(i).children('td').eq(8).children('button').eq(0).attr("disabled", true);
    }
  }
  var interval = null;
  interval = setInterval(function(){
    for (var i=0; i<$("#projects").children('tr').length; i++) {
      state = $("#projects").children('tr').eq(i).children('td').eq(2).text();
      if (state != 'idle') {
        run_flag = 'true';
      }
    }
    if (run_flag == 'false') {
      clearInterval(interval);
    }
    else {
      window.location.reload();
    }
  }, 5000);
}

function onCreateProject(obj){
  nameProject = prompt('Name for new project');
  if (nameProject != null) {
    window.location.href='/cteate_project?nameProject=' + nameProject +'';
  }
}

function onViewProject(obj){
  nameProject = $(obj).text();
  window.open('testpack_project_view?nameProject=' + nameProject, "_blank", "location=no, status=no, menubar=yes, scrollbars=yes, resizable=no, copyhistory=yes, width=1000, height=600, left=200, top=100");
}

function editProject(obj){
  nameProject = $(obj).parent().parent().children('td').eq(0).children('a').eq(0).text();
  window.location.href='/editProject?nameProject=' + nameProject +'';
}

function startProject(obj){
  nameProject = $(obj).parent().parent().children('td').eq(0).children('a').eq(0).text();
  if (confirm("Project will be started, press 'Y' to continue!")) {
    $(obj).removeClass('btn-success').addClass('btn-light');
    $(obj).attr("disabled", true);
    $(obj).parent().parent().children('td').eq(7).children('button').eq(0).removeClass('btn-light').addClass('btn-danger');
    $(obj).parent().parent().children('td').eq(7).children('button').eq(0).attr("disabled", false);
    $(obj).parent().parent().children('td').eq(3).children('button').eq(0).removeClass('btn-info2').addClass('btn-light');
    $(obj).parent().parent().children('td').eq(3).children('button').eq(0).attr("disabled", true);
    $(obj).parent().parent().children('td').eq(4).children('button').eq(0).removeClass('btn-danger').addClass('btn-light');
    $(obj).parent().parent().children('td').eq(4).children('button').eq(0).attr("disabled", true);
    $(obj).parent().parent().children('td').eq(5).children('button').eq(0).removeClass('btn-yellow').addClass('btn-light');
    $(obj).parent().parent().children('td').eq(5).children('button').eq(0).attr("disabled", true);
    $(obj).parent().parent().children('td').eq(8).children('button').eq(0).removeClass('btn-info').addClass('btn-light');
    $(obj).parent().parent().children('td').eq(8).children('button').eq(0).attr("disabled", true);
    $.get('startProject?nameProject=' + nameProject);
    setTimeout("window.location.reload();", 200);
  } 
}

function stopProject(obj){
  nameProject = $(obj).parent().parent().children('td').eq(0).children('a').eq(0).text();
  if (confirm("Project will be stopped, press 'Y' to continue!")) {
    $(obj).removeClass('btn-danger').addClass('btn-light');
    $(obj).attr("disabled", true);
    $(obj).parent().parent().children('td').eq(6).children('button').eq(0).removeClass('btn-light').addClass('btn-success');
    $(obj).parent().parent().children('td').eq(6).children('button').eq(0).attr("disabled", false);
    // $(obj).parent().parent().children('td').eq(7).children('button').eq(0).removeClass('btn-light').addClass('btn-danger');
    // $(obj).parent().parent().children('td').eq(7).children('button').eq(0).attr("disabled", false);
    $(obj).parent().parent().children('td').eq(3).children('button').eq(0).removeClass('btn-light').addClass('btn-info2');
    $(obj).parent().parent().children('td').eq(3).children('button').eq(0).attr("disabled", false);
    $(obj).parent().parent().children('td').eq(4).children('button').eq(0).removeClass('btn-light').addClass('btn-danger');
    $(obj).parent().parent().children('td').eq(4).children('button').eq(0).attr("disabled", false);
    $(obj).parent().parent().children('td').eq(5).children('button').eq(0).removeClass('btn-light').addClass('btn-yellow');
    $(obj).parent().parent().children('td').eq(5).children('button').eq(0).attr("disabled", false);
    $(obj).parent().parent().children('td').eq(8).children('button').eq(0).removeClass('btn-light').addClass('btn-info');
    $(obj).parent().parent().children('td').eq(8).children('button').eq(0).attr("disabled", false);
    $.get('stopProject?nameProject=' + nameProject);
    setTimeout("window.location.reload();", 200);
  } 
}

function cloneProject(obj){
  nameProject = $(obj).parent().parent().children('td').eq(0).children('a').eq(0).text();
  projects_existed = [];
  // get existed projects to make sure no repeat project name
  for (var i=0; i<$("#projects").children('tr').length; i++) {
    project = $("#projects").children('tr').eq(i).children('td').eq(0).children('a').eq(0).text();
    if (projects_existed.indexOf(project) == -1) {
      projects_existed.push(project);
    }
  }
  index = 1;
  newProject = nameProject + '_copy' + index;
  while (projects_existed.indexOf(newProject) != -1)
  {
    index++;
    newProject = nameProject + '_copy' + index;
  }
  console.log('newProject is ' + newProject);
  $.get('cloneProject?nameProject=' + nameProject + '&newProject=' + newProject , function(data,status){
    window.location.reload();
    alert(data);
  });
}

function deleteProject(obj){
  nameProject = $(obj).parent().parent().children('td').eq(0).children('a').eq(0).text();
  if (confirm("Project will be deleted, press 'Y' to confirm!")) {
    $(obj).parent().parent().remove();
    $.get('deleteProject?nameProject=' + nameProject, function(data,status){
      window.location.reload();
      alert(data);
    });
  } 
}

// function exportProject(obj){
//   nameProject = $(obj).parent().parent().children('td').eq(0).children('a').eq(0).text();
//   if (confirm("Project will be exported, press 'Y' to confirm!")) {
//     window.location.href='/exportProject?nameProject=' + nameProject +'';
//   } 
// }