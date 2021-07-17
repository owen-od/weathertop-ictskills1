"use strict";

const logger = require("../utils/logger");
const stationCollection = require("../models/station-store.js");
const analytics = require("../utils/analytics");

const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering");
    for (let station in stationCollection) {
      analytics.updateWeather(station);
    }
    const viewData = {
      title: "WeatherTop Dashboard",
      stations: stationCollection,
    };
    logger.info("about to render", stationCollection);
    response.render("dashboard", viewData);
  }
};

module.exports = dashboard;
