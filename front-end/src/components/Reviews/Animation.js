import React, { Component, useEffect,useRef } from 'react'
import lottie from 'lottie-web';

function Animation() {

    const container = useRef(null)
  
    useEffect(() => {
      lottie.loadAnimation({
        container: container.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: require('../../assets/53780-star-feedback-character.json')
      })
    }, [])
    
    return (
        <div ref={container}></div>
    );
  }
export default Animation
