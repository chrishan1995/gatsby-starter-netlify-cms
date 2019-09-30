import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'

export const IndexPageTemplate = ({
  image,
  imageMobile,
  heading,
  link,
  actionText,
}) => {
  const indexContainer = (
    <div className="container columns index-container">
      <div className="column is-narrow is-hidden-mobile"><div style={{width: '74px'}} /></div>
      <div className="column is-half-widescreen is-three-quarters-mobile has-text-centered-mobile index-content">
        <h1 className="is-size-3-mobile is-size-2-tablet is-size-1-desktop"
          style={{ lineHeight: '1.31', fontWeight: 'normal', }} >
          {heading}
        </h1>
        <a className="button is-rounded shopping-btn is-white" href={link}>{actionText}</a>
      </div>
    </div>
  )

  return (
    <div>
      <div
        className="full-width-image margin-top-0 index-page is-hidden-mobile"
        style={{
          backgroundImage: `url(${
            !!image.childImageSharp ? image.childImageSharp.fluid.src : image
          })`,
          backgroundPosition: `top left`,
          backgroundAttachment: `fixed`,
        }}
      >
        {indexContainer}
      </div>
      <div
        className="full-width-image margin-top-0 index-page is-hidden-tablet"
        style={{
          backgroundImage: `url(${
            !!imageMobile.childImageSharp ? imageMobile.childImageSharp.fluid.src : imageMobile
          })`,
          backgroundPosition: `top left`,
          backgroundAttachment: `fixed`,
        }}
      >
        {indexContainer}
      </div>
    </div>
  );
}

IndexPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  imageMobile: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  heading: PropTypes.string,
  link: PropTypes.string,
  actionText: PropTypes.string,
}

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  return (
    <Layout isHomePage={true}>
      <IndexPageTemplate
        image={frontmatter.image}
        imageMobile={frontmatter.imageMobile}
        heading={frontmatter.heading}
        link={frontmatter.link}
        actionText={frontmatter.actionText}
      />
    </Layout>
  )
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default IndexPage

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        imageMobile {
          childImageSharp {
            fluid(maxWidth: 1125, quality: 100){
              ...GatsbyImageSharpFluid
            }
          }
        }
        heading
        link
        actionText
      }
    }
  }
`
