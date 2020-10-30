/////
//Helper functions
/////
const isEmptyString = (string) => {
  if (string.trim() === '') return true;
  else return false;
};

const validateRoutineLog = (log) => {
  let error = null;
  let total = 0;

  if (isEmptyString(log.username)) {
    error = 'Please sign in first.';
  }

  for (const property in log.routine) {
    total += log.routine[property];
  }

  if (total !== 24) {
    error = 'Total hours must equal to 24.';
  }

  return {
    error,
    valid: error ? false : true,
  };
};

module.exports = { validateRoutineLog };
