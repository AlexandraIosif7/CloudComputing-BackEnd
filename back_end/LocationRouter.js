const express = require('express')
const database = require('./db')

const router  = express.Router();


router.get('/all', async (req,res)=>{
    try{
        const locations = database.collection("locations");
        const data = await locations.get();
        const locationsArray = [];
        if(data.empty){
            res.status(404).send('No location found!');
        }
        else{
            data.forEach( doc =>{
                locationsArray.push(doc.data());
            });
           res.send(locationsArray);
        }
    }
    catch(error){
        res.status(400).send(error.message);
    }
});

router.post('/add', async(req,res)=>{
    try{
        const newLocation ={
            origin: req.body.origin,
            destination: req.body.destination
        };
        const response = await database.collection("locations").add(newLocation);
        res.send(response);

    }catch(error){
        res.status(400).send(error.message);
    }
});

module.exports = router;