// console.log(rolesJson);
//maybe have some events trigger other events, like if you decline a "strong" npc they might ask again but more aggresivly

//loop throught this and apply these values to resources every 5 seconds for NPC gen
var npcResourceGen = {
  "wood" : 1
}

function WeakEnterGoodScavenger(){
  console.log("WeakEnterGoodScavenger");
  tabChunks.theWoods.hasForager = true;
}

function WeakLeaveGoodScavenger(){
  console.log("WeakLeaveGoodScavenger");

}

function WeakEnterEvilWeaver(){
  console.log("WeakEnterEvilWeaver");

}

function WeakLeaveEvilWeaver(){
  console.log("WeakLeaveEvilWeaver");

}

function WeakEnterNeutralScavenger(){
  console.log("WeakEnterNeutralScavenger");
  tabChunks.theWoods.hasForager = true;
}

function WeakLeaveNeutralScavenger(){
  console.log("WeakLeaveNeutralScavenger");

}
