'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');

const userStore = {

  store: new JsonStore('./models/user-store.json', { users: [] }),
  collection: 'users',

  getAllUsers() {
    return this.store.findAll(this.collection);
  },

  addUser(user) {
    this.store.add(this.collection, user);
    this.store.save();
  },

  getUserById(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },

  getUserByEmail(email) {
    return this.store.findOneBy(this.collection, { email: email });
  },

  checkPassword(user, password) {
    return user.password === password;
  },

  updateUser (user, updatedUser) {
    if(updatedUser.firstName) {
      user.firstName = updatedUser.firstName;
    }
    if(updatedUser.lastName) {
      user.lastName = updatedUser.lastName;
    }
    if(updatedUser.email) {
      user.email = updatedUser.email;
    }
    if (updatedUser.password) {
      user.password = updatedUser.password;
    }
    this.store.save();
  }
};

module.exports = userStore;