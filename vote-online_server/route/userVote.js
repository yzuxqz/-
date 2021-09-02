const express = require('express');
const userVote = express.Router();

userVote.get('/addCollect', require('./userVote/add-collect'));

userVote.get('/isCollect', require('./userVote/is-collect'));

userVote.get('/changeAddCollect', require('./userVote/change-add-collect'));

userVote.get('/delCollect', require('./userVote/del-collect'));

userVote.get('/queryIsCollect', require('./userVote/query-is-collect'));

userVote.post('/addIp',require('./userVote/add-ip'))

userVote.post('/addNoIp',require('./userVote/add-no-ip'))

userVote.get('/getHasVoteNum', require('./userVote/get-has-vote-num'));

userVote.get('/getIpLimitNum',require('./userVote/get-ip-limit-num'))
module.exports = userVote;