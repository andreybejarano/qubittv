import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

import styles from './DescriptionMovie.css';

export default class DescriptionMovie extends Component {
  render() {
    return (
      <div className={styles.root}>
        <div>
          <h1 className={styles.titleMovie}>
            {this.props.movie.metadata.titulo_internacional}
          </h1>
        </div>
        <div>
          Género: {this.props.movie.genres}
        </div>
        <div>
          Origen: {this.props.movie.countries}
        </div>
        <div>
          {this.props.movie.runtime}min&nbsp;
          <Icon>record_voice_over</Icon> {this.props.movie.default_language}
        </div>
        <Button variant="contained" className={styles.btnPlay}>
          <Icon>play_circle_outline</Icon>Ver
        </Button>
      </div>
    );
  }
}
