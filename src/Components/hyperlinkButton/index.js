import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';

export default class HyperlinkButton extends React.Component {
  render() {
    if (this.props.disabled == true) {
      return <input className={styles.hyperlinkButton} disabled={this.props.disabled} type='button' value={this.props.text} />;
    }
    else{
      return (
        <button className={styles.hyperlinkButton}> 
          <a href={this.props.url}  disabled={this.props.disabled }>{this.props.text}</a>
        </button>
      )
    }
  }
}

HyperlinkButton.propTypes = {
  text: PropTypes.string,
  url: PropTypes.string,
  disabled: PropTypes.bool
};
