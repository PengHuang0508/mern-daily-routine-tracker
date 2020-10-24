const router = require('express').Router();
let DailyRoutine = require('../models/dailyRoutine.model');

router.route('/').get((req, res) => {
  DailyRoutine.find()
    .then((dailyRoutineLog) => res.json(dailyRoutineLog))
    .catch((err) => res.status(400).json('Error:' + err));
});

router.route('/:username').get((req, res) => {
  DailyRoutine.find({ username: req.params.username })
    .then((dailyRoutineLog) => res.json(dailyRoutineLog))
    .catch((err) => res.status(400).json('Error:' + err));
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
  const date = Date.parse(req.body.date);

  const newDailyRoutineLog = new DailyRoutine({
    username,
    routine,
    date,
  });

  newDailyRoutineLog
    .save()
    .then(() => res.json({ message: 'New daily routine log saved.' }))
    .catch((err) => res.status(400).json('Error:' + err));
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
        .catch((err) => res.status(400).json('Error:' + err));
    })

    .catch((err) => res.status(400).json('Error:' + err));
});

router.route('/:id').delete((req, res) => {
  DailyRoutine.findByIdAndDelete(req.params.id)
    .then((dailyRoutineLog) => res.json({ message: 'Log deleted.' }))
    .catch((err) => res.status(400).json('Error:' + err));
});

module.exports = router;
