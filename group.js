const LOCAL_STORAGE_KEYS = {
  SOLO: { ACHIEVEMENT: 'achievement', RANGES: 'ranges', RATIO: 'ratio', SCORECARD: 'scorecard' },
  GROUP: { RANGES: 'ranges', RATIO: 'ratio', SCORECARD: 'scorecard' },
};

const defaultValues = {
  coresSecured: 0, // button
  territoryCrystals: 0, // button
  siphonMages: 0,
  crystalSpiders: 0, // button
  arenaLoss: 0, // button
  arenaWin: 0, // button
  crystalArenaLoss: 0, // button
  crystalArenaWin: 0, // button
  crystalLeagueLoss: 0, // button
  crystalLeagueWin: 0, // button
};

const defaultRanges = {
  gatheringFameEnd: 0,
  gatheringFameStart: 0,
  pveCombatFameStart: 0,
  pveCombatFameEnd: 0,
  craftingFameStart: 0,
  craftingFameEnd: 0,
};
const defaultRatios = {
  arenaWL: 0,
  crystalArenaWL: 0,
  crystalLeagueWL: 0,
};

const values = { ...defaultValues };
const ranges = { ...defaultRanges };
const ratios = { ...defaultRatios };

/**
 * Takes an object of key:number pairs and sums its values.
 * @param {{ [key: string]: number }} obj
 * @returns number
 */
// function sumObjectValues(obj) {
//   return Object.values(obj).reduce((t, v) => t + v, 0);
// }
let range = 0;

/**
 * Updates all elements with the current values.
 */
function renderAllValues(a) {
  document.getElementById('crystalSpiders-int').innerHTML = values.crystalSpiders;
  document.getElementById('coresSecured-int').innerHTML = values.coresSecured;
  document.getElementById('territoryCrystals-int').innerHTML = values.territoryCrystals;
  document.getElementById('siphonMages-int').innerHTML = values.siphonMages;
  document.getElementById('arenaLoss-int').innerHTML = values.arenaLoss;
  document.getElementById('arenaWin-int').innerHTML = values.arenaWin;
  document.getElementById('crystalArenaLoss-int').innerHTML = values.crystalArenaLoss;
  document.getElementById('crystalArenaWin-int').innerHTML = values.crystalArenaWin;
  document.getElementById('crystalLeagueLoss-int').innerHTML = values.crystalLeagueLoss;
  document.getElementById('crystalLeagueWin-int').innerHTML = values.crystalLeagueWin;
  document.getElementById('arenaWL-int').innerHTML = ratios.arenaWL.toFixed(2);
  document.getElementById('crystalArenaWL-int').innerHTML = ratios.crystalArenaWL.toFixed(2);
  document.getElementById('crystalLeagueWL-int').innerHTML = ratios.crystalLeagueWL.toFixed(2);
  document.getElementById('pveCombatFameStart-sm').value = ranges.pveCombatFameStart;
  document.getElementById('pveCombatFameStart-md').value = ranges.pveCombatFameStart;
  document.getElementById('pveCombatFameEnd-sm').value = ranges.pveCombatFameEnd;
  document.getElementById('pveCombatFameEnd-md').value = ranges.pveCombatFameEnd;
  document.getElementById('pveCombatFame-int').innerHTML = ranges.pveCombatFameEnd - ranges.pveCombatFameStart;
  document.getElementById('gatheringFameStart-sm').value = ranges.gatheringFameStart;
  document.getElementById('gatheringFameStart-md').value = ranges.gatheringFameStart;
  document.getElementById('gatheringFameEnd-sm').value = ranges.gatheringFameEnd;
  document.getElementById('gatheringFameEnd-md').value = ranges.gatheringFameEnd;
  document.getElementById('gatheringFame-int').innerHTML = ranges.gatheringFameEnd - ranges.gatheringFameStart;
  document.getElementById('craftingFameStart-sm').value = ranges.craftingFameStart;
  document.getElementById('craftingFameStart-md').value = ranges.craftingFameStart;
  document.getElementById('craftingFameEnd-sm').value = ranges.craftingFameEnd;
  document.getElementById('craftingFameEnd-md').value = ranges.craftingFameEnd;
  document.getElementById('craftingFame-int').innerHTML = ranges.craftingFameEnd - ranges.craftingFameStart;
}

