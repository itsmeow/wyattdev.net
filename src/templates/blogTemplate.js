import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

const BlogTemplate = ({
  data: {
    markdownRemark: { frontmatter, html, wordCount, tableOfContents },
  },
}) => {
  let hasImage = frontmatter.image || frontmatter.image_svg
  return (
    <Layout eventkey="blog-page">
      <SEO
        title={frontmatter.title}
        description={frontmatter.description}
        keywords={frontmatter.keywords
          .split(",")
          .concat([
            `blog`,
            `blogs`,
            `technology blog`,
            `personal blog`,
            `writing`,
          ])}
        image={frontmatter?.image?.publicURL}
      />
      <main>
        <article id="blog-content-wrapper">
          <div id="blog-top">
            {hasImage ? (
              frontmatter.image_svg ? (
                <img
                  id="blog-image"
                  src={frontmatter.image_svg.publicURL}
                  alt={frontmatter.image_alt}
                  width={128}
                  height={128}
                />
              ) : (
                <GatsbyImage
                  id="blog-image"
                  image={frontmatter.image.childImageSharp.gatsbyImageData}
                  alt={frontmatter.image_alt}
                />
              )
            ) : (
              <></>
            )}
            <div id="blog-info">
              <h1 id="blog-title">{frontmatter.header}</h1>
              <div id="blog-meta">
                {frontmatter.date} - {wordCount.words} words
              </div>
            </div>
          </div>
          <hr />
          <div
            id="blog-table-of-contents"
            dangerouslySetInnerHTML={{
              __html:
                '<h2 style="margin-top:0;font-size:1.25rem;">Table of Contents</h2>' +
                tableOfContents,
            }}
          />
          <div id="blog-text" dangerouslySetInnerHTML={{ __html: html }} />
          <div id="blog-end">Written by Wyatt. Thank you for reading.</div>
        </article>
      </main>
    </Layout>
  )
}
export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      tableOfContents
      wordCount {
        words
      }
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
        header
        keywords
        description
        image_svg {
          publicURL
        }
        image {
          publicURL
        }
      }
    }
  }
`

export default BlogTemplate