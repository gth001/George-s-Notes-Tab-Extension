// enable tab key &
// on ENTER, matches tab indent of previous line
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
    document.execCommand('insertHTML', false, '\n' + (tabs || '\n'));
  }
});

//save input across sessions
window.addEventListener("load", function() {
document.querySelector("#js-note-container").innerHTML = localStorage.getItem("notes");
});
document.querySelector("#js-note-container").addEventListener("input", function() {
localStorage.setItem("notes", this.innerHTML);
});

//reload changes when tab gets focus
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