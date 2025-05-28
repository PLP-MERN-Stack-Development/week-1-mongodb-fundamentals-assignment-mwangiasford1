### Task 2: Basic CRUD Operations
//1. Find all books in a specific genre
1.db.books.find({ genre: "Fiction" }).pretty();
//2. Find all books published after 1950
2.db.books.find({ published_year: { $gt: 1950 } }).pretty();
//3. Find all books by a specific author
3db.books.find({ author: "George Orwell" }).pretty();
//4. Update the price of a specific book
4.db.books.updateOne(
   { title: "1984" },
   { $set: { price: 12.99 } }
);
//5. Delete a book by title
5.db.books.deleteOne({ title: "To Kill a Mockingbird" });

### Task 3: Advanced Queries
1. db.books.find(
    { in_stock: true, published_year: { $gt: 2010 } },
    { title: 1, author: 1, price: 1, _id: 0 } // Projection to return only title, author, and price
);
// Sorting by price in ascending order
2. db.books.find(
    { in_stock: true, published_year: { $gt: 2010 } },
    { title: 1, author: 1, price: 1, _id: 0 } //
).sort({ price: 1 });
// Sorting by price in descending order
 db.books.find(
    { in_stock: true, published_year: { $gt: 2010 } },
    { title: 1, author: 1, price: 1, _id: 0 }
).sort({ price: -1 });

3. const page = 2; // Change this to fetch different pages
const pageSize = 5;

db.books.find(
    { in_stock: true, published_year: { $gt: 2010 } },
    { title: 1, author: 1, price: 1, _id: 0 }
).sort({ price: 1 }) // Sorting by price in ascending order
 .skip(pageSize * (page - 1)) // Skip previous pages
 .limit(pageSize); // Limit results to 5 books per page

### Task 4: Aggregation Pipeline

//grouping books by genre and calculating the average price
db.books.aggregate([
    {
        $group: {
            _id: "$genre",
            averagePrice: { $avg: "$price" }
        }
    }
]);

// Finding the most popular author based on the number of books
db.books.aggregate([
    {
        $group: {
            _id: "$author",
            bookCount: { $sum: 1 }
        }
    },
    { $sort: { bookCount: -1 } },
    { $limit: 1 }
]);

//Group books by publication decade and count them
db.books.aggregate([
    {
        $group: {
            _id: { $floor: { $divide: ["$published_year", 10] } },
            count: { $sum: 1 }
        }
    },
    {
        $project: {
            decade: { $concat: [{ $toString: "$_id" }, "0s"] },
            count: 1,
            _id: 0
        }
    },
    { $sort: { decade: 1 } }
]);

### Task 5: Indexing

// Create an index on the 'author' field to speed up queries filtering by author
db.books.createIndex({ title: 1 });

// Create a compound index on 'author' and 'published_year' to optimize queries filtering by both
db.books.createIndex({ author: 1, published_year: -1 });

//to use the explain method to analyze the performance of a query
db.books.find({ title: "1984" }).explain("executionStats");


