import jwt from 'jsonwebtoken'

const authUser = async (req, res, next) => {
    const { token } = req.headers;
    if (!token) {
        return resizeBy.json({ success: false, message: 'Not Authorized Login Again'})
    }
    try{
        const token_decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId= token_decoded.id
        next()
    }
    catch(error){
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
import jwt from 'jsonwebtoken';

export const verifyUser = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ success: false, message: "Access denied. No token provided." });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        next();
    } catch (err) {
        res.status(400).json({ success: false, message: "Invalid token" });
    }
};

export default authUser;