import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import Layout from '../components/layout'
import Dropdown from '../components/dropdown'
import Img from 'gatsby-image'

import { isMobile } from 'react-device-detect'
import heroStyles from '../components/hero.module.css'
import classes from './LowDownNittyGritty.module.css'

class NittyGrittyTemplate extends React.Component {
  render() {
    const lifeEvent = get(this.props, 'data.allContentfulLifeEvent.nodes[0]')
    return (
      <Layout location={this.props.location}>
        <div style={{ background: '#F8FAFF' }}>
          {lifeEvent.nittyGritty.map((data) => {
            if (isMobile) {
              console.log(data.slug)
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
                  <div className="wrapper" style={{padding: '0', backgroundColor: '#F8FAFF', margin: '0', width: '100%'}}>
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

export default NittyGrittyTemplate

export const pageQuery = graphql`
  query NittyGrittyQuery($id: String!) {
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
        nittyGritty {
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
