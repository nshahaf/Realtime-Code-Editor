import mongoose from "mongoose"
import chalk from "chalk"
/**
 * Connects to the MongoDB database using the MONGODB_URI environment variable
 * @returns {Promise<MongoDBConnection>} A Promise that resolves to the MongoDB connection object
 */
export const connectDatabase = async () => {
    try {
        // Connect to the MongoDB instance
        const db = await mongoose.connect(process.env.MONGODB_URI)

        // Log a success message if the connection is successful
        console.log(chalk.green('MongoDB connected:'), db.connection.host)

    } catch (error) {
        // Log an error message if the connection fails
        console.log(chalk.red('MongoDB connection error:'), error)
    }
}

