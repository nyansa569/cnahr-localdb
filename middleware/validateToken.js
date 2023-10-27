
const jwt   = require('jsonwebtoken');

const validateToken = async(req, res, next)=>{
    let token;
    let authHeader = req.headers.authorization || req.headers['Authorization'];
    try{
        if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded)=>{
            if(err){
                res.status(401).json({ error: 'invalid token' });
                return;
            }
            console.log('decoded: '+JSON.stringify(decoded));
            req.user = decoded.user; 
             
            console.log('user id '+ req.user.id)
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