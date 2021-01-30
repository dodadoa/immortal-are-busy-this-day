import React, { useState, useEffect } from 'react'
import { Drawer, Image } from 'antd'
import 'antd/dist/antd.css'
import '../styles.css'
import ForceGraph2D from 'react-force-graph-2d'
import data from '../dataset/Graph_theme_3.json'
import bg from '../images/bg.jpg'
import styled from '@emotion/styled'
import treeframeImage from '../images/treeframe/4x/Asset 1@4x.png'

const fontHeader = 'Cinzel'
const fontThaiFamily = 'Maitree'
const fontMonoFamily = 'JetBrains Mono'

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

const getColorFromGroup = (nodeGroup) => {
  if (typeof nodeGroup === 'number') {
    return '#f24'
  }

  if (nodeGroup.startsWith('7')) {
    return '#22d'
  }

  return {
    '1-Dark': '#193220',
    '1-Med': '#192cc0',
    '1-Light': '#72c083',
    '2-Dark': '#2f5560',
    '2-Med': '#4a8696',
    '2-Light': '#76adbc',
    '3-Dark': '#694611',
    '3-Med': '#af751d',
    '3-Light': '#e2a850'
  }[nodeGroup]
}

const addedColorLinks = data.links.map((link) => ({ ...link, color: 'white', opacity: 0.5 }))
const groupedColorNode = data.nodes.map((node) => ({ 
  ...node, 
  color: node.group && typeof (node.group) === 'string' && getColorFromGroup(node.group)
}))

const addedColorLinkGraphData = {
  nodes: groupedColorNode,
  links: addedColorLinks,
}

const IndexPage = () => {
  const [isClient, setIsClient] = useState(false)
  const [nodeDrawerVisible, setNodeDrawerVisible] = useState(false)
  const [statementDrawerVisible, setStatementDrawerVisible] = useState(true)
  const [dataNode, setDataNode] = useState({})

  useEffect(() => {
    setIsClient(true)
  }, [])

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
          <p style={{
            fontSize: '30px',
            color: 'white',
            textAlign: 'right',
            fontFamily: fontHeader,
            fontWeight: '600',
            lineHeight: '40px',
            letterSpacing: '1.5px'
          }}>
            {dataNode.title ? dataNode.title : dataNode.id}
          </p>
          <div>
            <div>
            {dataNode.childLinks && dataNode.childLinks.map(link => {
              const node = data.nodes.find((d) => d.id === link)
              return (
                <div key={node.id}>
                  <p style={{ textAlign: 'right', color: 'white', fontFamily: fontHeader, fontSize: 18 }}>#{node.title}</p>
                  <p style={{ textAlign: 'right', color: 'white', fontFamily: fontThaiFamily, fontSize: 16 }}>{!!node.content && node.content}</p>
                </div>
              )
            })}
            </div>
          </div>
          <p style={{
            fontFamily: fontThaiFamily,
            fontSize: '18px',
            color: 'white',
            textAlign: 'right',
            letterSpacing: '0.5px'
          }}>
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
        <div style={{
          // display: 'flex',
          // flexDirection: 'column',
          position: 'absolute',
          width: '100px',
          left: '-20px',
          top: '0px',
          overflow: 'hidden',
          backgroundImage: 'url("../images/treeframe/4x/Asset 1@4x.png")'
        }}>
        {
          // [1, 2, 3, 4].map((ele) => (
          //   <img style={{
          //     width: '100px'
          //   }} src={treeframeImage} />
          // ))
        }
        </div>
        <div style={drawerContentContainerStyle}>
          <p style={{
            fontFamily: fontHeader,
            fontSize: '30px',
            lineHeight: '40px',
            color: 'black',
            letterSpacing: '2px',
            textAlign: 'right',
            fontWeight: '600',
            textShadow: '1px 1px 18px rgba(255, 255, 255, 1), 1px 1px 18px rgba(255, 255, 255, 1), 1px 1px 18px rgba(255, 255, 255, 1)'
          }}>
            {'CONTENT OF ARTIFACT [IN] THE IMMORTALS ARE QUITE BUSY THESE DAYS'}
          </p>
          <p style={{
            fontSize: '18px',
            color: 'white',
            textAlign: 'right',
            fontFamily: fontThaiFamily,
          }}>
            {'Object Management is a visual overview of selected artefacts featured in The Immortals Are Quite Busy These Days. It claims neither comprehensiveness nor clarity. Instead, what it contains is the act of looking for comprehension, of looking for clarity. Anything is data, and everything can be analysed, or so they say. Key to this is classification, which in itself is a form of violence. Think of this overview as an overrated guide book. Think of it as a rigid and uninspiring how-to book. The content itself might not lead to much, but we encourage you to engage with how content is arranged, how things are classified, how certain things are so blatantly discarded. So that perhaps everything is data after all.'}
          </p>
        </div>
      </Drawer>
    )
  }

  return (
    <React.Fragment key={isClient}>
      <main style={pageStyles}>
        <title>Immortal are busy this day</title>
        {renderNodeDrawer()}
        {statementDrawer()}
        <div style={{
          position: 'absolute',
          bottom: '10px',
          left: '20px',
          zIndex: '999'
        }}>
          <p
            onClick={handleClickStatement}
            style={{
              fontSize: '20px',
              color: 'white',
              '&:hover': {
                cursor: 'pointer',
              }
            }}
          >Statement</p>
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
                ctx.font = `${fontSize}px ${fontMonoFamily}`
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
                ctx.fillStyle = node.color
                ctx.fillText(label, node.x, node.y)
              }}
            />
          )
        }
      </main>
    </React.Fragment>
  )
}

export default IndexPage
