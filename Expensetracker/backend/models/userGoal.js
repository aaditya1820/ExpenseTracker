import mongoose, { mongo } from "mongoose";

const userGoal = new mongoose.Schema(
  {
    userId: {
      type:mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    incomeGoal: {
      type: Number,
      required:true
    },
    expenseLimit: {
       type: Number,
      required:true
    },
    month: {
      type: Number,
      required: true,
    },
    year: {
       type: Number,
      required:true
    },
  },
  { timestamps: true }
);

const UserGoal = mongoose.model("userGoal", userGoal, "userGoal");

export default UserGoal;