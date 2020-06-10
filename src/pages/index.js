import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const blogCard = ({ node }) => {
  console.log({ node })
  const {
    frontmatter,
    fields: { slug }
  } = node
  return (
    <div>
      <Link to={slug}>
        <h4 class="font-medium">{frontmatter.title}</h4>
        <p class="text-gray-700">
          <small>{frontmatter.date}</small>
        </p>
        <p>{node.excerpt}</p>
      </Link>
    </div>
  )
}

const IndexPage = ({ data }) => {
  const blog = data.allMarkdownRemark.edges
  return (
    <Layout>
      <SEO title="Home" />
      <div>
        {blog.map(post => {
          return blogCard(post)
        })}
      </div>
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query {
    allMarkdownRemark {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`
