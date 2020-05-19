import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import Layout from '../components/layout'
import Dropdown from '../components/dropdown'
import Img from 'gatsby-image'

import { isMobile } from 'react-device-detect'
import heroStyles from '../components/hero.module.css'
import classes from './LowDownNittyGritty.module.css'

class LowDownTemplate extends React.Component {
  render() {
    const lifeEvent = get(this.props, 'data.allContentfulLifeEvent.nodes[0]')
    return (
      <Layout location={this.props.location}>
        <div style={{ background: '#fff' }}>
          {!isMobile && <div className={heroStyles.hero}>
            <Img
              className={heroStyles.heroImage}
              alt="Header"
              fluid={lifeEvent.image.file.url}
            />
          </div>}
          {lifeEvent.lowDown.map((data) => {
            if (isMobile) {
              return (
                <Dropdown
                  title={data.slug
                    .split('-')
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ')}
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: data.body.childMarkdownRemark.html,
                    }}
                  />
                </Dropdown>
              )
            } else {
              return (
                <>
                  <div className="wrapper" style={{padding: '0'}}>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: data.body.childMarkdownRemark.html,
                      }}
                    />
                  </div>
                </>
              )
            }
          })}
        </div>
      </Layout>
    )
  }
}

export default LowDownTemplate

export const pageQuery = graphql`
  query LowDownQuery($id: String!) {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulLifeEvent(filter: { id: { eq: $id } }) {
      nodes {
        name
        createdAt
        contentful_id
        id
        icon {
          contentful_id
          id
          file {
            url
          }
        }
        image {
          contentful_id
          id
          file {
            url
          }
          fluid {
            src
          }
        }
        lowDown {
          body {
            childMarkdownRemark {
              html
            }
          }
          slug
        }
      }
    }
  }
`
