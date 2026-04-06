const Record = require('../models/Record');

exports.getSummary = async (req, res) => {
  const records = await Record.find({ isDeleted: false });

  let totalIncome = 0;
  let totalExpense = 0;

  const categoryTotals = {};

  records.forEach((r) => {
    if (r.type === 'income') totalIncome += r.amount;
    else totalExpense += r.amount;

    categoryTotals[r.category] =
      (categoryTotals[r.category] || 0) + r.amount;
  });

  res.json({
    totalIncome,
    totalExpense,
    netBalance: totalIncome - totalExpense,
    categoryTotals,
    recentActivity: records.slice(-5)
  });
};