

export const addFavouriteBeer = value => ({
  type: 'addFavouriteBeer',
  value
});

export const removeFavouriteBeer = value => ({
  type: 'removeFavouriteBeer',
  value
});

export const showModalBeer = value => ({
  type: 'showModalBeer',
  value
});

export const removeModalBeer = () => ({
  type: 'removeModalBeer'
});


export const addBeerToCart = (beerId, quantity) => ({
  type: 'addBeerToCart',
  beerId,
  quantity
});

export const setBeerInCart = (beerId, quantity) => ({
  type: 'setBeerInCart',
  beerId,
  quantity
});

export const removeBeerFromCart = beerId => ({
  type: 'removeBeerFromCart',
  beerId
});

export const changeBeersToShow = beerType => ({
  type: 'changeBeersToShow',
  beerType
});

