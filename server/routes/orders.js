
import { Router } from 'express';
import Order from '../models/Order.js';
import { auth } from '../middleware/auth.js';
import { requireRole } from '../middleware/role.js';

const router = Router();

// Admin: list all
router.get('/', auth, requireRole('admin'), async (req,res)=>{
  try{
    const orders = await Order.find({}).sort({ createdAt:-1 });
    res.json(orders);
  }catch(e){
    res.status(500).json({ message:'Failed to fetch orders' });
  }
});

// Wholesaler: my orders
router.get('/mine', auth, async (req,res)=>{
  try{
    const orders = await Order.find({ userId:req.user.id }).sort({ createdAt:-1 });
    res.json(orders);
  }catch(e){
    res.status(500).json({ message:'Failed to fetch my orders' });
  }
});

// Create order (no Stripe)
router.post('/', auth, async (req,res)=>{
  try{
    const { items } = req.body;
    const total = items.reduce((s,i)=> s + (i.price * i.quantity), 0);
    const order = await Order.create({
      userId: req.user.id,
      role: req.user.role,
      items,
      total,
      status: 'pending'
    });
    res.json(order);
  }catch(e){
    res.status(400).json({ message:'Failed to create order' });
  }
});

export default router;
