window.onload = function(){
  interval = setInterval(function(){
    window.location.reload();
  }, 3000);
}

function viewConsole(obj){
  nameProject = $(obj).parent().parent().parent().children('td').eq(0).children('a').eq(0).text();
  // console.log('nameProject is ' + nameProject);
  window.open('viewConsole?nameProject=' + nameProject, "_blank", "location=no, status=no, menubar=yes, scrollbars=yes, resizable=no, copyhistory=yes, width=1000, height=600, left=200, top=100");
}