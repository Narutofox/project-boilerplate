export const beerReducer = (state = {
  _favouriteBeers: [],
  get favouriteBeers() {
    if (sessionStorage.getItem('favouriteBeers') !== null && sessionStorage.getItem('favouriteBeers') !== '') {
      const favBeers = JSON.parse(sessionStorage.getItem('favouriteBeers'));
      return Array.from(favBeers);
    }
    return this._favouriteBeers;
  },
  set favouriteBeers(value) {
    this._favouriteBeers = value;
    sessionStorage.setItem('favouriteBeers', JSON.stringify(value));
  },
  modalBeer: null,
  _beerInCart: [],
  get beerInCart() {
    if (sessionStorage.getItem('beerInCart') !== null && sessionStorage.getItem('beerInCart') !== '') {
      const beersInCart = JSON.parse(sessionStorage.getItem('beerInCart'));
      return Array.from(beersInCart);
    }
    return this._beerInCart;
  },
  set beerInCart(value) {
    this._beerInCart = value;
    sessionStorage.setItem('beerInCart', JSON.stringify(value));
  },
  showMode: 'All'
}, action) => {
  switch (action.type) {
    case 'addFavouriteBeer': {
      const favBeers = state.favouriteBeers.concat(action.value);
      sessionStorage.setItem('favouriteBeers', JSON.stringify(favBeers));
      return {
        ...state,
        favouriteBeers: favBeers
      };
    }
    case 'removeFavouriteBeer': {
      const favBeers = state.favouriteBeers.filter(element => element !== action.value);
      sessionStorage.setItem('favouriteBeers', JSON.stringify(favBeers));
      return {
        ...state,
        favouriteBeers: favBeers
      };
    }
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

      // eslint-disable-next-line no-restricted-globals
      if (!isNaN(action.quantity) && action.quantity !== 0) {
        if (beerIndex < 0 && action.quantity > 0) {
          currentBeersInCart.push({ beerId: action.beerId, quantity: Number(action.quantity) });
        } else {
          currentBeersInCart[beerIndex].quantity = Number(action.quantity);
          if (currentBeersInCart[beerIndex].quantity <= 0) {
            currentBeersInCart.splice(beerIndex, 1);
          }
        }
      }
      sessionStorage.setItem('beerInCart', JSON.stringify(currentBeersInCart));
      return {
        ...state,
        beerInCart: currentBeersInCart
      };
    }
    case 'addBeerToCart': {
      const currentBeersInCart = state.beerInCart.slice();
      const beerIndex = currentBeersInCart.map(e => e.beerId).indexOf(action.beerId);

      // eslint-disable-next-line no-restricted-globals
      if (!isNaN(action.quantity) && action.quantity !== 0) {
        if (beerIndex < 0 && action.quantity > 0) {
          currentBeersInCart.push({ beerId: action.beerId, quantity: Number(action.quantity) });
        } else {
          currentBeersInCart[beerIndex].quantity += Number(action.quantity);
          if (currentBeersInCart[beerIndex].quantity <= 0) {
            currentBeersInCart.splice(beerIndex, 1);
          }
        }
      }
      sessionStorage.setItem('beerInCart', JSON.stringify(currentBeersInCart));
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
    case 'removeBeerFromCart': {
      // eslint-disable-next-line max-len
      const currentBeersInCart = state.beerInCart.filter(element => element.beerId !== action.beerId);
      sessionStorage.setItem('beerInCart', JSON.stringify(currentBeersInCart));
      return {
        ...state,
        beerInCart: currentBeersInCart
      };
    }
    default:
      return state;
  }
};
