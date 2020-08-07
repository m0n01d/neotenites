/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import "../css/tailwind.css"

import Header from "./header"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <div class="flex flex-col h-full">
      <Header siteTitle={data.site.siteMetadata.title} />
      <div class="container mx-auto flex-1 flex flex-col">
        <main class="flex-1">{children}</main>
        <footer class="font-mono py-3 text-sm sm:text-base">
          <div class="flex">
            <p>
              © {new Date().getFullYear()}
              <a
                class="mx-2 text-blue-700"
                href="https://instagram.com/neotenites"
                target="_blank"
                rel="noopener"
              >
                @neotenites
              </a>
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
}

export default Layout
