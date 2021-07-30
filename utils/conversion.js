"use strict";

const logger = require("../utils/logger");
const stationStore = require("../models/station-store.js");

const weatherConditions = new Map([
  [100, "Clear"],
  [200, "Partial Clouds"],
  [300, "Cloudy"],
  [400, "Light Showers"],
  [500, "Heavy Showers"],
  [600, "Rain"],
  [700, "Snow"],
  [800, "Thunder"]
]);

const weatherIcons = new Map([
  [100, "yellow sun"],
  [200, "yellow cloud sun"],
  [300, "grey cloud"],
  [400, "grey cloud sun rain"],
  [500, "grey cloud showers heavy"],
  [600, "blue cloud rain"],
  [700, "blue snowflake"],
  [800, "yellow bolt"]
]);

const conversion = {
  tempF(tempC) {
    let tempF = tempC * 1.8 + 32;
    return tempF.toFixed(2);
  },

  beaufort(windSpeed) {
    let beaufort = 0;
    if ((windSpeed > 1) && (windSpeed <= 5)) {
      beaufort = 1;
    } else if ((windSpeed > 5) && (windSpeed <= 11)) {
      beaufort = 2;
    } else if ((windSpeed > 11) && (windSpeed <= 19)) {
      beaufort = 3;
    } else if ((windSpeed > 19) && (windSpeed <= 28)) {
      beaufort = 4;
    } else if ((windSpeed > 28) && (windSpeed <= 38)) {
      beaufort = 5;
    } else if ((windSpeed > 38) && (windSpeed <= 49)) {
      beaufort = 6;
    } else if ((windSpeed > 49) && (windSpeed <= 61)) {
      beaufort = 7;
    } else if ((windSpeed > 61) && (windSpeed <= 74)) {
      beaufort = 8;
    } else if ((windSpeed > 74) && (windSpeed <= 88)) {
      beaufort = 9;
    } else if ((windSpeed > 88) && (windSpeed <= 102)) {
      beaufort = 10;
    } else if ((windSpeed > 102) && (windSpeed <= 117)) {
      beaufort = 11;
    } else if (windSpeed > 117) {
      beaufort = 12;
    }
    return beaufort;
  },

  degreesToCompass(windDirection) {
    const direction = [
      "N",
      "NNE",
      "NE",
      "ENE",
      "E",
      "ESE",
      "SE",
      "SSE",
      "S",
      "SSW",
      "SW",
      "WSW",
      "W",
      "WNW",
      "NW",
      "NNW",
      "N"
    ];
    let index = parseInt(Math.round(windDirection / 22.5));
    return direction[index];
  },

  codeToWeatherConditions(weatherCode) {
    let weather = weatherConditions.get(weatherCode);
    return weather;
  },

  codeToIcon(weatherCode) {
    let icon = weatherIcons.get(weatherCode);
    return icon;
  }
};

module.exports = conversion;
