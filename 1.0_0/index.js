// enable tab key and indenting
document.getElementById('js-note-container').addEventListener('keydown', function(event) {
  if(event.key === 'Tab'){
    event.preventDefault();
    document.execCommand('insertHTML', false, '&#009');
  } else if (event.key === 'Enter') {
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
    if (tabs || text.slice(lineStart, lineEnd).trim() === '') {
      document.execCommand('insertHTML', false, '\n' + tabs);
    } else {
      document.execCommand('insertHTML', false, '\n\n');
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

//strip pastes to plain text
document.querySelector("#js-note-container").addEventListener("paste", function(e) {
    e.preventDefault();
    var text = "";
    text = e.clipboardData.getData("text/plain");
    text = text.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>');
    document.execCommand("insertHTML", false, text);
});

//move line up or down
document.querySelector("#js-note-container").addEventListener("keydown", function(e) {
  if (e.metaKey && e.key === 'ArrowUp') {
    e.preventDefault();
    let selection = window.getSelection();
    let range = selection.getRangeAt(0);
    let node = range.startContainer;
    let text = node.textContent;
    let startOffset = range.startOffset;
    let lineStart = text.lastIndexOf('\n', startOffset - 1) + 1;
    let lineEnd = text.indexOf('\n', startOffset);
    if (lineEnd === -1) {
      lineEnd = text.length;
    }
    let line = text.slice(lineStart, lineEnd);
    let lineUpStart = text.lastIndexOf('\n', lineStart - 2) + 1;
    let lineUpEnd = text.lastIndexOf('\n', lineStart - 1);
    if (lineUpEnd === -1) {
      lineUpEnd = 0;
    }
    let lineUp = text.slice(lineUpStart, lineUpEnd);
    let newText = text.slice(0, lineUpStart) + line + '\n' + lineUp + text.slice(lineEnd);
    node.textContent = newText;
    selection.collapse(node, lineStart);
  } else if (e.metaKey && e.key === 'ArrowDown') {
    e.preventDefault();
    let selection = window.getSelection();
    let range = selection.getRangeAt(0);
    let node = range.startContainer;
    let text = node.textContent;
    let startOffset = range.startOffset;
    let lineStart = text.lastIndexOf('\n', startOffset - 1) + 1;
    let lineEnd = text.indexOf('\n', startOffset);
    if (lineEnd === -1) {
      lineEnd = text.length;
    }
    let line = text.slice(lineStart, lineEnd);
    let lineDownEnd = text.indexOf('\n', lineEnd + 1);
    if (lineDownEnd === -1) {
      lineDownEnd = text.length;
    }
    let lineDown = text.slice(lineEnd + 1, lineDownEnd);
    let newText = text.slice(0, lineStart) + lineDown + '\n' + line + text.slice(lineDownEnd);
    node.textContent = newText;
    selection.collapse(node, lineStart + lineDown.length + 1);
  }
});