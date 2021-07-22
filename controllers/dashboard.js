"use strict";

const logger = require("../utils/logger");
const uuid = require("uuid");
const stationStore = require("../models/station-store.js");
const analytics = require("../utils/analytics");
const conversion = require("../utils/conversion.js");

const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering");
    const viewData = {
      title: "WeatherTop Dashboard",
      stations: stationStore.getAllStations()
    };
    logger.info("about to render", stationStore);
    response.render("dashboard", viewData);
  },

  deleteStation(request, response) {
    const stationId = request.params.id;
    logger.debug("Deleting station ${stationId}");
    stationStore.removeStation(stationId);
    response.redirect("/dashboard");
  },

  addStation(request, response) {
    const newStation = {
      id: uuid.v1(),
      name: request.body.name,
      latitude: request.body.latitude,
      longitude: request.body.longitude,
      readings: []
    };
    stationStore.addStation(newStation);
    response.redirect("/dashboard");
  }
};

module.exports = dashboard;
