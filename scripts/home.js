// alert("CONNECTED");
// var button = document.querySelector("#button");





/*
maybe have some events trigger other events, like if you decline a "strong" npc they might ask again but more aggresivly
*/

// setInterval(checkResources,100);

var leftSide  = document.querySelector("#left");
var middleSide = document.querySelector("#middle");
var rightSide = document.querySelector("#right");

var popup = document.querySelector("#popup");
var prompt = document.querySelector("#prompt");
var cover = document.querySelector("#cover");
var accept = document.querySelector("#accept");
var decline = document.querySelector("#decline");
var startFire = document.querySelector("#startFire");
var stokeFire = document.querySelector("#stokeFire");

var chopWood = document.querySelector("#chopWood")

var fireDisplay = document.querySelector("#fireDisplay");

var eventsToggle = document.querySelector("#eventsToggle");
var eventsToggleDiv = document.querySelector("#eventsToggleDiv");
eventsToggleDiv.addEventListener("animationend", function(){

  eventsToggleDiv.classList.remove("runEventMissed");
});

accept.addEventListener('click', function(){
  promptResolution(accept);
});
decline.addEventListener('click', function(){
  promptResolution(decline);
});
startFire.addEventListener('click', startFireFunc);
stokeFire.addEventListener('click', stokeFireFunc);
chopWood.addEventListener('click', chopWoodFunc);
// fireDisplay.addEventListener("animationend", flameAnimation());

var numEventsQueded = 0;

var numCharcoalStacked = 0;

var onFire = false;

var resourceDict = {
  "wood" : 20,
  "charcoal" : 0
};

setTimeout(function(){
  resourceDict["meat"] = 5;
  addRow("meat", 5);
  updateResources();
}, 1000);

var tabNames = ["aSmallHut", "theWoods", "theRiver", "theClearing"];
var tabChunks = {
  "aSmallHut" : {"arrived" : true},
  "theWoods" : {"arrived" : false},
  "theRiver" : {"arrived" : false},
  "theClearing" : {"arrived" : false}
};

var woodIncreaseIncrement = 5;

function chopWoodFunc(){
  if(buttonClickable(chopWood) == true){

    resourceDict.wood+= woodIncreaseIncrement;
    updateResources();

    makeAddEventText("Wood Collected", "#964B00");
    cooldownButton(chopWood, 10);

  }
}

function updateResources(){

  var index = 0;
  for(var key in resourceDict){

    table.rows[index].cells[1].innerHTML = resourceDict[key];
    // var value = resourceDict[temp];
    index++;
  }
}

function openTab(evt, placeName) {
  var i, tabContent, tabLinks;
  tabContent = document.getElementsByClassName("tabContent");
  for (i = 0; i < tabContent.length; i++) {
    // tabContent[i].style.display = "none";
    tabContent[i].style.visibility = "hidden";

  }
  tabLinks = document.getElementsByClassName("tabLinks");
  for (i = 0; i < tabLinks.length; i++) {
    tabLinks[i].className = tabLinks[i].className.replace(" active", "");

  }
  document.getElementById(placeName).style.visibility = "visible";
  evt.currentTarget.className += " active";

}

document.getElementById("defaultOpen").click();

var fire;
var fireEvent;
var timeForNextFireEvent = 12000;
var fireEventTimeIncrement = 50;
function startFireFunc(){

  if(onFire == false && resourceDict.wood > 0 && buttonClickable(startFire) == true){
    var numWoodStart = 5;
    resourceDict.wood-= numWoodStart;
    updateResources();
    onFire = true;
    fire = setTimeout(smother, 5000);
    fireEvent = setInterval(addFireEvent, timeForNextFireEvent);

    makeAddEventText("FIRE STARTED", "#ff0000");

    cooldownButton(startFire, 30);
    flareFlame(5);
    numCharcoalStacked = numWoodStart;
    timeForNextFireEvent += fireEventTimeIncrement;
    if(tabChunks.theWoods.arrived == false){
      tabChunks.theWoods.arrived = true;
      discoverNewTab(1);
    }
  }
}

function discoverNewTab(tabIndex){
  var newTab = document.getElementsByClassName("tabLinks")[tabIndex];
  // var newTab = document.getElementById(tabNames[tabNameIndex]);
  newTab.style.setProperty("visibility", "visible");
}

function cooldownButton(button, cooldownTime){
  var cooldownDiv = document.createElement("DIV");
  cooldownDiv.classList.add("cooldown");
  cooldownDiv.style.setProperty("--timeToCooldown", cooldownTime + "s");
  cooldownDiv.addEventListener("animationend", function(){

    cooldownDiv.remove();
    button.classList.remove("disabled");
  });
  button.appendChild(cooldownDiv);
  button.classList.add("disabled");

}

