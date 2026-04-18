const prisma = require("../config/prisma");

// Dashboard Data
exports.getDashboardData = async (req, res) => {
    try {
        const userId = parseInt(req.user.id);

        // Fetch total income
        const incomeStats = await prisma.income.aggregate({
            where: { userId },
            _sum: { amount: true },
        });
        const totalIncomeValue = incomeStats._sum.amount || 0;

        // Fetch total expense
        const expenseStats = await prisma.expense.aggregate({
            where: { userId },
            _sum: { amount: true },
        });
        const totalExpenseValue = expenseStats._sum.amount || 0;

        // Get income transactions in the last 60 days
        const sixtyDaysAgo = new Date(Date.now() - 60 * 24 * 60 * 60 * 1000);
        const last60DaysIncomeTransactions = await prisma.income.findMany({
            where: {
                userId,
                date: { gte: sixtyDaysAgo },
            },
            orderBy: { date: 'desc' },
        });

        // Calculate total income for last 60 days
        const incomeLast60Days = last60DaysIncomeTransactions.reduce(
            (sum, transaction) => sum + transaction.amount,
            0
        );

        // Get expense transactions in the last 30 days
        const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
        const last30DaysExpenseTransactions = await prisma.expense.findMany({
            where: {
                userId,
                date: { gte: thirtyDaysAgo },
            },
            orderBy: { date: 'desc' },
        });

        // Calculate total expenses for last 30 days
        const expensesLast30Days = last30DaysExpenseTransactions.reduce(
            (sum, transaction) => sum + transaction.amount,
            0
        );

        // Fetch last 5 income transactions
        const incomeTxns = await prisma.income.findMany({
            where: { userId },
            orderBy: { date: 'desc' },
            take: 5,
        });

        // Fetch last 5 expense transactions
        const expenseTxns = await prisma.expense.findMany({
            where: { userId },
            orderBy: { date: 'desc' },
            take: 5,
        });

        // Merge and sort last 5 income + expense transactions
        const lastTransactions = [
            ...incomeTxns.map((txn) => ({
                ...txn,
                type: "income"
            })),
            ...expenseTxns.map((txn) => ({
                ...txn,
                type: "expense"
            }))
        ].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);

        // Send final response
        res.json({
            totalBalance: totalIncomeValue - totalExpenseValue,
            totalIncome: totalIncomeValue,
            totalExpenses: totalExpenseValue,
            last30DaysExpenses: {
                total: expensesLast30Days,
                transactions: last30DaysExpenseTransactions,
            },
            last60DaysIncome: {
                total: incomeLast60Days,
                transactions: last60DaysIncomeTransactions,
            },
            recentTransactions: lastTransactions,
        });
    } catch (error) {
        console.error("Dashboard Data Error:", error);
        res.status(500).json({ message: "Server Error!!", error: error.message });
    }
};
