
import mongoose from 'mongoose';

const OrderItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref:'Product' },
  name: String,
  quantity: Number,
  price: Number,
  imageUrl: String
},{ _id:false });

const OrderSchema = new mongoose.Schema({
  userId: { type:String, required:true },
  role: { type:String, enum:['admin','wholesaler'], required:true },
  items: [OrderItemSchema],
  total: Number,
  status: { type:String, default:'pending' }
},{timestamps:true});

export default mongoose.model('Order', OrderSchema);
