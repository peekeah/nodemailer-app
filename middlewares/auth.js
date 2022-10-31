const jwt = require('jsonwebtoken');

exports.authenticateToken = async(req, res, next) => {
    // validating token in headers
    const existToken = req.headers['access-token'];
    if(!existToken) return res.status(401).send({msg: 'Unauthorized: Token not found'});
    
    try {
        req.body.tokenData = jwt.verify(existToken, process.env.JWT_SECRET);
        next();        
    } catch (err) {
        console.log(err);
        res.status(401).send({msg: 'Unauthorized: Invalid token'});
    }
}