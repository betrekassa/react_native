const jwt = require('jsonwebtoken');

const mongoose = require('mongoose');

const User = mongoose.model('User');

module.exports= (req, res, next) =>
{
    const { authorization } = req.headers;

    if (!authorization)
    {
        return res.status(401).send({error: 'You must be logged in.'});
    }

    // For PostMan don't put Bearer in Authorization 
    const token = authorization.replace('Bearer','');

    jwt.verify(token,'My_Security_Key', async(err, payload) => {
  
        if (err)
        {
            // If Json web token Error Display
            return res.status(401).send({error: 'You must be logged in.' });
        }
        
        const { userId } = payload;

        // Find the user in mongodb
        const user = await User.findById(userId);

        req.user = user;

        next();
    });
};