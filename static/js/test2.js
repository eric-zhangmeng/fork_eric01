testbeds_seq = ['testbed02', 'testbed03', 'testbed04', 'testbed05', 'testbed06', 'testbed07', 'testbed08', 'testbed09'];
parameter_seq = ['02', '03', '04', '05', '06', '07', '08', '09'];
var project = new Object();
var topos = new Object();

function viewTopology(obj){
  name_topo = $(obj).text();
  window.open('viewTopology?edit=' + "no" + '&name_topo=' + name_topo, "_blank", "location=no, status=no, menubar=yes, scrollbars=yes, resizable=no, copyhistory=yes, width=1000, height=600, left=200, top=100");
}

function editTestbed(obj){
  nameProject = $("#nameProject").val();
  name_topo = $(obj).parent().parent().children('td').eq(0).children('a').eq(0).text();
  name_testbed = $(obj).text();
  window.open('editTestbed?nameProject=' + nameProject + '&name_topo=' + name_topo + '&name_testbed=' + name_testbed, "_blank", "location=no, status=no, menubar=yes, scrollbars=yes, resizable=no, copyhistory=yes, width=1000, height=600, left=200, top=100");
}

function addTestbed(obj){
  nameProject = $("#nameProject").val();
  testbeds_existed = [];
  testbed_data = {};
  // insert testbled line of tr object
  obj1 = $("<tr>" + $(obj).parent().parent().html() + "</tr>").insertAfter($(obj).parent().parent());
  // hide the topology if not the first testbed
  obj1.children('td').eq(0).children("*").css('display','none');
  // get existed testbeds to make sure no repeat testbed name
  for (var i=0; i<$("#testbeds").children('tr').length; i++) {
    topology = $("#testbeds").children('tr').eq(i).children('td:first').children('a:first').text();
    if (topology == $(obj).parent().children('a').eq(0).text()) {
      testbed = $("#testbeds").children('tr').eq(i).children('td').eq(1).children('a').eq(0).text();
      if (testbeds_existed.indexOf(testbed) == -1) {
        testbeds_existed.push(testbed);
      }
    }
  }
  // set unique testebed name
  for (var i=0; i<testbeds_seq.length; i++) {
    testbed_temp = $(obj).parent().children('a').eq(0).text() + '_' +testbeds_seq[i];
    if (testbeds_existed.indexOf(testbed_temp) == -1) {
      obj1.children('td:eq(1)').children('a:first').text(testbed_temp);
      topology = $(obj).parent().children('a').eq(0).text();
      testbed_data[topology] = testbed_temp;
      if (Object.keys(testbed_data).length != 0) {
        testbed_string = JSON.stringify(testbed_data);
        $.get('addTestbed?testbed_string=' + testbed_string + '&nameProject=' + nameProject);
      }
      break;
    }
  }
}

function cloneTestbed(obj){
  nameProject = $("#nameProject").val();
  testbeds_existed = [];
  // insert testbled line of tr object
  obj1 = $("<tr>" + $(obj).parent().parent().html() + "</tr>").insertAfter($(obj).parent().parent());
  // hide the topology if not the first testbed
  obj1.children('td').eq(0).children("*").css('display','none');
  // get existed testbeds to make sure no repeat testbed name
  for (var i=0; i<$("#testbeds").children('tr').length; i++) {
    topology = $("#testbeds").children('tr').eq(i).children('td').eq(0).children('a').eq(0).text();
    if (topology == $(obj).parent().parent().children('td').eq(0).children('a').eq(0).text()) {
      testbed = $("#testbeds").children('tr').eq(i).children('td').eq(1).children('a').eq(0).text();
      if (testbeds_existed.indexOf(testbed) == -1) {
        testbeds_existed.push(testbed);
      }
    }
  }
  // set unique testebed name
  for (var i=0; i<testbeds_seq.length; i++) {
    testbed_temp = $(obj).parent().parent().children('td').eq(0).children('a').eq(0).text() + '_' +testbeds_seq[i];
    if (testbeds_existed.indexOf(testbed_temp) == -1) {
      obj1.children('td').eq(1).children('a').eq(0).text(testbed_temp);
      topology = $(obj).parent().parent().children('td').eq(0).children('a').eq(0).text();
      testbed_legacy = $(obj).parent().parent().children('td').eq(1).children('a').eq(0).text();
      $.get('cloneTestbed?testbed_legacy=' + testbed_legacy + '&testbed_new=' + testbed_temp + '&nameProject=' + nameProject);
      break;
    }
  }
}

