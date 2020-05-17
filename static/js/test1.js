var a = 'a01';
// var i = 1;
// var interval = null;
function saveTestbed(obj){
  // window.alert('hello');
  // window.alert($("#p01").text());
  // a = 'a02';
  // window.open('test2', "_blank", "location=no, status=no, menubar=yes, scrollbars=yes, resizable=no, copyhistory=yes, width=1000, height=600, left=200, top=100");
  // $("#button1").removeClass(btn-info2);
}

function button2(obj){
  // window.alert('hello');
  $("#button1").removeClass('btn-info2').addClass('btn-yellow');
  $("#button1").attr("disabled",true);
  // window.alert('a is ' + a);
}

function say(){
  // var d = new Date();
  $("#p01").text(new Date());
  i++;
  if (i==5) {
    clearInterval(interval);
  }
}

window.onload = function(){
  var i = 1;
  var interval = null;
  interval = setInterval(function(){
    $("#p01").text(new Date());
    i++;
    if (i==6) {
      clearInterval(interval);
    }
  }, 1000);
}