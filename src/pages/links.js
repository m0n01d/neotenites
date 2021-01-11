import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

const renderLink = ([text, url, color = "null"]) => (
  <li className="px-2 py-3 text-lg">
    <a
      className="block text-center h-full border border-gray-800 px-2 py-2 font-mono"
      style={{ color: color }}
      href={url}
      target={text.startsWith("@") ? "_blank" : "_self"}
    >
      {text}
    </a>
  </li>
)

const LinksPage = () => (
  <Layout>
    <SEO title="neotenites links" />
    <h1 className="font-mono text-sm sr-only">links:</h1>
    <ul>
      {[
        ["@instagram", "https://instagram.com/neotenites", "#FCAF45"],
        [
          "@youtube",
          "https://www.youtube.com/channel/UCFrYlpO11m2OK-kVmi34dBg",
          "#FF0000"
        ],
        ["blog", "https://neotenites.com"]
      ].map(renderLink)}
    </ul>
  </Layout>
)

export default LinksPage
