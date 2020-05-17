function onViewCase(obj){
  // state = $(obj).parent().parent().children('td:first').find('input:first').is(':checked');
  nameCase = $(obj).text();
  window.open('testpack_case_content?nameCase=' + nameCase, "_blank", "location=no, status=no, menubar=yes, scrollbars=yes, resizable=no, copyhistory=yes, width=1000, height=600, left=200, top=100");
}

function viewTopology(obj){
  name_topo = $(obj).text();
  window.open('viewTopology?edit=' + "no" + '&name_topo=' + name_topo, "_blank", "location=no, status=no, menubar=yes, scrollbars=yes, resizable=no, copyhistory=yes, width=1000, height=600, left=200, top=100");
}