let resourceNode = 0; // button
let upgradedMobs = 0; // button
let killedPlayers = 0; // button
let bankedLoot = 0; // button
let openWorldChests = 0; // button
let escapedGank = 0; // button
let deathCount = 0; // button
let mightProgression = 0; // Starting Might vs Ending Might, user entered
let factionPoints = 0; // Starting FP vs Ending FP, user entered
let totalAchievements = 0;
let kpiDeathRatio; // Calculated from total achievements divided by deaths

function resNodeEarned() {
    resourceNode++;
    totalAchievements++;
    //console.log("Resources " + resourceNode);
    //console.log("Total KPI: " + totalAchievements)
    document.getElementById("resource-int").innerHTML = resourceNode;
    document.getElementById("achievements-int").innerHTML = totalAchievements;
    ach2deathRatio();
}

function upgradedMobsKilled() {
    upgradedMobs++;
    totalAchievements++;
    //console.log("Upgraded Mobs: " + upgradedMobs);
    //console.log("Total KPI: " + totalAchievements)
    document.getElementById("upgradedMobs-int").innerHTML = upgradedMobs;
    document.getElementById("achievements-int").innerHTML = totalAchievements;
    ach2deathRatio();
}
function playerKill() {
    killedPlayers++;
    totalAchievements++;
    //console.log("Players Killed: " + killedPlayers);
    //console.log("Total KPI: " + totalAchievements)
    document.getElementById("pk-int").innerHTML = killedPlayers;
    document.getElementById("achievements-int").innerHTML = totalAchievements;
    ach2deathRatio();
}
function bankLoot() {
    bankedLoot++;
    totalAchievements++;
    //console.log("Upgraded Mobs: " + upgradedMobs);
    //console.log("Total KPI:  " + totalAchievements)
    document.getElementById("lootbank-int").innerHTML = bankedLoot;
    document.getElementById("achievements-int").innerHTML = totalAchievements;
    ach2deathRatio();
}
function worldChest() {
    openWorldChests++;
    totalAchievements++;
    //console.log("Open World Chests: " + upgradedMobs);
    //console.log("Total KPI:  " + totalAchievements)
    document.getElementById("chests-int").innerHTML = openWorldChests;
    document.getElementById("achievements-int").innerHTML = totalAchievements;
    ach2deathRatio();
}
function gankEscape() {
    escapedGank++;
    totalAchievements++;
    //console.log("Ganks Escaped: " + upgradedMobs);
    //console.log("Total KPI:  " + totalAchievements)
    document.getElementById("gankesc-int").innerHTML = escapedGank;
    document.getElementById("achievements-int").innerHTML = totalAchievements;
    ach2deathRatio();
}
function youDie() {
    deathCount++;
    //console.log("Deaths: " + deathCount);
    document.getElementById("deaths-int").innerHTML = deathCount;
    ach2deathRatio();
}

function ach2deathRatio() {
    if (deathCount == 0) {
        document.getElementById("kpidRatio-int").innerHTML = totalAchievements;
        //console.log("IF IS TRUE");
    } else {
        kpiDeathRatio = totalAchievements / deathCount;
        kpiDeathRatio = kpiDeathRatio.toFixed(2);
        document.getElementById("kpidRatio-int").innerHTML = kpiDeathRatio;
        //console.log("IF IS FALSE");
    }

    //console.log(kpiDeathRatio)
}
