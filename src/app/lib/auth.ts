import dns from "node:dns";

dns.setServers(["8.8.8.8", "1.1.1.1"]);

import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGODB_URI!);

const db = client.db("shopora");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),

  user:{
    additionalFields:{
      role:{
        type: "string",
        defaultValue: "customer",
        required: false,
        input: false
      },
    },
  },

  emailAndPassword: {
    enabled: true,
  },
});