
import jwt from 'jsonwebtoken';

export function auth(req,res,next){
  const h = req.headers.authorization || '';
  const token = h.startsWith('Bearer ') ? h.slice(7) : null;
  if(!token) return res.status(401).json({ message:'No token' });
  try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  }catch(e){
    return res.status(401).json({ message:'Invalid token' });
  }
}
