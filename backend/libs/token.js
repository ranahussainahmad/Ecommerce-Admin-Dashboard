import jwt from 'jsonwebtoken';
export const generateToken = (userid, res) => {
    const token = jwt.sign({ id: userid }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie("jwt", token);
    return token;
}
