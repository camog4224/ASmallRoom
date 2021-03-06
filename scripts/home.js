

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
var gatherSticks = document.querySelector("#gatherSticks");
var clearCharcoal = document.querySelector("#clearCharcoal");

var chopWood = document.querySelector("#chopWood")
var huntMeat = document.querySelector("#huntMeat")

var fireDisplay = document.querySelector("#fireDisplay");

var resourceTable = document.querySelector("#resourceTable");
var historyTable = document.querySelector("#historyTable");

var craftingStuff = document.querySelector("#craftingStuff");

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


clearCharcoal.addEventListener('click', clearCharcoalFunc);

// fireDisplay.addEventListener("animationend", flameAnimation());

var numEventsQueded = 0;

var numCharcoalStacked = 0;

var onFire = false;

var resourceDict = {
  "wood" : 20,
  "charcoal" : 0
};

// setTimeout(function(){
//   resourceDict["meat"] = 5;
//   addRow("meat", 5);
//   updateResources();
// }, 1000);

var tabNames = ["aSmallHut", "theWoods", "theRiver", "theClearing"];
var tabChunks = {
  "aSmallHut" :
    {
    "arrived" : true,
    "canCraft" : false,
    "canBuild" : false
    },
  "theWoods" :
    {
      "arrived" : false,
      "canHunt" : false,
      "canFish" : false,
      "canGatherWood" : false
    },
  "theRiver" :
    {
      "arrived" : false
    },
  "theClearing" : {"arrived" : false}
};

var woodIncreaseIncrement = 10;

function chopWoodFunc(){
  if(buttonClickable(chopWood) == true){

    resourceDict.wood+= woodIncreaseIncrement;
    trailOff(chopWood, "+10 wood");
    updateResources();

    makeAddEventText("Wood Collected", "150, 75, 0");
    cooldownButton(chopWood, 10);

  }
}
var meatIncreaseIncrement = 10;

function huntMeatFunc(){
  if(buttonClickable(huntMeat) == true){
    resourceDict.meat+= meatIncreaseIncrement;
    trailOff(huntMeat, "+30 meat");
    updateResources();

    makeAddEventText("Meat Collected", "255, 47, 122");
    cooldownButton(huntMeat, 30);
  }
}

function updateResources(){

  var index = 0;
  for(var key in resourceDict){

    resourceTable.rows[index].cells[1].innerHTML = resourceDict[key];
    // var value = resourceDict[temp];
    index++;
  }
}

var radios = document.getElementsByName("toggleState");

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

function clearCharcoalFunc(){

  resourceDict.charcoal += numCharcoalStacked;
  trailOff(fireDisplay, "+" + numCharcoalStacked + " charcoal");
  updateResources();
  numCharcoalStacked = 0;
  updateCharcoalPile();
  // makeAddEventText("CHARCOAL CLEARED", "30, 30, 30");
}

var fire;
var fireEvent;
var timeForNextFireEvent = 5000;
var fireEventTimeIncrement = 1000;
var fireBurnTime = 5000;
var numWoodStart = 5;
var charcoalSize = 0;

var fireStartTime = 0;
function startFireFunc(){

  if(onFire == false && resourceDict.wood > 0 && buttonClickable(startFire) == true){
    resourceDict.wood-= numWoodStart;
    trailOff(startFire, "-" + numWoodStart + " wood");
    updateResources();
    onFire = true;
    fire = setTimeout(smother, fireBurnTime);
    fireEvent = setInterval(addFireEvent, timeForNextFireEvent);
    fireStartTime = Date.now();
    // console.log(fireStartTime);
    // makeAddEventText("FIRE STARTED", "255, 0, 0");

    cooldownButton(startFire, 10);
    flareFlame(fireBurnTime/1000, 0);
    numCharcoalStacked = numWoodStart;
    updateCharcoalPile();
    timeForNextFireEvent += fireEventTimeIncrement;
    if(tabChunks.theWoods.arrived == false){
      tabChunks.theWoods.arrived = true;
      discoverNewTab(1);
    }
  }
}

