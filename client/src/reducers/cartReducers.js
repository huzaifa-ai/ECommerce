let InitialState = [];

if (typeof window !== 'undefined') {
  if (localStorage.getItem('cart')) {
    InitialState = JSON.parse(localStorage.getItem('cart'));
  } else {
    InitialState = [];
  }
}

export const cartReducer = (state = InitialState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return action.payload;
    default:
      return state;
  }
};
