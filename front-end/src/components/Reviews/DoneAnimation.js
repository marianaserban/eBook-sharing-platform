import React, { Component, useEffect,useRef } from 'react'
import lottie from 'lottie-web';

function DoneAnimation() {

    const container = useRef(null)
  
    useEffect(() => {
      lottie.loadAnimation({
        container: container.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: require('../../assets/33886-check-okey-done.json')
      })
    }, [])
    
    return (
        <div ref={container}></div>
    );
  }
export default DoneAnimation
