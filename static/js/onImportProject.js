function selectFile(obj){
  $("#hiddenFile").click();
}

function changeValue(obj){
  str1 = document.getElementById("hiddenFile").value;
  pos1 = str1.lastIndexOf("\\");
  $("#fileSelected").text(str1.substring((pos1+1)));
}

function validateForm()
{
    if ($("#fileSelected").text() == 'No Json file chosen') {
      alert('Please choose one project Json file firstly !');
      return false;
    }
    return true;
}