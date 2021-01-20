import * as React from 'react'
import ForceGraph2D from 'react-force-graph-2d'
import data from '../dataset/index.json'
import bg from '../images/bg.jpg'

const pageStyles = {
  color: '#232129',
  fontFamily: '-apple-system, Roboto, sans-serif, serif',
  padding: 0,
  margin: 0,
  background: `url(${bg})`,
  width: '100%',
  backgroundSize: 'cover',
}

const handleClickNode = (x) => {
  alert(x.id)
}

const addedColorLinks = data.links.map((link) => ({ ...link, color: 'white', opacity: 0.5 }))

const addedColorLinkGraphData = {
  nodes: data.nodes,
  links: addedColorLinks,
}

const IndexPage = () => (
  <main style={pageStyles}>
    <title>Immortal are busy this day</title>
    {
      typeof window !== 'undefined' && (
        <ForceGraph2D
          onNodeClick={handleClickNode}
          graphData={addedColorLinkGraphData}
          nodeCanvasObject={(node, ctx, globalScale) => {
            const label = node.id
            const fontSize = 14 / globalScale
            ctx.font = `${fontSize}px Sans-Serif`
            const textWidth = ctx.measureText(label).width
            const bckgDimensions = [textWidth, fontSize].map((n) => n + fontSize * 0.5)
            ctx.shadowColor = 'rgba(255, 255, 255, 1)'
            ctx.shadowBlur = 15
            ctx.fillStyle = 'rgba(255, 255, 255, 1)'
            ctx.fillRect(
              node.x - bckgDimensions[0] / 2,
              node.y - bckgDimensions[1] / 2,
              ...bckgDimensions,
            )

            ctx.shadowBlur = 0
            ctx.textAlign = 'center'
            ctx.textBaseline = 'middle'
            ctx.fillStyle = 'rgba(0, 0, 0, 1)'
            ctx.fillText(label, node.x, node.y)
          }}
        />
      )
    }
  </main>
)

export default IndexPage
