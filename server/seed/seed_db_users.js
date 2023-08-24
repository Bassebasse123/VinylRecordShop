import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/userModel.js";
import { faker } from "@faker-js/faker";

dotenv.config();

(async () => {
  try {
    await mongoose.connect(process.env.DB_URI);

    await User.deleteMany();
    console.log("Users purged");

    const { person, location, internet, helpers, string } = faker;

    const users = Array.from(
      { length: 5 },
      () =>
        new User({
          firstName: person.firstName(),
          lastName: person.lastName(),
          age: string.numeric(2),
          email: internet.exampleEmail(),
          password: "test1234",
          passwordConfirm: "test1234",
          avatarURL: "randomstring",
          role: helpers.arrayElement(["user", "admin"]),
          address: {
            street: location.street(),
            city: location.city(),
            zipCode: location.zipCode(),
          },
        })
    );

    await User.create(users);
    console.log("Users data seeded successfully!");
  } catch (error) {
    console.error("Error while seeding data:", error);
  } finally {
    mongoose.connection.close();
  }
})();
