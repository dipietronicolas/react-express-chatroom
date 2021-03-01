export const userReducer = (state = '', action) => {
  switch(action.type){
    case 'ADD_USERNAME':
      return state = action.payload
    case 'GET_USERNAME':
      return state;
    default:
      return state;
  }

}