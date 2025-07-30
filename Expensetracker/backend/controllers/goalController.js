import UserGoal from "../models/userGoal.js";

export const setGoal = async (req, res) => {
  const { incomeGoal, expenseLimit, month, year } = req.body;
  const userId = req.user.id;

  try {
    let goal = await UserGoal.findOne({ userId, month, year });

    if (goal) {
      if (incomeGoal !== undefined) goal.incomeGoal = incomeGoal;
      if (expenseLimit !== undefined) goal.expenseLimit = expenseLimit;
      await goal.save();
      return res.status(200).json({ message: "Goal Updated Successfully" });
    }

   
    goal = await UserGoal.create({
      userId,
      incomeGoal: incomeGoal ?? 0,
      expenseLimit: expenseLimit ?? 0,
      month,
      year,
    });

    return res.status(200).json({ message: "Goal Added Successfully" });

  } catch (error) {
    console.log("Error in goal setting:", error);
    res.status(400).json({ message: "Error in setting goal" });
  }
};


export const getGoal = async (req, res) => {
  const userId = req.user.id;
  const { month, year } = req.query;

  try {
    const goal = await UserGoal.findOne({ userId, month, year });
    if (!goal)
      return res.status(200).json({ message: "No goal found", goal: null });

    res.status(200).json({ message: "Goal fetched", goal });
  } catch (err) {
    console.error("Get Goal Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};