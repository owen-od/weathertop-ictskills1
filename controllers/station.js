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

    if (station.readings.length > 0) {
      var lastReading = station.readings[station.readings.length - 1];
      var tempFarenheit = conversion.tempF(lastReading.temperature);
      var beaufort = conversion.beaufort(lastReading.windSpeed);
      var pressure = lastReading.pressure;
      var temperature = lastReading.temperature;
      var code = lastReading.code;
      var compassDirection = conversion.degreesToCompass(
        lastReading.windDirection
      );
      var windChill = analytics.windChill(
        lastReading.temperature,
        lastReading.windSpeed
      );
      var conditions = conversion.codeToWeatherConditions(lastReading.code);
      var minWindSpeed = analytics.minWindSpeed(station.readings);
      var maxWindSpeed = analytics.maxWindSpeed(station.readings);
      var minTemp = analytics.minTemp(station.readings);
      var maxTemp = analytics.maxTemp(station.readings);
      var minPressure = analytics.minPressure(station.readings);
      var maxPressure = analytics.maxPressure(station.readings);
    }

    const viewData = {
      title: "Station",
      station: stationStore.getStation(stationId),
      tempFarenheit: tempFarenheit,
      beaufort: beaufort,
      pressure: pressure,
      temperature: temperature,
      code: code,
      compassDirection: compassDirection,
      windChill: windChill,
      conditions: conditions,
      minWindSpeed: minWindSpeed,
      maxWindSpeed: maxWindSpeed,
      minTemp: minTemp,
      maxTemp: maxTemp,
      minPressure: minPressure,
      maxPressure: maxPressure
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
