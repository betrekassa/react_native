const express = require('express');

const mongoose = require('mongoose');

const jwt = require('jsonwebtoken');

const User = mongoose.model('User');

const router = express.Router();

router.post('/signup',async (req,res) =>
{
    // Get requested data elements 
    const { email, password } = req.body;
    
    try
    {
        // Add Data to Model
        const user = new User({ email, password });

        //Save Data to mongodb
        await user.save();
        const token = jwt.sign({userId: user._id},'My_Security_Key');
        res.send({token});

      //  res.send('You have signup');
    
    } catch(err){
        return res.status(422).send(err.message);// 422 invalid input
    }

});

router.post('/signin', async(req,res)=> {

    const { email, password} = req.body;
    
    if (!email || !password) {
        return res.status(422).send({error: 'Must provide email and password!'});
    }

    const user = await User.findOne({ email });

    if(!user)
    {
        return res.status(422).send({error: 'Must provide email and password!!'});
    }
    try
    {
     
        const test = await user.camparePassword(password);
        
        const token = jwt.sign({userId: user._id},'My_Security_Key');
   
        
        if (test)
            res.send({ token });
        else 
            return res.status(422).send({error: 'Must provide email and password!!'});

    } catch(err)
    {
        return res.status(422).send({error: 'Must provide email and password!!!'});
    }

});

module.exports = router;
