const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dailyRoutineSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    routine: {
      exercise: {
        type: Number,
        required: true,
      },
      miscellaneous: {
        type: Number,
        required: true,
      },
      relax: {
        type: Number,
        required: true,
      },
      sleep: {
        type: Number,
        required: true,
      },
      work: {
        type: Number,
        required: true,
      },
    },
    date: {
      type: Date,
      default: Date.now,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const DailyRoutine = mongoose.model('DailyRoutine', dailyRoutineSchema);

module.exports = DailyRoutine;
