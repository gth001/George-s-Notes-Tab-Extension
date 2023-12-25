// replace tab key function to be insert tab character
document.getElementById('js-note-container').addEventListener('keydown', function(event) {
    if(event.key === 'Tab'){
        event.preventDefault();
        document.execCommand('insertHTML', false, '&#009');
    }
});

// enable indenting 
document.getElementById('js-note-container').addEventListener('keydown', function(event) {
    if(event.key === 'Enter') {
        event.preventDefault();
        let selection = window.getSelection();
        let range = selection.getRangeAt(0);
        let node = range.startContainer;
        let text = node.textContent;
        let startOffset = range.startOffset;
        let lineStart = text.lastIndexOf('\n', startOffset - 1) + 1;
        let tabs = text.slice(lineStart).match(/^\t*/)[0];
        let lineEnd = text.indexOf('\n', startOffset);
        if (lineEnd === -1) {
            lineEnd = text.length;
        }
        if (tabs) { // line has an indent
            document.execCommand('insertHTML', false, '\n' + tabs);
        } else if (text.slice(lineStart, lineEnd).trim() !== '' && startOffset === text.length) {  // last line, not blank
            document.execCommand('insertHTML', false, '\n\n'); // for some reason we need two newlines to make one
        } else { 
            document.execCommand('insertHTML', false, '\n');  
        }
    }
});

//autosave input 
window.addEventListener("load", function() {
document.querySelector("#js-note-container").innerHTML = localStorage.getItem("notes");
});
document.querySelector("#js-note-container").addEventListener("input", function() {
localStorage.setItem("notes", this.innerHTML);
});

//refresh stale tabs on re-focus
window.addEventListener("focus", function() {
  document.querySelector("#js-note-container").innerHTML = localStorage.getItem("notes");
});

// paste only as plain text.
document.getElementById('js-note-container').addEventListener('paste', function(e) {
  e.preventDefault();
  var text = e.clipboardData.getData('text/plain');
  document.execCommand('insertText', false, text);
});

// cut/copy as plain text
document.addEventListener('copy', function(event) {
  event.preventDefault();
  var selectedText = window.getSelection().toString();
  if (selectedText) {
    event.clipboardData.setData('text/plain', selectedText);
  }
});
document.addEventListener('cut', function(event) {
  event.preventDefault();
  var selectedText = window.getSelection().toString();
  if (selectedText) {
    event.clipboardData.setData('text/plain', selectedText);
    document.execCommand('delete');
  }
});



