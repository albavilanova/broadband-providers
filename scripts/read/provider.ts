// READ OPERATION: Find providers

import db from "../../src/db";
import { checkArgs } from "../../src/aux";

const [_bun, _script, ...args] = process.argv;

// Show all providers
if (process.argv.length === 2) {
    const providers = await db.provider.findMany({});
    console.log("All providers: \n", providers);

// Show available providers by condition
} else if (process.argv.length >= 3 && process.argv.length <= 4) {
    // Check which conditions have been passed through command line
    const conditions = checkArgs(["name", "headquarters"]);
    if (conditions) {

        // Find providers
        const providers = await db.provider.findMany({
            where: {
                name: conditions["name"],
                headquarters: conditions["headquarters"]
            },
        });
  
      if (providers.length > 0) {
        console.log(`All providers with required conditions: \n`, providers);
      } else {
        console.log("No providers were found");
      }
    }
// Return error if less than 2 or more than 4 arguments have been passed
} else {
    console.error(
      "Usage: bun provider.ts --name=<name> --headquarters=<headquarters>"
    );
    process.exit(1);
}
