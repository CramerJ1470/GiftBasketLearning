
import { Router } from 'express';
import Product from '../models/Product.js';

const router = Router();

async function seed() {
  const count = await Product.countDocuments();
  if(count>0) return;
  await Product.insertMany([
    { name:'Small Basket', sku:'GB-SMALL', description:'Perfect starter assortment.', price:2999, imageUrl:'https://source.unsplash.com/featured/?gift-basket,small', size:'small' },
    { name:'Medium Basket', sku:'GB-MED', description:'Our most popular mid-size.', price:4999, imageUrl:'https://source.unsplash.com/featured/?gift-basket,medium', size:'medium' },
    { name:'Large Basket (HO)', sku:'GB-LG-HO', description:'Holiday-oriented premium.', price:8999, imageUrl:'https://source.unsplash.com/featured/?holiday,gift-basket,large', size:'largeHO' },
    { name:'Large Basket (NHO)', sku:'GB-LG-NHO', description:'Non-holiday gourmet.', price:8999, imageUrl:'https://source.unsplash.com/featured/?gourmet,gift-basket,large', size:'largeNHO' }
  ]);
}

router.get('/', async (req,res)=>{
  await seed();
  const products = await Product.find({}).sort({ price:1 });
  res.json(products);
});

export default router;
