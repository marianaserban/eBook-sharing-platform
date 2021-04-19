import React, { Component } from 'react';
import * as AiIcons from "react-icons/ai";


let dialogStyles = {

    width: '500px',
    maxWidth: '100%',
    margin: '0 auto',
    position: 'fixed',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%,-50%)',
    zIndex: '999',
    backgroundColor: '#F3F3F4',
    padding: '10px 20px 40px',
    borderRadius: '20px',
    display: 'flex',
    flexDirection: 'column',
    boxShadow:'0 10px 15px rgba(0,0,0,0.15)',

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'

};

let dialogCloseButtonStyles = {
    marginBottom: '15px',
    padding: '3px 8px',
    cursor: 'pointer',
    borderRadius: '50%',
    border: 'none',
    width: '50px',
    height: '50px',
    fontWeight: 'bold',
    alignSelf: 'flex-end'
};

class Dialog extends Component {
    render() {
        let dialog = (
            <div style={dialogStyles}>
                <button  style={dialogCloseButtonStyles} onClick={this.props.onClose}>
                    <AiIcons.AiOutlineClose/></button>

                <div>{this.props.children}</div>
            </div>
        );

        if (! this.props.isOpen) {
            dialog = null;
        }
        return (
            <div >
                {dialog}
            </div>
        );
    }
}

export default Dialog;