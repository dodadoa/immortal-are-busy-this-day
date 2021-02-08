import React from "react"
import PropTypes from "prop-types"
import { Helmet } from 'react-helmet'
import facebookSharePic from './images/for-share.png'

export default function HTML(props) {
  return (
    <html {...props.htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <Helmet>
          <meta charSet="utf-8" />
          <title>THE IMMORTALS ARE QUITE BUSY THESE DAYS</title>
          <link rel="canonical" href="https://busyimmortal.com/" />
          <meta property="og:url" content="https://busyimmortal.com/" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="THE IMMORTALS ARE QUITE BUSY THESE DAYS" />
          <meta property="og:description" content="NAWIN NUTHONG - THE IMMORTALS ARE QUITE BUSY THESE DAYS - 30.01 - 21.03.2021" />
          <meta property="og:image" content={facebookSharePic} />
        </Helmet>
        {props.headComponents}
        <link rel="preconnect" href="https://fonts.gstatic.com"/>
        <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;800&display=swap" rel="stylesheet"/>
        <link rel="preconnect" href="https://fonts.gstatic.com"/>
        <link href="https://fonts.googleapis.com/css2?family=Maitree:wght@200;400;600;700&display=swap" rel="stylesheet"/>
        <link rel="preconnect" href="https://fonts.gstatic.com"/>
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono&display=swap" rel="stylesheet"/>
        <link rel="preconnect" href="https://fonts.gstatic.com"/>
        <link href="https://fonts.googleapis.com/css2?family=Manrope&display=swap" rel="stylesheet"/>
      </head>
      <body {...props.bodyAttributes}>
        {props.preBodyComponents}
        <div
          key={`body`}
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        {props.postBodyComponents}
      </body>
    </html>
  )
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
}
