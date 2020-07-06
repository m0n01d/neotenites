import React from "react"
import { Link } from "gatsby"
import "./app.css"
import { GeoJSON, Map, TileLayer, Marker, Popup } from "react-leaflet"

import * as iconUrl from "leaflet/dist/images/marker-icon-2x.png"
import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
// todo checkout https://www.freecodecamp.org/news/how-to-create-a-summer-road-trip-mapping-app-with-gatsby-and-leaflet/
//

const blogCard = ({ node }) => {
  const {
    frontmatter,
    fields: { slug }
  } = node
  return (
    <div className="mb-3">
      <Link
        to={slug}
        className="font-mono p-px hover:bg-black  inline-block group"
      >
        <h4 className="font-medium underline group-hover:text-white text-lg">
          {frontmatter.title}
        </h4>
        <p className="text-sm text-gray-700 group-hover:text-gray-100">
          <small>{frontmatter.date}</small>
        </p>
      </Link>
    </div>
  )
}

const Section = ({ title, children }) => {
  return (
    <div className="mb-2">
      <h2 className="font-extrabold text-3xl ">{title}</h2>
      <div className="mt-2 py-2 px-4">{children}</div>
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
      <div class="sm:flex h-full">
        <div class="sm:w-1/2">
          <Section title="Pages">
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
        <div class="sm:w-1/2 h-full">
          <MapWrap />
        </div>
      </div>
    </Layout>
  )
}
const MapWrap = () => {
  if (typeof window != "undefined") {
    return <MyMap />
  }
  return <span className="font-mono">There should be a map here...</span>
}

const MyMap = () => {
  const wekivaFalls = {
    name: "Wekiva Falls",
    loc: [28.7948813, -81.425958]
  } // wekiva falls
  const oldHouse = {
    name: "Our old house",
    loc: [28.5688617, -81.3587769]
  } // merritt park
  const coordinates = [oldHouse, wekivaFalls]
  // todo move this data to api to query with graphql

  const geometryForLines = [
    {
      type: "LineString",
      coordinates: coordinates.map(({ loc }) => loc.reverse()).reverse()
    }
  ]
  // Todo: add markers for each cooridinate
  // Add date to coordinates so they can be use in marker
  //
  //
  //
  //
  const [[centerLon, centerLat]] = geometryForLines[0].coordinates
  const url =
    "https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"

  const zoom = 7
  return (
    <Map
      center={[centerLat, centerLon]}
      zoom={zoom}
      style={{ width: "100%", height: "100%" }}
    >
      <TileLayer attribution="todo" url={url} />
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
        data={geometryForLines}
        key={`test`}
      />
      {coordinates.map((place, i) => {
        return (
          <Marker
            icon={L.divIcon({
              html: `<p>${i}</p>`,
              className:
                "bg-white rounded-sm font-mono border border-gray-100 text-center w-6 h-6",
              iconSize: [18, 18]
            })}
            position={place.loc.slice().reverse()}
            key={place.name}
          >
            <span>Marker {place.name}</span>
            <Popup>
              <span className="font-mono">{place.name}</span>
            </Popup>
          </Marker>
        )
      })}
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
