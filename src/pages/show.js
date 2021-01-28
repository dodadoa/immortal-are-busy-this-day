/* eslint-disable react/jsx-filename-extension */
import React, { useEffect, useRef } from 'react'
// import THREE from 'three'
import 'antd/dist/antd.css'
import ForceGraph3D from 'react-force-graph-3d'
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

const ShowPage = () => {
  const distance = 200
  const fgRef = useRef()

  useEffect(() => {
    fgRef.current.cameraPosition({ z: distance })

    // camera orbit
    let angle = 0
    setInterval(() => {
      fgRef.current.cameraPosition({
        x: distance * Math.sin(angle),
        z: distance * Math.cos(angle),
      })
      angle += Math.PI / 300
    }, 10)
  }, [])

  return (
    <main style={pageStyles}>
      <title>Immortal are busy this day</title>
      <ForceGraph3D
        ref={fgRef}
        graphData={data}
        enableNodeDrag={false}
        enableNavigationControls={false}
        showNavInfo={false}
      />
    </main>
  )
}

export default ShowPage