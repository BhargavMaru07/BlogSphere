const { Schema, model } = require("mongoose");
const { createHmac, randomBytes } = require("crypto");
const { createTokenForUser } = require("../services/auth");
const { error } = require("console");

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    salt: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
      default: "/images/default.jpeg",
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  let user = this;

  if (!user.isModified("password")) return;

  let salt = randomBytes(16).toString();
  let hashedPassword = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");

  this.salt = salt;
  this.password = hashedPassword;

  next();
});

userSchema.static("matchPasswordAndGenerateToken", async function (email, password) {
  let user = await this.findOne({ email });

  let salt = user.salt;
  let hashedPassword = user.password;

  let userProvidedPassword = createHmac("sha256", salt)
    .update(password)
    .digest("hex");

  if (hashedPassword !== userProvidedPassword) {
     throw new Error("Invalid ");
  } else {
    let token = createTokenForUser(user);
    return token
  }
});

const User = model("user", userSchema);

module.exports = User;
