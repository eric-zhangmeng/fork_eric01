// window.alert($("#div1").html());
// var i = 2;
// window.alert('"' + '#div1 a:nth-child(' + i + ')"');
// $("#p1").clone().appendTo($("#p1"));
// $("#projectName").val('p2');
// $("#td1").text('td2')
// $('#div1 a:nth-child(2)').text('td2');
// $('#div1 a:nth-child(' + i + ')').text('td2');
// $("a:eq(" + $i + ")").text('td2');
// $("a:first-child").text('td2')
// $("#tr1 td:first-child").text('td2')
// window.alert($("#td1").text());
// obj1 = $("#a1").after("<p> hello </p>");
// obj1 = $("<p> hello </p>").insertAfter("#a1");
// $("div").slice(-1, ).children('p').slice(0, 1).empty();
// $("#div12").children('div').slice(0, 1).empty();
// window.alert($("#div12").children('div').length);
// $("#div12").children('p').html('ppp' + String(1))
// window.alert($("#div12").children('div').html());
// window.alert($("#p1").parent().parent().children('div').html());
// window.alert($("#p1").parent().html());
// window.alert($("#p1").parent().parent().html());
// $("#p1").parent().parent().append($("#p1").parent().parent());
// window.alert($("#a1").parent().attr("id"));
// window.alert($("#td002").attr("id"));
// if ($("#p1").html().search('pp') != -1){
//     window.alert('hello');
// }
// window.alert('hello');
// var x=document.getElementById("tr001"); 
// window.alert($("#p1").html().search('p'));
// window.alert(x);
// window.alert($("select[name='testArea']option[value='SDN']").val());
// window.alert($("ul li[class='active']").attr("data-step"));
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
  value = getQueryVariable('area')
  // window.alert(value);
  $("#projectName").val(value);
  // window.alert('onload');
  // window.alert($("select[name='testArea']").val());
}
function newPage(obj)
{
  // window.open("http://www.runoob.com", "_blank");
  window.open('test2.html?area=' + "SDN" + '', "_blank", "location=no, status=no, menubar=yes, scrollbars=yes, resizable=no, copyhistory=yes, width=1000, height=600, left=200, top=100");
  // window.open("test2.html", "_blank", "location=no, status=no, menubar=yes, scrollbars=yes, resizable=no, copyhistory=yes, width=1000, height=600, left=200, top=100");
    // window.alert('change area');
    return false;
}
function changeAreaOfStartProject(obj)
{
    window.alert($("#testArea").val());
    // window.alert('change area');
    return false;
}
function editTestbed(obj)
{
    // var label = document.getElementById("label01");
    // label.innerHTML = 'hello'
    // window.alert("On click addTestbed");
    // window.open('topo_2stc_2dut_type01.html', "newwindow", "height=300, width=600, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no, left=200, top=200");
    return false;
}