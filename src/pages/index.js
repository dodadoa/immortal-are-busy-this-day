import React, { useState, useEffect, useRef } from 'react'
import { Drawer, Image as PreviewableImage, Select, Tag } from 'antd'
import { CloseOutlined, ArrowLeftOutlined } from '@ant-design/icons'
import ForceGraph2D from 'react-force-graph-2d'
import 'antd/dist/antd.css'
import data from '../dataset/Graph_theme_4.json'
import bg from '../images/bg.jpg'
import '../styles.css'
import styled from '@emotion/styled'
import bangkokCityCityLogo from '../images/bangkok-city-logo.png'
import busyIntroImage from '../images/busy-immortal-intro-img.png'
import treeframeImage from '../images/treeframe/4x/4x.png'
import { isMobile } from 'react-device-detect'
import theme from '../constants/theme'
import colorTheme from '../constants/colorTheme'
import { getThemeFromGroup, getColorFromGroup } from '../utils/utils'
import thumbnails from '../images/thumbnails'

const fontHeader = 'Cinzel'
const fontThaiFamily = 'Maitree'
const fontMonoFamily = 'JetBrains Mono'

const pageStyles = {
  color: '#232129',
  fontFamily: `${fontMonoFamily}, -apple-system, Roboto, sans-serif, serif`,
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
  background: isMobile
    ? 'linear-gradient(0deg, rgba(10, 10, 10, 1) 0%, rgba(82,82,82,0.9) 100%)'
    : 'linear-gradient(0deg, rgba(10,10,10,0.9) 0%, rgba(100,100,100,0.8) 100%)',
}
const drawerStyle = {
  backgroundColor: 'rgba(255,255,255,0)',
  width: '400px',
}

const TextLink = styled.p`
  font-size: 18px;
  color: white;
  font-family: ${fontMonoFamily};
  font-weight: 800;
  &:hover {
    cursor: pointer;
    text-shadow: 1px 1px 18px rgba(255, 255, 255, 1);
  }
`

const TitleTextLink = styled.p`
  text-align: right;
  color: white;
  font-family: ${fontHeader};
  font-size: 20px;
  font-weight: 600;
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
  z-index: 999;
  background: url(${treeframeImage});
  background-size: contain;
`

const BackIconWrapper = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  &:hover {
    cursor: pointer;
    text-shadow: 1px 1px 18px rgba(255, 255, 255, 1);
  }
`

const ThaiParagraphAbout = styled.p`
  font-size: 14px;
  color: white;
  text-align: right;
  font-family: ${fontThaiFamily};
  letter-spacing: 1px;
`

const EngParagraphAbout = styled.p`
  font-size: 13px;
  color: white;
  text-align: right;
  font-family: ${fontMonoFamily};
  letter-spacing: 1px;
