const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const consts = require('../contants');

module.exports = {
    async login(req, res){
        const { login, password } = req.body;
        
        User.findOne({ login: login }).lean().exec(function(error, user) {
            if (error) {
                return res.status(500).json({ message: 'Server error', error: error });
            }
            
            const passwordIsEmpty = isEmpty(password);
            const loginIsEmpty = isEmpty(login);
            const userNotFound = isEmpty(user);

            if (passwordIsEmpty || loginIsEmpty || userNotFound) {
                return res.status(403).json({ message: 'Login ou Senha inválido' });
            }

            if ( bcrypt.compareSync(password, user.encrypted_password) ) {
                let token = jwt.sign({_id: user._id}, consts.keyJWT, { expiresIn: consts.expiresJWT });
                delete user.password;

                return res.json({ ...user, token: token });
            }

            return res.status(403).json({ message: 'Login ou Senha inválido' });;
        });
    },

    verifyWebToken(req, res, next){
        const token = req.get('Authorization');

        if (!token) { 
            return res.status(401).json({ message: 'Token not found' });
        }

        jwt.verify(token, consts.keyJWT, 
            (err, decoded) => {
                if (err || !decoded) {
                    return res.status(401).json({ message: 'Authentication error' });
                }
                next();
            }
        )
    }
};

function isEmpty(field){
    return (field == null || field == undefined || field == '' || field == {});
}