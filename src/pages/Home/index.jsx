import React from 'react';
import { Link } from 'react-router-dom';
import { Header, Main, Card, Button, Navigation } from 'storybook-project/dist';
import style from './index.css'
import beers from '../../../assets/beers.js'

export default class Home extends React.Component {
  render() {
    const cards = beersToDisplay.map(beer => 
			<Card
				key={beer.id}
				imgUrl={beer.image_url}
				name={beer.name}
				tagline={beer.tagline}
                onFavourite= {() =>{this.toggleFavouriteBeer(beer.id)}}
                onInfo={() => this.setPopupBeer(beer)}
                onPlus={() => this.addBeerToCart(beer.id)}
                isFavourite = { this.props.favouriteBeers.includes(beer.id) === true ? "true" : "false"}
            >
			</Card>
        )
    const beerCount = 0;
    const div = (
      <div>
          <Header title='Duff Beers'/>
          <Navigation links =
              {
                  [
                      {
                          link: 'Cart',
                          title: "My Cart (" + beerCount + ")"
                      }
                  ]
              }
          />
          <Main>
              <div>
                  <Button onClick={() => this.changeShowToNewMode('All')} classes={style.button}>
                      {"Show all beers (" + beers.length + ")"} 
                  </Button>
                  
                  <Button onClick={() => this.changeShowToNewMode('Favourite')} classes={style.button}>
                      {"Show just Favourites beers (" + (this.props.favouriteBeers === undefined ? 0 : this.props.favouriteBeers.length) + ")"}
                  </Button>
              </div>
              {cards}
          </Main>        
      </div>
  )

  return div;
  }
}
