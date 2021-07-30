"use strict";

const express = require("express");
const router = express.Router();

const station = require('./controllers/station.js');
const accounts = require('./controllers/accounts.js');
const dashboard = require("./controllers/dashboard.js");
const about = require("./controllers/about.js");

// Accounts
router.get('/', accounts.index);
router.get('/account', accounts.verifyuser);
router.post('/account/details', accounts.details);
router.post('/account/update/:id', accounts.update);
router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);
router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);

// Home page
router.get('/about', about.index);
router.get('/dashboard', dashboard.index);
router.get('/dashboard/deletestation/:id', dashboard.deleteStation);
router.post('/dashboard/addstation', dashboard.addStation);

// Stations
router.get('/station/:id', station.index);
router.get('/station/:id/deletereading/:readingid', station.deleteReading);
router.post('/station/:id/addreading', station.addReading);
router.post('/station/:id/generateReading', station.generateReading);

module.exports = router;
