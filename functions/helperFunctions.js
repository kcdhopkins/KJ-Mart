const { pbkdf2, randomBytes } = require('node:crypto');
const { promisify } = require('node:util');
const pbkdf2Async = promisify(pbkdf2);
const sanitizeHtml = require('sanitize-html')
const jwt = require('jsonwebtoken');
const { isTokenInvalidated } = require('../database/mongo-db/accounts/accounts');

const encryptPassword = async (password) => {
    const salt = randomBytes(16).toString('hex');
    const hash = await pbkdf2Async(password, salt, 100000, 64, 'sha512');
    const saltedHash = `${salt}:${hash.toString('hex')}`
    const canVerify = await verifyPassword(password, saltedHash)
    if (canVerify) {
        return saltedHash
    }
    return `there was a problem with your password`;
}

const verifyPassword = async (password, storedHash) => {
    const [salt, originalHash] = storedHash.split(':');
    const hash = await pbkdf2Async(password, salt, 100000, 64, 'sha512');
    return hash.toString('hex') === originalHash;
}

const sanitizeInput = (input) => {
    const sanitizedinput = sanitizeHtml(input, {
        allowedTags: [],
        allowedAttributes: {},
    }).trim();
    return sanitizedinput
}

const authUserToken = (req, res, next) => {
    const token = req.cookies.token || req.headers?.authorization.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
            return res.status(202).json({ message: 'Invalid token' });
        }

        const isTokenInvalid = await isTokenInvalidated(decoded.user._id, token)

        if (isTokenInvalid) {
            res.clearCookie("token")
            return res.status(202).json({ message: 'Invalid token' });
        }
        req.user = decoded.user;
        req.token = token

        next();
    });
}

const signJWTWebToken = (user) => {
    const token = jwt.sign(
        { user: user },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
    return token
}

const isEmailValid = (email) => {
    const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailFormat.test(email)
}


const formatPhoneNumber = (phoneNumberString) => {
    const cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    
    if (match) {
        return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return null;
};


module.exports = {
    sanitizeInput,
    encryptPassword,
    verifyPassword,
    authUserToken,
    signJWTWebToken,
    isEmailValid,
    formatPhoneNumber
}