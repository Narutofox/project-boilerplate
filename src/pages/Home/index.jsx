import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Header, Main, Footer } from 'ivanciceksstorybook/dist';
import style from './index.css';
import beers from '../../../assets/beers';
import BeerCards from '../../components/beerCards';
import { addFavouriteBeer, removeFavouriteBeer, showModalBeer, removeModalBeer, addBeerToCart } from '../../components/beerCards/actions';
import logo from '../../../assets/duff.png';
import BeerNavigation from '../../components/beerNavigation';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.showModalBeer = this.showModalBeer.bind(this);
    this.removeModalBeer = this.removeModalBeer.bind(this);
    this.addBeerToCart = this.addBeerToCart.bind(this);
    this.addOrRemoveBeerFavorite = this.markBeerAsFavorite.bind(this);
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
    this.props.addBeerToCart(beerId, 1);
  }

  render() {
    const cards = (<BeerCards beers={beers}
      addOrRemoveBeerFavorite={this.addOrRemoveBeerFavorite}
      addBeerToCart={this.addBeerToCart}
      favouriteBeers={this.props.favouriteBeers}
      setPopupBeer={this.showModalBeer}
    />);
    const beersInCart = this.props.beerInCart.reduce((a, b) => a + b.amount, 0);
    const div = (
      <div>
        <Header text="Duff Bears" imgUrl={logo} />
        <BeerNavigation beersInTotal={beers.length} beersInCart={beersInCart} favouriteBeers={this.props.favouriteBeers} />
        <Main>
          {cards}
        </Main>
        <Footer><div>&copy; Ivan Čiček - 2018</div></Footer>
      </div>
    );

    return div;
  }
}

Home.defaultProps = {
  showModalBeer: undefined,
  removeFavouriteBeer: undefined,
  removeModalBeer: undefined,
  addBeerToCart: undefined,
  addFavouriteBeer: undefined,
  favouriteBeers: [],
  beerInCart: []
};

Home.propTypes = {
  showModalBeer: PropTypes.func,
  removeFavouriteBeer: PropTypes.func,
  removeModalBeer: PropTypes.func,
  addBeerToCart: PropTypes.func,
  addFavouriteBeer: PropTypes.func,
  favouriteBeers: PropTypes.instanceOf(Array),
  beerInCart: PropTypes.instanceOf(Array)
};


const mapStateToProps = state => ({
  favouriteBeers: state.beer.favouriteBeers,
  popupBeer: state.beer.popupBeer,
  beerInCart: state.beer.beerInCart
});

const mapDispatchProps = dispatch => ({
  addFavouriteBeer: beerId => dispatch(addFavouriteBeer(beerId)),
  removeFavouriteBeer: beerId => dispatch(removeFavouriteBeer(beerId)),
  showPopupBeer: beer => dispatch(showModalBeer(beer)),
  removePopupBeer: () => dispatch(removeModalBeer()),
  addBeerToCart: (beerId, amount) => dispatch(addBeerToCart(beerId, amount))
});

export default connect(
  mapStateToProps,
  mapDispatchProps
)(Home);
