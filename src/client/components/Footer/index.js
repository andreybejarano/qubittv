import React from 'react';

import styles from './Footer.css';

class footer extends React.Component {
  render() {
    return (
      <div className={styles.root}>
        <img className={styles.logoFooter} src={'https://ringo.cdnar.net/assets/public/qubit/production/logo-qubit-blanco.svg'} />
        <span>©	2019 - Todos los derechos reservados</span>
      </div>
    );
  }
}

export default footer;
