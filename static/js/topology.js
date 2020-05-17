var topology = '';
var savedTestbed = {};
var id_temp = '';

function getQueryVariable(variable)
{
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
   var pair = vars[i].split("=");
   if(pair[0] == variable){return pair[1];}
  }
  return(false);
}

window.onload = function(){
  edit = getQueryVariable('edit');
  edit_testbed = $("#edit_testbed").text();
  topology = getQueryVariable('name_topo');
  if (edit == 'no' || edit_testbed == 'no') {
    $("select").attr("disabled", "true");
    $("#saveTestbed").css('display','none');
    $("input").attr("readonly", "readonly");
  }
  $("select").each(function(){
    value_select = $(this).attr("value");
    $(this).children('option').each(function(){
      if ($(this).text()==value_select) {
        $(this).attr('selected','selected');
      }
    });
  });
}

function setObjValue(ot){
  for(var key in ot){
    if (id_temp == '') {
      id_temp = key;
    }
    else{
      id_temp = id_temp + '.' + key;
    }
    if (typeof(ot[key]) == 'object') {
      setObjValue(ot[key]);
    }
    else {
      keys = id_temp.split('.');
      if (keys.length == 1) {
        savedTestbed[keys[0]] = $("[id='" + id_temp +"']").val();
      }
      if (keys.length == 2) {
        if (!savedTestbed.hasOwnProperty(keys[0])) {
          savedTestbed[keys[0]] = {};
        }
        savedTestbed[keys[0]][keys[1]] = $("[id='" + id_temp +"']").val();
        // console.log('id_temp is ' + id_temp);
        // console.log('value is ' + $('#' + id_temp).val());
      }
      if (keys.length == 3) {
        if (!savedTestbed.hasOwnProperty(keys[0])) {
          savedTestbed[keys[0]] = {};
        }
        if (!savedTestbed[keys[0]].hasOwnProperty(keys[1])) {
          savedTestbed[keys[0]][keys[1]] = {};
        }
        savedTestbed[keys[0]][keys[1]][keys[2]] = $("[id='" + id_temp +"']").val();
      }
      if (keys.length == 4) {
        if (!savedTestbed.hasOwnProperty(keys[0])) {
          savedTestbed[keys[0]] = {};
        }
        if (!savedTestbed[keys[0]].hasOwnProperty(keys[1])) {
          savedTestbed[keys[0]][keys[1]] = {};
        }
        if (!savedTestbed[keys[0]][keys[1]].hasOwnProperty(keys[2])) {
          savedTestbed[keys[0]][keys[1]][keys[2]] = {};
        }
        savedTestbed[keys[0]][keys[1]][keys[2]][keys[3]] = $("[id='" + id_temp +"']").val();
      }
      if (keys.length == 5) {
        if (!savedTestbed.hasOwnProperty(keys[0])) {
          savedTestbed[keys[0]] = {};
        }
        if (!savedTestbed[keys[0]].hasOwnProperty(keys[1])) {
          savedTestbed[keys[0]][keys[1]] = {};
        }
        if (!savedTestbed[keys[0]][keys[1]].hasOwnProperty(keys[2])) {
          savedTestbed[keys[0]][keys[1]][keys[2]] = {};
        }
        if (!savedTestbed[keys[0]][keys[1]][keys[2]].hasOwnProperty(keys[3])) {
          savedTestbed[keys[0]][keys[1]][keys[2]][keys[3]] = {};
        }
        savedTestbed[keys[0]][keys[1]][keys[2]][keys[3]][keys[4]] = $("[id='" + id_temp +"']").val();
      }
      id_temp = id_temp.substr(0, id_temp.lastIndexOf('.'));
    }
  }
  id_temp = id_temp.substr(0, id_temp.lastIndexOf('.'));
}

function saveTestbed(obj){
  var testbed = {};
  topology_value = $('#topology_value').text();
  testbed_name = $('#testbed_name').text();
  topology_data = JSON.parse(topology_value);
  setObjValue(topology_data);
  $("#" + testbed_name, window.opener.document).text(JSON.stringify(savedTestbed));
  alert('save testbed successfully!');
}