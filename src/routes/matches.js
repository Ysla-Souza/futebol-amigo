const express = require('express');
const MatchController = require('../controller/matches');

const router = express.Router();
const matchController = new MatchController();

router.get('/', matchController.findAllByUser.bind(matchController));
router.get('/:name', matchController.findByName.bind(matchController));
router.post('/register', matchController.registerMatch.bind(matchController));
router.put('/', matchController.updateMatch.bind(matchController));
router.delete('/', matchController.deleteMatch.bind(matchController));

module.exports = router;