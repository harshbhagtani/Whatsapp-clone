

const inialstate = {
    user: null,
   
  };
  export default function (state = inialstate, action) {
    switch (action.type) {
      case 'SAVE_USER':
        return {
         user:action.user,
        };
     
      default:
        return state;
    }
  }
  