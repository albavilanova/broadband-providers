// DELETE OPERATION: Delete providers

import db from "../../src/db";
import { getProvidersByArgs } from "../../src/main";

const [_bun, _script, ...args] = process.argv;

// Delete all providers
if (process.argv.length === 2) {
  const providers = await db.provider.deleteMany({});
  if (providers.count > 0) {
    console.log(`All providers (${providers.count}) have been deleted`);
  } else {
    console.error("There are no providers to delete");
  }

// Delete providers by condition
} else if (process.argv.length >= 3 && process.argv.length <= 4) {
  const providers = await getProvidersByArgs();
  if (providers.length > 0) {
    for (const provider of providers) {
      try {
        await db.provider.delete({
          where: {
            providerId: provider.providerId,
          },
        });
        console.log(`Provider with ID ${provider.providerId} was successfully deleted`)
      } catch (e) {
        console.error(
          `There was an error deleting the provider with ID ${provider.providerId}`
        );
      }
    }
  } else {
    console.error("There are no providers to delete with these conditions");
  }

// Return error if less than 2 or more than 4 arguments have been passed
} else {
    console.error(
      "Usage: bun scripts/delete/provider.ts --name=<name> --headquarters=<headquarters>"
    );
    process.exit(1);
}