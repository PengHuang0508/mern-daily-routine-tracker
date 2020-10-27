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

  DailyRoutine.find({ date })
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
  DailyRoutine.findById(req.params.id)
    .then((dailyRoutineLog) => {
      dailyRoutineLog.username = req.body.username;
      dailyRoutineLog.routine.exercise = Number(req.body.routine.exercise);
      dailyRoutineLog.routine.miscellaneous = Number(
        req.body.routine.miscellaneous
      );
      dailyRoutineLog.routine.relax = Number(req.body.routine.relax);
      dailyRoutineLog.routine.sleep = Number(req.body.routine.sleep);
      dailyRoutineLog.routine.work = Number(req.body.routine.exercise);
      dailyRoutineLog.date = Date.parse(req.body.date);

      dailyRoutineLog
        .save()
        .then(() => res.json({ message: 'Log updated.' }))
        .catch((error) => res.status(400).json({ error }));
    })

    .catch((error) => res.status(400).json({ error }));
});

router.route('/:id').delete((req, res) => {
  DailyRoutine.findByIdAndDelete(req.params.id)
    .then((dailyRoutineLog) => res.json({ message: 'Log deleted.' }))
    .catch((error) => res.status(400).json({ error }));
});

module.exports = router;
