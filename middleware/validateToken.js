
const jwt   = require('jsonwebtoken');

const validateToken = async(req, res, next)=>{
    let token;
    let authHeader = req.headers.authorization || req.headers.authorization;
    try{
        if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded)=>{
            if(err){
                res.status(401).json({ error: 'invalid token' });
                return;
            }
            console.log(decoded);
            req.user = decoded.user; 
             
            console.log(req.user.id)
            next();
        });  
    }else if(!token){
        res.status(401).json({ error: 'User not authorized'});
        return;
    }
}catch(e){
        res.status(401).json({ error: 'An error occurred'});
    }

}


module.exports = validateToken;