import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

// Add CustomWeather provider to table
const CustomWeather = await db.provider.create({
    data: {
        name: "CustomWeather",
        headquarters: "San Francisco, California, United States",
        products: {
            createMany: {
                data: [
                    {
                        "name": "Ski Resort Weather Forecasts And Condition Reports",
                        "price": "$225/month",
                        "countries": 248
                    },
                    {
                        "name": "Real-Time Earthquake Reports",
                        "price": "$150/month",
                        "countries": 249
                    }
                ]
            }
        }
    }
})
console.log("Provider CustomWeather was added")