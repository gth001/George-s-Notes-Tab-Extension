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
        if (tabs) {
            document.execCommand('insertHTML', false, '\n' + tabs);
        } else if (text.slice(lineStart, lineEnd).trim() === '' && startOffset === text.length) {  //runs when line blank and its the end
            document.execCommand('insertHTML', false, '\n\n\n\n');
        } else {  //runs when line blank and the end
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

//strip pastes to plain text
document.querySelector("#js-note-container").addEventListener("paste", function(e) {
    e.preventDefault();
    var text = "";
    text = e.clipboardData.getData("text/plain");
    text = text.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>');
    document.execCommand("insertHTML", false, text);
});
