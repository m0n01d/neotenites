import React from "react"
import { Link } from "gatsby"
import "./app.css"
import { GeoJSON, Map, TileLayer, Marker, Popup } from "react-leaflet"
import L from "leaflet"

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
        <MyMap />
      </div>
    </Layout>
  )
}

const MyMap = () => {
  const [a, b] = [28.7948813, -81.425958]
  const [x, y] = [28.568864, -81.3566964]
  const features = [
    {
      geometry,
      type: "Feature",
      properties: {
        name: "dwit",
        show_on_map: true
      }
    }
  ]
  const coordinates = [
    [y, x],
    [b, a]
  ]

  const geometryForLines = [
    {
      type: "LineString",
      coordinates
    }
  ]
  // Todo: add markers for each cooridinate
  // Add date to coordinates so they can be use in marker
  //
  console.log({ features })
  return (
    <Map center={[a, b]} zoom={13} style={{ width: "100%", height: "100vh" }}>
      <TileLayer
        attribute="todo"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <GeoJSON
        style={i => ({
          weight: 0.3,
          //stroke-width: to have a constant width on the screen need to adapt with scale
          opacity: 1,
          dashArray: "3",
          fillOpacity: 0.5,
          fillColor: "red",
          color: "#f00",
          weight: 5,
          opacity: 0.65
        })}
        data={geometry}
        key={`test`}
      />
    </Map>
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
      sort: { fields: [frontmatter___date], order: DESC }
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
