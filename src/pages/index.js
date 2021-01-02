import * as React from "react"
import ForceGraph3D from 'react-force-graph-3d'
import SpriteText from "three-spritetext"
import THREE from "three"
import data from "../dataset/index.json"

const pageStyles = {
  color: "#232129",
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
  padding: 0,
  margin: 0
}

const IndexPage = () => {
  return (
    <main style={pageStyles}>
      <title>Immortal are busy this day</title>
      <ForceGraph3D
        graphData={data}
        nodeAutoColorBy="group"
        nodeThreeObject={node => {
          const sprite = new SpriteText(node.id);
          sprite.color = node.color;
          sprite.textHeight = 8;
          return sprite;
        }}
      />
    </main>
  )
}

export default IndexPage
