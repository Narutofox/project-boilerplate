
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
                content: 'Home'
              },
                {
                  path: 'Cart',
                  active: false,
                  content: `My Cart (${this.props.beersInCart})`
                }
            ]
        }
      />
    );
  }
}

BeerNavigation.defaultProps = {
  beersInCart: 0
};

BeerNavigation.propTypes = {
  beersInCart: PropTypes.number
};
