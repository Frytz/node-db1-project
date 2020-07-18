const express = require('express');

// database access using knex
const knex = require('../data/dbconfig.js');

const router = express.Router();


//GETs
router.get('/', async (req, res) => {

    try {
        const accounts = await knex('accounts');
        console.log("Current count of accounts", accounts.length)
        res.json(accounts);
    } catch (err) {
        console.log(err);
        res.json(500).json({ message: "problem with db", error: err });
    }
});

router.get ('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const accounts = await knex('accounts').where({id})
        res.json(accounts)
    } 

    catch (err) {
        console.log(err);
        res.json(500).json({ message: "problem with db", error: err });
    }
})

//POST

router.post('/', async (req, res) => {
    const accountData = req.body;
    try {
        const numAccounts = await knex('accounts').insert(accountData)
        res.status(201).json(numAccounts)
    } catch (err) {
        console.log(err);
        res.json(500).json({ message: "problem with db", error: err });
    }
});


module.exports = router;