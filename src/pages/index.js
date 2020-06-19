import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const blogCard = ({ node }) => {
  const {
    frontmatter,
    fields: { slug }
  } = node
  return (
    <div class="mb-3">
      <Link
        to={slug}
        className="font-mono p-px hover:bg-black  inline-block group"
      >
        <h4 class="font-medium underline group-hover:text-white text-lg">
          {frontmatter.title}
        </h4>
        <p class="text-sm text-gray-700 group-hover:text-gray-100">
          <small>{frontmatter.date}</small>
        </p>
      </Link>
    </div>
  )
}

const Section = ({ title, children }) => {
  return (
    <div class="mb-2">
      <h2 class="font-extrabold text-3xl ">{title}</h2>
      <div class="mt-2 py-2 px-4">{children}</div>
    </div>
  )
}

const IndexPage = ({ data }) => {
  const {
    blog: { edges: blogPosts },
    pages: { edges: pages }
  } = data
  return (
    <Layout>
      <SEO title="Home" />
      <div>
        <Section title="Home">
          {pages.map(post => {
            return blogCard(post)
          })}
        </Section>
        <Section title="Blog">
          {blogPosts.map(post => {
            return blogCard(post)
          })}
        </Section>
      </div>
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query {
    pages: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/pages/i" }, frontmatter: {} }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
          }
          fields {
            slug
          }
        }
      }
    }

    blog: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/blog/i" } }
    ) {
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
        }
      }
    }
  }
`
