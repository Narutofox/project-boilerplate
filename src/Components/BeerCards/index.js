import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'storybook-project/dist';
import { addFavouriteBeer, removeFavouriteBeer, showPopupBeer, removePopupBeer, changeBeerInCart, changeShowMode } from './methods.js';

export default class BeerCards extends React.Component {
  constructor(props) {
    super(props);
    this.toggleFavouriteBeer = this.toggleFavouriteBeer.bind(this);
    this.addBeerToCart = this.addBeerToCart.bind(this);
  }
  render() {
    return (
      this.props.beers.map(beer =>

        (<Card
          key={beer.id}
          imgUrl={beer.image_url}
          name={beer.name}
          tagline={beer.tagline}
          onFavourite={() => { this.toggleFavouriteBeer(beer.id); }}
          onPlus={() => this.addBeerToCart(beer.id)}
          isFavourite={this.props.favouriteBeers.includes(beer.id) === true ? 'true' : 'false'}
        />))
    );
  }
}
BeerCards.defaultProps = {
  beers: [],
  favouriteBeers: []
};

BeerCards.propTypes = {
  beers: PropTypes.instanceOf(Array),
  favouriteBeers: PropTypes.instanceOf(Array)
};
