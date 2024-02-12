import jwt, { verify } from 'jsonwebtoken';

export const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if(!token) {
        return res.json({Error: "You are mot authenticated"});
    }else {
        jwt.verify(token, "jwt-secret-key", (err, decoded) => {
            if(err) {
                return res.json({Error: "Token is not okey"});
            }else {
                req.id = decoded.id;
                req.nama_user = decoded.nama_user;
                req.role = decoded.role;
                next();
            }
        })
    }
}