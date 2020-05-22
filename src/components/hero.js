import React from 'react'
import Img from 'gatsby-image'

import styles from './hero.module.css'

export default (props) => (
  <div className={styles.hero}>
    <Img
      className={styles.heroImage}
      alt={props.name}
      fluid={props.fluid}
    />
  </div>
)
