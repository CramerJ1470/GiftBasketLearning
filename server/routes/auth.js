
import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import AdminUser from '../models/AdminUser.js';
import WholesalerUser from '../models/WholesalerUser.js';
import { auth } from '../middleware/auth.js';
import { requireRole } from '../middleware/role.js';

const router = Router();

router.post('/register', async (req,res)=>{
  try{
    const { role } = req.body;
    const password = await bcrypt.hash(req.body.password, 10);

    if(role === 'admin'){
      const { fullName, loginName, email, phoneNumber, address } = req.body;
      const user = await AdminUser.create({ fullName, loginName, email, phoneNumber, address, password });
      return res.json({ message:'Admin registered', id:user._id });
    }else if(role === 'wholesaler'){
      const { companyName, fullName, loginName, email, phoneNumber, billingAddress, shippingAddress } = req.body;
      const user = await WholesalerUser.create({ companyName, fullName, loginName, email, phoneNumber, billingAddress, shippingAddress, password });
      return res.json({ message:'Wholesaler registered', id:user._id });
    }
    return res.status(400).json({ message:'Invalid role' });
  }catch(e){
    res.status(400).json({ message:'Registration failed', error:e.message });
  }
});

router.post('/login', async (req,res)=>{
  try{
    const { loginName, password } = req.body;
    let user = await AdminUser.findOne({ loginName });
    let role = 'admin';
    if(!user){ user = await WholesalerUser.findOne({ loginName }); role='wholesaler'; }
    if(!user) return res.status(404).json({ message:'User not found' });
    const ok = await bcrypt.compare(password, user.password);
    if(!ok) return res.status(401).json({ message:'Invalid password' });
    const token = jwt.sign({ id:user._id.toString(), role, name:user.fullName }, process.env.JWT_SECRET, { expiresIn:'7d' });
    res.json({ token, role, name:user.fullName });
  }catch(e){
    res.status(500).json({ message:'Login failed', error:e.message });
  }
});

// Admin-only list of users (sanitized)
router.get('/users', auth, requireRole('admin'), async (req,res)=>{
  try{
    const admins = await AdminUser.find({}, '-password');
    const wholesalers = await WholesalerUser.find({}, '-password');
    res.json({ admins, wholesalers });
  }catch(e){
    res.status(500).json({ message:'Failed to list users' });
  }
});

export default router;
