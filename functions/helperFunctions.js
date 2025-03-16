const { pbkdf2, randomBytes } = require('node:crypto');
const { promisify } = require('node:util');
const pbkdf2Async = promisify(pbkdf2);
const sanitizeHtml = require('sanitize-html')
const jwt = require('jsonwebtoken')

const encryptPassword = async (password)=>{
    const salt = randomBytes(16).toString('hex');
    const hash = await pbkdf2Async(password, salt, 100000, 64, 'sha512');
    const saltedHash = `${salt}:${hash.toString('hex')}`
    const canVerify = await verifyPassword(password, saltedHash)
    if(canVerify){
        return saltedHash
    }
    return `there was a problem with your password`;
}

const verifyPassword = async (password, storedHash) => {
    const [salt, originalHash] = storedHash.split(':');
    const hash = await pbkdf2Async(password, salt, 100000, 64, 'sha512');
    return hash.toString('hex') === originalHash;
}

const sanitizeUsername = (username)=>{
    const sanitizedusername = sanitizeHtml(username, {
        allowedTags: [],
        allowedAttributes: {},
    }).trim();
    return sanitizedusername
}

const authUserToken = (req, res, next)=>{
    const token = req.cookies.token || req.headers?.authorization.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }
        req.user = decoded.user;
        req.token = token
        next();
    });
}

module.exports = {
    sanitizeUsername,
    encryptPassword,
    verifyPassword,
    authUserToken
}