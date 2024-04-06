import mongoose from "mongoose";

import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: "Name is required",
            trim: true,
        },
        email: {
            type: String,
            required: "Name is required",
            trim: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            min: 6,
        },
        account_id: String,
        seller: {},
        session: {},
    },
    { timestamps: true }
);

userSchema.pre("save", function (next) {
    const user = this;

    if (this.isModified("password")) {
        return bcrypt.hash(user.password, 10, function (err, hash) {
            if (err) console.log(err.message);
            else user.password = hash;
            next();
        });
    } else next();
});

export default mongoose.model("user", userSchema, "users");
