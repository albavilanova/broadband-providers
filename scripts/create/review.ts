// CREATE OPERATION: Create a new review

import db from "../../src/db";
import { checkArgs } from "../../src/main";

// Get args from command line
if (process.argv.length !== 6 && process.argv.length !== 7) {
  console.error(
    "Usage: bun scripts/create/review.ts <productName> <email> <title> <rating> <message>"
  );
  process.exit(1);
}
const [_bun, _script, ...args] = process.argv;

// Store review in db
try {
  // Check which conditions have been passed through command line
  const args = ["productName", "email", "title", "rating", "message"];
  const conditions = checkArgs(args);
  args.some(function (arg, index) {
    if (!conditions.hasOwnProperty(arg)) {
      console.error(`Review ${arg} must be passed`);
      process.exit(1);
    }
  });

  // Convert rating to int
  const ratingNumber = parseInt(conditions["rating"]);

  // Get user and product
  const user = await db.user.findUnique({
    where: {
      email: conditions["email"],
    },
  });
  const product = await db.product.findUnique({
    where: {
      name: conditions["productName"],
    },
  });

  // Create new review
  if (user !== null && product !== null) {
    const newReview = await db.review.create({
      data: {
        title: conditions["title"],
        message: conditions["message"] || undefined,
        rating: ratingNumber,
        userId: user.userId,
        productId: product.productId,
      },
    });
    console.log("You created a new review: \n", newReview);
  } else {
    console.error(
      "User or product could not be retrieved from database, please update."
    );
  }
} catch (e) {
  console.error(`There was an error creating the review: ${e}`);
}
