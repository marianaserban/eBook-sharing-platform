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
        animationData: require('../../assets/book.json')
      })
    }, [])
    
    return (
        <div ref={container}></div>
    );
  }
export default Animation1
