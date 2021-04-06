'use strict';

const fs = require('fs');
const path = require('path');

const updateArray = (users, formattedUser) => {
  if (users.length === 0) {
    return [formattedUser];
  }
  const filtered = users.filter(user => user.username === formattedUser.username);
  const userExists = filtered.length !== 0;
  if (!userExists) {
    users.push(formattedUser);
    return users;
  }
  return users.map((user) => (
    user.username === formattedUser.username ? formattedUser : user
  ));
};

const usersDBPath = path.normalize(path.join(__dirname, '../../db/users.json'));
const readUserDB = () => JSON.parse(fs.readFileSync(usersDBPath));
const writeUserDB = data => {
  fs.writeFileSync(usersDBPath, JSON.stringify(data, null, 2));
};

// Save user in JSON database. for simplicity were using JSON in this example
const updateUser = formattedUser => {
  const users = readUserDB();
  const newUsers = updateArray(users, formattedUser);
  writeUserDB(newUsers);
};

// Clear the JSON user database
const resetUsers = () => {
  writeUserDB([]);
};

const saveProviderOauthSecret = secret => {
  const file = path.normalize(path.join(__dirname, '../../db/oauth-info.json'));
  fs.writeFileSync(file, JSON.stringify({secret}, null, 2));
};

module.exports = {
  updateUser,
  resetUsers,
  saveProviderOauthSecret,
};
