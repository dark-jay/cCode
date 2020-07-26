function readSingleFile(e) {
    var file = e.target.files[0];
    if (!file) {
      return;
    }
    var reader = new FileReader();
    reader.onload = function(e) {
      //alert(event.target.result.replace(/\r/g, "\n"));
      var contents = e.target.result;
      //displayContents(contents);
      codeEditor.setValue(contents, 1);
      codeEditor.focus();
      codeEditor.navigateFileEnd();
    };
    reader.readAsText(file);
}

document.getElementById('file-input')
    .addEventListener('change', readSingleFile, false);

$('#btn-open-click').click(function() {
    //alert("hello");
    $('#file-input').click();
});