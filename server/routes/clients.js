
import { Router } from 'express';
import { auth } from '../middleware/auth.js';
import ClientContact from '../models/ClientContact.js';

const router = Router();

router.get('/', auth, async (req,res)=>{
  const items = await ClientContact.find({ userId:req.user.id }).sort({ createdAt:-1 });
  res.json(items);
});

router.post('/', auth, async (req,res)=>{
  const created = await ClientContact.create({ userId:req.user.id, ...req.body });
  res.json(created);
});

router.put('/:id', auth, async (req,res)=>{
  const updated = await ClientContact.findOneAndUpdate({ _id:req.params.id, userId:req.user.id }, req.body, { new:true });
  if(!updated) return res.status(404).json({ message:'Not found' });
  res.json(updated);
});

router.delete('/:id', auth, async (req,res)=>{
  const deleted = await ClientContact.findOneAndDelete({ _id:req.params.id, userId:req.user.id });
  if(!deleted) return res.status(404).json({ message:'Not found' });
  res.json({ ok:true });
});

export default router;