function cloneParameter(obj){
  nameProject = $("#nameProject").val();
  parameters_existed = [];
  parameter_data = {};
  // insert parameter line of tr object
  obj1 = $("<tr>" + $(obj).parent().parent().html() + "</tr>").insertAfter($(obj).parent().parent());
  // hide the parameter_type if not the first testbed
  obj1.children('td').eq(0).children("*").css('display','none');
  // get existed parameters to make sure no repeat parameter name
  for (var i=0; i<$("#parameters").children('tr').length; i++) {
    parameter_type = $("#parameters > tr:eq(" + i + ") > td:first > span:first").text();
    if (parameter_type == $(obj).parent().parent().children('td').eq(0).children('span').eq(0).text()) {
      parameter = $("#parameters").children('tr').eq(i).children('td').eq(1).children('span').eq(0).text();
      if (parameters_existed.indexOf(parameter) == -1) {
        parameters_existed.push(parameter);
      }
    }
  }
  // set unique parameter name
  for (var i=0; i<parameter_seq.length; i++) {
    parameter = $(obj).parent().parent().children('td').eq(0).children('span').eq(0).text() + '_' + parameter_seq[i];
    parameter_temp = parameter.substring(0, parameter.indexOf('(')) + parameter.substring(parameter.indexOf(')') + 1, );
    value_temp = $(obj).parent().parent().children('td').eq(2).children('input').eq(0).val();
    if (parameters_existed.indexOf(parameter_temp) == -1) {
      obj1.children('td').eq(1).children('span').eq(0).text(parameter_temp);
      obj1.children('td').eq(2).children('input').eq(0).val(value_temp);
      parameter_data[parameter] = value_temp;
      if (Object.keys(parameter_data).length != 0) {
        parameter_string = JSON.stringify(parameter_data);
        $.get('addParameter?parameter_string=' + parameter_string + '&nameProject=' + nameProject);
      }
      break;
    }
  }
}

function deleteTestbed(obj){
  nameProject = $("#nameProject").val();
  testbed_string = '';
  if ($(obj).parent().parent().children('td').eq(1).html().search('testbed01') == -1){
    testbed_string = $(obj).parent().parent().children('td').eq(1).children('a').eq(0).text();
    if (testbed_string != '') {
      $.get('deleteTestbed?testbed_string=' + testbed_string + '&nameProject=' + nameProject);
      $(obj).parent().parent().remove();
    }
  }
}

function deleteParameter(obj){
  nameProject = $("#nameProject").val();
  parameter_string = '';
  if ($(obj).parent().parent().children('td').eq(1).html().search('01') == -1){
    parameter_type = $(obj).parent().parent().children('td').eq(0).children('span').eq(0).text();
    parameter_temp = $(obj).parent().parent().children('td').eq(1).children('span').eq(0).text();
    parameter_string = parameter_type + parameter_temp.substring(parameter_temp.lastIndexOf('_'), );
    if (parameter_string != '') {
      $.get('deleteParameter?parameter_string=' + parameter_string + '&nameProject=' + nameProject);
      $(obj).parent().parent().remove();
    }
  }
}

window.onload = function(){
  $.get("returnTopology", function(data,status){
    // alert('data is, ' + data);
    topos_string = data;
    topos = JSON.parse(topos_string);
  });
  project['name'] = $("#nameProject").val();
  project['area'] = $("#testArea").val();
  project['maps'] = new Object();
  project['testbed'] = new Object();
}

function changeAreaOfStartProject(){
  nameProject = $("#nameProject").val();
  project['area'] = $("#testArea").val();
  window.location.href='/testpack_project_start?area=' + $("#testArea").val() + '&nameProject=' + nameProject +'';
}

