// alert("CONNECTED");
// var button = document.querySelector("#button");

setTimeout(turnOnPopup, 2000);

// setInterval(checkResources,100);

var leftSide  = document.querySelector("#left");
var middleSide = document.querySelector("#middle");
var rightSide = document.querySelector("#right");
var popup = document.querySelector("#popup");

var startFire = document.querySelector("#startFire");
var stokeFire = document.querySelector("#stokeFire");

var woodPile = document.querySelector("#wood");

startFire.addEventListener('click', startFireFunc);
stokeFire.addEventListener('click', stokeFireFunc);

var onFire = false;

var resourceDict = {
  "wood" : 20,
  "charcoal" : 5,
  "stone" : 5
};

function updateResources(){

  var index = 0;
  for(var key in resourceDict){
    // console.log(key);
    table.rows[index].cells[1].innerHTML = resourceDict[key];
    // var value = resourceDict[temp];
    index++;
  }
}

var fire;

function startFireFunc(){
  // alert("FIRE STARTED");
  if(onFire == false && resourceDict.wood > 0){
    resourceDict.wood--;
    updateResources();
    onFire = true;
    fire = setTimeout(smother, 5000);
    // console.log("FIRE STARTED");
      makeAddEventText("FIRE STARTED");
  }
}

function smother(){
  // console.log("FIRE WENT OUT");
    makeAddEventText("FIRE WENT OUT");
  resourceDict.charcoal++;
  updateResources();
  onFire = false;
}

function stokeFireFunc(){
  // alert("FIRE STOKED");
  if(onFire == true && resourceDict.wood > 0){
    resourceDict.wood--;

    updateResources();
    clearTimeout(fire);
    fire = setTimeout(smother, 5000);
    // console.log("STOKED");
    makeAddEventText("STOKED");
  }
}



var table = document.createElement("TABLE");
table.setAttribute("class","border");
var res = Object.keys(resourceDict);
// console.log(res[0]);
// console.log(resourceDict["wood"]);
for(var i = 0; i < res.length; i++){
  // console.log(res[i], resourceDict.res[i]);
  addRow(res[i], resourceDict[res[i]]);
}

function turnOnPopup(){
  popup.classList.add('poppedUp');
}

// console.log(resourceDict);
// console.log(resourceDict.length);
// console.log(Object.keys(resourceDict).length);
// console.log(JSON.stringify(superInfo.Levels));
// console.log(superInfo.Levels[0]);
// console.log(Object.keys(superInfo.Levels[0])[0]);

// var infoLen = superInfo.Levels.length;
// for(var i = 0; i < infoLen; i++){
//   var tempText = Object.keys(superInfo.Levels[i])[0];
//   var opacityIncrement = 1./infoLen;
//   makeAddEventText(tempText, (infoLen-i)*opacityIncrement);
//
// }


function addRow(name, val){
  // console.log(table.rows.length);
  var row = table.insertRow(-1);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  cell1.innerHTML = name;
  cell2.innerHTML = val;
}
rightSide.appendChild(table);


function makeElementInDiv(elementName){
  var div = document.createElement("div");
  var element = document.createElement(elementName);
  div.appendChild(element);
  return divWithElement;
}

var totalHistoryItems = 10;

function makeAddEventText(text){
  var p = document.createElement("p");
  // p.style.opacity = (totalHistoryItems-numEvents)*(1./totalHistoryItems);
  var t = document.createTextNode(text);
  p.append(t);
  leftSide.prepend(p);
  var numEvents = leftSide.children.length;
  for(var i = 0; i < numEvents; i++){
    leftSide.childNodes[i].style.opacity = (totalHistoryItems-i)*(1./totalHistoryItems);
  }
  if(numEvents > totalHistoryItems){
    leftSide.removeChild(leftSide.lastChild);
    console.log("DELETED LAST");
  }
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
