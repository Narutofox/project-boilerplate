import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';

export default class RoundIconButton extends React.Component {
  render() {
    return (
        <button onClick={this.props.onClick} className={styles.roundIconButton} disabled={this.props.disabled}>
             <img src={this.props.imageLink}/>
        </button>
    );
  }
}

RoundIconButton.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  imageLink: PropTypes.string
};
