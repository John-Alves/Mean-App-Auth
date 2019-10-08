const User = require('../models/User');

module.exports = {
    async create(req, res){
        const { email } = req.body; // O nome desse tipo de "extração" é desestruturação
        
        let user = await User.findOne({ email: email });

        if (!user){
            user = await User.create({ email });
        }
        
        return res.json(user);
    }
};