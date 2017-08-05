import React, {Component} from 'react'
import ArrowBackIcon from 'material-ui/svg-icons/navigation/arrow-back'
import ArrowForwardIcon from 'material-ui/svg-icons/navigation/arrow-forward'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {is_android} from '../actions/os-detection.js'

import debug_message from '../actions/debug-message.js'

export default class Pagination extends Component {
    render() {
      const props = this.props
      const index = props.index
      const count = props.count
      const changeCallback = props.changePageCallback
      const top = props.top || 44
      const containerStyle = props.containerStyle || {}

      debug_message("pagination, index prop is " + index)
      
      const styles = {
          container: containerStyle,
          arrow: {
            position: 'relative',
            top: 5,
          },
          prev: {
              float: 'left',
              borderLeft: '10px solid transparent',
          },
          next: {
              float: 'right',
              borderRight: '10px solid transparent',
          },
          dot: {
            width: 8,
      			height: 8,
      			margin: '13px 3px 0 3px',
      			borderRadius: 4,
      			display: 'inline-block',
            backgroundColor: 'white',
          },
          indexed: {
  			    opacity: 1,
          },
          translucent: {
            position: 'relative',
            opacity: 0.5,
            width: 6,
            height: 6,
            top: -1,
          }
      }
    //  console.log("index", index, "count", count)
     // set pagination class inline to position:fixed to detach from normal flow, so that view can go underneath
      return (
        <div className="pagination" style={{position: 'fixed',}}>
          <div style={styles.container}>

            <MuiThemeProvider>
              <ArrowBackIcon
                  className={(index === 0) ? "SvgColorNone" : " SvgColorWhite"}
                  onTouchTap={()=>{
                    changeCallback(Math.max(index-1, 0))
                  }}
                  style={{...styles.arrow,...styles.prev}}/>
            </MuiThemeProvider>

            {Array.from(Array(count).keys()).map((item, idx) =>{
                let dotStyle = Object.assign({},
                     styles.dot,
                     (idx === index) ? styles.indexed :styles.translucent,
                    )
                return <div key={idx} style={dotStyle}></div>
            })}

            <MuiThemeProvider>
              <ArrowForwardIcon
                className={(index >= count - 1) ? "SvgColorNone" : " SvgColorWhite"}
                onTouchTap={()=>{
                  if (index < count -1)
                    changeCallback(index + 1)
                }}
                style={{...styles.arrow,...styles.next,}}/>
            </MuiThemeProvider>

          </div>
          {this.props.children}
        </div>
      )
    }
}
