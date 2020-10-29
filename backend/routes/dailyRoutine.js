const router = require('express').Router();
let DailyRoutine = require('../models/dailyRoutine.model');
// Validator
const { validateRoutineLog } = require('../utils/validators');

router.route('/').get((req, res) => {
  DailyRoutine.find()
    .then((dailyRoutineLog) => res.json(dailyRoutineLog))
    .catch((error) => res.status(400).json({ error }));
});

router.route('/:username').get((req, res) => {
  DailyRoutine.find({ username: req.params.username.toLowerCase() })
    .then((dailyRoutineLog) => res.json(dailyRoutineLog))
    .catch((error) => res.status(400).json({ error }));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const routine = {
    exercise: Number(req.body.routine.exercise),
    miscellaneous: Number(req.body.routine.miscellaneous),
    relax: Number(req.body.routine.relax),
    sleep: Number(req.body.routine.sleep),
    work: Number(req.body.routine.work),
  };
  const date = req.body.date;
  const routineLog = {
    username,
    routine,
    date,
  };
  const { valid, error } = validateRoutineLog(routineLog);

  if (!valid) {
    return res.status(400).json({ error });
  }

  const newDailyRoutineLog = new DailyRoutine(routineLog);

  DailyRoutine.find({ username, date })
    .then((data) => {
      if (data.length) {
        return res
          .status(400)
          .json({ error: 'Log for this date already exists.' });
      }

      newDailyRoutineLog
        .save()
        .then(() => res.json({ message: 'New daily routine log saved.' }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(400).json({ error }));
});

router.route('/update/:id').post((req, res) => {
  const username = req.body.username;
  const updatedRoutine = {
    exercise: Number(req.body.routine.exercise),
    miscellaneous: Number(req.body.routine.miscellaneous),
    relax: Number(req.body.routine.relax),
    sleep: Number(req.body.routine.sleep),
    work: Number(req.body.routine.work),
  };
  const updatedDate = req.body.date;
  const updatedLog = {
    username,
    routine: updatedRoutine,
    date: updatedDate,
  };
  const { valid, error } = validateRoutineLog(updatedLog);

  if (!valid) {
    return res.status(400).json({ error });
  }

  DailyRoutine.findById(req.params.id)
    .then((dailyRoutineLog) => {
      const updateDatabase = () => {
        dailyRoutineLog.routine = updatedRoutine;
        dailyRoutineLog.date = updatedDate;

        return dailyRoutineLog
          .save()
          .then(() => res.json({ message: 'Log updated.' }))
          .catch((error) => res.status(400).json({ error }));
      };

      if (updatedDate !== dailyRoutineLog.date) {
        return DailyRoutine.find({ username, date: updatedDate })
          .then((data) => {
            if (data.length) {
              return res
                .status(400)
                .json({ error: 'Log for this date already exists.' });
            }

            return updateDatabase();
          })
          .catch((error) => res.status(400).json({ error }));
      }

      return updateDatabase();
    })
    .catch((error) => res.status(400).json({ error }));
});

router.route('/:id').delete((req, res) => {
  DailyRoutine.findByIdAndDelete(req.params.id)
    .then(() => res.json({ message: 'Log deleted.' }))
    .catch((error) => res.status(400).json({ error }));
});

module.exports = router;
