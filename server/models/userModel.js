import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

//! commonTypeObjs
const commonTypeObjs = {
  type: String,
  required: true,
  trim: true,
};

//! addressSchema
const addressSchema = new Schema({
  street: commonTypeObjs,
  city: commonTypeObjs,
  zipCode: commonTypeObjs,
});

//! userSchema
const userSchema = new Schema({
  firstName: String,
  lastName: String,
  age: Number,
  email: String,
  password: String,
  passwordConfirm: String,
  avatarUrl: String,
  cartId: {
    type: Schema.Types.ObjectId,
    ref: "Cart",
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },

  address: addressSchema,
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
  }
  next();
});

userSchema.methods.correctPassword = async function (
  inputPassword,
  userPassword
) {
  return await bcrypt.compare(inputPassword, userPassword);
};

export default model("User", userSchema);
