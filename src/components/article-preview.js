import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import { BrowserView, MobileView } from 'react-device-detect'
import Dropdown from '../components/dropdown'
import styles from './article-preview.module.css'

export default (props) => (
  <>
    <BrowserView>
      <div className={styles.preview}>
        <h3 className={styles.previewTitle}>
          <Link to={`/blog/${props.lifeEvent.id}`}>{props.lifeEvent.name}</Link>
        </h3>
        <small>{props.lifeEvent.name}</small>
        {/*article.tags &&
        article.tags.map((tag) => (
          <p className={styles.tag} key={tag}>
            {tag}
          </p>
        )) */}
      </div>
    </BrowserView>
    <MobileView>
      <Dropdown title={props.lifeEvent.name}></Dropdown>
    </MobileView>
  </>
)