function updateCharcoalPile(){
  charcoalSize = (numCharcoalStacked/maxCharcoalPile) * 3;
  clearCharcoal.style.transform = "scale(" + charcoalSize + ")";

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

function trailOff(parentElement, text){
  var trailOffDiv = document.createElement("DIV");
  trailOffDiv.innerHTML = text;
  trailOffDiv.classList.add("blurb");
  trailOffDiv.addEventListener("animationend", function(){

    trailOffDiv.remove();

  });
  parentElement.appendChild(trailOffDiv);


}

function flareFlame(timeToFlare, timeShift){
  fireDisplay.style.setProperty("--timeShift", timeShift + "s");
  fireDisplay.style.setProperty("--timeLeft", timeToFlare + "s");
  // fireDisplay.style["--timeShift", timeShift + "s"];
  flameAnimation();
}

function flameAnimation(){

  fireDisplay.classList.remove("runFireAnimation");
  void fireDisplay.offsetWidth;
  fireDisplay.classList.add("runFireAnimation");
}

function smother(){
  makeAddEventText("FIRE WENT OUT", "170, 170, 170");
  onFire = false;
  clearTimeout(fireEvent);
}

function buttonClickable(button){
  return !button.classList.contains("disabled");
}

var maxCharcoalPile = 20;

var fireTimeLeft = 0;

function gatherSticksFunc(){
  if(buttonClickable(gatherSticks)){
    resourceDict.wood++;
    updateResources();
    cooldownButton(gatherSticks, 2);
    trailOff(gatherSticks, "+1 wood");
  }
}

function hutCraft(){
  console.log("CRAFTED HUT");
}

function logHomeCraft(){
  console.log("CRAFTED LOGHOME");
}

function mansionCraft(){
  console.log("CRAFTED MANSION");
}

function stokeFireFunc(){

  if(onFire == true && resourceDict.wood > 0 && buttonClickable(stokeFire) == true){
    resourceDict.wood--;
    numCharcoalStacked++;
    trailOff(stokeFire, "-1 wood");
    updateCharcoalPile();
    updateResources();
    fireTimeLeft = fireStartTime + fireBurnTime - Date.now();
    console.log("STOKED CORRECTLY");
    if(fireTimeLeft < fireBurnTime/2){
      clearTimeout(fire);
      fire = setTimeout(smother, fireBurnTime);

      // makeAddEventText("STOKED", "170, 0, 0");

      cooldownButton(stokeFire, 1);
      flareFlame(fireBurnTime/1000, -fireTimeLeft/1000);

      fireStartTime = fireStartTime + 2*(Date.now() - (fireStartTime + fireBurnTime/2));
      if(numCharcoalStacked > maxCharcoalPile){
        makeAddEventText("CHARCOAL OVERSPILLED", "0, 0, 0");
        numCharcoalStacked = 0;
        updateCharcoalPile();
        clearTimeout(fire);
        smother();
        fireDisplay.classList.remove("runFireAnimation");
      }
  }else{
    makeAddEventText("STOKED TOO SOON", "170, 0, 0");
  }
}
}

function addFireEvent(){
  if(onFire == true){
    numEventsQueded++;
    moveToNextEvent();

  }
}

// var resourceTable = document.createElement("TABLE");
// resourceTable.setAttribute("class","border");
var res = Object.keys(resourceDict);

for(var i = 0; i < res.length; i++){

  addRow(resourceTable, res[i], resourceDict[res[i]]);
}

function checkToggleValue(){
  for (var i = 0, length = radios.length; i < length; i++) {
    if (radios[i].checked) {
      // do whatever you want with the checked radio
      return radios[i].value;
    }
  }
}

function turnOnPopup(){
  if(eventsToggle.checked == false){
    popup.classList.add('poppedUp');
    cover.classList.add('poppedUp');
  }else{
    eventsToggleDiv.classList.add('runEventMissed');
    if(checkToggleValue() === "accept"){
      promptResolution(accept);
    }else{
      promptResolution(decline);
    }

  }

}

function turnOffPopup(){

  popup.classList.remove('poppedUp');
  cover.classList.remove('poppedUp');
  moveToNextEvent();
}
function moveToNextEvent(){
  //probably just redundant
  if(numEventsQueded >= 1){
    numEventsQueded--;

    fillPopupWithEventInfo();
  }
}

function fillPopupWithEventInfo(){

    var levelNames = Object.keys(randomEvents.Single);
    // var choseLevel = Math.floor(Math.random()*numLevels);
    var chosenLevel = 0;
    var chosenLevelName = levelNames[chosenLevel];
    var numDifPeople = randomEvents.Single[chosenLevelName].length;
    var chosenPersonIndex = Math.floor(Math.random()*numDifPeople);
    var personData = randomEvents.Single[chosenLevelName][chosenPersonIndex];
    // console.log(personData);

    prompt.innerHTML = personData.Prompt;
    accept.innerHTML = personData.Accept;
    decline.innerHTML = personData.Decline;
    accept.setAttribute("data-response", personData.EnterMessage);
    accept.setAttribute("data-function", personData.EnterFunction);
    accept.setAttribute("data-role", personData.Role);
    decline.setAttribute("data-response", personData.LeaveMessage);
    decline.setAttribute("data-function", personData.LeaveFunction);
    turnOnPopup();

}

function promptResolution(buttonChosen){
  turnOffPopup();
  var info = buttonChosen.getAttribute("data-response");
  var roleInfo = buttonChosen.getAttribute("data-role");
  var eventFunctionName = buttonChosen.getAttribute("data-function");

  window[eventFunctionName](); //possibly put in a "strength" argument depending on words of prompt
  makeAddEventText(info, "0, 153, 0");
}


function generateFunctionNames(){
//makes names for the functions for when an NPC is accpeted or rejected
  for(var level in randomEvents.Single){
    for(var personIndex = 0; personIndex < randomEvents.Single[level].length; personIndex++){
      var personData = randomEvents.Single[level][personIndex];

      randomEvents.Single[level][personIndex]["EnterFunction"] = "" + personData.Level + "Enter" + personData.Alignment + personData.Role;
      randomEvents.Single[level][personIndex]["LeaveFunction"] = "" + personData.Level + "Leave" + personData.Alignment + personData.Role;

    }
  }

}


function compare(testRole){
  //used to compare a test role and see if its in the whole set
  //probably won't use this but mights use a bit for some other thing, like
  //currenlty jsut returns the group of role given a specific role

  // var testRole = "Scavenger";
  for(var roleCategory in rolesJson){

    for(var j = 0; j < rolesJson[roleCategory].length; j++){
      var currentRole = Object.keys(rolesJson[roleCategory][j])[0];
      if(currentRole === testRole){
        // console.log(key, j, currentRole);
        return roleCategory;

      }
    }

  }
  return null;
}
//this is used to export the events to a json text file
function export2txt() {

  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([JSON.stringify(randomEvents, null, 2)], {
    type: "text/plain"
  }));
  a.setAttribute("download", "data.txt");
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

function addRow(table, name, val){
  var row = table.insertRow(-1);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  cell1.innerHTML = name;
  cell2.innerHTML = val;
}
rightSide.appendChild(resourceTable);


function makeElementInDiv(elementName){
  var div = document.createElement("div");
  var element = document.createElement(elementName);
  div.appendChild(element);
  return divWithElement;
}

// var initialHistoryTableHeight = historyTable.offsetHeight;

function makeAddEventText(text, eventColor){
  var curRow = historyTable.insertRow(0);
  curRow.innerHTML = text;
  var backgroundGradientColor = "linear-gradient(to right, rgba(" + eventColor + ", .4), rgba(" + eventColor + ", 0))"
  curRow.style.backgroundImage = backgroundGradientColor;
  curRow.style.width = "auto";
  curRow.style.display = "block";

  var rowsInTable = historyTable.rows.length;
  var height = 0;
  var totalHeight = historyTable.offsetHeight;
  for(var i = 0; i < rowsInTable; i++){
    var currentRow = historyTable.rows[i];
    height += currentRow.clientHeight;
    var trans = (totalHeight-height)*(1./totalHeight);
    historyTable.rows[i].style.opacity = Math.max(trans,0);

    // console.log(totalHeight, height, trans);
  }
  // console.log(height, totalHeight);
    if(totalHeight-height < historyTable.rows[rowsInTable-1].clientHeight * 1.1){
      console.log("DELETED");
      historyTable.deleteRow(-1);
    }

  // var p = document.createElement("p");
  // p.style.background = eventColor;
  // p.append(document.createTextNode(text));
  // leftSide.prepend(p);
  // var numEvents = leftSide.children.length;
  // for(var i = 0; i < numEvents; i++){
  //   leftSide.childNodes[i].style.opacity = (totalHistoryItems-i)*(1./totalHistoryItems);
  // }
  // if(numEvents > totalHistoryItems){
  //   leftSide.removeChild(leftSide.lastChild);
  //
  // }
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