function onNext(obj){
  // step-1 action
  nameProject = $("#nameProject").val();
  area = $("#testArea").val();
  var cases = new Array();
  var topologies_existed = new Array();
  var topologies = new Array();
  var maps_existed = new Array();
  var parameter_types = new Array();
  var parameter_values = new Array();
  var parameter_types_existed = new Array();
  if ($("ul[class='steps'] li[class='active']").attr("data-step") == '1') {
    // get selected topologies and parameters
    for (var i=0; i<$("#cases").children('tr').length; i++) {
      if ($("#cases").children('tr').eq(i).find('input').eq(0).is(':checked') == true ) {
        topology = $("#cases > tr:eq(" + i + ") > td:eq(3) > a:first").text();
        if (topologies.indexOf(topology) == -1) {
          topologies.push(topology);
        }
        parameter_type_list = $("#cases").children('tr').eq(i).children('td').eq(6).html().split(',');
        for (var j=0;j<parameter_type_list.length;j++) {
          if (parameter_types.indexOf(parameter_type_list[j].split(':')[0]) == -1 && parameter_type_list[j] != '') {
            parameter_types.push(parameter_type_list[j].split(':')[0]);
            parameter_values.push(parameter_type_list[j].split(':')[1]);
          }
        }
      }
    }
    // alert when no cases selected
    if (topologies.length == 0) {
      window.alert('Select 1 test case at lease !');
      window.location.href='/testpack_project_start?area=' + area + '&nameProject=' + nameProject +'';
    }
    // get existed topologies
    for (var i=0; i<$("#testbeds").children('tr').length; i++) {
      topology = $("#testbeds").children('tr').eq(i).children('td').eq(0).children('a').eq(0).text();
      if (topologies_existed.indexOf(topology) == -1) {
        topologies_existed.push(topology);
      }
    }
    // add topoloy and testbed based on topologies
    testbed_data = {};
    for (var i=0; i<topologies.length; i++) {
      if (topologies_existed.indexOf(topologies[i]) == -1) {
        clonedTestbed = $("#testbeds").children('tr').eq(0).clone().appendTo($("#testbeds"));
        clonedTestbed.css('display','');
        topology = topologies[i];
        testbed = topologies[i] + '_testbed01';
        // testbed_data[topology] = testbed;
        testbed_data[testbed] = topos[topology];
        clonedTestbed.children('td').eq(0).children('a').eq(0).text(topology);
        clonedTestbed.children('td').eq(1).children('a').eq(0).text(testbed);
      }
    }
    if (Object.keys(testbed_data).length != 0) {
      // testbed_string = JSON.stringify(testbed_data);
      project['testbed'] = testbed_data;
      // $.get('addTestbed?testbed_string=' + testbed_string + '&nameProject=' + nameProject);
    }
    // delete those testbeds whose topology is not in current topologies
    testbed_string = ''
    for (var i=($("#testbeds").children('tr').length-1); i>=0; i--) {
      topology = $("#testbeds").children('tr').eq(i).children('td').eq(0).children('a').eq(0).text();
      if ((topologies.indexOf(topology) == -1) && (topology != 'topology')) {
        testbed = $("#testbeds").children('tr').eq(i).children('td').eq(1).children('a').eq(0).text();
        testbed_string = testbed_string + testbed + ','
        $("#testbeds").children('tr').eq(i).remove();
      }
    }
    testbed_string = testbed_string.substr(0, (testbed_string.length - 1));
    testbed_list = testbed_string.split(',');
    if (testbed_string != '') {
      // $.get('deleteTestbed?testbed_string=' + testbed_string + '&nameProject=' + nameProject);
      for (var i=0; i<testbed_list.length; i++) {
        delete project['testbed'][testbed_list[i]];
      }
    }
  }

  // step-2 action
  if ($("ul[class='steps'] li[class='active']").attr("data-step") == '2') {
    // get selected cases
    for (var i=0; i<$("#cases").children('tr').length; i++) {
      if ($("#cases").children('tr').eq(i).find('input').eq(0).is(':checked') == true ) {
        case_temp = $("#cases").children('tr').eq(i).children('td').eq(1).children('a').eq(0).text();
        cases.push(case_temp);
      }
    }
    // get all testbeds
    var testbeds = new Array();
    for (var i=1; i<$("#testbeds").children('tr').length; i++) {
        testbed = $("#testbeds").children('tr').eq(i).children('td').eq(1).children('a').eq(0).text();
        testbeds.push(testbed);
    }
    // get existed maps
    for (var i=1; i<$("#maps").children('tr').length; i++) {
      map = $("#maps").children('tr').eq(i).children('td').eq(0).children('a').eq(0).text();
      if (maps_existed.indexOf(map) == -1) {
        maps_existed.push(map);
      }
    }
    // add maps
    map_data = {};
    for (var i=0; i<cases.length; i++) {
      if (maps_existed.indexOf(cases[i]) == -1) {
        clonedMap = $("#maps").children('tr').eq(0).clone().appendTo($("#maps"));
        clonedMap.css('display','');
        map = cases[i];
        clonedMap.children('td').eq(0).children('a').eq(0).text(map);
        parameter_string = $("tr[id=" + map + "]").children('td').eq(6).text();
        parameter_list = parameter_string.split(',')
        if (parameter_string != '') {
          for (var j=0; j<parameter_list.length; j++) {
            parameter = parameter_list[j].split(':')[0];
            value = parameter_list[j].split(':')[1];
            clonedParameter= clonedMap.children('td').eq(2).children('div').eq(0).clone().appendTo(clonedMap.children('td').eq(2));
            clonedParameter.css('display','');
            clonedParameter.children('span').eq(0).text(parameter + ' ');
            clonedParameter.children('input').eq(0).val(value);
            $("<div class='space-2'></div>").insertAfter(clonedParameter);
          }
        }
      }
    }
    // if (Object.keys(testbed_data).length != 0) {
    //   testbed_string = JSON.stringify(testbed_data);
    //   $.get('addTestbed?testbed_string=' + testbed_string + '&nameProject=' + nameProject);
    // }
    // delete those maps which is not in current maps
    for (var i=($("#maps").children('tr').length-1); i>=0; i--) {
      map = $("#maps").children('tr').eq(i).children('td').eq(0).children('a').eq(0).text();
      if ((cases.indexOf(map) == -1) && (map != 'map')) {
        $("#maps").children('tr').eq(i).remove();
      }
    }
    // testbed_string = testbed_string.substr(0, (testbed_string.length - 1));
    // if (testbed_string != '') {
    //   $.get('deleteTestbed?testbed_string=' + testbed_string + '&nameProject=' + nameProject);
    // }
    // refresh testbeds
    for (var i=1; i<$("#maps").children('tr').length; i++) {
      var options = new Array();
      map = $("#maps").children('tr').eq(i).children('td').eq(0).children('a').eq(0).text();
      topology = $("tr[id=" + map + "]").children('td').eq(3).children('a').eq(0).text();
      for (var j=($("#maps").children('tr').eq(i).children('td').eq(1).children('select').eq(0).children('option').length - 1); j>=0; j--) {
        testbed_temp = $("#maps").children('tr').eq(i).children('td').eq(1).children('select').eq(0).children('option').eq(j).text();
        if (testbeds.indexOf(testbed_temp) == -1) {
          $("#maps").children('tr').eq(i).children('td').eq(1).children('select').eq(0).children('option').eq(j).remove(); 
        }
        else {
          options.push(testbed_temp);
        }
      }
      for (var k=0; k<testbeds.length; k++) {
        if (testbeds[k].indexOf(topology) != -1) {
          if (options.indexOf(testbeds[k]) == -1) {
            $("#maps").children('tr').eq(i).children('td').eq(1).children('select').eq(0).append("<option>" + testbeds[k] + "</option>"); 
          }
        }
      }
    }
    // console.log('testArea is ' + $("#testArea").val());
  }
  // step-3 action
  if ($("ul[class='steps'] li[class='active']").attr("data-step") == '3') {
    // console.log('topos is ' + JSON.stringify(topos));
    for(var key in project){
      console.log('value for key ' + key + ' is ' + JSON.stringify(project[key]));
    }
  }
}

function onViewCase(obj){
  nameCase = $(obj).text();
  window.open('testpack_case_content?nameCase=' + nameCase, "_blank", "location=no, status=no, menubar=yes, scrollbars=yes, resizable=no, copyhistory=yes, width=1000, height=600, left=200, top=100");
}

// function viewTopology(obj){
//   name_topo = $(obj).text();
//   window.open('viewTopology?edit=' + "no" + '&name_topo=' + name_topo, "_blank", "location=no, status=no, menubar=yes, scrollbars=yes, resizable=no, copyhistory=yes, width=1000, height=600, left=200, top=100");
// }