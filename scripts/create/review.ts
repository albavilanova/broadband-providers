// CREATE OPERATION: Create a new review
// Run using bun run review.ts <productName> <email> <title> <rating> <message>

import db from "../db";

// Get args from command line
if (process.argv.length !== 6 && process.argv.length !== 7) {
  console.error(
    "Usage: bun review.ts <productName> <email> <title> <rating> <message>"
  );
  process.exit(1);
}
const [_bun, _script, ...args] = process.argv;

// Store review in db
try {
  // Get arguments from command line
  const [productName, email, title, rating, message] = args;
  
  // Convert rating to int
  const ratingNumber = parseInt(rating)

  // Get user and product
  const user = await db.user.findUnique({
    where: {
      email
    },
  });
  const product = await db.product.findUnique({
    where: {
      name: productName
    },
  });

  // Create new review
  if (user !== null && product !== null) {
    const newReview = await db.review.create({
        data: {
        title,
        message: message || undefined,
        rating: ratingNumber,
        userId: user.userId,
        productId: product.productId
        },
    });
    console.log("You created a new review:", newReview);
  } else {
    console.error("User or product could not be retrieved from database, please update.")
  }
} catch (e) {
  console.error(`There was an error creating the review: ${e}`);
}
