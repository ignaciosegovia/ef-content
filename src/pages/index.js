import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import { Helmet } from 'react-helmet'
import Hero from '../components/hero'
import Layout from '../components/layout'
import ArticlePreview from '../components/article-preview'
import { isMobile } from 'react-device-detect'

class RootIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const lifeEvents = get(this, 'props.data.allContentfulLifeEvent.nodes')

    console.log(lifeEvents)

    return (
      <Layout location={this.props.location}>
        <div style={{ background: '#fff' }}>
          <Helmet title={siteTitle} />
          {null && <Hero data={lifeEvents} />}
          {!isMobile && (
            <div className="wrapper">
              <ul className="article-list">
                {lifeEvents.map((le) => {
                  return (
                    <li key={le.contentful_id}>
                      <ArticlePreview lifeEvent={le} />
                    </li>
                  )
                })}
              </ul>
            </div>
          )}
          {isMobile && (
            <div className="wrapper" style={{ display: 'flex' }}>
              <ul
                className="article-list"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                }}
              >
                {lifeEvents.map((le) => {
                  return (
                    <li key={le.contentful_id}>
                      <ArticlePreview lifeEvent={le} />
                    </li>
                  )
                })}
              </ul>
            </div>
          )}
        </div>
      </Layout>
    )
  }
}

export default RootIndex

export const pageQuery = graphql`
  query HomeQuery {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulLifeEvent {
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
        }
        lowDown {
          body {
            body
            id
          }
          slug
        }
        nittyGritty {
          body {
            body
            id
          }
          slug
        }
      }
    }
  }
`
