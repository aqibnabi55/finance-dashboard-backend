const Record = require('../models/Record');

exports.createRecord = async (req, res) => {
  const { amount, type, category, date, notes } = req.body;

  const flagged = amount > 50000 && type === 'expense';

  const record = await Record.create({
    amount,
    type,
    category,
    date,
    notes,
    flagged
  });

  res.status(201).json(record);
};

exports.getRecords = async (req, res) => {
  const records = await Record.find({ isDeleted: false });
  res.json(records);
};

exports.updateRecord = async (req, res) => {
  const updated = await Record.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(updated);
};

exports.deleteRecord = async (req, res) => {
  await Record.findByIdAndUpdate(req.params.id, {
    isDeleted: true
  });

  res.json({ message: 'Record soft deleted' });
};
