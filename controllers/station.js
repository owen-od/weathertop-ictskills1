'use strict';

const logger = require('../utils/logger');
const stationStore = require("../models/station-store.js");
const uuid = require('uuid');
const analytics = require("../utils/analytics");
const conversion = require("../utils/conversion");

const station = {
  index (request, response) {
    const stationId = request.params.id;
    const station = stationStore.getStation(stationId);
    logger.info('Station id =  ' + stationId);
    
    /*let lastReading = station.readings[station.readings.length - 1];
    let tempFarenheit = conversion.tempF(lastReading.temperature);
    let beaufort = conversion.beaufort(lastReading.windSpeed);
    let pressure = lastReading.pressure;
    let temperature = lastReading.temperature;
    let code = lastReading.code;*/
    
    if (station.readings.length > 0) {
      var lastReading = station.readings[station.readings.length - 1];
      var tempFarenheit = conversion.tempF(lastReading.temperature);
      var beaufort = conversion.beaufort(lastReading.windSpeed);
      var pressure = lastReading.pressure;
      var temperature = lastReading.temperature;
      var code = lastReading.code;
    }
    
    const viewData = {
      title: 'Station',
      station: stationStore.getStation(stationId),
      tempFarenheit: tempFarenheit,
      beaufort: beaufort,
      pressure: pressure,
      temperature: temperature,
      code: code,
    };
    response.render('station', viewData);
  },
  
  deleteReading (request, response) {
    const stationId = request.params.id;
    const readingId = request.params.readingid;
    logger.debug('Deleting reading ${readingId} from station ${stationId}');
    stationStore.removeReading(stationId, readingId);
    response.redirect('/station/' + stationId);
  },
  
  addReading(request, response) {
    const stationId = request.params.id;
    const station = stationStore.getStation(stationId);
    const newReading = {
      id: uuid.v1(),
      code: request.body.code,
      temperature: request.body.temperature,
      windSpeed: request.body.windSpeed,
      pressure: request.body.pressure,
    };
    logger.debug('New reading = ', newReading);
    stationStore.addReading(stationId, newReading);
    response.redirect('/station/' + stationId);
  },
};

module.exports = station;