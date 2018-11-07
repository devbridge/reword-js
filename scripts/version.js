/* eslint-disable import/no-extraneous-dependencies */

const releaseIt = require('release-it');
const getConfig = require('./config');

releaseIt(getConfig());
