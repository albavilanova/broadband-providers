// UPDATE OPERATION: Update product

import db from "../../src/db";
import { checkArgs } from "../../src/main";

const [_bun, _script, ...args] = process.argv;

// Return error if less than 4 arguments have been passed
if (process.argv.length < 4) {
  console.error("The id and at least one more parameter must be passed");
  process.exit(1);

// Update product by id
} else if (process.argv.length <= 9) {
  // Check which conditions have been passed through command line
  const conditions = checkArgs([
    "id",
    "name",
    "providerName",
    "variables",
    "startDate",
    "endDate",
    "formats",
  ]);

  if (!conditions.hasOwnProperty("id")) {
    console.error("Product id must be passed");
    process.exit(1);
  }

  // Check if product exists
  const id = parseInt(conditions["id"]);
  const product = await db.product.findUnique({
    where: {
      productId: id,
    },
  });

  if (product !== null) {
    let provider;
    if (conditions.hasOwnProperty("providerName")) {
      // Get provider
      provider = await db.provider.findUnique({
        where: {
          name: conditions["providerName"],
        },
      });
    }

    // Get variables as string array if they have been passed
    let variablesArray: string[] = [];
    if (conditions.hasOwnProperty("variables")) {
      variablesArray = conditions["variables"]
        .split(",")
        .map((str) => str.trim());
    }
    nProperty("formats")) {
      formatsArray = conditions["formats"].split(",").map((str) => str.trim());
    }

    // Create dates
    let startDateJS;
    let endDateJS;
    if (conditions.hasOwnProperty("startDate")) {
      startDateJS = new Date(conditions["startDate"]);
      console.log(`Start date converted to ${startDateJS}`);
    }
    if (conditions.hasOwnProperty("endDate")) {
      endDateJS = new Date(conditions["endDate"]);
      console.log(`End date converted to ${endDateJS}`);
    }

    if (provider !== null || !conditions.hasOwnProperty("providerName")) {
      await db.product.update({
        where: {
          productId: id,
        },
        data: {
          name: conditions["name"],
          providerId:
            provider !== null && provider !== undefined
              ? provider.providerId
              : undefined,
          variables: variablesArray.length > 0 ? variablesArray : undefined,
          startDate: startDateJS,
          endDate: endDateJS,
          formats: formatsArray.length > 0 ? formatsArray : undefined,
        },
      });
      var msg = `Product with id ${conditions["id"]} has changed with this input: \n`;
      console.log(msg, conditions);
    } else {
      console.error(
        "It is not possible to update this product since the provider does not exist."
      );
    }
  } else {
    console.error(`Product with id ${conditions["id"]} does not exist in database`);
  }

// Return error if more than 9 arguments have been passed
} else {
  console.error(
    "Usage: bun scripts/update/product.ts --id=<id> --name=<name> --providerName=<providerName> --variables=<variables> --startDate=<startDate> --endDate=<endDate> --formats<formats>"
  );
  process.exit(1);
}
