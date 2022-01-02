const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minLength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    minLength: 6,
    maxlength: 100,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
    maxlength: 1024,
  },
  role: {
    type: String,
    enum: ["student", "instructor", "admin"],
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// add schema method to userSchema
userSchema.methods.isStudent = function () {
  return this.role == "student";
};
userSchema.methods.isInstructor = function () {
  return this.role == "instructor";
};
userSchema.methods.isAdmin = function () {
  return this.role == "admin";
};


// mongoose schema middleware
userSchema.pre("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
  } else {
    return next();
  }
});

userSchema.methods.comparePassword = function (password, cb) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) {
      return cb(err, isMatch);
    }
    cb(null, isMatch);
  });
};

const UserCollect = mongoose.model("user_mern_proj", userSchema);
module.exports = UserCollect;
