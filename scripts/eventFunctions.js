// console.log(rolesJson);
//maybe have some events trigger other events, like if you decline a "strong" npc they might ask again but more aggresivly

//loop throught this and apply these values to resources every 5 seconds for NPC gen
var npcResourceGen = {
  "wood" : 1
}

function ScavengerHeirarchy(){
  if(tabChunks.theWoods.canGatherWood == true){
    if(tabChunks.theWoods.canHunt == false){
      tabChunks.theWoods.canHunt = true;
      resourceDict["meat"] = 0;
      addRow(resourceTable, "meat", 0);
      huntMeat.classList.remove("hidden");
    }
  }else{
    tabChunks.theWoods.canGatherWood = true;
    chopWood.classList.remove("hidden");
  }

}

function WeakEnterGoodScavenger(){
  console.log("WeakEnterGoodScavenger");
  ScavengerHeirarchy();
}

function WeakLeaveGoodScavenger(){
  console.log("WeakLeaveGoodScavenger");

}

function WeakEnterEvilWeaver(){
  console.log("WeakEnterEvilWeaver");
  tabChunks.aSmallHut.canCraft = true;
  craftingStuff.classList.remove("hidden");
}

function WeakLeaveEvilWeaver(){
  console.log("WeakLeaveEvilWeaver");

}

function WeakEnterNeutralScavenger(){
  console.log("WeakEnterNeutralScavenger");
  ScavengerHeirarchy();

}

function WeakLeaveNeutralScavenger(){
  console.log("WeakLeaveNeutralScavenger");

}
