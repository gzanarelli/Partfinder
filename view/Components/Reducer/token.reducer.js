export default function (userToken = {}, action) {
  // console.log('action: ', action);
  if (action.type === 'addToken') {
    userToken = {
      token: action.token
    };
    return userToken;
  } else {
    return userToken;
  }
};