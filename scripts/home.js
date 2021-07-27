// alert("CONNECTED");
// var button = document.querySelector("#button");

var leftSide  = document.querySelector("#left");
var middleSide = document.querySelector("#middle");
var rightSide = document.querySelector("#right");

var table = document.createElement("TABLE");
table.setAttribute("id","table");
for(var i = 0; i < 5; i++){
  addRow();
}

// console.log(superInfo.Levels);
// console.log(JSON.stringify(superInfo.Levels));
// console.log(superInfo.Levels[0]);
// console.log(Object.keys(superInfo.Levels[0])[0]);
var infoLen = superInfo.Levels.length;
for(var i = 0; i < infoLen; i++){
  var tempText = Object.keys(superInfo.Levels[i])[0];
  var opacityIncrement = 1./infoLen;
  makeAddEventText(tempText, (infoLen-i)*opacityIncrement);

}


function addRow(){
  var row = table.insertRow(0);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  cell1.innerHTML = "NAME";
  cell2.innerHTML = "VALUE";
}
rightSide.appendChild(table);


function makeElementInDiv(elementName){
  var div = document.createElement("div");
  var element = document.createElement(elementName);
  div.appendChild(element);
  return divWithElement;
}

function makeAddEventText(text, trans){
  var p = document.createElement("p");
  p.style.opacity = trans;
  var t = document.createTextNode(text);
  p.append(t);
  leftSide.append(p);
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
