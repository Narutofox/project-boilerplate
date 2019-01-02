import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Header, Main, Footer, Button, BeerModal } from 'ivanciceksstorybook/dist';
import beers from '../../../assets/beers';
import BeerCards from '../../components/beerCards';
import { addFavouriteBeer, removeFavouriteBeer, showModalBeer, removeModalBeer, addBeerToCart, changeBeersToShow } from '../../components/beerCards/actions';
import logo from '../../../assets/duff.png';
import BeerNavigation from '../../components/beerNavigation';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.showModalBeer = this.showModalBeer.bind(this);
    this.removeModalBeer = this.removeModalBeer.bind(this);
    this.addBeerToCart = this.addBeerToCart.bind(this);
    this.addOrRemoveBeerFavorite = this.markBeerAsFavorite.bind(this);
    this.changeBeersToShow = this.changeBeersToShow.bind(this);
  }

  addBeerToCart(beerId, quantity = 1) {
    this.props.addBeerToCart(beerId, quantity);
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
      beersToDisplay = beers.filter(beer => this.props.favouriteBeers.includes(beer.id));
    }
    let beerModal = null;   
    if (this.props.modalBeer !== null) {
      const isFavorite = this.props.favouriteBeers.includes(this.props.modalBeer.id);
      beerModal = (<BeerModal show
        imgUrl={this.props.modalBeer.image_url}
        beerName={this.props.modalBeer.name}
        beerDescription={this.props.modalBeer.description}
        beerId={this.props.modalBeer.id}
        onClose={this.removeModalBeer}
        addBeerToCart={this.addBeerToCart}
        markBeerAsFavorite={this.addOrRemoveBeerFavorite}
        isFavorite={isFavorite}
      />);
    }
    const cards = (<BeerCards beers={beersToDisplay}
      addOrRemoveBeerFavorite={this.addOrRemoveBeerFavorite}
      addBeerToCart={this.addBeerToCart}
      favouriteBeers={this.props.favouriteBeers}
      showModalBeer={this.showModalBeer}
    />);
    const beersInCart = this.props.beerInCart.reduce((a, b) => a + b.quantity, 0);
    const div = (
      <div>
        <Header text="Duff Bears" imgUrl={logo} />
        <BeerNavigation beersInCart={beersInCart} />
        <Main>
          <div>
            <Button onClick={() => this.changeBeersToShow('All')} text={`Show all beers (${beers.length})`} />

            <Button onClick={() => this.changeBeersToShow('Favourite')} text={`Show favourite beers (${this.props.favouriteBeers === undefined ? 0 : this.props.favouriteBeers.length})`} />
          </div>
          {cards}
        </Main>
        <Footer><div>&copy; Ivan Čiček - 2018</div></Footer>
        {beerModal}
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
  changeBeersToShow: undefined,
  showMode: '',
  favouriteBeers: [],
  beerInCart: [],
  modalBeer: null
};

Home.propTypes = {
  showModalBeer: PropTypes.func,
  removeFavouriteBeer: PropTypes.func,
  removeModalBeer: PropTypes.func,
  addBeerToCart: PropTypes.func,
  addFavouriteBeer: PropTypes.func,
  changeBeersToShow: PropTypes.func,
  showMode: PropTypes.string,
  favouriteBeers: PropTypes.instanceOf(Array),
  beerInCart: PropTypes.instanceOf(Array),
  modalBeer: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    image_url: PropTypes.string,
    description: PropTypes.string
  })
};


const mapStateToProps = state => ({
  favouriteBeers: state.beer.favouriteBeers,
  modalBeer: state.beer.modalBeer,
  beerInCart: state.beer.beerInCart,
  showMode: state.beer.showMode
});

const mapDispatchProps = dispatch => ({
  addFavouriteBeer: beerId => dispatch(addFavouriteBeer(beerId)),
  removeFavouriteBeer: beerId => dispatch(removeFavouriteBeer(beerId)),
  showModalBeer: beer => dispatch(showModalBeer(beer)),
  removeModalBeer: () => dispatch(removeModalBeer()),
  addBeerToCart: (beerId, quantity) => dispatch(addBeerToCart(beerId, quantity)),
  changeBeersToShow: beerType => dispatch(changeBeersToShow(beerType))
});

export default connect(
  mapStateToProps,
  mapDispatchProps
)(Home);
