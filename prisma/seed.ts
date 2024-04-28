import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

// Add CustomWeather provider
const CustomWeather = await db.provider.create({
    data: {
        name: "CustomWeather",
        headquarters: "United States",
        products: {
            createMany: {
                data: [
                    {
                        "name": "Ski Resort Weather Forecasts And Condition Reports",
                        "coverage": ["Global"]
                    },
                    {
                        "name": "Real-Time Earthquake Reports",
                        "coverage": ["Global"]
                    }
                ]
            }
        }
    }
})
console.log("Data from CustomWeather was added")

// Add Meteosource Weather provider
const MeteosourceWeather = await db.provider.create({
    data: {
        name: "Meteosource Weather",
        headquarters: "Czech Republic",
        products: {
            createMany: {
                data: [
                    {
                        "name": "Solar power and radiation and wind power forecasts",
                        "coverage": ["Global"]
                    },
                    {
                        "name": "Air quality forecasts",
                        "coverage": ["Global"]
                    }
                ]
            }
        }
    }
})
console.log("Data from Meteosource Weather was added")

// Create users
const users = await db.user.createMany({
    data: [
        {
            "firstName": "Alba",
            "lastName": "Vilanova",
            "email": "alba.vilanova@gmail.com",
            "organization": "BSC",
            "position": "Research engineer",
        },
        {
            "firstName": "David",
            "lastName": "Gómez",
            "email": "david.gomez@gmail.com",
            "organization": "Kaya",
            "position": "Web developer"
        }
    ]
})
console.log("Users were added")