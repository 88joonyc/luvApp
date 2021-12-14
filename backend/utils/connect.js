const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../config');
const { User } = require('../db/models');

const { secret, expiresIn } = jwtConfig;


//set token for connected
const setConnectedTokenCookie = ( res, user ) => {
    const token = jwt.sign(
        { data: user.toSafeObject() },
        secret,
        { expiresIn: parseInt(expiresIn) }, // .env set for 604800s === 1 week
    );

    const isProduction = process.env.NODE_ENV === 'production';

    res.cookie('connect', token, {
        maxAge: expiresIn * 1000,
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction && 'Lax',
    });

    return token;
};

module.exports = { setConnectedTokenCookie }
