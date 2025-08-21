
import mongoose from 'mongoose';

const WholesalerUserSchema = new mongoose.Schema({
  companyName:{ type:String, required:true },
  fullName:   { type:String, required:true },
  loginName:  { type:String, required:true, unique:true },
  email:      { type:String, required:true, unique:true },
  phoneNumber: String,
  billingAddress: String,
  shippingAddress: String,
  password:   { type:String, required:true },
  role: { type:String, default:'wholesaler' }
},{timestamps:true});

export default mongoose.model('WholesalerUser', WholesalerUserSchema);
