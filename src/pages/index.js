import React from "react"
import { Link } from "gatsby"

import { GeoJSON, Map, TileLayer, Marker, Popup } from "react-leaflet"
import * as L from "leaflet"

import * as iconUrl from "leaflet/dist/images/marker-icon-2x.png"
import { format } from "date-fns"
import "./app.css"
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
    loc: [28.7948813, -81.425958],
    dates: [new Date("2020-05-15"), new Date("2020-07-31")]
  } // wekiva falls
  const oldHouse = {
    name: "Our old house",
    loc: [28.5688617, -81.3587769],

    dates: [new Date("2020-05-15"), new Date("2020-07-31")]
  } // merritt park
  const suwanneMusicPark = {
    name: "Suwannee Music Park",
    loc: [30.394196, -82.944311],

    dates: [new Date("2020-05-15"), new Date("2020-07-31")]
  }
  const highFallsStatePark = {
    name: "High Falls State Park",
    loc: [33.1822347, -84.0149594],

    dates: [new Date("2020-05-15"), new Date("2020-07-31")]
  }
  const bassPro = {
    name: "Bass Pro parking lot",
    loc: [34.9929872, -85.202979],
    dates: [new Date("2020-08-05"), new Date("2020-08-06")]
  }
  const knoxivlleKoa = {
    name: "Clinton / Knoxville North KOA Journey",
    loc: [36.1699759, -84.0796367],
    dates: [new Date("2020-08-6"), new Date("2020-08-09")]
  }
  const kyHorsePark = {
    name: "Kentucky Horse Park",
    loc: [38.1500968, -84.520572],
    dates: []
  }
  const wertzTreeFarm = {
    name: "Wertz Tree Farm",
    loc: [39.5264989, -84.30862],
    dates: []
  }
  const arrowHeadLakesResort = {
    name: "Arrowhead Lakes Resort",
    loc: [40.5597829, -84.1619031],
    dates: []
  }
  const dadsHouse = {
    name: `My Dad's house`,
    loc: [40.6309833, -82.5616259],
    dates: [new Date("2020-08-17"), new Date("2020-08-22")]
  }
  const coordinates = [
    oldHouse,
    wekivaFalls,
    suwanneMusicPark,
    highFallsStatePark,
    bassPro,
    knoxivlleKoa,
    kyHorsePark,
    wertzTreeFarm,
    arrowHeadLakesResort,
    dadsHouse
  ]
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
      <TileLayer attribution="" url={url} />
      <GeoJSON
        style={i => ({
          weight: 0.3,
          //stroke-width: to have a constant width on the screen need to adapt with scale
          opacity: 1,
          dashArray: "3",
          fillOpacity: 0.5,
          fillColor: "indianred",
          color: "indianred",
          weight: 5,
          opacity: 0.45
        })}
        data={geometryForLines}
        key={`test`}
      />
      {coordinates.map((place, i) => {
        let [startDate, endDate] = place.dates
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
            <Popup>
              <p className="font-mono">{place.name}</p>
              <p></p>
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
