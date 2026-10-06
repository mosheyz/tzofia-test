import { dbConnection } from "../db/mongodb.js";
import { ObjectId } from "mongodb";

const alerts = dbConnection.collection("alerts");

export const alertsRepo = {
    create: async (data) => {
        const result = await alerts.insertOne(data);
        return {id: result.insertedId.toString(), ...data}
    },

    getAll: async () => {
        const data = await alerts.find({}).toArray();
        return data.map((item) => {
            item.id = item._id.toString();
            return item;
        });
    },

    getById: async (alertId) => {
        const data = await alerts.findOne({ _id: new ObjectId(alertId) });
        if (data) data.id = data._id.toString();
        return data;
    },

    update: async (alertId, updateData) => {
        if (updateData._id) delete updateData._id;
        const data = await alerts.findOneAndUpdate(
            { _id: new ObjectId(alertId) },
            { $set: updateData },
            { returnDocument: "after" },
        );
        if (data) data.id = data._id.toString();
        return data;
    },

    delete: async (alertId) => {
        const result = await alerts.deleteOne({ _id: new ObjectId(alertId) });
        return result.deletedCount > 0;
    },
};
