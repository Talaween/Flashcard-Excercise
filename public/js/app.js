function fetchSymbol() {
  var word = document.getElementById("txtWord").value;
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var data = JSON.parse(this.responseText);
      displayFlashcards(data);
    }
  };
  xhttp.open("POST", "https://point.widgit.com/point.php?word=" + word + "&format=json", true);
  xhttp.withCredentials = true;
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("account=WidgitRecruitment1&size=256");
}

function displayFlashcards(data){

  reset();

  var totalRows = Math.ceil(data.cmaps.length / 4);
  var counter = 0;
  var app = document.getElementById("app");
  var row = document.getElementById("row");
  var col = document.getElementById("column");
  //add rows
  for(i = 0; i < totalRows; i++){
    //clone row div
    var temp_row = row.cloneNode(true);
    temp_row.classList.remove("hide");

    var currentCols;

    if(totalRows > 1 && i < totalRows - 1)
      currentCols = 4;
    else
      currentCols = data.cmaps.length;

    //add columns
    for(j=0; j < currentCols; j++){
      var temp_col = col.cloneNode(true);
      temp_col.classList.remove("hide");

      var sym = temp_col.children[0].children[0];
      sym.setAttribute("src", data.cmaps[counter][0].src);
      sym.setAttribute("alt", data.text);

      var word = temp_col.children[0].children[1].children[0];
      word.innerHTML = data.text;

      var flashcard = temp_col.children[0];
      flashcard.setAttribute("id", "flashcard" + counter);

      temp_row.appendChild(temp_col);
      counter++;
    }

    app.appendChild(temp_row);

  }
}

//only display only the card that was clicked
//hide all others
function onFlashcardClick(){

  id = event.currentTarget.id;
  allRows = document.getElementById("app").children;
  var i;
  for(i=0; i < allRows.length; i++){
    var j;
    for(j=0; j < allRows[i].children.length; j++){
      if(allRows[i].children[j].children[0].id !== id){
        allRows[i].children[j].classList.add("hide");
      }
        
    }
  }

}

function reset(){
  var app = document.getElementById("app");
  while (app.firstChild) {
    app.removeChild(app.firstChild);
  }
}
