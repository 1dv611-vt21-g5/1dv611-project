'use strict';

const {routes} = require('yggio-connect');
const users = require('../db/example-users');
const nodes = require('../db/example-nodes');

const createExampleUsers = async () => {
  console.log('Creating example users...');
  await Promise.all(users.map(async u => {
    try {
      await routes.register(u);
      console.log('Created user', u.username);
    } catch (e) {
      if (e.statusCode !== 409) {
        throw e;
      }
      console.log('User already created...');
    }
  }));
  console.log('Successfully created example users.');
};

// Create example nodes
//
// Here we are logging in a user to get its login-token
// so we can create a node belonging to that user.
// Typically you dont have the username and password of a user,
// instead you will have their access token granted
// by oauth which can be used in the same manner.
const createExampleNodes = async () => {
  const token = await routes.login(users[0]);
  console.log('Creating example nodes...');
  const existing = await routes.getNodes(token);
  await Promise.all(nodes.map(async n => {
    const exists = existing.find(ex => ex.name === n.name);
    if (exists) {
      console.log('Node already created...');
    } else {
      try {
        await routes.createNode(token, n);
        console.log('Created node');
      } catch (e) {
        console.warn('Could not create node:', e.message);
      }
    }
  }));
  console.log('Successfully created example nodes.');
};

module.exports = {
  createExampleUsers,
  createExampleNodes
};
