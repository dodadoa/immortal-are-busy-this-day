import React, { useState, useEffect, useRef } from 'react'
import { Drawer, Image as PreviewableImage } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import ForceGraph2D from 'react-force-graph-2d'
import 'antd/dist/antd.css'
import data from '../dataset/Graph_theme_4.json'
import bg from '../images/bg.jpg'
import '../styles.css'
import styled from '@emotion/styled'
import { Helmet } from 'react-helmet'
import facebookSharePic from '../images/for-share.png'
import treeframeImage from '../images/treeframe/4x/Asset 1@4x.png'
import { isMobile } from 'react-device-detect';


const fontHeader = 'Cinzel'
const fontThaiFamily = 'Maitree'
const fontMonoFamily = 'JetBrains Mono'
const fontMenuOrEngText = 'Manrope'

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
  background: 'linear-gradient(0deg, rgba(10,10,10,0.9) 0%, rgba(100,100,100,0.8) 100%)',
}
const drawerStyle = {
  backgroundColor: 'rgba(255,255,255,0)',
  width: '400px',
}

const getColorFromGroup = (nodeGroup) => {
  if (nodeGroup === 'object') {
    return '#f24'
  }

  // if (nodeGroup.startsWith('7')) {
  //   return '#22d'
  // }

  return {
    '1-Dark': '#00ad5f',
    '1-Med': '#00ad5f',
    '1-Light': '#00ad5f',
    '2-Dark': '#9b00d9',
    '2-Med': '#9b00d9',
    '2-Light': '#9b00d9',
    '3-Dark': '#615b55',
    '3-Med': '#615b55',
    '3-Light': '#615b55',
    '4-Dark': '#fa5914',
    '4-Med': '#fa5914',
    '4-Light': '#fa5914',
    '5-Dark': '#087585',
    '5-Med': '#087585',
    '5-Light': '#087585',
    '6-Dark': '#889949',
    '6-Med': '#889949',
    '6-Light': '#889949',
    '7-Dark': '#22d',
    '7-Med': '#22d',
    '7-Light': '#22d',
  }[nodeGroup]
}

const TextLink = styled.p`
  font-size: 20px;
  color: white;
  font-family: ${fontMenuOrEngText};
  &:hover {
    cursor: pointer;
    text-shadow: 1px 1px 18px rgba(255, 255, 255, 1);
  }
`
const TreeFrameLeft = styled.div`
  position: absolute;
  width: 100px;
  height: 100%;
  left: -20px;
  top: 0px;
  background-repeat: repeat;
  background: url("${treeframeImage}");
`

