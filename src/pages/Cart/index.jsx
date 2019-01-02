import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Header, Main, Footer, Table } from 'ivanciceksstorybook/dist';
import { setBeerInCart, removeBeerFromCart } from '../../components/beerCards/actions';
import logo from '../../../assets/duff.png';
import BeerNavigation from '../../components/beerNavigation';
import close from '../../../assets/cancel-circle.png';
import beers from '../../../assets/beers';

class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.setBeerInCart = this.setBeerInCart.bind(this);
    this.removeBeerFromCart = this.removeBeerFromCart.bind(this);
  }

  setBeerInCartFunc(beerId, event) {
    // eslint-disable-next-line no-restricted-globals
    if (!isNaN(event.target.value)) {
      this.props.setBeerInCart(beerId, event.target.value);
    }
  }

  setBeerInCart(beerId, quantity) {
    // eslint-disable-next-line no-restricted-globals
    if (!isNaN(quantity)) {
      this.props.setBeerInCart(beerId, quantity);
    }
  }

  // eslint-disable-next-line consistent-return
  beerToDataSet(beer) {
    if (
      beer !== null &&
        beer !== undefined &&
        this.props.beerInCart !== null &&
        this.props.beerInCart !== undefined &&
        this.props.beerInCart.some(element => element.beerId === beer.id)
    ) {
      const beerInCart = this.props.beerInCart.find(element => element.beerId === beer.id);
      return (
        [
          {
            image_url: beer.image_url,
            image_alt: beer.name
          },
          { value: beer.name },
          {
            inputValue: beerInCart.quantity,
            inputType: 'text',
            inputPattern: '[0-9]*',
            inputChange: this.setBeerInCartFunc.bind(this, beer.id)
          },
          { actions: [{ ImageUrl: close, OnClick: () => this.removeBeerFromCart(beer.id) }] }
        ]
      );
    }

    return [];
  }

  removeBeerFromCart(beerId) {
    this.props.removeBeerFromCart(beerId);
  }


  render() {
    const headers = ['', 'Name', 'Quantity'];
    const dataSet = beers.map(beer =>
      this.beerToDataSet(beer));

    const beersInCart = this.props.beerInCart.reduce((a, b) => a + b.quantity, 0);
    const div = (
      <div>
        <Header text="Duff Bears" imgUrl={logo} />
        <BeerNavigation activeContent="Cart" beersInCart={beersInCart} />
        <Main>
          <Table headerArray={headers} tableBodyData={dataSet} />
        </Main>
        <Footer><div>&copy; Ivan Čiček - 2018</div></Footer>
      </div>
    );

    return div;
  }
}

Cart.defaultProps = {
  beerInCart: [],
  setBeerInCart: undefined,
  removeBeerFromCart: undefined
};

Cart.propTypes = {
  setBeerInCart: PropTypes.func,
  removeBeerFromCart: PropTypes.func,
  beerInCart: PropTypes.arrayOf(PropTypes.shape({
    beerId: PropTypes.number,
    quantity: PropTypes.number
  }))
};


const mapStateToProps = state => ({
  beerInCart: state.beer.beerInCart
});

const mapDispatchProps = dispatch => ({
  removeBeerFromCart: beerId => dispatch(removeBeerFromCart(beerId)),
  setBeerInCart: (beerId, quantity) => dispatch(setBeerInCart(beerId, quantity))
});

export default connect(
  mapStateToProps,
  mapDispatchProps
)(Cart);
