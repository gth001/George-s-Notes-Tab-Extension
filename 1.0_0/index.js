//make tab key work
document.getElementById('js-note-container').addEventListener('keydown', function(event) {
  //detect 'tab' key
  if(event.key === 'Tab'){
    //prevent focusing on next element
    event.preventDefault();
    //add tab
    document.execCommand('insertHTML', false, '&#009');
  }

});

// On ENTER, matches tab indent of previous line
document.getElementById('js-note-container').addEventListener('keydown', function(event) {
  if(event.key === 'Enter') {
    event.preventDefault();
    let cursorPosition = window.getSelection().getRangeAt(0).startOffset;
    let textBeforeCursor = this.innerText.substring(0, cursorPosition);
    let lastNewLineIndex = textBeforeCursor.lastIndexOf('\n');
    let previousLineText = textBeforeCursor.substring(lastNewLineIndex+1);
    let tabCount = previousLineText.match(/^\t*/)[0].length;

    if(previousLineText.length > 0 && tabCount === 0) {
      document.execCommand('insertHTML', false, '\n');
      document.execCommand('insertHTML', false, '\n');
    } else if(previousLineText.length === 0 || tabCount > 0) {
      document.execCommand('insertHTML', false, '\n');
    }

    for(let i = 0; i < tabCount; i++) {
      document.execCommand('insertHTML', false, '&#009');
    }
  }
});

//save input across sessions
window.addEventListener("load", function() {
document.querySelector("#js-note-container").innerHTML = localStorage.getItem("notes");
});
document.querySelector("#js-note-container").addEventListener("input", function() {
localStorage.setItem("notes", this.innerHTML);
});

//strip pastes to plain text
document.querySelector("#js-note-container").addEventListener("paste", function(e) {
    e.preventDefault();
    var text = "";
    if (e.clipboardData && e.clipboardData.getData) {
        text = e.clipboardData.getData("text/plain");
    } else if (window.clipboardData && window.clipboardData.getData) {
        text = window.clipboardData.getData("Text");
    }
    document.execCommand("insertHTML", false, text);
});