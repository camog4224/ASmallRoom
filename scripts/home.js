// alert("CONNECTED");
// var button = document.querySelector("#button");

var button = document.createElement("button");
button.innerHTML = "BUTTON";
var div = document.createElement("div");
div.appendChild(button);
document.body.appendChild(div);

var table = document.createElement("TABLE");
for(i = 0; i < 5; i++){
  addRow();
}
document.body.appendChild(table);
function addRow(){
  var row = table.insertRow(0);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  cell1.innerHTML = "NAME";
  cell2.innerHTML = "VALUE";
}






// button.addEventListener('click', doThing);
// canvas = document.querySelector('#canvas');
//
// function doThing(){
//
//
// }
//
// var ctx = canvas.getContext('2d');
//
// function go(){
//
//   animID = requestAnimationFrame(animate);
// }
//
// function animate(){
//   ctx.clearRect(0,0, canvas.width, canvas.height);
//
//   requestAnimationFrame(animate);
// }
//
// class Box{
//
//   constructor(){
//     this.c = Math.random() * 255;
//     this.size = Math.random() * 10;
//   }
//
//   display(){
//     // ctx.beginPath();
//     // ctx.arc();
//     // ctx.stroke();
//   }
//
// }
