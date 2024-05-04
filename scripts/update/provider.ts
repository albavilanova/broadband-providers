// UPDATE OPERATION: Update provider

import db from "../../src/db";
import { checkArgs } from "../../src/main";

const [_bun, _script, ...args] = process.argv;

// Return error if less than 4 arguments have been passed
if (process.argv.length < 4) {
  console.error("The id and at least one more parameter must be passed");
  process.exit(1);
} else {
  // Check which conditions have been passed through command line
  const conditions = checkArgs([
    "id",
    "name",
    "headquarters",
  ]);

  if (!conditions.hasOwnProperty("id")) {
    console.error("Provider id must be passed");
    process.exit(1);
  }

  const id = parseInt(conditions["id"]);
  const provider = await db.provider.findUnique({
    where: {
      providerId: id,
    },
  })

  if (provider !== null) {
    await db.provider.update({
      where: {
        providerId: id,
      },
      data: {
        name: conditions["name"],
        headquarters: conditions["headquarters"]
      },
    });
    var msg = `Provider with id ${conditions["id"]} has changed with this input: \n`
    console.log(msg, conditions);
  } else {
    console.error(`Provider id ${conditions["id"]} does not exist in database`)
  }
}
