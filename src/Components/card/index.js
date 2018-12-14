import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import info from '../../content/icons/PNG/info.png';
import plus from '../../content/icons/PNG/plus.png';
import starFull from '../../content/icons/PNG/star-full.png';
import starEmpty from '../../content/icons/PNG/star-empty.png';
import RoundIconButton from '../roundIconButton';

export default class Card extends React.Component {
  // eslint-disable-next-line class-methods-use-this
  getFavouriteIcon(isFavourite) {
    if (isFavourite !== undefined && isFavourite === 'true') {
      return starFull;
    }
    return starEmpty;
  }

  render() {
    return (
          <div className={styles.card}>
              <div className={styles.cardActions}>
                <div className={styles.cardActionsLeft}>
                  <RoundIconButton imageLink={this.getFavouriteIcon(this.props.isFavourite)} onClick={this.props.onStarClick}/>
                </div>
                <div className={styles.cardActionsRight}>
                      <RoundIconButton imageLink={info} onClick={this.props.onInfoClick}/>
                      <RoundIconButton imageLink={plus} onClick={this.props.onPlusClick}/>
                </div>
              </div>
              <img src={this.props.imgUrl} className={styles.cardImage}/>
              <div className={styles.cardDescription}>
                  <h4 className={styles.cardTitle}>{this.props.name}</h4>
                  <p className={styles.cardTagline}>{this.props.tagline}</p>
              </div>
          </div>
    );
  }
}


Card.defaultProps = {
  imgUrl: '',
  name: '',
  tagline: '',
  isFavourite: false,
  onInfoClick: undefined,
  onPlusClick: undefined,
  onStarClick: undefined
};

Card.propTypes = {
  imgUrl: PropTypes.string,
  name: PropTypes.string,
  tagline: PropTypes.string,
  isFavourite: PropTypes.bool,
  onInfoClick: PropTypes.func,
  onPlusClick: PropTypes.func,
  onStarClick: PropTypes.func
};
