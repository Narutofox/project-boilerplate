import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'ivanciceksstorybook/dist';

export default class BeerCards extends React.Component {
  render() {
    return (
      this.props.beers.map(beer =>

        (<Card
          key={beer.id}
          imgUrl={beer.image_url}
          name={beer.name}
          tagline={beer.tagline}
          onInfoClick={() => this.props.setPopupBeer(beer)}
          onStarClick={() => { this.props.toggleFavouriteBeer(beer.id); }}
          onPlusClick={() => this.props.addBeerToCart(beer.id)}
          isFavourite={this.props.favouriteBeers.includes(beer.id) === true ? 'true' : 'false'}
        />))
    );
  }
}

BeerCards.defaultProps = {
  beers: [],
  favouriteBeers: [],
  toggleFavouriteBeer: undefined,
  addBeerToCart: undefined,
  setPopupBeer: undefined
};

BeerCards.propTypes = {
  beers: PropTypes.instanceOf(Array),
  favouriteBeers: PropTypes.instanceOf(Array),
  toggleFavouriteBeer: PropTypes.func,
  addBeerToCart: PropTypes.func,
  setPopupBeer: PropTypes.func
};