function flareFlame(timeToFlare){
  fireDisplay.style.setProperty("--timeLeft", timeToFlare + "s");
  flameAnimation();
}

function flameAnimation(){

  fireDisplay.classList.remove("runFireAnimation");
  void fireDisplay.offsetWidth;
  fireDisplay.classList.add("runFireAnimation");
}

function smother(){

  makeAddEventText("FIRE WENT OUT", "#aaaaaa");
  resourceDict.charcoal+= numCharcoalStacked;
  updateResources();
  onFire = false;
  clearTimeout(fireEvent);
}

function buttonClickable(button){
  return !button.classList.contains("disabled");
}

function stokeFireFunc(){
  // alert("FIRE STOKED");
  if(onFire == true && resourceDict.wood > 0 && buttonClickable(stokeFire) == true){
    resourceDict.wood--;

    updateResources();
    clearTimeout(fire);
    fire = setTimeout(smother, 5000);

    makeAddEventText("STOKED", "#aa0000");
    // stokeFire.classList.add("cooldown");
    cooldownButton(stokeFire, 1);
    flareFlame(5);
    numCharcoalStacked++;
  }
}

function addFireEvent(){
  if(onFire == true){
    numEventsQueded++;
    moveToNextEvent();

  }
}

var table = document.createElement("TABLE");
table.setAttribute("class","border");
var res = Object.keys(resourceDict);

for(var i = 0; i < res.length; i++){

  addRow(res[i], resourceDict[res[i]]);
}

function turnOnPopup(){
  if(eventsToggle.checked == false){
    popup.classList.add('poppedUp');
    cover.classList.add('poppedUp');
  }else{
    eventsToggleDiv.classList.add('runEventMissed');
    promptResolution(decline);
  }

}

function turnOffPopup(){

  popup.classList.remove('poppedUp');
  cover.classList.remove('poppedUp');
  moveToNextEvent();
}
//probably just redundant
function moveToNextEvent(){
  if(numEventsQueded >= 1){
    numEventsQueded--;

    fillPopupWithEventInfo();
  }
}

function fillPopupWithEventInfo(){

    var numLevels = randomEvents.Single.length;
    // var choseLevel = Math.floor(Math.random()*numLevels);
    var choseLevel = 0;
    var levelName = Object.keys(randomEvents.Single[choseLevel])[0];
    var numDifPeople = randomEvents.Single[choseLevel][levelName].length;
    var chosenPerson = Math.floor(Math.random()*numDifPeople);
    var personData = randomEvents.Single[choseLevel][levelName][chosenPerson];

    prompt.innerHTML = personData.Prompt;
    accept.innerHTML = personData.Accept;
    decline.innerHTML = personData.Decline;
    accept.setAttribute("data-response", personData.EnterMessage);
    accept.setAttribute("data-role", personData.Role);
    decline.setAttribute("data-response", personData.LeaveMessage);
    console.log(personData);
    turnOnPopup();

}

function promptResolution(buttonChosen){
  turnOffPopup();
  var info = buttonChosen.getAttribute("data-response");
  var roleInfo = buttonChosen.getAttribute("data-role");
  if(roleInfo != null){
    checkCustomConditions(roleInfo);
  }
  makeAddEventText(info, "#009900");
}

function checkCustomConditions(role){
  console.log(role);
  var roleCategory = compare(role);
  if(roleCategory != null){
    console.log(roleCategory);
    switch(roleCategory){
      case "Forager":
        console.log("FORAGER");
        break;
      case "Craftsman":
        console.log("CRAFTSMAN");
        break;
    }
  }

}
//used to compare a test role and see if its in the whole set
//probably won't use this but mights use a bit for some other thing, like
function compare(testRole){
  // var testRole = "Scavenger";
  for(var key in superInfo){

    for(var j = 0; j < superInfo[key].length; j++){
      var currentRole = Object.keys(superInfo[key][j])[0];
      if(currentRole === testRole){
        // console.log(key, j, currentRole);
        return key;

      }
    }

  }
  return null;
}

function addRow(name, val){
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

function makeAddEventText(text, eventColor){
  var p = document.createElement("p");
  // p.style.background = eventColor;
  // p.style.opacity = (totalHistoryItems-numEvents)*(1./totalHistoryItems);
  // var t = document.createTextNode(text);
  p.append(document.createTextNode(text));
  leftSide.prepend(p);
  var numEvents = leftSide.children.length;
  for(var i = 0; i < numEvents; i++){
    leftSide.childNodes[i].style.opacity = (totalHistoryItems-i)*(1./totalHistoryItems);
  }
  if(numEvents > totalHistoryItems){
    leftSide.removeChild(leftSide.lastChild);

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
