// window.alert("The username has been used yet, please try another one or just login");
// window.alert($(obj).parent().parent().html());
function addTestbed(obj)
{
    // $(obj).parent().parent().parent().append("<tr>" + $(obj).parent().parent().html() + "</tr>");
    // obj1 = $(obj).parent().parent().after("<tr>" + $(obj).parent().parent().html() + "</tr>");
    obj1 = $("<tr>" + $(obj).parent().parent().html() + "</tr>").insertAfter($(obj).parent().parent());
    // window.alert(obj1.html());
    obj1.children('td').slice(0, 1).empty();
    // $(obj).parent().parent().parent().children('tr').slice(-1, ).children('td').slice(0, 1).empty();
    obj1.children('td').slice(1, 2).html($(obj).parent().children('a').html() + '_testbed0' + String($(obj).parent().parent().parent().children('tr').length));
}
function deleteTestbed(obj)
{
  if ($(obj).parent().parent().children('td').slice(1, 2).html().search('testbed01') == -1){
    // window.alert($(obj).parent().parent().html());
    $(obj).parent().parent().remove();
  }
}