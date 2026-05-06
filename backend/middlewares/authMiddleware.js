import jwt from "jsonwebtoken"; 

export default function (req, res, next) {
    if (req.method === 'OPTIONS') {
        return next()
    }

    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message: 'not autorized'
            })
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY)

        req.user = decoded
        next()
    } catch (err) {
        res.status(403).json({
            message: 'not autorized'
        })
    }
}