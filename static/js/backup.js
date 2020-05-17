// console.log('project is ' + JSON.stringify(project));
// $(document).ready(function() {
//   $("button").click(function(){
//     $.get("test2",function(data,status){
//       alert('data is, ' + data);
//     });
//   });
// })
// window.onload = function(){
  // window.alert($("#div1").html());
  // window.alert('hello');
// }
// function saveTestbed(obj){
//   $("#p01").text('p02');
//   window.open('test2', "_blank", 'status,scrollbars,resizable,left=10,top=0,width=900,height=700');
// }

// function opeParent(obj){
//   $("#p01", window.opener.document).text('p123');
//   $("#sub01").text('sub01');
// }
// function addTestbed(obj){
//   $.get("test2",function(data,status){
//     alert('the data is, ' + data);
//   });
// }
// $("a").click(function(event){
//   if ($(this).parents('#wizard').length == 0) {
//     var txt;
//     if (confirm("Current project isn't fiished, press 'Y' to abandon current project and left!")) {
//     } 
//     else {
//       event.preventDefault();
//     }
//   }
//  }); 
// obj1.attr("class", $(obj).parent().children('a').html());
// $("ul[class='steps'] li[data-step='1']").attr("class", "active");
// $("ul[class='steps'] li[data-step='2']").removeAttr("class");


window.onload = function(){
  edit = getQueryVariable('edit');
  // value_testbed = getQueryVariable('value_testbed');
  topology = getQueryVariable('name_topo');
  test = getQueryVariable('name_topo');
  $('#temp_p').text(value_testbed);
  // $('#temp_p').text('testbed');
  if (edit == 'no') {
    $("select").attr("disabled", "true");
    $("#saveTestbed").css('display','none');
    $("input").attr("readonly", "readonly");
  }
  alert('before');
  // alert('value_testbed is ' + $('#select01').val());
  alert('after');
  if (value_testbed != 'testbed') {
    // alert('value_testbed is not default');
    // console.log('value_testbed is default');
  }
  else {
    // alert('value_testbed is default');
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