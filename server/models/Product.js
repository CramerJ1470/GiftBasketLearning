
import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: { type:String, required:true },
  sku:  { type:String, required:true, unique:true },
  description: String,
  price: { type:Number, required:true }, // cents
  imageUrl: String,
  size: { type:String, enum:['small','medium','largeHO','largeNHO'], required:true }
},{timestamps:true});

export default mongoose.model('Product', ProductSchema);
