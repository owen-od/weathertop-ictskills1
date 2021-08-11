"use strict";

const logger = require("../utils/logger");
const stationStore = require("../models/station-store.js");
const uuid = require("uuid");
const analytics = require("../utils/analytics");
const conversion = require("../utils/conversion");
const axios = require("axios");

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
  },

  async generateReading(request, response) {
    logger.info("rendering new report");
    const stationId = request.params.id;
    const station = stationStore.getStation(stationId);
    const lat = request.body.lat;
    const lng = request.body.lng;
    const requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&units=metric&appid=9782ce4340037cde393220f4fe748998`
    const result = await axios.get(requestUrl);
    if (result.status == 200) {
      const reading = result.data.current;
      var newReading = {
        id: uuid.v1(),
        date: new Date(),
        code: conversion.convertAPICode(reading.weather[0].id),
        temperature: reading.temp,
        windSpeed: reading.wind_speed,
        pressure: reading.pressure,
        windDirection: reading.wind_deg
      }
    }
    logger.debug("New reading = ", newReading);
    stationStore.addReading(stationId, newReading);
    response.redirect("/station/" + stationId);
  }
};

module.exports = station;
