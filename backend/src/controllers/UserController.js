const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const consts = require('../contants');

module.exports = {
    async create(req, res) {
        try {
            const { name, email, login, telephone, cpf, password } = req.body;

            let user = await User.findOne({ email: email, login: login });
            
            if (!user){
                const passwordHash = bcrypt.hashSync(password, consts.bcryptSaltRounds);
                user = await User.create({ name, telephone, cpf, email, login, encrypted_password: passwordHash });
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
    },

    show(req, res) {
        const token = req.get('Authorization');
        jwt.verify(token, consts.keyJWT, 
            (err, decoded) => {
                const id = decoded._id;
                User.findById(id).lean().exec(function(err, user) {
                    if (err || !user) {
                        return res.status(500).json({ message: 'Error when trying to fetch user data', error: err });
                    }

                    let newToken = jwt.sign({_id: user._id}, consts.keyJWT, { expiresIn: consts.expiresJWT });
                    delete user.password;    
                    return res.json({ ...user, token: newToken });
                });
            }
        )
    }
};