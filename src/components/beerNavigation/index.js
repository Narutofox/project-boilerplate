
import React from 'react';
import PropTypes from 'prop-types';
import { Navigation } from 'ivanciceksstorybook/dist';

export default class BeerNavigation extends React.Component {

  render() {
    return (
      <Navigation links={
            [
              {
                path: '/',
                active: true,
                content: `All beers (${this.props.beersInTotal})`
              },
                {
                  path: 'Cart',
                  active: false,
                  content: `My Cart (${this.props.beersInCart})`
                },
                {
                  path: 'FavouriteBeers',
                  active: false,
                  content: `Favourite beers (${this.props.favouriteBeers === undefined ? 0 : this.props.favouriteBeers.length})`
                }
            ]
        }
      />
    );
  }
}

BeerNavigation.defaultProps = {
  beersInCart: 0,
  beersInTotal: 0,
  favouriteBeers: []
};

BeerNavigation.propTypes = {
  beersInCart: PropTypes.number,
  beersInTotal: PropTypes.number,
  favouriteBeers: PropTypes.instanceOf(Array)
};
