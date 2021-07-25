/* different people coming to the town will come at different stages
like the
*/
events = {

  "single": [
    "Farmer"
  ],
//position in array relates to how progressed their soceity is
  "Levels": [// values determine how likely they are perform
    "Doctor" : ["Healer" : .25 , "Shaman" : .6 , "Doctor" : .9],
    "Guard" : ["Tough Guy" : .25, "Scout" : .5, "Guard" : ["Ranger" : .8, "Soldier" : .8, "Assassin" : .8], "Trooper" : .9],
    "Architect" : ["Artisan",: .25, "Carpenter" : .6, "Architect" : .9],
    "Rancher" : ["Tough Guy" : .25, "Hunter" : .6, "Rancher" : .9],
    "Forager" : ["Scavenger" : .25, "Lumberjack" : .6, "Forager" : .9],
    "Priest" : ["Shaman" : .25, "Cleric" : .6, "Priest" : .9],
    "Craftsman" : ["Weaver" : .25, "Artisan" : .6, "Craftsman" : .9],
    "Mayor" : ["Leader" : .25, "Cheiftan" : .6, "Mayor" : .9],
    "Researcher" : ["Shaman" : .25, "Artisan" : .6, "Reasearcher" : ["Archeologist" : .9, "Builder" : .9]],
    "Ambassador" : ["Courier" : .25, "Merchant" : .6, "Ambassador" : .9]
  ]


}
