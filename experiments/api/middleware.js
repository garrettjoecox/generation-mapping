
const path = require('path').join;
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const passport = require('passport');
const passportJwt = require('passport-jwt');

app.use(express.static(path(__dirname, '../client')));
app.use(morgan('dev', { stream: log.stream }));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(auth.initialize());