export function limitDecimal(limitLength, message) {
  const reg = new RegExp(
    `((^[1-9][0-9]*)+(.?[0-9]{1,${limitLength}})?$)|(^[0]+(.[0-9]{1,${limitLength}})?$)`
  );
  return function (rule, value, callback) {
    if (!reg.test(value)) {
      callback(message);
    } else {
      callback();
    }
  };
}

export function limitMaxAmount(max, message) {
  return function (rule, value, callback) {
    if (value >= max) {
      callback(message);
    } else {
      callback();
    }
  };
}
export function limitLetterNumber(message) {
  const reg = /^[A-Za-z0-9]+$/;
  return function (rule, value, callback) {
    if (value && !reg.test(value)) {
      callback(message);
    } else {
      callback();
    }
  };
}

export function limitLength(length, message) {
  return function (rule, value, callback) {
    if (value.length > length) {
      callback(message);
    } else {
      callback();
    }
  };
}
