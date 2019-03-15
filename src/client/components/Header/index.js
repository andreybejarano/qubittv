import React from 'react';

import styles from './Header.css';

class Header extends React.Component {
  render() {
    return (
      <div className={styles.root}>
        <img className={styles.logo} src={'https://ringo.cdnar.net/assets/public/qubit/production/logo-qubit-azul.svg'} />
      </div>
    );
  }
}

export default Header;
