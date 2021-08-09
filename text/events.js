/* different people coming to the town will come at different stages
like the
*/
var superInfo = {
//position in array relates to how progressed their soceity is
// values determine how likely they are perform
  "Levels": [
    {"Doctor" : [{"Healer" : .25 }, {"Shaman" : .6} , {"Doctor" : .9}]},
    {"Guard" : [{"Tough Guy" : .25}, {"Scout" : .5}, {"Guard" : [{"Ranger" : .8}, {"Soldier" : .8}, {"Assassin" : .8}]}, {"Trooper" : .9}]},
    {"Architect" : [{"Artisan" : .25}, {"Carpenter" : .6}, {"Architect" : .9}]},
    {"Rancher" : [{"Tough Guy" : .25}, {"Hunter" : .6}, {"Rancher" : .9}]},
    {"Forager" : [{"Scavenger" : .25}, {"Lumberjack" : .6}, {"Forager" : .9}]},
    {"Priest" : [{"Shaman" : .25}, {"Cleric" : .6}, {"Priest" : .9}]},
    {"Craftsman" : [{"Weaver" : .25}, {"Artisan" : .6}, {"Craftsman" : .9}]},
    {"Mayor" : [{"Leader" : .25}, {"Cheiftan" : .6}, {"Mayor" : .9}]},
    {"Researcher" : [{"Shaman" : .25}, {"Artisan" : .6}, {"Reasearcher" : [{"Archeologist" : .9}, {"Builder" : .9}]}]},
    {"Ambassador" : [{"Courier" : .25}, {"Merchant" : .6}, {"Ambassador" : .9}]}
  ]

};

/*
use keywords so the player knows what the event will entail if they play enough

individual : useful | stranger : harmful | drifter : could be either


also maybe have an algorith to find out how "useful" a person is by giving +5 score to the word "individual" in their prompt and like -3 for the word "hooded"
and an overall score for either if they will ever backstab, or maybe they shift to a new profession 
*/

var randomEvents =
{
  "Single" :
    [
      {"Weak" :
        [
          {
            "Level" : "Weak",
            "Prompt" : "A hooded individual comes to you seemingly haggard, they ask for a place to stay",
            "Accept" : "Accept the individual",
            "Decline" : "Turn them away",
            "FunctionName" : "SingleWeakOne",
            "Alignment" : "Good"
          },
          {
            "Level" : "Weak",
            "Prompt" : "A stranger approaches asking for someplace to stay",
            "Accept" : "Accept the stranger",
            "Decline" : "Turn them away",
            "Function" : "SingleWeakTwo",
            "Alignment" : "Evil"
          },
          {
            "Level" : "Weak",
            "Prompt" : "A drifter approaches asking for someplace to stay",
            "Accept" : "Accept the drifter",
            "Decline" : "Turn them away",
            "Function" : "SingleWeakThree",
            "Alignment" : "Neutral"
          }

        ]
      },
      {"Competant" :
        [
          {
            "Level" : "Competant",
            "Prompt" : "An rugged looking individual approaches you claiming to be tough, they ask for a place to work and stay",
            "Accept" : "Accept the individual",
            "Decline" : "Turn them away",
            "Function" : "SingleCompetantOne",
            "Alignment" : "Good"
          },
          {
            "Level" : "Competant",
            "Prompt" : "A stranger approaches you claiming they are good at gather, they ask for some kind of dwelling",
            "Accept" : "Accept the stranger",
            "Decline" : "Turn them away",
            "Function" : "SingleCompetantTwo",
            "Alignment" : "Bad"
          },
          {
            "Level" : "Competant",
            "Prompt" : "A drifter approaches you claiming to know how to do first aid, they ask for people to help",
            "Accept" : "Accept the drifter",
            "Decline" : "Turn them away",
            "Function" : "SingleCompetantThree",
            "Alignment" : "Neutral"
          }

        ]
      },
      {"Strong" :
        [
          {
            "Level" : "Strong",
            "Prompt" : "An individual approaches you telling you that they have experience scouting new areas, this is the first place they found looking for work",
            "Accept" : "Accept the individual",
            "Decline" : "Turn them away",
            "Function" : "SingleStrongOne",
            "Alignment" : "Good"
          },
          {
            "Level" : "Strong",
            "Prompt" : "A stranger approaches you saying that they have worked as an artisan for many years though a famine hit and now they are looking for a new place to work and stay",
            "Accept" : "Accept the individual",
            "Decline" : "Turn them away",
            "Function" : "SingleStrongTwo",
            "Alignment" : "Bad"
          },
          {
            "Level" : "Strong",
            "Prompt" : "A drifter approaches you with animal peltskin over their shoulder, they ask for a place to hunt and stay",
            "Accept" : "Accept the individual",
            "Decline" : "Turn them away",
            "Function" : "SingleStrongThree",
            "Alignment" : "Neutral"
          }

        ]
      }
    ]
};


// export { events };
