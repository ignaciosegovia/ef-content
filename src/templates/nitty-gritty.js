import React, {useState, useRef, useEffect} from 'react'
import {graphql} from 'gatsby'
import get from 'lodash/get'
import Layout from '../components/layout'
import Dropdown from '../components/dropdown'
import {isMobile} from 'react-device-detect'
import classes from './LowDownNittyGritty.module.css'

const NittyGrittyTemplate = (props) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const lifeEvent = get(props, 'data.allContentfulLifeEvent.nodes[0]')
  const imgEl = useRef(null);
  const contentEl = useRef(null);

  const handleScroll = e => {
    if (e.target.scrollingElement.scrollTop > 50) {
      imgEl.current.style.height = '180px';
    } else {
      imgEl.current.style.height = '290px';
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  }, [])

  return (
    <Layout location={props.location}>
      <div className={classes.container}>
        {isMobile ? (
          lifeEvent.nittyGritty.map((data) => {
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
              className={classes.wrapper}
              style={{padding: '0', margin: '0', width: '100%'}}
            >
              <img ref={imgEl} className={classes.heroImg} alt="hero" src={lifeEvent.image.file.url} />
              <div ref={contentEl} className={classes.content}>
                <div style={{display: 'flex'}}>
                  {lifeEvent.nittyGritty.map((le, index) => {
                    return (
                      <div
                        className={classes.cardAnimation}
                        onClick={() => {
                          setCurrentIndex(index)
                        }}
                        style={{
                          width: '20%',
                          cursor: 'pointer',
                          marginRight: '2%'
                        }}
                      >
                        <img
                          src={le.heroImage.file.url}
                          alt="hero"
                          style={{width: '100%'}}
                        />
                        <p
                          style={{
                            color: currentIndex === index ? '#2CCD79' : '#293861',
                            fontWeight: 'bold',
                            margin: '-10px 0 0 18px',
                          }}
                        >
                          {le.slug
                            .split('-')
                            .map(
                              (word) => word.charAt(0).toUpperCase() + word.slice(1)
                            )
                            .join(' ').replace("Nitty_gritty", '')}
                        </p>
                      </div>
                    )
                  })}
                </div>
                <div
                  dangerouslySetInnerHTML={{
                    __html:
                      lifeEvent.nittyGritty[currentIndex].body.childMarkdownRemark
                        .html,
                  }}
                />
              </div>
            </div>
          )}
      </div>
    </Layout>
  )
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
