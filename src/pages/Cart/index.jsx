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
  // eslint-disable-next-line consistent-return
  static beerToDataSet(beer, beerInCart) {
    if (beer.Id === beerInCart.beerId) {
      return (
        [
          { image_url: beer.image_url, image_alt: beer.name },
          { value: beer.name },
          { inputValue: beer.amount, inputType: 'number', inputChange: setBeerInCart(beerInCart.beerId, this) }
        ]
      );
    }
  }

  constructor(props) {
    super(props);
    this.setBeerInCart = this.setBeerInCart.bind(this);
    this.removeBeerFromCart = this.removeBeerFromCart.bind(this);
  }

  setBeerInCart(beerId, event) {
    this.props.setBeerInCart(beerId, event.target.value);
  }

  removeBeerFromCart(beerId) {
    this.props.removeBeerFromCart(beerId);
  }


  render() {
    const headers = ['', 'Name', 'Quantity'];
    const actions = this.props.beerInCart.map(beer => [{ ImageUrl: close, Alt: 'Delete', OnClick: removeBeerFromCart(beer.beerId) }]);
    const dataSet = beers.map(beer =>
      this.props.beerInCart.map(beerCart => this.beerToDataSet(beer, beerCart)));

    const beersInCart = this.props.beerInCart.reduce((a, b) => a + b.amount, 0);
    const div = (
      <div>
        <Header text="Duff Bears" imgUrl={logo} />
        <BeerNavigation activeContent="Cart" beersInCart={beersInCart} />
        <Main>
          <Table headerArray={headers} tableBodyData={dataSet} actionsArray={actions} />
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
  beerInCart: PropTypes.instanceOf(Array),
  setBeerInCart: PropTypes.func,
  removeBeerFromCart: PropTypes.func
};


const mapStateToProps = state => ({
  beerInCart: state.beer.beerInCart
});

const mapDispatchProps = dispatch => ({
  removeBeerFromCart: beerId => dispatch(removeBeerFromCart(beerId)),
  setBeerInCart: (beerId, quantity) => dispatch(setBeerInCart(beerId, quantity)),
});

export default connect(
  mapStateToProps,
  mapDispatchProps
)(Cart);
