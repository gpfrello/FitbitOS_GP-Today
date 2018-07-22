// Version 1.6 - include settings

import clock from "clock";
import document from "document";
import { preferences } from "user-settings";
import { units } from "user-settings";
import { getDisplayMonth, getDisplayDay, zeroPad, calculateDistance, round} from "../common/utils";
import { battery } from "power";
import userActivity from "user-activity"; //adjusted types
import { goals} from "user-activity";
import * as hrm from "hrm";

//import for settings
import { inbox } from "file-transfer";
import { readFileSync } from "fs";
import * as cbor from 'cbor';

let defaultSettings = {
  timeColor: "cyan",
  textColor: '#FFFFFF',
  backgroundColor: "black"
};
let settings = defaultSettings;


// HR Icon animation
hrm.initialize();

//initialization settings
inbox.onnewfile = processInbox;

// Update the clock every minute
clock.granularity = "minutes";

// Get a handle on the <text> element
const backgroundHandle = document.getElementById("background");
const timeHandle = document.getElementById("timeLabel");
const dateHandle = document.getElementById("dateLabel");
const batteryHandle = document.getElementById("batteryLabel");
const stepsHandle = document.getElementById("stepsLabel");
const caloriesHandle = document.getElementById("caloriesLabel");
const activeMinutesHandle = document.getElementById("activeminutesLabel");
const floorsHandle = document.getElementById("floorsLabel");
const distanceHandle = document.getElementById("distanceLabel");
const heartrateHandle = document.getElementById("heartrateLabel");

// Get a handle on the <icon> elements
const steps_iconHandle = document.getElementById('steps_icon');
const floors_iconHandle = document.getElementById('floors_icon');
const distance_iconHandle = document.getElementById('distance_icon');
const activeMinutes_iconHandle = document.getElementById('activeminutes_icon');
const calories_iconHandle = document.getElementById('cals_icon');
const battert_iconHandle = document.getElementById('battery_icon');

// Import clock preference (12h or 24h format)
const clockPref = preferences.clockDisplay;

// Import measure units 
const measureUnitsPref = units.distance;

// Import goals
const stepsGoal = goals.steps;
const floorsGoal = goals.elevationGain;
const distanceGoal = goals.distance;
const caloriesGoal = goals.calories;
const activeMinutesGoal = goals.activeMinutes;

// Define metrics
const metricSteps = "steps";
const metricCalories = "calories";
const metricDistance = "distance";
const metricActiveMinutes = "activeMinutes";
const metricFloors = "elevationGain";

