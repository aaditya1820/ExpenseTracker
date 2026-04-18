const prisma = require("../config/prisma");
const xlsx = require('xlsx');

exports.addExpense = async (req, res) => {
    const userId = parseInt(req.user.id);

    try {
        const { icon, category, amount, date } = req.body;

        if (!category || !amount || !date) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newExpense = await prisma.expense.create({
            data: {
                userId,
                icon,
                category,
                amount: parseFloat(amount),
                date: new Date(date),
            },
        });

        res.status(200).json(newExpense);
    } catch (error) {
        console.error("Add Expense Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

exports.getAllExpense = async (req, res) => {
    const userId = parseInt(req.user.id);

    try {
        const expense = await prisma.expense.findMany({
            where: { userId },
            orderBy: { date: 'desc' },
        });
        res.json(expense);
    } catch (err) {
        console.error("Get All Expense Error:", err);
        res.status(500).json({ message: "Server Error" });
    }
};

exports.deleteExpense = async (req, res) => {
    const userId = parseInt(req.user.id);
    const expenseId = parseInt(req.params.id);

    try {
        const expense = await prisma.expense.deleteMany({
            where: { id: expenseId, userId },
        });

        if (expense.count === 0) {
            return res.status(404).json({ message: "Expense not found or unauthorized" });
        }

        res.status(200).json({ message: "Expense deleted successfully" });
    } catch (error) {
        console.error("Delete Expense Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

exports.downloadExpenseExcel = async (req, res) => {
    const userId = parseInt(req.user.id);
    try {
        const expense = await prisma.expense.findMany({
            where: { userId },
            orderBy: { date: 'desc' },
        });

        const data = expense.map((item) => ({
            category: item.category,
            Amount: item.amount,
            Date: item.date,
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Expense");
        xlsx.writeFile(wb, 'expense_details.xlsx');
        res.download('expense_details.xlsx');
    } catch (error) {
        console.error("Download Expense Excel Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
};
