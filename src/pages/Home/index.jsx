import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './index.css';
import beers from '../../../assets/beers';
import BeerCards from '../../Components/beerCards';
import { addFavouriteBeer, removeFavouriteBeer, showModalBeer, removeModalBeer, changeBeerInCart, changeShowMode } from '../../Components/beerCards/actions';
import logo from '../../../assets/duff.png';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.showModalBeer = this.showModalBeer.bind(this);
    this.removeModalBeer = this.removeModalBeer.bind(this);
    this.addBeerToCart = this.addBeerToCart.bind(this);
    this.changeShowToNewMode = this.changeShowToNewMode.bind(this);
    this.markBeerAsFavorite = this.markBeerAsFavorite.bind(this);
    this.addBeerToCart = this.addBeerToCart.bind(this);
  }

  showModalBeer(beer) {
    this.props.showModalBeer(beer);
  }

  markBeerAsFavorite(beerId) {
    if (this.props.favouriteBeers.includes(beerId)) {
      this.props.removeFavouriteBeer(beerId);
    } else {
      this.props.addFavouriteBeer(beerId);
    }
  }

  removeModalBeer() {
    this.props.removeModalBeer();
  }

  addBeerToCart(beerId) {
    this.props.changeBeerInCart(beerId, 1);
  }

  changeShowToNewMode(mode) {
    this.props.changeShowMode(mode);
  }

  render() {
    const cards = (<BeerCards beers={beers}
      markBeerAsFavorite={this.toggleFavouriteBeer}
      addBeerToCart={this.addBeerToCart}
      favouriteBeers={this.props.favouriteBeers}
      setPopupBeer={this.setPopupBeer}
    />);
    const beersInCart = this.props.beerInCart.reduce((a, b) => a + b.amount, 0);
    const div = (
      <div>
        { cards }
        <div>&copy; Ivan Čiček - 2018 BeersInCart: { beersInCart }</div>
      </div>
    );

    return div;
  }
}

Home.defaultProps = {
  showModalBeer: undefined,
  removeFavouriteBeer: undefined,
  removeModalBeer: undefined,
  changeBeerInCart: undefined,
  changeShowMode: undefined,
  addFavouriteBeer: undefined,
  favouriteBeers: [],
  beerInCart: []
};

Home.propTypes = {
  showModalBeer: PropTypes.func,
  removeFavouriteBeer: PropTypes.func,
  removeModalBeer: PropTypes.func,
  changeBeerInCart: PropTypes.func,
  changeShowMode: PropTypes.func,
  addFavouriteBeer: PropTypes.func,
  favouriteBeers: PropTypes.instanceOf(Array),
  beerInCart: PropTypes.instanceOf(Array)
};


const mapStateToProps = state => ({
  favouriteBeers: state.beer.favouriteBeers,
  popupBeer: state.beer.popupBeer,
  beerInCart: state.beer.beerInCart,
  showMode: state.beer.showMode
});

const mapDispatchProps = dispatch => ({
  addFavouriteBeer: beerId => dispatch(addFavouriteBeer(beerId)),
  removeFavouriteBeer: beerId => dispatch(removeFavouriteBeer(beerId)),
  showPopupBeer: beer => dispatch(showModalBeer(beer)),
  removePopupBeer: () => dispatch(removeModalBeer()),
  changeBeerInCart: (beerId, amount) => dispatch(changeBeerInCart(beerId, amount)),
  changeShowMode: mode => dispatch(changeShowMode(mode))
});

export default connect(
  mapStateToProps,
  mapDispatchProps
)(Home);
