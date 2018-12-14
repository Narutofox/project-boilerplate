import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';

export default class Header extends React.Component {
  render() {
    return <div className={styles.header}>
      <div>
          <span>{this.props.text}</span>
          <img src={this.props.imgUrl}/>
      </div>
      {this.props.children}
    </div>;
  }
}


Header.defaultProps = {
  imgUrl: '',
  children: undefined,
  text: ''
};

Header.propTypes = {
  children: PropTypes.node,
  imgUrl: PropTypes.string,
  text: PropTypes.string
};
