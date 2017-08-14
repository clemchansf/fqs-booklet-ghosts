import React, {Component} from 'react';
import SwipeableViews from 'react-swipeable-views';
import RaisedButton from 'material-ui/RaisedButton'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';

import {pages} from '../contents/page-text.js'
import {quiz_label} from '../contents/control-text.js'

import PinchText from '../components/pinch-text.js'
import {views} from '../contents/book-text.js'
import cfg from '../defaults/config.js'
import {is_iOs} from '../actions/os-detection.js'
import bindFontSize from '../actions/bind-fontsize.js'

import debug_message from '../actions/debug-message.js'

export default class Book extends Component {

  page_contents = (context, store, style, quizCallback, scrollCallback,) => {
      const {state} = context
      const headNavMode = state.paginationHeaderMode
      const fontSize = bindFontSize(state.fontSize)
      const pageNum = state.page
      const quizRecord = context.state.quizRecord
      const lang = state.lang
      const appBarFillerSpace = cfg.appBarFillerSpace
      const paginationFillerSpace = cfg.paginationFillerSpace

      let numberOfLeadingPageToSkip = 2

      return views.map((view, idx)=>{
        return <div ref={`p${idx}`}
                    className={`p${idx}`}
                    id={`p${idx}`}
                    key={idx}
                    style={style}
                  >
                  {(<div className="AppTitlePaginationOffset"
                      style={{height:  appBarFillerSpace + (headNavMode? paginationFillerSpace: 0) }}><span></span></div>)}
                  {view.page.contentText[lang]}
                  <br/>
                  {(idx > numberOfLeadingPageToSkip) && (<div style={{width: '100%', textAlign: 'center'}}>
                    <MuiThemeProvider>
                      <RaisedButton
                           label={quiz_label[lang]}
                           labelPosition="after"
                           primary={true}
                           style={{fontSize}}
                           disableTouchRipple={true}
                           disabled={!state.quizMode}
                           onTouchTap={quizCallback}
                         />
                    </MuiThemeProvider>
                  </div>)}
                  <p style={{height: 5}}><span></span></p>

               </div>
      })
  }

  render () {

      const props = this.props
      const context = props.bookContext
      const {store} = props

      const heightOfAppBar = 0

      const styles = {
          slideContainer: {
            height: window.innerHeight  - heightOfAppBar,
            WebkitOverflowScrolling: 'touch',
            textAlign: 'left',

          },
          slide: {
            minHeight: 100,
            maxHeight: 600,
          },
          pinchText: {
            fontSize: 15,
            textAlign: 'left',
            minBoundary: 12,
            maxBoundary: 25,
            skipFactor: 50,
          },
      }

    return (

        <PinchText options={styles.pinchText}
            onPinchEnd={{
                fontSize: (size) => {
                    console.log("pinch end fontSize is ", size)
                    context.setState({fontSize: size})
                }
            }}
        >
          <SwipeableViews
              index={context.state.page}
              slideStyle={styles.slideContainer} // prevent competing with scroll handling with window object
              onChangeIndex={(index, indexLatest) => {
                if (props.onSwipedCallback && typeof props.onSwipedCallback === "function") {

                  debug_message("swipe completed!, index:" + index + ", indexLatest: " + indexLatest)
                  props.onSwipedCallback(index, indexLatest)
                }
              }}
              onTransitionEnd={()=>{
                let index = props.bookContext.state.page
                if (props.onSwipedCallback && typeof props.onSwipedCallback === "function") {
                  props.onSwipedCallback(index)
                }
              }}
              onScroll={(e) => {
                  if (props.onScrollCallBack && typeof props.onScrollCallBack === "function") {
                    props.onScrollCallBack(e)
                  }
              }}
          >

            {this.page_contents(context, store, styles.slide, props.onQuizClickCallBack)}

          </SwipeableViews>
        </PinchText>
    )
  }
}
