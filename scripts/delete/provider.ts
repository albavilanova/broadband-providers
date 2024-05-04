// DELETE OPERATION: Delete providers

import db from "../../src/db";
import { checkArgs } from "../../src/aux";

const [_bun, _script, ...args] = process.argv;

// Delete all providers
if (process.argv.length === 2) {
    const providers = await db.provider.deleteMany({});
    if (providers.count > 0) {
        console.log(`All providers (${providers.count}) have been deleted`);
    } else {
        console.error("There are no providers to delete");
    }
}