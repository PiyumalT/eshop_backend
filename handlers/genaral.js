const express = require('express');
const router = express.Router();

// router.get(`/`, (req, res) => {
//     res.send('Hello World , node server running, this is get response');
// });
exports.hello = async (req, res) => {
    console.log('Node server running, this is get response');
    res.send('Hello , node server running, this is get response');
};

exports.helloPost = async (req, res) => {
    console.log('Node server running, this is post response');
    res.send('Hello , node server running, this is post response');
};