const WhiteClosedOutline =  <CloseOutlined style={{ fontSize: '20px', color: 'rgba(255,255,255, 0.7)'  }}/>

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
  const canvasRef = useRef(null)

  const [isClient, setIsClient] = useState(false)
  const [nodeDrawerVisible, setNodeDrawerVisible] = useState(false)
  const [statementDrawerVisible, setStatementDrawerVisible] = useState(true)
  const [dataNode, setDataNode] = useState({})
  const [canvas, setCanvas] = useState(null)

  useEffect(() => {
    setIsClient(true)
  }, [])
  
  useEffect(() => {
    const currentCanvas = canvasRef.current
    setCanvas(currentCanvas)
  }, [])

  console.log(canvas)

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
        closeIcon={WhiteClosedOutline}
        visible={nodeDrawerVisible}
        placement="right"
        onClose={handleCloseNodeDrawer}
        mask={false}
        style={nodeDrawerStyle}
        drawerStyle={drawerStyle}
        bodyStyle={drawerBodyStyle}
      >
        <div style={drawerContentContainerStyle}>
          {
            dataNode.image && 
            <div style={{ margin: '20px' }}>
              <PreviewableImage 
                width={300}
                src={`/photo_webgraph/${dataNode.image}`}
              />
            </div>
          }
          <p style={{
            fontSize: '30px',
            color: 'white',
            textAlign: 'right',
            fontFamily: fontHeader,
            fontWeight: '600',
            lineHeight: '40px',
            letterSpacing: '0.5px',
          }}>
            {dataNode.title ? dataNode.title : dataNode.id}
          </p>
          <div>
            {dataNode.childLinks && dataNode.childLinks.map(link => {
              const node = data.nodes.find((d) => d.id === link)
              return node
                ? ( <React.Fragment key={node.id}>
                    <div style={{ width: '100%', borderBottom: '1px solid white', marginBottom: '24px' }} />
                    <p style={{ textAlign: 'right', color: 'white', fontFamily: fontHeader, fontSize: 18, fontWeight: '600' }}>#{node.title}</p>
                    <p style={{ textAlign: 'right', color: 'white', fontFamily: fontThaiFamily, fontSize: 16 }}>{!!node.content && node.content}</p>
                    {
                      node.image && (
                      <div style={{ margin: '20px' }}>
                        <PreviewableImage 
                          width={300}
                          src={`/photo_webgraph/${node.image}`}
                        />
                      </div> )
                    }
                  </React.Fragment>
                )
                : null
            })}
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
        closeIcon={WhiteClosedOutline}
      >
        <div style={drawerContentContainerStyle}>
          <TreeFrameLeft />
          <p style={{
            fontFamily: fontHeader,
            fontSize: '30px',
            lineHeight: '40px',
            color: 'white',
            letterSpacing: '2px',
            textAlign: 'right',
            fontWeight: '600',
            wordBreak: 'break-word',
            textShadow: '1px 1px 18px rgba(255, 255, 255, 1), 1px 1px 18px rgba(255, 255, 255, 1), 1px 1px 18px rgba(255, 255, 255, 1)'
          }}>
            {'CONTENT OF ARTIFACT [IN] THE IMMORTALS ARE QUITE BUSY THESE DAYS'}
          </p>
          <p style={{
            fontSize: '18px',
            color: 'white',
            textAlign: 'right',
            fontFamily: fontMenuOrEngText,
            letterSpacing: '1px'
          }}>
            {'Object Management is a visual overview of selected artefacts featured in The Immortals Are Quite Busy These Days. It claims neither comprehensiveness nor clarity. Instead, what it contains is the act of looking for comprehension, of looking for clarity. Anything is data, and everything can be analysed, or so they say. Key to this is classification, which in itself is a form of violence. Think of this overview as an overrated guide book. Think of it as a rigid and uninspiring how-to book. The content itself might not lead to much, but we encourage you to engage with how content is arranged, how things are classified, how certain things are so blatantly discarded. So that perhaps everything is data after all.'}
          </p>
        </div>
      </Drawer>
    )
  }

  return (
    <React.Fragment key={isClient}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>THE IMMORTALS ARE QUITE BUSY THESE DAYS</title>
        <meta name="description" content="NAWIN NUTHONG - THE IMMORTALS ARE QUITE BUSY THESE DAYS - 30.01 - 21.03.2021"/>
        <link rel="canonical" href="https://busyimmortal.com/" />
        <meta property="og:url" content="https://busyimmortal.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="THE IMMORTALS ARE QUITE BUSY THESE DAYS" />
        <meta property="og:description" content="NAWIN NUTHONG - THE IMMORTALS ARE QUITE BUSY THESE DAYS - 30.01 - 21.03.2021" />
        <meta property="og:image" content={facebookSharePic} />
      </Helmet>
      <main style={pageStyles}>
        <title>THE IMMORTALS ARE QUITE BUSY THESE DAYS</title>
        {renderNodeDrawer()}
        {statementDrawer()}
        <div style={{
          position: 'absolute',
          bottom: '10px',
          left: '20px',
          zIndex: '999'
        }}>
          <TextLink onClick={handleClickStatement}>Statement</TextLink>
        </div>
        {
          typeof window !== 'undefined' && (
            <ForceGraph2D
              ref={canvasRef}
              onNodeClick={handleClickNode}
              nodeRelSize={isMobile ? 5 : 15 }
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
                ctx.shadowColor = node.color
                ctx.shadowBlur = 15
                ctx.fillStyle = node.color
                ctx.fillRect(
                  node.x - bckgDimensions[0] / 2,
                  node.y - bckgDimensions[1] / 2,
                  ...bckgDimensions,
                )
                // if (node.image) {
                //   const img = new Image()
                //   img.src = `/photo_webgraph/${node.image}`
                //   ctx.drawImage(img, node.x, node.y, 30, 30)
                // } else {

                // }
                ctx.shadowBlur = 0
                ctx.textAlign = 'center'
                ctx.textBaseline = 'middle'
                ctx.fillStyle = 'rgba(255, 255, 255, 1)'
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
