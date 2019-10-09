const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { bcryptSaltRounds } = require('../contants');
module.exports = {
    async create(req, res){
        try {
            const { name, email, login, telephone, cpf, password } = req.body;

            let user = await User.findOne({ email: email, login: login });
            
            if (!user){
                passwordHash = bcrypt.hashSync(password, bcryptSaltRounds);
                user = await User.create({ name, telephone, cpf, email, login, password: passwordHash });
                delete user.password;
                return res.json(user);
            }
            else {
                res.status(403).json({ message: 'Email or Login already taken', error: {} })
            }
            
        }
        catch(e){
            res.status(500).json({ message: 'Error while saving the user', error: e });
        }
    }
};