// Update the <text> element every tick with the current time
clock.ontick = (evt) => {
  const batteryValue = battery.chargeLevel; // Battery Measurement
  const now = evt.date;
  const minsZeroed;
  const antipost;
  const hours = now.getHours();
  const mins = now.getMinutes();
  if (clockPref === "12h") {
    // 12h format
    hours = hours % 12 || 12;   
    minsZeroed = zeroPad(mins);
    if (now.getHours() <12) {
      antipost = 'am';
    } else
      {antipost = 'pm';
    }
    timeHandle.text = `${hours}:${minsZeroed}` + " " + antipost;
  }
    else {
      // 24h format
    hours = zeroPad(hours);
    minsZeroed = zeroPad(mins);
    timeHandle.text = `${hours}:${minsZeroed}`;
    }
    
  let day = now.getDay(); // this shows the day of the week from 0 to 6
  let month = now.getMonth(); // this shows the month number from 0 to 11
  const dayOfMonth = now.getDate(); // this shows the day of the month from 1 to 30 (or 28 or 31)
  
  const displayMonth = getDisplayMonth(month);
  const displayDay = getDisplayDay(day);
  
  const dateValue = `${displayDay} ${dayOfMonth} ${displayMonth}`;
  
  // Activity Values: adjusted type
  let stepsValue = (userActivity.today.adjusted[metricSteps] || 0);
  let stepsString = stepsValue + ' steps';
  let caloriesValue = (userActivity.today.adjusted[metricCalories] || 0);
  let caloriesString = caloriesValue + ' calories';
  let activeMinutesValue = userActivity.today.adjusted[metricActiveMinutes];
  let activeMinutesString = activeMinutesValue + ' min';
  let floorsValue = userActivity.today.adjusted[metricFloors];
  let floorsString = floorsValue + ' floors';
  let distanceValueFromDevice = userActivity.today.adjusted[metricDistance];
  let distanceValue;
  let distanceMeasure;
  if (measureUnitsPref === 'us') {
    distanceValue = Math.round(distanceValueFromDevice * 0.00062137*100, 2)/100;
    distanceMeasure = ' mi';
    } else {
    distanceValue = Math.round(distanceValueFromDevice / 10, 2)/100;
    distanceMeasure = ' km';
    }
  let distanceString = distanceValue + distanceMeasure;
  
  // Assignment values
  dateHandle.text = `${displayDay} ${dayOfMonth} ${displayMonth}`;
  batteryHandle.text = batteryValue;
  stepsHandle.text = stepsString;
  floorsHandle.text = floorsString;
  distanceHandle.text = distanceString;
  activeMinutesHandle.text = activeMinutesString;
  caloriesHandle.text = caloriesString;
  
    // Check if goals met
    battery_iconHandle.style.fill = settings.timeColor;
  if (stepsValue > stepsGoal) {
    steps_iconHandle.style.fill = settings.timeColor;
    } else {
    steps_iconHandle.style.fill = settings.textColor;
    }

  if (floorsValue > floorsGoal) {
    floors_iconHandle.style.fill = settings.timeColor;
    } else {
    floors_iconHandle.style.fill = settings.textColor ;
    }

  if (distanceValueFromDevice > distanceGoal) {
     distance_iconHandle.style.fill = settings.timeColor;
    } else {
    distance_iconHandle.style.fill = settings.textColor ;
    }

  if (caloriesValue > caloriesGoal) {
    calories_iconHandle.style.fill = settings.timeColor;
    } else {
    calories_iconHandle.style.fill = settings.textColor ;
    }

if (activeMinutesValue > activeMinutesGoal) {
    activeMinutes_iconHandle.style.fill = settings.timeColor;
    } else {
    activeMinutes_iconHandle.style.fill = settings.textColor ;
    }

}

//settings handling
function loadSettings()
{
  try {
    settings = readFileSync("settings.cbor", "cbor");
    mergeWithDefaultSettings();
  } catch (e) {
    console.log('No settings found, fresh install, applying default settings...');
    
    //apply default settings
    settings = defaultSettings;
  }
  
  console.log('Applying settings: ' + JSON.stringify(settings));
  applySettings();
}


function mergeWithDefaultSettings() {
  for (let key in defaultSettings) {
    if (!settings.hasOwnProperty(key)) {
      settings[key] = defaultSettings[key];
    }
  }
}

function applySettings() {
  backgroundHandle.style.fill = settings.backgroundColor;
  timeHandle.style.fill = settings.timeColor;
  dateHandle.style.fill = settings.textColor;
  batteryHandle.style.fill = settings.textColor;
  stepsHandle.style.fill = settings.textColor;
  caloriesHandle.style.fill = settings.textColor;
  activeMinutesHandle.style.fill = settings.textColor;
  distanceHandle.style.fill = settings.textColor;
  floorsHandle.style.fill = settings.textColor;
  timeHandle.style.fill = settings.timeColor;
  steps_iconHandle.style.fill = settings.textColor;
  calories_iconHandle.style.fill = settings.textColor; 
  floors_iconHandle.style.fill = settings.textColor;
  distance_iconHandle.style.fill = settings.textColor;
  activeMinutes_iconHandle.style.fill = settings.textColor;
    
}


//load stored settings if any at startup
loadSettings();

function processInbox()
{
  let fileName;
  while (fileName = inbox.nextFile()) {
    console.log("File received: " + fileName);

    if (fileName === 'settings.cbor') {
        loadSettings();
    }
  }

};


