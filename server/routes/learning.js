
import { Router } from 'express';
import LearningResource from '../models/LearningResource.js';
import { auth } from '../middleware/auth.js';
import { requireRole } from '../middleware/role.js';

const router = Router();

async function seedIfEmpty(){
  const c = await LearningResource.countDocuments();
  if(c>0) return;
  await LearningResource.insertMany([
    { title:'Wholesale Program Overview (PDF)', type:'pdf', url:'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf', description:'Basics of our wholesale program.' },
    { title:'Packaging Tips (Video)', type:'video', url:'https://www.youtube.com/embed/aqz-KE-bpKQ', description:'How to pack and present baskets.' }
  ]);
}

router.get('/', auth, async (req,res)=>{
  await seedIfEmpty();
  const docs = await LearningResource.find({ published:true }).sort({ createdAt:-1 });
  res.json(docs);
});

router.post('/', auth, requireRole('admin'), async (req,res)=>{
  const created = await LearningResource.create(req.body);
  res.json(created);
});

router.put('/:id', auth, requireRole('admin'), async (req,res)=>{
  const updated = await LearningResource.findByIdAndUpdate(req.params.id, req.body, { new:true });
  res.json(updated);
});

router.delete('/:id', auth, requireRole('admin'), async (req,res)=>{
  await LearningResource.findByIdAndDelete(req.params.id);
  res.json({ ok:true });
});

export default router;
