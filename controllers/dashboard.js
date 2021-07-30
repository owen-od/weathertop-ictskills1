"use strict";

const logger = require("../utils/logger");
const uuid = require("uuid");

const stationStore = require("../models/station-store.js");
const analytics = require("../utils/analytics");
const conversion = require("../utils/conversion.js");
const accounts = require ('./accounts.js');

const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering");
    const loggedInUser = accounts.getCurrentUser(request);
    const stations = stationStore.getUserStations(loggedInUser.id);
    stations.sort((a, b) => a.name.localeCompare(b.name));
    for (const station of stations) {
      const latestWeather = analytics.latestWeather(station);
      station.latestWeather = latestWeather;
    }
    const viewData = {
      title: "WeatherTop Dashboard",
      stations: stations
    };
    logger.info("about to render", stationStore.getAllStations());
    response.render("dashboard", viewData);
  },

  deleteStation(request, response) {
    const stationId = request.params.id;
    logger.debug("Deleting station ${stationId}");
    stationStore.removeStation(stationId);
    response.redirect("/dashboard");
  },

  addStation(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const newStation = {
      id: uuid.v1(),
      userid: loggedInUser.id,
      name: request.body.name,
      latitude: Number(request.body.latitude),
      longitude: Number(request.body.longitude),
      latestWeather: {},
      readings: [],
    };
    logger.debug('Creating a new Station', newStation);
    stationStore.addStation(newStation);
    response.redirect("/dashboard");
  }
};

module.exports = dashboard;
