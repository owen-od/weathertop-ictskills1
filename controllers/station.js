'use strict';

const logger = require('../utils/logger');
const stationStore = require("../models/station-store.js");

const station = {
  index (request, response) {
    const stationId = request.params.id;
    logger.info('Station id =  ' + stationId);
    const viewData = {
      title: 'Station',
      station: stationStore.getStation(stationId),
    };
    response.render('station', viewData);
  },
  
  deleteReading (request, response) {
    const stationId = request.params.id;
    const readingId = request.params.id;
    logger.debug('Deleting reading ${readingId} from station ${stationId}');
    stationStore.removeReading(stationId, readingId);
    response.redirect('/station/' + stationId);
  } 
};

module.exports = station;