import React, { useState } from 'react'
import { Drawer } from 'antd'
import 'antd/dist/antd.css'
import '../styles.css'
import ForceGraph2D from 'react-force-graph-2d'
import data from '../dataset/Graph_theme_1.json'
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
const drawerContentContainerStyle = {
  marginTop: '24px',
  padding: '10px',
}
const drawerBodyStyle = {
  color: 'black',
  idth: '400px',
  backgroundColor: 'rgba(0, 0, 0, 0.8)',
  background: 'linear-gradient(0deg, rgba(40,40,40,0.9) 0%, rgba(200,200,200,0.7) 100%)',
}
const drawerStyle = {
  backgroundColor: 'rgba(255,255,255,0)',
  width: '400px',
}

const addedColorLinks = data.links.map((link) => ({ ...link, color: 'white', opacity: 0.5 }))

const addedColorLinkGraphData = {
  nodes: data.nodes,
  links: addedColorLinks,
}

const IndexPage = () => {
  const [nodeDrawerVisible, setNodeDrawerVisible] = useState(false)
  const [statementDrawerVisible, setStatementDrawerVisible] = useState(true)
  const [dataNode, setDataNode] = useState({})

  const nodeDrawerStyle = nodeDrawerVisible
    ? {
      width: '400px',
    }
    : {
      display: 'none',
    }

  const statementDrawerStyle = statementDrawerVisible
    ? {
      width: '400px',
    }
    : {
      display: 'none',
    }

  const handleClickNode = (x) => {
    setStatementDrawerVisible(false)
    setNodeDrawerVisible(true)
    setDataNode(x)
  }
  const handleClickStatement = () => {
    setNodeDrawerVisible(false)
    setStatementDrawerVisible(true)
  }

  const handleCloseNodeDrawer = () => setNodeDrawerVisible(false)
  const handleCloseStatementDrawer = () => setStatementDrawerVisible(false)

  const renderNodeDrawer = () => {
    return (
      <Drawer
        visible={nodeDrawerVisible}
        placement="right"
        onClose={handleCloseNodeDrawer}
        mask={false}
        style={nodeDrawerStyle}
        drawerStyle={drawerStyle}
        bodyStyle={drawerBodyStyle}
      >
        <div style={drawerContentContainerStyle}>
          <div style={{ width: '300px', height: '300px' }} />
          <p style={{ fontSize: '30px', color: 'white', textAlign: 'right' }}>
            {dataNode.title ? dataNode.title : dataNode.id}
          </p>
          <div>
            <p>
            {dataNode.childLinks && dataNode.childLinks.map(link => {
              const node = data.nodes.find((d) => d.id === link)
              return <p> {node.content} </p>
            })}
            </p>
          </div>
          <p style={{ fontSize: '18px', color: 'white', textAlign: 'right' }}>
            {dataNode.content}
          </p>
        </div>
      </Drawer>
    )
  }

  const statementDrawer = () => {
    return (
      <Drawer
        visible={statementDrawerVisible}
        placement="right"
        onClose={handleCloseStatementDrawer}
        mask={false}
        style={statementDrawerStyle}
        drawerStyle={drawerStyle}
        bodyStyle={drawerBodyStyle}
      >
        <div style={drawerContentContainerStyle}>
          <p style={{ fontSize: '30px', lineHeight: '40px', color: 'white', textAlign: 'right', textShadow: '1px 1px 18px rgba(0, 0, 0, 1), 1px 1px 18px rgba(0, 0, 0, 1), 1px 1px 18px rgba(0, 0, 0, 1)' }}>
            {'CONTENTS OF "TEXT" OF EVERY ARTIFACT [IN] IMMORTAL ARE QUITE BUSY THESE DAY'}
          </p>
          <p style={{ fontSize: '18px', color: 'white', textAlign: 'right' }}>
            {'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec laoreet id felis id dignissim. Aenean et sapien felis. Duis rhoncus euismod ligula et pulvinar. Praesent justo sem, feugiat volutpat quam quis, rhoncus volutpat turpis.'}
          </p>
        </div>
      </Drawer>
    )
  }

  return (
    <main style={pageStyles}>
      <title>Immortal are busy this day</title>
      {renderNodeDrawer()}
      {statementDrawer()}
      <div style={{ position: 'absolute', bottom: '10px', left: '20px', zIndex: '999' }}>
        <p onClick={handleClickStatement} style={{ fontSize: '20px', color: 'white' }}>Statement</p>
      </div>
      {
        typeof window !== 'undefined' && (
          <ForceGraph2D
            onNodeClick={handleClickNode}
            graphData={addedColorLinkGraphData}
            onNodeDragEnd={(node) => {
              node.fx = node.x
              node.fy = node.y
            }}
            nodeCanvasObject={(node, ctx, globalScale) => {
              const label = node.title ? node.title : node.id
              const fontSize = 16 / globalScale
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
}

export default IndexPage
