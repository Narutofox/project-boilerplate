import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';

export default class Navigation extends React.Component {
  render() {
    
    if (this.props.links == null || this.props.links == undefined) {
      return (
        <nav className={styles.navigation}> 
              <a href="#" className={styles.active}>Home</a>
              <a href="#">News</a>
              <a href="#">Contact</a>
              <a href="#">About</a>
          </nav>
        )
    }
    else{
      return (
        <nav className={styles.navigation}> 
          {this.props.links.map(link => (<a href={link.path} className={link.active ? styles.active : undefined}>{link.content}</a>))}                   
        </nav>
      )
    }
    
  
  
  }
}

Navigation.propTypes = {
  links:PropTypes.array
};

