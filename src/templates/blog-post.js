import React from 'react'
import { graphql } from 'gatsby'
import { Link } from 'gatsby'
import { Helmet } from 'react-helmet'
import get from 'lodash/get'
import Img from 'gatsby-image'
import Layout from '../components/layout'

import heroStyles from '../components/hero.module.css'

class BlogPostTemplate extends React.Component {
  render() {
    const lifeEvent = get(this.props, 'data.allContentfulLifeEvent.nodes[0]')
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')

    return (
      <Layout location={this.props.location}>
        <div style={{ background: '#fff' }}>
          <Helmet title={`${lifeEvent.title} | ${siteTitle}`} />
          <div className="wrapper">
            <h1 className="section-headline">{lifeEvent.name}</h1>
            <h3>
              <Link to={`/blog/${lifeEvent.name}/lowdown`}>
                Low Down
              </Link>
            </h3>
            <h3>
              <Link to={`/blog/${lifeEvent.name}/nittygritty`}>
                Nitty Gritty
              </Link>
            </h3>
          </div>
        </div>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query LifeEventByID($id: String!) {
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
