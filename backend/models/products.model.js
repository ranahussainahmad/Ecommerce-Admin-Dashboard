import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    category: {type: String, required: true},
    stock: {type: Number, required: true},
    imageUrl: {type: String, required: true},
}, {timestamps: true});


const Products = mongoose.model('Products', productSchema);
export default Products;
