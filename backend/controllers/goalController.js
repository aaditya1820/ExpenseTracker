const prisma = require("../config/prisma");

const setGoal = async (req, res) => {
  const { incomeGoal, expenseLimit, month, year } = req.body;
  const userId = parseInt(req.user.id);

  try {
    const goal = await prisma.userGoal.upsert({
      where: {
        userId_month_year: {
          userId,
          month: parseInt(month),
          year: parseInt(year),
        },
      },
      update: {
        incomeGoal: incomeGoal !== undefined ? parseFloat(incomeGoal) : undefined,
        expenseLimit: expenseLimit !== undefined ? parseFloat(expenseLimit) : undefined,
      },
      create: {
        userId,
        incomeGoal: incomeGoal !== undefined ? parseFloat(incomeGoal) : 0,
        expenseLimit: expenseLimit !== undefined ? parseFloat(expenseLimit) : 0,
        month: parseInt(month),
        year: parseInt(year),
      },
    });

    return res.status(200).json({ message: "Goal Set Successfully", goal });
  } catch (error) {
    console.error("Error in goal setting:", error);
    res.status(400).json({ message: "Error in setting goal" });
  }
};

const getGoal = async (req, res) => {
  const userId = parseInt(req.user.id);
  const { month, year } = req.query;

  try {
    const goal = await prisma.userGoal.findUnique({
      where: {
        userId_month_year: {
          userId,
          month: parseInt(month),
          year: parseInt(year),
        },
      },
    });
    if (!goal)
      return res.status(200).json({ message: "No goal found", goal: null });

    res.status(200).json({ message: "Goal fetched", goal });
  } catch (err) {
    console.error("Get Goal Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { setGoal, getGoal };