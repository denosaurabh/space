import React from 'react'
import NextDocument, { Html, Head, Main, NextScript } from 'next/document'
import { getCssString, globalStyles } from '../stitches.config'

export default class Document extends NextDocument {
  render() {
    globalStyles()

    return (
      <Html lang="en">
        <Head>
          <style
            id="stitches"
            dangerouslySetInnerHTML={{ __html: getCssString() }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
