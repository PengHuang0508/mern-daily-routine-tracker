/////
//Helper functions
/////
const isEmptyString = (string) => {
  if (string.trim() === '') return true;
  else return false;
};

const isEmptyArray = (arr) => {
  if (!Array.isArray(arr) || !arr.length) return true;
  else return false;
};

const isEmptyObject = (obj) => {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
};

let error = null;

const validateRoutineLog = (log) => {
  let total = 0;

  if (isEmptyString(log.username)) {
    error = 'Please sign in first.';
  }

  for (const property in log.routine) {
    total += log.routine[property];
  }

  if (total < 24) {
    error = 'Total hours are less than 24.';
  } else if (total > 24) {
    error = 'Total hours exceed 24.';
  }

  return {
    error,
    valid: error ? false : true,
  };
};

module.exports = { validateRoutineLog };
