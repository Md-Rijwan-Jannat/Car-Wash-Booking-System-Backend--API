import { Schema, model } from "mongoose";
import { ISignUPUser } from "./signUpUser.interface";

export const signUpUserSchema = new Schema<ISignUPUser>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Phone is required"],
      trim: true,
      unique: true,
    },
    role: {
      type: String,
      required: [true, "Role is required"],
      enum: ["admin", "user"],
      trim: true,
    },
    address: {
      type: String,
      required: [true, "Address is required"],
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

export const SignUPUser = model<ISignUPUser>("SignUpUser", signUpUserSchema);
