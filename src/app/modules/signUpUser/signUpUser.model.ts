import { Schema, model } from "mongoose";
import { ISignUPUser, ISignUpUserModel } from "./signUpUser.interface";
import bcrypt from "bcrypt";
import config from "../../config";

export const signUpUserSchema = new Schema<ISignUPUser, ISignUpUserModel>(
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
      select: 0,
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

// ---> use pre-hook for hashing password
signUpUserSchema.pre("save", async function (next) {
  try {
    const user = this;
    if (user.isModified("password")) {
      const saltRound = Number(config.bcrypt_rounds_salt);
      const hasPassword = await bcrypt.hash(user.password, saltRound);
      user.password = hasPassword;
    }
    next();
  } catch (error: any) {
    next(error);
  }
});

// ---> use pre-hook and make empty password field
signUpUserSchema.post("save", async (doc, next) => {
  doc.password = "";
  next();
});

// ---> check login request use is exist
signUpUserSchema.statics.isSignUpUserExisting = async function (email: string) {
  return await SignUPUser.findOne({ email }).select("+password");
};

// ---> check the password is match
signUpUserSchema.statics.isSignUpUserPasswordMatch = async function (
  resendLoginPassword: string,
  hashPassword: string,
) {
  return await bcrypt.compare(resendLoginPassword, hashPassword);
};

export const SignUPUser = model<ISignUPUser, ISignUpUserModel>(
  "SignUpUser",
  signUpUserSchema,
);
