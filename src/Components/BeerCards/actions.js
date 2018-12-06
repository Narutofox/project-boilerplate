

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


export const changeBeerInCart = (beerId, amount) => ({
  type: 'changeBeerInCart',
  beerId,
  amount
});