export const beerReducer = (state = {
  _favouriteBeers: [],
  get favouriteBeers() {
    return this._favouriteBeers;
  },
  set favouriteBeers(value) {
    this._favouriteBeers = value;
  },
  modalBeer: null,
  beerInCart: [],
  showMode: 'All'
}, action) => {
  switch (action.type) {
    case 'addFavouriteBeer':
      return {
        ...state,
        favouriteBeers: state.favouriteBeers.concat(action.value)
      };
    case 'removeFavouriteBeer':
      return {
        ...state,
        favouriteBeers: state.favouriteBeers.filter(element => element !== action.value)
      };
    case 'showModalBeer':
      return {
        ...state,
        modalBeer: action.value
      };
    case 'removeModalBeer':
      return {
        ...state,
        modalBeer: null
      };
    case 'setBeerInCart': {
      const currentBeersInCart = state.beerInCart.slice();
      const beerIndex = currentBeersInCart.map(e => e.beerId).indexOf(action.beerId);

      if (action.amount !== 0) {
        if (beerIndex < 0 && action.amount > 0) {
          currentBeersInCart.push({ beerId: action.beerId, amount: action.amount });
        } else {
          currentBeersInCart[beerIndex].amount = action.amount;
          if (currentBeersInCart[beerIndex].amount <= 0) {
            currentBeersInCart.splice(beerIndex, 1);
          }
        }
      }

      return {
        ...state,
        beerInCart: currentBeersInCart
      };
    }
    case 'changeBeersToShow':
      return {
        ...state,
        showMode: action.beerType
      };
    case 'removeBeerFromCart':
      return {
        ...state,
        beerInCart: state.beerInCart.filter(element => element.beerId !== action.beerId)
      };
    default:
      return state;
  }
};
