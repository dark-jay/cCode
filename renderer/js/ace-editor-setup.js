setupCodeEditor();
setupInputEditor();
setupOutputEditor();

function setupCodeEditor() {
    codeEditor.setTheme("ace/theme/twilight");
    codeEditor.session.setMode("ace/mode/c_cpp");
    codeEditor.setShowPrintMargin(false);
    document.getElementById('code-editor').style.fontSize='14px';
}

function setupInputEditor() {
    inputEditor.setTheme("ace/theme/twilight");
    inputEditor.session.setMode("ace/mode/text");
    inputEditor.setShowPrintMargin(false);
    document.getElementById('input-editor').style.fontSize='14px';
    inputEditor.renderer.setShowGutter(false);
}

function setupOutputEditor() {
    outputEditor.setTheme("ace/theme/twilight");
    outputEditor.session.setMode("ace/mode/text");
    outputEditor.setShowPrintMargin(false);
    document.getElementById('output-editor').style.fontSize='14px';
    outputEditor.renderer.setShowGutter(false);
    outputEditor.setReadOnly(false);
}


// find code
/*
editor.find('needle',{
    backwards: false,
    wrap: false,
    caseSensitive: false,
    wholeWord: false,
    regExp: false
});
editor.findNext();
editor.findPrevious();
*/