export const addUsernameRedux = (new_username) => {
  return {
    type: 'ADD_USERNAME',
    payload: new_username
  }
}

export const getUsernameRedux = () => {
  return {
    type: 'GET_USERNAME'
  }
}