
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
                active: this.props.activeContent === 'Home',
                content: 'Home'
              },
                {
                  path: 'Cart',
                  active: this.props.activeContent === 'Cart',
                  content: `My Cart (${this.props.beersInCart})`
                }
            ]
        }
      />
    );
  }
}

BeerNavigation.defaultProps = {
  beersInCart: 0,
  activeContent: 'Home'
};

BeerNavigation.propTypes = {
  beersInCart: PropTypes.number,
  activeContent: PropTypes.string
};
