import React, { useState } from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import Layout from '../components/layout'
import Dropdown from '../components/dropdown'
import Img from 'gatsby-image'

import { isMobile } from 'react-device-detect'
import heroStyles from '../components/hero.module.css'
import classes from './LowDownNittyGritty.module.css'

const LowDownTemplate = (props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const lifeEvent = get(props, 'data.allContentfulLifeEvent.nodes[0]');

  return (
    <Layout location={props.location}>
      <div
        className={classes.container}
      >
        {isMobile ? (
          lifeEvent.lowDown.map((data) => {
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
          })
        ) : (
          <div
            className="wrapper"
            style={{ padding: '0', margin: '0', width: '100%'}}
          >
            <div style={{ display: 'flex' }}>
              {lifeEvent.lowDown.map((le, index) => {
                return (
                  <div
                    onClick={() => {
                      setCurrentIndex(index);
                    }}
                    style={{width: '20%', cursor: 'pointer', marginRight: '2%'}}
                  >
                    <img src={le.heroImage.file.url} alt="hero" style={{width: '100%'}}/>
                    <p style={{ color: currentIndex === index ? '#2CCD79' : '#293861', fontWeight: 'bold', margin: 0, textAlign: 'center' }}>
                      {le.slug
                        .split('-')
                        .map(
                          (word) => word.charAt(0).toUpperCase() + word.slice(1)
                        )
                        .join(' ')}
                    </p>
                  </div>
                )
              })}
            </div>
            <div
              dangerouslySetInnerHTML={{
                __html:
                  lifeEvent.lowDown[currentIndex].body.childMarkdownRemark
                    .html,
              }}
            />
          </div>
        )}
      </div>
    </Layout>
  )
}

export default LowDownTemplate;

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
          heroImage {
            file {
              url
            }
          }
          slug
        }
      }
    }
  }
`
