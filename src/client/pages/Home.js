import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';

import Layout from '../layouts/Default';
import Title from '../components/Title';
import DescriptionMovie from '../components/DescriptionMovie';

import styles from './Home.css';
import MovieService from '../services/movie';

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      movie: null
    };
  }

  componentDidMount() {
    this.getMovie();
  }

  async getMovie() {
    const movie = await MovieService.getMovie();
    this.setState({ movie: movie.Content });
  }

  render() {
    return (
      <Layout>
        <div className={styles.root}>
          {!this.state.movie && <CircularProgress className={styles.progress} size={80} />}
          {this.state.movie &&
            <Grid container>
              <Grid className={styles.containerImage} item md={3} xs={12}>
                <img className={styles.imageCover} src={this.state.movie.metadata.img_tv} />
              </Grid>
              <Hidden smUp>
                <DescriptionMovie movie={this.state.movie} />
              </Hidden>
              <Hidden mdDown>
                <Grid
                  style={{
                    backgroundImage: `url("${this.state.movie.metadata.img_fanart_1}")`
                  }}
                  className={styles.containerImage} item md={9} xs={12}
                >
                  <DescriptionMovie movie={this.state.movie} />
                </Grid>
              </Hidden>
              <Grid className={styles.containerSummary} item xs={12}>
                <Title size="xl">Sinopsis:</Title>
                <Divider className={styles.divider} />
                <p>
                  {this.state.movie.short_summary}
                </p>
              </Grid>
              <Grid className={styles.containerCast} item xs={12}>
                <Title size="xl">Actores:</Title>
                <Divider className={styles.divider} />
                {
                  this.state.movie.cast.map((actor, key) =>
                    <span className={styles.orangeText} key={key}>{actor.name}</span>
                  )
                }
              </Grid>
            </Grid>
          }
        </div>
      </Layout>
    );
  }
}
