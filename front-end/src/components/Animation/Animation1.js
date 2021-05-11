import React, { Component, useEffect,useRef } from 'react'
import lottie from 'lottie-web';

function Animation1() {

    const container = useRef(null)
  
    useEffect(() => {
      lottie.loadAnimation({
        container: container.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: require('../../assets/lf30_editor_toveojyh.json')
      })
    }, [])
    
    return (
        <div ref={container}></div>
    );
  }
export default Animation1
