import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Header, Main, Footer, Button } from 'ivanciceksstorybook/dist';
import beers from '../../../assets/beers';
import BeerCards from '../../components/beerCards';
import { addFavouriteBeer, removeFavouriteBeer, showModalBeer, removeModalBeer, setBeerInCart, changeBeersToShow } from '../../components/beerCards/actions';
import logo from '../../../assets/duff.png';
import BeerNavigation from '../../components/beerNavigation';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.showModalBeer = this.showModalBeer.bind(this);
    this.removeModalBeer = this.removeModalBeer.bind(this);
    this.setBeerInCart = this.setBeerInCart.bind(this);
    this.addOrRemoveBeerFavorite = this.markBeerAsFavorite.bind(this);
    this.changeBeersToShow = this.changeBeersToShow.bind(this);
  }

  setBeerInCart(beerId) {
    this.props.setBeerInCart(beerId, 1);
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

  showModalBeer(beer) {
    this.props.showModalBeer(beer);
  }

  changeBeersToShow(beerType) {
    this.props.changeBeersToShow(beerType);
  }
  render() {
    let beersToDisplay = beers;
    if (this.props.showMode === 'Favourite' && this.props.favouriteBeers !== undefined) {
      beersToDisplay = beers.filter((beer) => { return this.props.favouriteBeers.includes(beer.id); });
    }

    const cards = (<BeerCards beers={beersToDisplay}
      addOrRemoveBeerFavorite={this.addOrRemoveBeerFavorite}
      setBeerInCart={this.setBeerInCart}
      favouriteBeers={this.props.favouriteBeers}
      setPopupBeer={this.showModalBeer}
    />);
    const beersInCart = this.props.beerInCart.reduce((a, b) => a + b.amount, 0);
    const div = (
      <div>
        <Header text="Duff Bears" imgUrl={logo} />
        <BeerNavigation beersInCart={beersInCart} />
        <Main>
          <div>
            <Button onClick={() => this.changeBeersToShow('All')} text={`Show all beers (${beers.length})`}>      
            </Button>

            <Button onClick={() => this.changeBeersToShow('Favourite')} text={`Show Favourites beers (${this.props.favouriteBeers === undefined ? 0 : this.props.favouriteBeers.length})`}>
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
  showModalBeer: undefined,
  removeFavouriteBeer: undefined,
  removeModalBeer: undefined,
  setBeerInCart: undefined,
  addFavouriteBeer: undefined,
  changeBeersToShow: undefined,
  showMode: '',
  favouriteBeers: [],
  beerInCart: []
};

Home.propTypes = {
  showModalBeer: PropTypes.func,
  removeFavouriteBeer: PropTypes.func,
  removeModalBeer: PropTypes.func,
  setBeerInCart: PropTypes.func,
  addFavouriteBeer: PropTypes.func,
  changeBeersToShow: PropTypes.func,
  showMode: PropTypes.string,
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
  setBeerInCart: (beerId, amount) => dispatch(setBeerInCart(beerId, amount)),
  changeBeersToShow: beerType => dispatch(changeBeersToShow(beerType))
});

export default connect(
  mapStateToProps,
  mapDispatchProps
)(Home);
