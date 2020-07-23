const express = require('express');

// database access using knex
const db = require('../data/dbconfig.js');

const router = express.Router();


//GETs
// router.get('/', async (req, res) => {

//     try {
//         const accounts = await knex('accounts');
//         console.log("Current count of accounts", accounts.length)
//         res.json(accounts);
//     } catch (err) {
//         console.log(err);
//         res.json(500).json({ message: "problem with db", error: err });
//     }
// });

router.get('/',  async (req, res, ) =>{    try {
        const  accounts = await db.select('*').from('accounts')
        console.log( "Current count of accounts", accounts.length)
        res.status(200).json(accounts)
        
    } catch (err) {
         console.log(err);
         res.json(500).json({ message: "problem with db", error: err });
    }
})

// router.get ('/:id', async (req, res) => {
//     try {
//         const {id} = req.params;
//         const accounts = await knex('accounts').where({id})
//         res.json(accounts)
//     } 

//     catch (err) {
//         console.log(err);
//         res.json(500).json({ message: "problem with db", error: err });
//     }
// })

router.get('/:id', async (req, res) => {
    try {
        const  id  = req.params;
        const accounts = await db.select('*').from('accounts').where( id )
       
            .then(accounts => { 
                if (accounts.length === 0) {
                    console.log(accounts.length)
                    res.status(404).json({ message: "id not found" })}
                else { 
                    console.log(accounts.length)
                    res.status(200).json(accounts )
                }
                 })
    } catch (err) {
        console.log(err);
        res.json(500).json({ message: "problem with db", error: err });
    }
});

//POST

// router.post('/', async (req, res) => {
//     const accountData = req.body;
//     try {
//         const numAccounts = await knex('accounts').insert(accountData)
//         res.status(201).json(numAccounts)
//     } catch (err) {
//         console.log(err);
//         res.json(500).json({ message: "problem with db", error: err });
//     }
// });

router.post('/', async (req, res) => {
    const accountData = req.body;
    try {
        const numAccounts = await db('accounts').insert(accountData)
            .then(numAccounts => { 
                if (numAccounts){ res.status(201).json(numAccounts) }
                else { res.status(404).json({ message: "id not found" })}
            })
    } catch (err) {
        console.log(err);
        res.json(500).json({ message: "problem with db", error: err });
    }
});



//PUT

// router.put('/:id', async (req, res) => {
//     const {id} = req.params;
//     const newAccount =req.body;
//     try {
//         const count = await knex('accounts').update(newAccount).where({id});
//         if (count) {
//             res.json({updated: count});
//         } else {
//             res.status(404).json({message: "Account not found"})
//         }
//     }
//     catch (err) {
//         console.log(err);
//         res.json(500).json({ message: "problem with db", error: err });
//     }
// });

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const newAccoun = req.body;
    try {
        const count = await db('accounts').update(newAccoun).where({ id })
            .then(count => {
                if (count) {
                    res.json({ updated: count });
                } else {
                    res.status(404).json({ message: "id not found" })
                }
            })
    }
    catch (err) {
        console.log(err);
        res.json(500).json({ message: "problem with db", error: err });
    }
});

//DELETE

// router.delete('/:id', async (req, res) => {
//     const {id} = req.params;
//     try {
//         const count = await knex('accounts').del().where({id});
//         if (count) {
//             res.json({ deleted: count });
//         } else {
//             res.status(404).json({ message: "Account not found" })
//         }
//     } catch (err) {
//         console.log(err);
//         res.json(500).json({ message: "problem with db", error: err });
//     }

// });

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const count = await db('accounts').del().where({ id })
            .then(count => {
                if (count) {
                    res.json({ deleted: count });
                } else {
                    res.status(404).json({ message: "id not found" })
                }
            })
    } catch (err) {
        console.log(err);
        res.json(500).json({ message: "problem with db", error: err });
    }
});

module.exports = router;