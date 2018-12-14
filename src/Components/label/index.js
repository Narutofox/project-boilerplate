import React from 'react';
import styles from './index.css';

export default class Label extends React.Component {
    render() {
      return <label className={styles.font3}>{this.props.children}</label>;
    }
  }