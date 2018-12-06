export const beerReducer = (state = {
  _favouriteBeers: [],
  get favouriteBeers() {
    return this._favouriteBeers;
  },
  set favouriteBeers(value) {
    this._favouriteBeers = value;
  },
  popupBeer: {},
  beerInCart: []
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
        popupBeer: action.value
      };
    case 'removeModalBeer':
      return {
        ...state,
        popupBeer: {}
      };
    /*case 'changeBeerInCart':
    {
      const currentBeerInCart = state.beerInCart.slice();
      const beerIndex = currentBeerInCart.map(e => e.beerId).indexOf(action.beerId);

      if (action.amount === 0) action.amount = -currentBeerInCart[beerIndex].amount;

      if (beerIndex < 0) {
        if (action.amount > 0) {
          currentBeerInCart.push({ beerId: action.beerId, amount: action.amount });
        }
      } else {
        currentBeerInCart[beerIndex].amount += action.amount;
        if (currentBeerInCart[beerIndex].amount <= 0) {
          currentBeerInCart.splice(beerIndex, 1);
        }
      }
      return {
        ...state,
        beerInCart: currentBeerInCart
      };
    }*/
    default:
      return state;
  }
};
