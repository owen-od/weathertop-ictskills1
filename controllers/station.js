"use strict";

const logger = require("../utils/logger");
const stationStore = require("../models/station-store.js");
const uuid = require("uuid");
const analytics = require("../utils/analytics");
const conversion = require("../utils/conversion");

const station = {
  index(request, response) {
    const stationId = request.params.id;
    const station = stationStore.getStation(stationId);
    logger.info("Station id =  " + stationId);
    const latestWeather = analytics.latestWeather(station);
    station.latestWeather = latestWeather;

    const viewData = {
      title: "Station",
      station: station
    };
    response.render("station", viewData);
  },

  deleteReading(request, response) {
    const stationId = request.params.id;
    const readingId = request.params.readingid;
    logger.debug("Deleting reading ${readingId} from station ${stationId}");
    stationStore.removeReading(stationId, readingId);
    response.redirect("/station/" + stationId);
  },

  addReading(request, response) {
    const stationId = request.params.id;
    const station = stationStore.getStation(stationId);
    const newReading = {
      id: uuid.v1(),
      date: new Date(),
      code: Number(request.body.code),
      temperature: Number(request.body.temperature),
      windSpeed: Number(request.body.windSpeed),
      pressure: Number(request.body.pressure),
      windDirection: Number(request.body.windDirection)
    };
    logger.debug("New reading = ", newReading);
    stationStore.addReading(stationId, newReading);
    response.redirect("/station/" + stationId);
  }
};

module.exports = station;
