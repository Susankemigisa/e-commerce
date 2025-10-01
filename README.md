#E-Commerce Dashboard

A simple e-commerce application with a vendor dashboard, allowing product management, inventory tracking, and sales overview. Built with Node.js, Express, MongoDB, Pug, and CSS.

📌 #Features

Vendor Dashboard

View key metrics:

Total Sales

Total Orders

In Stock (UGX) – green

Out of Stock – red

Add new products with image upload.

Products table showing ID, category, price, quantity.

Product Management

Create products: name, category, price, quantity, color, image.

Automatic ID assignment with # display.

Image upload using multer.

Inventory Insights

Total revenue calculation.

Expected revenue (sum of product prices).

Stock capital.

Out-of-stock count.

🛠 #Tech Stack

Backend: Node.js, Express

Database: MongoDB, Mongoose

Frontend: Pug, CSS

File Upload: Multer

Session Management: express-session, connect-mongo

⚡ #Installation

Clone the repository:

git clone https://github.com/Susankemigisa/e-commerce.git
cd e-commerce


Install dependencies:

npm install


Create uploads folder:

mkdir -p public/uploads

🚀 #Usage

Start MongoDB locally:

mongod


Run the server:

npm start


Open your browser at:

http://localhost:3001/vendorDashboard

📁 File Structure
e-commerce/
│
├─ config/
│   └─ db.js            # MongoDB connection
│
├─ models/
│   └─ productsModel.js # Product schema
│
├─ public/
│   ├─ css/             # Stylesheets
│   └─ uploads/         # Uploaded images
│
├─ routes/
│   └─ vendorRoutes.js  # Vendor-related routes
│
├─ views/
│   ├─ layout.pug       # Base template
│   └─ vendor.pug       # Dashboard template
│
├─ screenshots/         # Add your screenshots here
├─ .env
├─ package.json
└─ server.js            # Main app entry

✅ #Notes

Ensure public/uploads folder exists and is writable for image uploads.

IDs in the products table display with a #.

Cards are color-coded:

In Stock: Green

Out of Stock: Red

Sales + Orders: Combined card with vertical divider.

🔮 #Future Improvements

Add user authentication for multiple vendors.

Enable AJAX product saving fully for seamless updates.

Add category filtering and search in the table.

Include charts for sales history.

⚖️ #License

MIT License © 2025 Kemigisa Suzan
