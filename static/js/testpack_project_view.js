function onViewCase(obj){
  nameCase = $(obj).text();
  window.open('testpack_case_content?nameCase=' + nameCase, "_blank", "location=no, status=no, menubar=yes, scrollbars=yes, resizable=no, copyhistory=yes, width=1000, height=600, left=200, top=100");
}

function onViewTestbed(obj){
  nameProject = $("#nameProject").text();
  // alert('nameProject is, ' + nameProject);
  name_testbed = $(obj).text();
  window.open('viewTestbed?nameProject=' + nameProject + '&name_testbed=' + name_testbed, "_blank", "location=no, status=no, menubar=yes, scrollbars=yes, resizable=no, copyhistory=yes, width=1000, height=600, left=200, top=100");
}
