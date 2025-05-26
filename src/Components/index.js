import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcrypt';
import cors from 'cors';
import dotenv from 'dotenv';

import products from './product.js';
import User from './user.js';
import Order from './Order.js';
// import contact from './contact.js';

import nodemailer from 'nodemailer'
// Configure environment variables
dotenv.config();

// Initialize Express app
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// const corsOptions = {
//   origin: 'https://firstbitecakeshop.vercel.app', // Replace with your frontend's origin
//   credentials: true, // Allow cookies and other credentials
// };
// const corsOptions = {
//   origin: 'https://firstbitecakeshop.vercel.app', // Replace with your frontend's origin
//   credentials: true, // Allow cookies and other credentials
// };
// const corsOptions = {
//   origin: 'http://localhost:5173', // Replace with your frontend's origin
//   credentials: true, // Allow cookies and other credentials
// };

// app.use(cookieParser());
const corsOptions = {
  origin: 'https://spiceswebapplication.vercel.app',
  credentials: true,
};

app.use(cors(corsOptions));
// JWT Middleware for regular user
const jwtMiddleware = (req, res, next) => {
  const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).send("fail");
  }

  try {
    const decoded = jwt.verify(token, "divyansh");
    req.user = decoded;
    console.log(req.user) // Attach the decoded token to the request object
    // Log user info for debugging
    next(); // Proceed with the next middleware
  } catch (error) {

     res.send("fail");
  }
};



