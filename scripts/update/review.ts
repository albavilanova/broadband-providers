// UPDATE OPERATION: Update review

import db from "../../src/db";
import { checkArgs } from "../../src/main";

const [_bun, _script, ...args] = process.argv;

// Return error if less than 4 arguments have been passed
if (process.argv.length < 4) {
  console.error("The id and at least one more parameter must be passed");
  process.exit(1);

// Update review by id
} else {
  // Check which conditions have been passed through command line
  const conditions = checkArgs([
    "id",
    "title",
    "message",
    "rating"
  ]);

  if (!conditions.hasOwnProperty("id")) {
    console.error("Review id must be passed");
    process.exit(1);
  }

  // Check if review exists
  const id = parseInt(conditions["id"]);
  const review = await db.review.findUnique({
    where: {
      reviewId: id,
    },
  })

  // Convert rating to int
  let ratingNumber;
  if (conditions.hasOwnProperty("rating")) {
    ratingNumber = parseInt(conditions["rating"])
  }

  if (review !== null) {
    await db.review.update({
      where: {
        reviewId: id,
      },
      data: {
        title: conditions["title"],
        rating: ratingNumber,
        message: conditions["message"]
      },
    });
    var msg = `Review with id ${conditions["id"]} has changed with this input: \n`
    console.log(msg, conditions);
  } else {
    console.error(`Review with id ${conditions["id"]} does not exist in database`)
  }
}
