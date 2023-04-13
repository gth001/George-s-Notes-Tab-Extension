//make tab key work
document.getElementById('js-note-container').addEventListener('keydown', function(event) {
  //detect 'tab' key
  if(event.key === 'Tab'){
     //prevent focusing on next element
    event.preventDefault()   
    //add tab
    document.execCommand('insertHTML', false, '&#009');

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