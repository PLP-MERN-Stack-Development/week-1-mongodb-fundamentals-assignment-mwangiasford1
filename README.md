Bookstore Database Management using MongoDB 📚
Overview
This project implements a MongoDB-powered book collection, allowing efficient data storage, retrieval, and management using Node.js and MongoDB.

Features
✅ Insert, update, delete, and query book data ✅ Aggregation pipelines for analytics ✅ Indexing for optimized search performance ✅ Pagination for scalable data browsing

Setup Instructions
1. Install Dependencies
Ensure you have Node.js and MongoDB installed.

Run:

bash
npm install mongodb
2. Start MongoDB
Run MongoDB locally:

bash
mongod
Or connect to MongoDB Atlas.

3. Run Data Insertion Script
Insert book data using:

bash
node insert_books.js
Database Schema
Each book document follows this format:

json
{
    "title": "1984",
    "author": "George Orwell",
    "genre": "Dystopian",
    "published_year": 1949,
    "price": 10.99,
    "in_stock": true,
    "pages": 328,
    "publisher": "Secker & Warburg"
}
Usage Examples
Find books in a specific genre
js
db.books.find({ genre: "Fiction" }).pretty();
Find books published after 2010
js
db.books.find({ published_year: { $gt: 2010 } }).pretty();
Find books by a specific author
js
db.books.find({ author: "George Orwell" }).pretty();
Update the price of a book
js
db.books.updateOne({ title: "1984" }, { $set: { price: 12.99 } });
Delete a book by its title
js
db.books.deleteOne({ title: "The Great Gatsby" });
Performance Optimizations
Creating Indexes
js
db.books.createIndex({ title: 1 });  // Index for faster searches
db.books.createIndex({ author: 1, published_year: -1 });  // Compound index
Aggregation Pipeline Examples
Find the average price of books by genre
js
db.books.aggregate([
    { $group: { _id: "$genre", averagePrice: { $avg: "$price" } } }
]);
Find the author with the most books
js
db.books.aggregate([
    { $group: { _id: "$author", bookCount: { $sum: 1 } } },
    { $sort: { bookCount: -1 } },
    { $limit: 1 }
]);
License
This project is open-source. Feel free to modify and use it!
