// READ OPERATION: Find providers

import db from "../../src/db";
import { getProvidersByArgs } from "../../src/main";

const [_bun, _script, ...args] = process.argv;

// Show all providers
if (process.argv.length === 2) {
  const providers = await db.provider.findMany({});
  console.log("All providers: \n", providers);

  // Show available providers by condition
} else if (process.argv.length >= 3 && process.argv.length <= 4) {
  const providers = await getProvidersByArgs();
  if (providers.length > 0) {
    console.log(`All providers with required conditions: \n`, providers);
  } else {
    console.log("No providers were found");
  }

  // Return error if less than 2 or more than 4 arguments have been passed
} else {
  console.error(
    "Usage: bun provider.ts --name=<name> --headquarters=<headquarters>"
  );
  process.exit(1);
}
