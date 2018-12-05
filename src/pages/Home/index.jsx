import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Header, Main, Button, Navigation, Footer } from 'ivanciceksstorybook/dist';
import style from './index.css';
import beers from '../../../assets/beers.js';
import { connect } from 'react-redux';
import { BeerCards } from '../../Components/BeerCards/index.js';
import { addFavouriteBeer, removeFavouriteBeer, showPopupBeer, removePopupBeer, changeBeerInCart, changeShowMode } from '../../Components/BeerCards/methods.js';
import logo from '../../../assets/duff.png';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.setPopupBeer = this.setPopupBeer.bind(this);
    this.removePopupBeer = this.removePopupBeer.bind(this);
    this.addBeerToCart = this.addBeerToCart.bind(this);
    this.changeShowToNewMode = this.changeShowToNewMode.bind(this);
    this.toggleFavouriteBeer = this.toggleFavouriteBeer.bind(this);
    this.addBeerToCart = this.addBeerToCart.bind(this);
  }

  setPopupBeer(beer) {
    this.props.showPopupBeer(beer);
  }

  toggleFavouriteBeer(beerId) {
    if (this.props.favouriteBeers.includes(beerId)) {
      this.props.removeFavouriteBeer(beerId);
    } else {
      this.props.addFavouriteBeer(beerId);
    }
  }

  removePopupBeer() {
    this.props.removePopupBeer();
  }

  addBeerToCart(beerId) {
    this.props.changeBeerInCart(beerId, 1);
  }

  changeShowToNewMode(mode) {
    this.props.changeShowMode(mode);
  }

  render() {
    const cards = (<BeerCards beers={beers}
      toggleFavouriteBeer={this.toggleFavouriteBeer}
      addBeerToCart={this.addBeerToCart}
      favouriteBeers={this.props.favouriteBeers}
      setPopupBeer={this.setPopupBeer}
    />);
    const beerCount = this.props.beerInCart.reduce((a, b) => a + b.amount, 0);
    const div = (
      <div>
        <Header><div>Duff Beers</div> <div><img src={logo} alt="Duff Beers" /></div></Header>
        <Navigation links={
                  [
                      {
                          link: 'Cart',
                          title: `My Cart (${beerCount})`
                      }
                  ]
              }
        />
        <Main>
          <div>
            <Button onClick={() => this.changeShowToNewMode('All')} classes={style.button}>
              {`Show all beers (${beers.length})`}
            </Button>

            <Button onClick={() => this.changeShowToNewMode('Favourite')} classes={style.button}>
              {`Show just Favourites beers (${this.props.favouriteBeers === undefined ? 0 : this.props.favouriteBeers.length})`}
            </Button>
          </div>
          {cards}
        </Main>
        <Footer><div>&copy; Ivan Čiček - 2018</div></Footer>
      </div>
    );

    return div;
  }
}

Home.defaultProps = {
  showPopupBeer: undefined,
  removeFavouriteBeer: undefined,
  removePopupBeer: undefined,
  changeBeerInCart: undefined,
  changeShowMode: undefined,
  addFavouriteBeer: undefined,
  favouriteBeers: [],
  beerInCart: []
};

Home.propTypes = {
  showPopupBeer: PropTypes.func,
  removeFavouriteBeer: PropTypes.func,
  removePopupBeer: PropTypes.func,
  changeBeerInCart: PropTypes.func,
  changeShowMode: PropTypes.func,
  addFavouriteBeer: PropTypes.func,
  favouriteBeers: PropTypes.instanceOf(Array),
  beerInCart: PropTypes.instanceOf(Array)
};


const mapStateToProps = state => ({
  favouriteBeers: state.main.favouriteBeers,
  popupBeer: state.main.popupBeer,
  beerInCart: state.main.beerInCart,
  showMode: state.main.showMode
});

const mapDispatchProps = dispatch => ({
  addFavouriteBeer: beerId => dispatch(addFavouriteBeer(beerId)),
  removeFavouriteBeer: beerId => dispatch(removeFavouriteBeer(beerId)),
  showPopupBeer: beer => dispatch(showPopupBeer(beer)),
  removePopupBeer: () => dispatch(removePopupBeer()),
  changeBeerInCart: (beerId, amount) => dispatch(changeBeerInCart(beerId, amount)),
  changeShowMode: mode => dispatch(changeShowMode(mode))
});

export default connect(
  mapStateToProps,
  mapDispatchProps
)(Home);
