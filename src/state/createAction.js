
export default (type, payload, notification) => {
    let nextPayload = { type };
    if (payload || payload === false || payload === 0 || payload === '') {
      nextPayload = Object.assign({}, nextPayload, { payload });
    }
    if (notification || notification === false | notification === 0) {
      nextPayload = Object.assign({}, nextPayload, { notification });
    }
    return nextPayload;
  };
  