`

const WhiteClosedOutline = <CloseOutlined style={{ fontSize: '20px', color: 'rgba(255,255,255, 0.7)'  }}/>
const WhiteBackOutline = <ArrowLeftOutlined style={{ fontSize: '20px', color: 'rgba(255,255,255, 0.7)'}}/>

const addedColorLinks = data.links.map((link) => ({ ...link, color: 'white', opacity: 0.5 }))
const groupedColorWithObjectImagesNode = data.nodes.map((node, nIndex) => {
  if (typeof window === 'undefined') return
  if (node.group === 'object') {
    const img = new Image();
    const foundIndex = thumbnails.findIndex(thumbnail => thumbnail.includes(`/${nIndex + 1}-`))
    img.src = thumbnails[foundIndex]
    return { 
      ...node, 
      img: img,
      color: node.group && typeof (node.group) === 'string' && getColorFromGroup(node.group)
    }
  }
  if (node.group.includes('Dark')) {
    return { 
      ...node,
      title: '🌳' + node.title.toUpperCase() + '🌳',
      color: node.group && typeof (node.group) === 'string' && getColorFromGroup(node.group)
    }
  }

  if (node.group.includes('Med')) {
    return { 
      ...node,
      title: '🌿' + node.title.toUpperCase() + '🌿',
      color: node.group && typeof (node.group) === 'string' && getColorFromGroup(node.group)
    }
  }

  if (node.group.includes('Light')) {
    return { 
      ...node,
      title: '🍂' + node.title + '🍂',
      color: node.group && typeof (node.group) === 'string' && getColorFromGroup(node.group)
    }
  }
  return { 
    ...node, 
    color: node.group && typeof (node.group) === 'string' && getColorFromGroup(node.group)
  }
})

const addedColorLinkGraphData = {
  nodes: groupedColorWithObjectImagesNode,
  links: addedColorLinks,
}

const IndexPage = () => {
  const canvasRef = useRef(null)

  const [isClient, setIsClient] = useState(false)
  const [nodeDrawerVisible, setNodeDrawerVisible] = useState(false)
  const [statementDrawerVisible, setStatementDrawerVisible] = useState(true)
  const [dataNode, setDataNode] = useState({})
  const [canvas, setCanvas] = useState(null)
  const [graphData, setGraphData] = useState(addedColorLinkGraphData)
  const [graphConstantsData, setGraphConstantsData] = useState(addedColorLinkGraphData)
  const [historyNodeVisit, setHistoryNodeVisit] = useState([])

  useEffect(() => {
    setGraphData(addedColorLinkGraphData)
    setGraphConstantsData(addedColorLinkGraphData)
  }, [])

  useEffect(() => {
    setIsClient(true)
  }, [])
  
  useEffect(() => {
    const currentCanvas = canvasRef.current
    setCanvas(currentCanvas)
  }, [])

  const handleFilterThemeChange = (themeFilters) => {
    if (themeFilters.length === 0) {
      setGraphData(graphConstantsData)
      return
    }
    const newNodes = graphConstantsData.nodes.filter(
      (node) => {
        if(node.group === 'object'){
          return true
        }

        return themeFilters.some(themeFilter => {
          if (node.altGroup) {
             const altGroup = getThemeFromGroup(node.altGroup)
             const group = getThemeFromGroup(node.group)
             return (altGroup === themeFilter) || (group === themeFilter)
          }
          return themeFilter === getThemeFromGroup(node.group)
        })
      }
    )
    const newLinks = graphConstantsData.links.filter(
      (link) => {
        return newNodes.some(newNode => {
          if (newNode.group === 'object') {
            return false
          }

          return link.source.id === newNode.id || link.target.id === newNode.id
        })
      }
    )
    const newNewNodes = newNodes.filter(
      (node) => {
        if (node.group === 'object') {
          return newLinks.some((newLink) => node.id === newLink.target.id)
        }
        return newLinks.some((newLink) => (node.id === newLink.target.id || node.id === newLink.source.id))
      }
    )
    const newNewLinks = newLinks.filter(
      (link) => {
        return newNewNodes.some(newNewNode => {
          if (newNewNode.group === 'object') {
            return false
          }
          return link.source.id === newNewNode.id
        })
      }
    )
    const newGraphData = { nodes: newNewNodes, links: newNewLinks }
    setGraphData(newGraphData)
  }

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

  const handleClickNode = (node) => {
    setStatementDrawerVisible(false)
    setNodeDrawerVisible(true)
    setDataNode(node)
    setHistoryNodeVisit([node])
  }
  const handleClickStatement = () => {
    setNodeDrawerVisible(false)
    setStatementDrawerVisible(true)
  }

  const handleCloseNodeDrawer = () => {
    setNodeDrawerVisible(false)
    setHistoryNodeVisit([])
  }
  const handleCloseStatementDrawer = () => setStatementDrawerVisible(false)

  const handleClickTitleToGenerateNewNode = (node) => {
    setNodeDrawerVisible(false)
    setNodeDrawerVisible(true)
    setDataNode(node)
    setHistoryNodeVisit([
      node,
      ...historyNodeVisit,
    ])
  }

  const handleClickBack = () => {
    const [latest, previous, ...rest] = historyNodeVisit
    setHistoryNodeVisit([previous, ...rest])
    setNodeDrawerVisible(false)
    setNodeDrawerVisible(true)
    setDataNode(previous)
  }

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
        {historyNodeVisit.length > 1 && <BackIconWrapper onClick={handleClickBack}>{WhiteBackOutline}</BackIconWrapper>}
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
          {dataNode.titleTH && <p style={{
            fontSize: '16px',
            color: 'white',
            textAlign: 'right',
            fontFamily: fontThaiFamily,
            fontWeight: '400',
            letterSpacing: '0.5px',
            marginTop: '15px'
          }}>
            {dataNode.titleTH}
          </p>}
          {dataNode.constellationDescription && <p style={{
            fontSize: '18px',
            color: 'white',
            textAlign: 'right',
            fontFamily: fontMonoFamily,
            lineHeight: '35px',
            letterSpacing: '0.5px',
            marginTop: '30px'
          }}>
            "{dataNode.constellationDescription}"
          </p>}
          {dataNode.constellationDescriptionTH && <p style={{
            fontSize: '18px',
            color: 'white',
            textAlign: 'right',
            fontFamily: fontMonoFamily,
            lineHeight: '35px',
            letterSpacing: '0.5px',
            marginTop: '30px'
          }}>
            "{dataNode.constellationDescriptionTH}"
          </p>}
          <div style={{ marginTop: '30px' }}>
            {dataNode.childLinks && dataNode.childLinks.map(link => {
              const childNode = data.nodes.find((d) => d.id === link)
              return childNode
                ? ( <React.Fragment key={childNode.id}>
                    <div style={{ width: '100%', borderBottom: '1px solid white', marginBottom: '24px' }} />
                    <TitleTextLink
                      onClick={() => handleClickTitleToGenerateNewNode(childNode)}
                    >
                      #{childNode.title}
                    </TitleTextLink>
                    <p style={{ textAlign: 'right', color: 'white', fontFamily: fontThaiFamily, fontSize: 16 }}>"{!!childNode.contentEN && childNode.contentEN}"</p>
                    <p style={{ textAlign: 'right', color: 'white', fontFamily: fontThaiFamily, fontSize: 16 }}>"{!!childNode.content && childNode.content}"</p>
                    {
                      childNode.image && (
                      <div style={{ margin: '20px' }}>
                        <PreviewableImage 
                          width={300}
                          src={`/photo_webgraph/${childNode.image}`}
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
            "{dataNode.contentEN}"
          </p>
          <p style={{
            fontFamily: fontThaiFamily,
            fontSize: '18px',
            color: 'white',
            textAlign: 'right',
            letterSpacing: '0.5px'
          }}>
            "{dataNode.content}"
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
          <h1 style={{
            fontFamily: fontHeader,
            fontSize: '24px',
            lineHeight: '40px',
            color: 'white',
            letterSpacing: '2px',
            textAlign: 'right',
            fontWeight: '600',
            wordBreak: 'break-word',
            textShadow: '1px 1px 18px rgba(255, 255, 255, 1), 1px 1px 18px rgba(255, 255, 255, 1), 1px 1px 18px rgba(255, 255, 255, 1)'
          }}>
            BUSY IMMORTAL <br/> OBJECT MANAGEMENT
          </h1>
          <img src={busyIntroImage} style={{ width: '100%', height: '250px' }} />
          <h2
            style={{
              fontFamily: fontMonoFamily,
              fontSize: '18px',
              color: 'white',
              textAlign: 'right',
              textDecoration: 'underline',
              letterSpacing: '1.5px',
              marginBottom: '20px'
            }}
          >
            {'About this project'}
          </h2>
          <EngParagraphAbout>
            Object Management is an overview of selected artifacts featured in <br/><a href="https://bangkokcitycity.com/activity/the-immortals-are-quite-busy-these-days/" target="_blank">THE IMMORTALS ARE QUITE BUSY THESE DAYS</a> — a solo exhibition by Nawin Nuthong, BANGKOK CITYCITY GALLERY. It claims neither comprehensiveness nor clarity. Instead, what it contains is the act of looking for comprehension, of looking for clarity. Anything is data, and everything can be analysed, or so they say. Key to this is classification, through which associations are sometimes forged and connections at times lost. Think of this overview as an overrated guide book. Think of it as a rigid and uninspiring how-to book. The content itself might not lead to much, but we encourage you to engage with how said content is arranged, how things are classified, how certain things are so blatantly discarded. So that perhaps everything is data after all.
          </EngParagraphAbout>
          <ThaiParagraphAbout>
            Object Management คือภาพรวมของวัตถุส่วนหนึ่งที่ปรากฎในนิทรรศการ <br/><a href="https://bangkokcitycity.com/activity/the-immortals-are-quite-busy-these-days/" target="_blank">THE IMMORTALS ARE QUITE BUSY THESE DAYS</a> โดย นวิน หนูทอง ณ บางกอก ซิตี้ซิตี้ แกลเลอรี่ Object Management ไม่แอบอ้างว่าสามารถให้ทั้งความครอบคลุมหรือความกระจ่างได้ แต่สิ่งที่ Object Management ให้แทนได้คือรูปแบบการหาความเข้าใจและรูปแบบการหาความกระจ่างนั้น ว่ากันว่าอะไรๆ ก็เป็นข้อมูลได้ และทุกสิ่งทุกอย่างสามารถวิเคราะห์ได้ หัวใจสำคัญของความเชื่อนี้คือการจัดจำแนก การจัดจำแนกที่บางครั้งก็สร้างความเชื่อมโยงใหม่ให้เกิดขึ้น แต่ครั้งอื่นๆ ก็ปล่อยความสัมพันธ์เดิมให้สูญหายไป คิดซะว่างานนี้คือหนังสือนำเที่ยวที่เห็นไม่เห็นสมคำร่ำลือขนาดนั้น คิดซะว่านี่เป็นหนังสือ how-to ที่แข็งทื่อและไม่สร้างแรงบันดาลใจ เนื้อหาในตัวงานเองอาจไม่ได้นำไปสู่อะไรที่ยิ่งใหญ่ได้ แต่เรายังอยากเชิญชวนให้คุณลองมีปฏิสัมพันธ์กับวิธีที่เนื้อหาในงานถูกจัดเรียง กับวิธีที่สิ่งต่างๆ ถูกจัดประภท กับวิธีที่บางสิ่งบางอย่างก็ถูกทิ้งไปอย่างโจ่งแจ้ง เผื่อว่าเอาเข้าจริงๆ แล้ว ทุกอย่างอาจจะเป็นข้อมูลตามที่เค้าว่ากันก็ได้
          </ThaiParagraphAbout>
          <p style={{
            color: 'white',
            marginTop: '50px',
            marginBottom: '50px',
            textAlign: 'center',
            fontFamily: fontMonoFamily,
            fontSize: '18px'
          }}>{'🌳  ►  🌿  ►  🍂 ► [!]'}</p>
          <h2
            style={{
              fontFamily: fontMonoFamily,
              fontSize: '18px',
              color: 'white',
              textAlign: 'right',
              textDecoration: 'underline',
              letterSpacing: '1.5px'
            }}
          >
            How are objects <br/> ‘managed’?
          </h2>
          <EngParagraphAbout style={{ marginTop: '30px', marginLeft: '15px', textAlign: 'left' }}>
            {'This project takes its starting point from qualitative research procedures in the social sciences. As one of the key epistemo-methodological principles in Sociology, Constructivist Grounded Theory has consistently been employed as a tool for meditating the research act. Central to its logic is the practice of semi-inductive and reiterative qualitative coding, by which textual materials are compartmentalised, assigned meanings, and eventually reassembled to carve out narratives that have been buried beneath piles of data all along. Methodical and straightforward as it sounds, the procedure is inherently mediated through the researcher’s own subjectivity and the context in which the research act takes place — not necessarily a bad thing. A ‘social scientist’ by training, I seek to displace and relocate my own practice from the sphere of the verbal and the tangible, and attempt to situate it within Nawin’s object inventory. This network is the result of that attempt.'}
          </EngParagraphAbout>
          <p style={{
            fontSize: '12px',
            color: 'white',
            textAlign: 'right',
            fontFamily: fontMonoFamily,
            letterSpacing: '1px',
          }}>
            {'Pretty K'}
          </p>
          <ThaiParagraphAbout style={{ marginTop: '60px', marginLeft: '15px', textAlign: 'left' }}>
            {'โปรเจคนี้มีจุดตั้งต้นมาจากกระบวนการวิจัยเชิงคุณภาพในสังคมศาสตร์ Constructivist Grounded Theory เป็นหนึ่งในหลักคิดทางญาณวิทยาและระเบียบวิธีวิจัยที่สำคัญในสังคมวิทยา และได้ถูกนำมาใช้เป็นเครื่องมือในการประสาน ‘การกระทำวิจัย’ มาโดยตลอดอย่างต่อเนื่อง หัวใจสำคัญของแนวคิดนี้คือการ coding เชิงคุณภาพในวิถีกึ่งอุปนัยและการทำซ้ำ ในวิถีนี้ วัตถุที่เป็นอักษรถูกนำมาจัดแบ่ง ถูกให้ความหมาย และถูกรวมร่างใหม่อีกครั้งเพื่อเล่าเรื่องของสิ่งที่ถูกฝังอยู่ใต้ข้อมูลกองพะเนินมาตั้งแต่ต้น แม้ว่ากระบวนการนี้จะฟังดูตรงไปตรงมาและมีระเบียบแบบแผน กระบวนการโดยตัวมันเองแล้วก็ดำเนินผ่านอัตวิสัยของผู้วิจัยเองและบริบทที่รายล้อมการกระจำวิจัย ซึ่งก็ไม่ใช่เรื่องแย่อะไร ในฐานะที่ถูกฝึกมาให้เป็น ‘นักวิทยาศาสตร์สังคม’ เรามุ่งที่จะเคลื่อนการทำงานของตัวเองออกจากมณฑลของคำพูดและสิ่งที่จับได้ไปสู่สิ่งอื่น และพยายามที่จะหาที่ทางให้การทำงานท่ามกลางคลังสิ่งของของนวิน โครงข่ายในงานนี้คือผลของความพยายามนั้น'}
          </ThaiParagraphAbout>
          <p style={{
            fontSize: '12px',
            color: 'white',
            textAlign: 'right',
            fontFamily: fontMonoFamily,
            letterSpacing: '1px',
            marginLefft: '15px'
          }}>
            {'พริตตี้ เค'}
          </p>
          <h2
            style={{
              fontFamily: fontMonoFamily,
              fontSize: '22px',
              color: 'white',
              textAlign: 'left',
              letterSpacing: '1.5px',
              fontWeight: '800',
              marginLeft: '15px',
              marginTop: '50px'
            }}
          >
            {'Credits'}
          </h2>
          <ul
            style={{
              color: 'white',
              textAlign: 'left',
              listStyleType: 'none',
              padding: '0',
              marginLeft: '15px',
              fontSize: '13px',
              fontFamily: fontMonoFamily,
            }}
          >
            <li>Concept: Nawin Nuthong, Kritti Tantasith</li>
            <li>Analyst / Interviewer: Kritti Tantasith</li>
            <li>Advisor: Pongsakorn Yananissorn</li>
            <li>Web Design: Nawin Nuthong</li>
            <li>Developer and Technical Assistant: Wasawat Somno</li>
            <li>Interviewer: Suparada Fuangfu</li>
            <li>Special thanks to::</li>
            <li>Unchalee Anantawat</li>
            <li>Poop Press</li>
          </ul>
          <ul
            style={{
              color: 'white',
              textAlign: 'left',
              listStyleType: 'none',
              padding: '0',
              marginLeft: '15px',
              marginTop: '30px',
              fontSize: '14px',
              fontFamily: fontThaiFamily
            }}
          >
            <li>แนวคิด: นวิน หนูทอง, กฤตธี ตัณฑสิทธิ์</li>
            <li>วิเคราะห์ / สัมภาษณ์เก็บข้อมูล: กฤตธี ตัณฑสิทธิ์</li>
            <li>ที่ปรึกษา: พงศกรณ์ ญาณะณิสสร</li>
            <li>ออกแบบเว็บไซต์: นวิน หนูทอง</li>
            <li>พัฒนาโปรแกรมและให้คำปรึกษาทางเทคนิค: <br /> วสวัตติ์ สมโน</li>
            <li>สัมภาษณ์เก็บข้อมูล: ศุภรดา เฟื่องฟู</li>
            <li>ขอขอบคุณ:</li>
            <li>อัญชลี อนันตวัฒน์</li>
            <li>พู๊พเพรส</li>
          </ul>
          <a href="https://bangkokcitycity.com/activity/the-immortals-are-quite-busy-these-days/" target="_blank">
            <p style={{
              fontSize: '12px',
              color: '#27e',
              textAlign: 'right',
              fontFamily: fontMonoFamily,
              letterSpacing: '1px',
              marginTop: '30px',
              '&:hover': {
                pointer: 'cursor'
              }
            }}>
              {'THE IMMORTALS ARE QUITE BUSY THESE DAYS'}
            </p>
          </a>
          <p style={{
            fontSize: '12px',
            color: 'white',
            textAlign: 'right',
            fontFamily: fontMonoFamily,
            letterSpacing: '1px',
          }}>
            {'NAWIN NUTHONG'}
          </p>
          <p style={{
            fontSize: '12px',
            color: 'white',
            textAlign: 'right',
            fontFamily: fontMonoFamily,
            letterSpacing: '1px',
          }}>
            {'January 30 - 21 March, 2021'}
          </p>
          <img src={bangkokCityCityLogo} style={{ width: '100%', height: '160px'}}/>
          <p style={{
            fontSize: '14px',
            color: 'white',
            textAlign: 'center',
            fontFamily: fontMonoFamily,
            marginTop: '30px'
          }}>{'© 2021 Nawin Nuthong'}</p>
        </div>
      </Drawer>
    )
  }

  const tagRender = (props) => {
    const { label, value, closable, onClose } = props;

    const color = {
      [theme.HISTORICAL_INQUIRY]: colorTheme.ONE,
      [theme.THRESHOLD]: colorTheme.TWO,
      [theme.MEANING_MAKING_SENSE_MAKING]: colorTheme.THREE,
      [theme.WORLD_BUILDING] : colorTheme.FOUR,
      [theme.GAME_PLAY_CULTURE]: colorTheme.FIVE,
      [theme.OBJECT_AND_ITS_CONTEXTS]: colorTheme.SIX,
      [theme.UNCLASSIFIED]: colorTheme.SEVEN
    }[value]
  
    return (
      <Tag color={color} closable={closable} onClose={onClose} style={{ marginRight: 3 }}>
        {label}
      </Tag>
    );
  }

  const options = [
    { value: theme.HISTORICAL_INQUIRY },
    { value: theme.THRESHOLD },
    { value: theme.MEANING_MAKING_SENSE_MAKING },
    { value: theme.WORLD_BUILDING },
    { value: theme.GAME_PLAY_CULTURE },
    { value: theme.OBJECT_AND_ITS_CONTEXTS },
    { value: theme.UNCLASSIFIED }
  ]

  return (
    <React.Fragment key={isClient}>
      <main style={pageStyles}>
        <title>THE IMMORTALS ARE QUITE BUSY THESE DAYS</title>
        <div style={{
          position: 'absolute',
          top: '10px',
          left: '20px',
          zIndex: '999'
        }}>
          <Select
            mode="multiple"
            showArrow
            placeholder="Filter themes"
            tagRender={tagRender}
            style={{ width: isMobile ? '200px' : '350px' }}
            options={options}
            onChange={handleFilterThemeChange}
          />
        </div>
        {renderNodeDrawer()}
        {statementDrawer()}
        <div style={{
          position: 'absolute',
          bottom: '10px',
          left: '20px',
          zIndex: '999'
        }}>
          <TextLink onClick={handleClickStatement}>ABOUT THIS PROJECT</TextLink>
        </div>
        {
          typeof window !== 'undefined' && (
            <ForceGraph2D
              ref={canvasRef}
              onNodeClick={handleClickNode}
              nodeRelSize={isMobile ? 5 : 15 }
              graphData={graphData}
              onNodeDragEnd={(node) => {
                node.fx = node.x
                node.fy = node.y
              }}
              nodeCanvasObject={(node, ctx, globalScale) => {
                const label = node.title ? node.title : node.id
                const textWidth = ctx.measureText(label).width
                if (node.img) {
                  const fontSize = 16 / globalScale
                  ctx.font = `${fontSize}px ${fontMonoFamily}`
                  const MOVING_TXT_Y = 37
                  const MOVING_TXT_X = 5
                  const bckgDimensions = [textWidth, fontSize].map((n) => n + fontSize * 0.5)
                  ctx.drawImage(node.img, node.x - 10, node.y - 12, 30, 45)
                  ctx.beginPath()
                  ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'
                  ctx.arc(node.x + 5, node.y, 5, 0, Math.PI * 2, true)
                  ctx.fill()
                  ctx.fillStyle = node.color
                  ctx.fillRect(
                    node.x - bckgDimensions[0] / 2 + MOVING_TXT_X,
                    node.y - bckgDimensions[1] / 2 + MOVING_TXT_Y,
                    ...bckgDimensions,
                  )
                  ctx.textAlign = 'center'
                  ctx.textBaseline = 'middle'
                  ctx.fillStyle = 'rgba(255, 255, 255, 1)'
                  ctx.fillText(label, node.x + MOVING_TXT_X, node.y + MOVING_TXT_Y)
                } else {
                  const fontSize = 17 / globalScale
                  ctx.font = `${fontSize}px ${fontMonoFamily}`
                  if (node.group.includes('Dark')) {
                    ctx.font = `bold ${25 / globalScale}px ${fontMonoFamily}`
                  }
                  const bckgDimensions = [textWidth, fontSize].map((n) => n + fontSize * 0.5)
                  ctx.shadowColor = node.color
                  ctx.shadowBlur = 0
                  ctx.fillStyle = node.color
                  ctx.fillRect(
                    node.x - bckgDimensions[0] / 2,
                    node.y - bckgDimensions[1] / 2,
                    ...bckgDimensions,
                  )
                  if (node.group.includes('Dark')) {
                    const extraBckgDimensions = [textWidth * 1.6, fontSize].map((n) => n + fontSize * 0.5)
                    ctx.fillRect(
                      node.x - bckgDimensions[0] / 1.3,
                      node.y - bckgDimensions[1] / 2,
                      ...extraBckgDimensions,
                    )
                  }
                  ctx.shadowBlur = 0
                  ctx.textAlign = 'center'
                  ctx.textBaseline = 'middle'
                  ctx.fillStyle = 'rgba(255, 255, 255, 1)'
                  ctx.fillText(label, node.x, node.y)
                }
              }}
            />
          )
        }
      </main>
    </React.Fragment>
  )
}

export default IndexPage
