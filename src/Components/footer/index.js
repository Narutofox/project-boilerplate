import React from 'react';
import PropTypes from 'prop-types';
import { SocialIcon } from 'react-social-icons';
import styles from './index.css';


export default class Footer extends React.Component {
  render() {
    return (
      <div className={styles.footer}>
          {this.props.children}
          <SocialIcon url="https://twitter.com" />
          <SocialIcon url="https://google.com" />
          <SocialIcon url="https://facebook.com" />
          <SocialIcon url="https://instagram.com" />
          <SocialIcon url="https://linkedin.com" />
      </div>
    )
  }
}

Footer.propTypes = {
  children: PropTypes.node
};
