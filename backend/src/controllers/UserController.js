const User = require('../models/User');

module.exports = {
    async create(req, res){
        try {
            const { email, login } = req.body;
            
            let user = await User.findOne({ email: email, login: login });

            if (!user){
                user = await User.create({ name, telephone, cpf, email, login, encrypted_password });
            }
            
            return res.json(user);
        }
        catch(e){
            res.status(500).json({ message: 'Error while saving the user', error: e })
        }
    }
};