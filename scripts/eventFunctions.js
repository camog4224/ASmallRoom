// console.log(rolesJson);
//maybe have some events trigger other events, like if you decline a "strong" npc they might ask again but more aggresivly

//loop throught this and apply these values to resources every 5 seconds for NPC gen
var npcResourceGen = {
  "wood" : 1
}

function WeakEnterGoodScavenger(){
  console.log("WeakEnterGoodScavenger");
  if(tabChunks.theWoods.canGatherWood == true){
    tabChunks.theWoods.canHunt = true;
  }else{
    tabChunks.theWoods.canGatherWood = true;
  }

}

function WeakLeaveGoodScavenger(){
  console.log("WeakLeaveGoodScavenger");

}

function WeakEnterEvilWeaver(){
  console.log("WeakEnterEvilWeaver");
  tabChunks.aSmallHut.canCraft = true;

}

function WeakLeaveEvilWeaver(){
  console.log("WeakLeaveEvilWeaver");

}

function WeakEnterNeutralScavenger(){
  console.log("WeakEnterNeutralScavenger");
  if(tabChunks.theWoods.canGatherWood == true){
    tabChunks.theWoods.canHunt = true;
  }else{
    tabChunks.theWoods.canGatherWood = true;
  }

}

function WeakLeaveNeutralScavenger(){
  console.log("WeakLeaveNeutralScavenger");

}
