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
          onInfoClick={() => this.props.showModalBeer(beer)}
          onStarClick={() => { this.props.addOrRemoveBeerFavorite(beer.id); }}
          onPlusClick={() => { this.props.setBeerInCart(beer.id); }}
          isFavourite={this.props.favouriteBeers.includes(beer.id)}
        />))
    );
  }
}

BeerCards.defaultProps = {
  beers: [],
  favouriteBeers: [],
  addOrRemoveBeerFavorite: undefined,
  setBeerInCart: undefined,
  showModalBeer: undefined
};

BeerCards.propTypes = {
  beers: PropTypes.instanceOf(Array),
  favouriteBeers: PropTypes.instanceOf(Array),
  addOrRemoveBeerFavorite: PropTypes.func,
  setBeerInCart: PropTypes.func,
  showModalBeer: PropTypes.func
};

