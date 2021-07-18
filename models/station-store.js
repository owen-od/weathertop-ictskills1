'use strict';

const stationStore = {

  stationCollection: require('./station-store.json').stationCollection,

  getAllStations() {
    return this.stationCollection;
  },

  getStation(id) {
    let foundStation = null;
    for (let station of this.stationCollection) {
      if (id == station.id) {
        foundStation = station;
      }
    }
    return foundStation;
  },
  
  removeReading(id, readingId) {
    const station = this.getStation(id);
    //remove the song
  },
};

module.exports = stationStore;
