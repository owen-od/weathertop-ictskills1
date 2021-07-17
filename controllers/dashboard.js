"use strict"

const logger = require("../utils/logger");
const stationCollection = require("../models/station-store.js");
const analytics = require("../utils/analytics");
const conversion = require("../utils/conversion.js");

const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering");
    for (let station of stationCollection) {
      if (station.readings.length > 0) {
          let lastReading = station.readings[station.readings.length - 1];
          let tempF = conversion.tempF(lastReading.temperature);
      };
    };
    const viewData = {
      title: "WeatherTop Dashboard",
      stations: stationCollection,
    };
    logger.info("about to render", stationCollection);
    response.render("dashboard", viewData);
  }
};

module.exports = dashboard;
