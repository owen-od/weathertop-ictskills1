'use strict';

const logger = require('../utils/logger');
const stationStore = require("../models/station-store.js");
const uuid = require('uuid');
const analytics = require("../utils/analytics");

const station = {
  index (request, response) {
    const stationId = request.params.id;
    const station = stationStore.getStation(stationId);
    logger.info('Station id =  ' + stationId);
    
    const latestWeather = analytics.latestWeather(station);
    
    const viewData = {
      title: 'Station',
      station: stationStore.getStation(stationId),
      latestWeather: latestWeather,
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