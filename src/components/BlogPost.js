import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"

export default function BlogPost({ data }) {
  const post = data.markdownRemark
  return (
    <Layout>
      <h1 className="font-extrabold font-mono text-2xl">
        <strong>{post.frontmatter.title}</strong>
      </h1>
      <div
        class="blog-post from-markdown w-full md:w-7/12 mt-4 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`