/**
 * fetches values from local storage.
 */
function hydrateValues() {
  try {
    let storedScorecard = localStorage.getItem(LOCAL_STORAGE_KEYS.GROUP.SCORECARD);
    let storedRatio = localStorage.getItem(LOCAL_STORAGE_KEYS.GROUP.RATIO);
    let storedRanges = localStorage.getItem(LOCAL_STORAGE_KEYS.GROUP.RANGES);

    if (!storedScorecard) return;

    Object.assign(values, JSON.parse(storedScorecard));
    Object.assign(ranges, JSON.parse(storedRanges));
    Object.assign(ratios, JSON.parse(storedRatio));
    calculateRatios();
    renderAllValues();
  } catch {}
}

/**
 * Preserves values to local storage.
 */
function storeValues() {
  localStorage.setItem(LOCAL_STORAGE_KEYS.GROUP.SCORECARD, JSON.stringify(values));
  localStorage.setItem(LOCAL_STORAGE_KEYS.GROUP.RANGES, JSON.stringify(ranges));
  localStorage.setItem(LOCAL_STORAGE_KEYS.GROUP.RATIO, JSON.stringify(ratios));
}

/**
 * Zeroes out the scorecard.
 */
function resetValues() {
  if (confirm('Are you sure you want to reset?')) {
    Object.assign(values, defaultValues);
    Object.assign(ranges, defaultRanges);
    totalAchievements = 0;
    kpiDeathRatio = 0;
    console.log(ranges);
    renderAllValues('reset');
    storeValues();
  }
}

/**
 * @param {number} enteredValue
 * @param {keyof ranges} propertyChanged
 */
function rangeDifference(enteredValue, propertyChanged) {
  ranges[propertyChanged] = enteredValue;
  document.getElementById('pveCombatFame-int').innerHTML = ranges.pveCombatFameEnd - ranges.pveCombatFameStart;
  document.getElementById('gatheringFame-int').innerHTML = ranges.gatheringFameEnd - ranges.gatheringFameStart;
  document.getElementById('craftingFame-int').innerHTML = ranges.craftingFameEnd - ranges.craftingFameStart;
  renderAllValues();
  storeValues();
}
/**
 * Makes the value changes to values object using parameters from processUserInput.
 * @param {number} enteredValue
 * @param {keyof values} propertyChanged
 */
// function userEnteredValue(enteredValue, propertyChanged) {
//   values[propertyChanged] = enteredValue;

//   totalAchievements = sumObjectValues(values) - values.deadCount;

//   calculateRatios();
//   renderAllValues();
//   storeValues();
// }

/**
 * Collects parameters and passes them to callback function.
 * @param {function} callback
 * @param {string} id
 */
function processUserInput(callback, id) {
  console.log(id);
  let enteredValue = parseInt(document.getElementById(id).value, 10);
  let propertyChanged = document.getElementById(id).name;
  console.log(propertyChanged);
  callback(enteredValue, propertyChanged);
}

/**
 * Increments respective button based on btn parameter, then increments totalAchievement if the btn was not deadCount.
 * @param {integer} buttonkey
 * @param {string} id
 * @param {string} name
 */
function buttonPress(buttonkey, id, name) {
  values[name] += buttonkey;

  document.getElementById(id).innerHTML = values[name];

  calculateRatios();
  renderAllValues();
  storeValues();
}

/**
 * Updates the Total KPI and Ratio elements.
 */
function calculateRatios() {
  ratios.arenaWL = values.arenaWin / 1;
  ratios.crystalArenaWL = values.crystalArenaWin / 1;
  ratios.crystalLeagueWL = values.crystalLeagueWin / 1;

  if (values.arenaLoss < 1) return;
  ratios.arenaWL = values.arenaWin / values.arenaLoss;
  if (values.crystalArenaLoss < 1) return;
  ratios.crystalArenaWL = values.crystalArenaWin / values.crystalArenaLoss;
  if (values.crystalLeagueLoss < 1) return;
  ratios.crystalLeagueWL = values.crystalLeagueWin / values.crystalLeagueLoss;

  storeValues();
}
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl);
});

window.addEventListener('load', hydrateValues);