// Sign up route
app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: "Username, email, and password are required" });
  }

  try {
    const existingUser = await User.findOne({ email });
console.log(existingUser)
    if (existingUser) {
        return res.send("fail");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    return res.send("success");
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Login route
app.post("/login", async (req, res) => {

  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log(isPasswordValid)
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    const token = jwt.sign({ username },"divyansh", { expiresIn: "1h" });

   res.send({ message:"success", token: token });

  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.post('/api/cart/add', jwtMiddleware, async (req, res) => {
  try {
    const username = req.user.username;
    const product = req.body.product;
console.log(req.body)
    // Ensure product and product.id are valid
    if (!product || typeof product.id !== 'number') {
      return res.status(400).json({ message: 'Invalid product data or missing id' });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    
    // Check if product already exists in the cart
    const existingItem = user.cart.find(item => item.id === product.id);
    
    if (existingItem) {
      return res.status(409).json({ message: 'Product already in cart' });
    }

    // Add product to cart
    user.cart.push({
      id: product.id,
      name: product.name || '',
      description: product.description || '',
      quantity: 1,
      price: product.price || 0,
      image: product.image || ''
    });

  let r=  await user.save();
  console.log(r)

    res.status(200).json({ message: 'Product successfully added to cart' });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/orders/history', jwtMiddleware, async (req, res) => {
  try {
    const username = req.user.username;

    // Find user to get user ID (if needed)
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Find orders linked to this user by ObjectId refs or user details
    // Assuming orders have userDetails.email or userDetails.name matching user data OR user ID in order schema
    // Adjust query based on your Order schema user linking approach

    const orders = await Order.find({ 'userDetails.email': user.email }).sort({ placedAt: -1 });

    return res.json({ orders });
  } catch (error) {
    console.error('Error fetching order history:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
// Get home data
app.get("/gethomedata", async (req, res) => {
  try {
    let data = await products.find();
  // optional for debugging
    res.json(data); // ✅ Send data back to the frontend
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching home data" });
  }
});

app.post('/addtocart', jwtMiddleware, async (req, res) => {
  try {
    const userId = req.user.id; // or whatever your token payload key is
    const { productId, quantity } = req.body;

    if (!productId) return res.status(400).json({ message: 'Product ID required' });

    // Check product exists
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    // Find user
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Check if product already in cart
    const existingIndex = user.cart.findIndex(item => item.productId.toString() === productId);

    if (existingIndex > -1) {
      // If exists, update quantity
      user.cart[existingIndex].quantity += quantity || 1;
    } else {
      // Else add new product with quantity
      user.cart.push({ productId, quantity: quantity || 1 });
    }

    await user.save();

    res.json({ message: 'Product added to cart', cart: user.cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});
app.post('/api/cart/update', jwtMiddleware, async (req, res) => {
  try {
    const username = req.user.username;
    const { id, action } = req.body;
    console.log(req.body)

    if (!id || !['increment', 'decrement'].includes(action)) {
      return res.status(400).json({ message: 'Invalid request data' });
    }

    const user = await User.findOne({ username });

    if (!user) return res.status(404).json({ message: 'User not found' });

    const item = user.cart.find(product => product.id === id);

    if (!item) return res.status(404).json({ message: 'Item not found in cart' });

    if (action === 'increment') {
      item.quantity += 1;
    } else if (action === 'decrement') {
      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        // Optional: remove item if quantity is 1
        user.cart = user.cart.filter(product => product.id !== id);
      }
    }

    await user.save();

    res.json({ message: 'Cart updated successfully', cart: user.cart });
  } catch (error) {
    console.error('Cart update error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Place an order (with JWT Middleware)
app.post("/placeorder", jwtMiddleware, async (req, res) => {
  const user = req.user; // Retrieved from jwtMiddleware
  const { price, quantity, username, mobile, address, _id } = req.body;

  try {
    // Find the user by username (from JWT)
    const existingUser = await User.findOne({ username: user.username });
    if (!existingUser) {
      return res.status(404).send("User not found");
    }

    // Create a new product (order)
    const newProduct = new userdata({ price, quantity, username, mobile, address });
    const savedProduct = await newProduct.save();

    // Add the saved product reference to the user's items array
    existingUser.userinfo.push(savedProduct._id); // Add product ID
    await existingUser.save(); // Ensure this is saved after modifying the array

    res.status(200).send("Order placed successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred while placing the order");
  }
});

// Admin route for checking admin status (using JWT Middleware for admin)


// Get joy data


// Get review data


// Add review route

// Contact form submission route
app.post("/contacts", async (req, res) => {
  const { username, email, mobile, message } = req.body;

  try {
    let newContact = new contact({ username, email, mobile, message });
    await newContact.save();
    res.send("success");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error submitting contact form");
  }
});
//uejuxvsnsyvotsgg
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'bharbatdivyansh1@gmail.com',     // your email
    pass: 'uejuxvsnsyvotsgg',     // your Gmail app password
  }
});
app.post('/api/placeorder', jwtMiddleware, async (req, res) => {
  try {
    const username = req.user.username;
    const { cart, address, phone } = req.body;
console.log(cart)
    if (!cart || cart.length === 0)
      return res.status(400).json({ message: 'Cart is empty' });

    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    // 📨 Create HTML for the email
    const itemListHTML = cart.map(item => `
      <li>
        <strong>${item.name}</strong> - ₹${item.price} × ${item.quantity} = ₹${item.price * item.quantity}
      </li>
    `).join("");

    const mailOptions = {
      from: 'bharbatdivyansh1@gmail.com',
      to: 'bharbatdivyansh1@gmail.com', // or use a fixed email like 'admin@example.com'
      subject: "Your Order Confirmation - Spice Shop",
      html: `
        <h2>Hi ${user.username}, thanks for your order!</h2>
        <p>Here are your order details:</p>
        <ul>${itemListHTML}</ul>
        <p><strong>Total Price:</strong> ₹${totalPrice}</p>
        <p><strong>Shipping Address:</strong> ${address}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <br/>
        <p>We will notify you once the order is shipped.</p>
        <p>Best regards,<br/>Spice Shop Team</p>
      `,
    };

    // ✅ Send email before saving order
    await transporter.sendMail(mailOptions);

    // 🛒 Save the order
    const order = new Order({
      userDetails: {
        name: user.username,
        email: user.email,
      },
      address,
      phone,
      products: cart.map(item => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      totalPrice,
    });

    const savedOrder = await order.save();

    // 📦 Update user & clear cart
    user.orders.push(savedOrder._id);
    user.cart = [];
   let r= await user.save();

    res.json({ message: 'Order placed successfully. Confirmation email sent.', orderId: savedOrder._id });
  } catch (error) {
    console.error('Order placement error:', error);
    res.status(500).json({ message: 'Server error placing order' });
  }
});
import Review from './review.js';
app.get('/api/reviews', async (req, res) => {
  try {
    const reviews = await Review.find();  // Fetch all reviews
    res.json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});
app.get("/api/cart/count",jwtMiddleware, async (req, res) => {
  try {
    
    const userCookie = req.user.username; // get cookie named 'cookie'

    if (!userCookie) {
      return res.status(401).json({ error: "Not authenticated: No cookie found" });
    }

    // Here we assume the cookie value is the username (simple example)
    const username = userCookie;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Sum quantity of all cart items
    const cartCount = user.cart.reduce((acc, item) => acc + (item.quantity || 0), 0);

    return res.json({ count: cartCount });

  } catch (error) {
    console.error("Error in cart count API:", error);
    return res.status(500).json({ error: "Server error" });
  }
});
app.post('/api/reviews/add', jwtMiddleware, async (req, res) => {
  const { comment, rating } = req.body;

  if (!comment || typeof rating !== 'number') {
    return res.status(400).json({ error: 'Comment and rating are required.' });
  }

  try {
    const newReview = new Review({
      name: req.user.username,  // or get from req.user if available
      rating,
      comment,
    });

    const savedReview = await newReview.save();  // save to DB

    res.json({ message: 'Review added successfully', review: savedReview });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add review' });
  }
});

// app.post('/api/placeorder', jwtMiddleware, async (req, res) => {
//   try {
//     const username = req.user.username;
//     const { cart, address, phone } = req.body;

//     if (!cart || cart.length === 0) return res.status(400).json({ message: 'Cart is empty' });

//     const user = await User.findOne({ username });
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

//     const order = new Order({
//       userDetails: {
//         name: user.username,
//         email: user.email,
//       },
//       address,
//       phone,
//       products: cart.map(item => ({
//         name: item.name,
//         price: item.price,
//         quantity: item.quantity,
//       })),
//       totalPrice,
//     });

//     const savedOrder = await order.save();

//     // Add order ref to user and clear cart
//     user.orders.push(savedOrder._id);
//     user.cart = [];
//     await user.save();

//     res.json({ message: 'Order placed successfully', orderId: savedOrder._id });
//   } catch (error) {
//     console.error('Order placement error:', error);
//     res.status(500).json({ message: 'Server error placing order' });
//   }
// });
app.get('/api/cart', jwtMiddleware, async (req, res) => {
  try {
   
    const username = req.user.username;

    const user = await User.findOne({ username });

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({ cart: user.cart });
  } catch (error) {
    console.error('Fetch cart error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.delete('/api/cart/:id', jwtMiddleware, async (req, res) => {
  const username = req.user.username; // Extracted from JWT
  const itemId = req.params.id;

  try {
    const user = await User.findOneAndUpdate(
      { username },
      { $pull: { cart: { id: itemId } } }, // remove cart item by its MongoDB _id
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const itemStillExists = user.cart.find(item => item.id.toString() === itemId);
    if (itemStillExists) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    res.json({ message: 'Item removed successfully', cart: user.cart });
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).json({ error: 'Failed to delete item' });
  }
});


// Use router for specific routes

// mongodb://localhost:27017
// Connect to MongoDB
// mongoose.connect(process.env.VITE_URLS)
mongoose.connect("mongodb://localhost:27017/powder")
  .then(() => console.log("MongoDB connected successfully"))
  .catch(err => console.error("MongoDB connection error", err));

// Start the Express server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});