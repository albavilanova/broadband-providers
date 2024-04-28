import { PrismaClient } from "@prisma/client";
import fs from "fs";

const db = new PrismaClient();

// Add data to providers table
const providersInfo = JSON.parse(fs.readFileSync("./prisma/providers.json", "utf-8"));
const providers = await db.provider.createMany({
    data: providersInfo.map((provider: any) => ({
        name: provider.name,
        headquarters: provider.headquarters,
        products: {
            createMany: {
                data: provider.products.map((product: any) => ({
                    name: product.name,
                    price: product.price,
                    countries: product.countries
                }))
            }
        }
    }))
});

console.log("Providers table was created")