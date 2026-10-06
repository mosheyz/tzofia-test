import { dbConnection } from "../db/mongodb.js";
import { ObjectId } from "mongodb";

const users = dbConnection.collection("users");

export const usersRepo = {
    create: async (data) => {
        const result = await users.insertOne(data);
        return { id: result.insertedId.toString(), ...data };
    },

    getAll: async () => {
        const data = await users.find({}).toArray();
        return data.map((item) => {
            item.id = item._id.toString();
            return item;
        });
    },

    getById: async (userId) => {
        const data = await users.findOne({ _id: new ObjectId(userId) });
        if (data) data.id = data._id.toString();
        return data;
    },

    delete: async (userId) => {
        const result = await users.deleteOne({ _id: new ObjectId(userId) });
        return result.deletedCount > 0;
    },
};


