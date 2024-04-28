import db from "./db";

// First test: Create a new user
// Run using bun run new-user.ts <first-name> <last-name> <organization> <position> <emails>

// Get args from command line
if (process.argv.length < 7) {
    console.error("Usage: bun new-user.ts <first-name> <last-name> <organization> <position> <emails>");
    process.exit(1);
}
const [_bun, _script, ...args] = process.argv;

// Store user in db
try {
    const [firstName, lastName, organization, position, ...emails] = args;
    const newUser = await db.user.create({
        data: {
        firstName,
        lastName,
        position,
        organization,
        emails: emails
        }
    });
    console.log("You created a new user:", newUser);
} catch (e) {
    console.error(`There was an error creating the user: ${e}`)
}