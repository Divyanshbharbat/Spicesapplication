/**
 * Product Schema (JavaScript Object Shape)
 * 
 * id: unique identifier (number)
 * name: product name (string)
 * category: product category (string)
 * description: product description (string)
 * price: product price (number)
 * image: product image URL/path (string)
 */
import mongoose from 'mongoose';
const productSchema = {
  id: 'number',
  name: 'string',
 
  description: 'string',
  price: 'number',
  image: 'string',
};

let products=mongoose.model("products",productSchema)
// Example product data following schema:
const data = [
  {
    id: 1,
    name: 'Red Mirchi Powder',
    category: 'Spices',
    description: 'Our Red Mirchi Powder is sun-dried and stone-ground from handpicked chilies, delivering a bold flavor and vibrant color. Ideal for curries, tadkas, and marinades, it adds a fiery kick without compromising on purity.',
    price: 120,
    image: 'https://cdn.leonardo.ai/users/8b49d567-5c2e-49dc-9bc4-d236e559f380/generations/bdd821bc-5f8e-445f-815b-67fde22b8c9d/Leonardo_Phoenix_10_A_vibrant_and_appetizing_image_of_a_small_3.jpg'
  },
  {
    id: 2,
    name: 'Whole Dhaniya Seeds',
    category: 'Seeds',
    description: 'Sourced from organic farms, these whole coriander seeds are packed with citrusy aroma and essential oils. Roast and grind for fresh spice blends or use whole to temper dals, curries, and pickles.',
    price: 80,
    image: 'https://cdn.leonardo.ai/users/8b49d567-5c2e-49dc-9bc4-d236e559f380/generations/d472ca16-63b0-41fe-a88c-3b4a18264dd7/Leonardo_Phoenix_10_A_vibrant_and_visually_appealing_image_of_2.jpg'
  },
  {
    id: 3,
    name: 'Pure Haldi Powder',
    category: 'Powders',
    description: 'Made from Lakadong turmeric roots, this pure haldi powder is stone-ground to preserve curcumin content and aroma. Known for its anti-inflammatory properties, it’s perfect for golden milk, curries, and Ayurvedic healing.',
    price: 90,
    image: 'https://cdn.leonardo.ai/users/91c398ec-b0c3-4153-970f-9ac8075e2f67/generations/b3ebc1f9-ae6f-4919-abd9-67e958dc02d3/segments/4:4:1/Flux_Dev_A_highquality_visually_appealing_image_of_a_container_3.jpg'
  }
];


// let y=async ()=>{
//  let t=await products.insertMany(data);
//  console.log(t)
// }
// y()
// mongoose.connect("mongodb+srv://bharbatdivyansh1:bharbatdivyansh1@cluster0.h9b4ii8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
//   .then(() => console.log("MongoDB connected successfully"))
//   .catch(err => console.error("MongoDB connection error", err));

export default products;
