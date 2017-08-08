import React, { Component } from 'react';

//import logo from './logo.svg';
import './App.css';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import FlatButton from 'material-ui/FlatButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Toggle from 'material-ui/Toggle';
import IconMenu from 'material-ui/IconMenu';
import TouchEmulator from '../touch-emulator.js'


import Book from '../containers/book.js'

import {app_title} from '../contents/control-text.js'
import {quiz_label,cancel_label,submit_label, congrad_title, continue_label,
        hint_title, skip_label, retry_label, aboutus_label, close_label,titles,
        viewing_preference} from '../contents/control-text.js'
import Dialog from 'material-ui/Dialog';

import SideMenu from '../containers/sidemenu.js'
import Helper from '../containers/helper.js'
import {connect, Provider} from 'react-redux';
import Quizzes from '../containers/quizzes.js'
import {resetCheckboxes} from '../actions/quiz.js'
import {views} from '../contents/book-text.js'
import {submitQuiz, cancelQuiz} from '../actions/quiz-dialog.js'
import Team from '../components/team.js'
import cfg from '../defaults/config.js'
import Pagination from '../components/pagination.js'
import {is_iOS, is_android} from '../actions/os-detection.js'
import getLocale from '../actions/lang-detection.js'
import bindFontSize from '../actions/bind-fontsize.js'

TouchEmulator();

const appBarHeight = cfg.appBarFillerSpace
const marginTop = cfg.marginTop
const iOSScreenHeaderSpace = cfg.iOSScreenHeaderSpace
const paginationHeader = cfg.paginationHeader

const styles = {
   container: {
        WebkitTransition: '-webkit-transform 300ms',
        transition: 'transform 300ms',
        top: 0,
        width: '100%',
        position: 'fixed',
   },

   move: {
        WebkitTransform: 'translateY(-'+appBarHeight+'px)',
        transform: 'translateY(-'+appBarHeight+'px)',
   },

   titleShift: {
        top: '3px',
        position: 'relative',
   },

   /* style 1, header */
   paginationHeader: {
        top: appBarHeight,
        position: 'fixed',
        backgroundColor: '#4285f4',
        opacity: 1,
   },

   /* style 2, footer */
   paginationFooter: {
        bottom: 0,
        position: 'fixed',
        backgroundColor: 'gray',
        opacity: 0.9,
   },

   paginationStyle: {
        width: '100%',
        height: 34,
        margin: 'auto',
        textAlign: 'center',
        zIndex: 3,
        WebkitTransition: '-webkit-transform 300ms',
        transition: 'transform 300ms',
   },
   paginationMove: {
        WebkitTransform: 'translateY(-'+appBarHeight+'px)',
        transform: 'translateY(-'+appBarHeight+'px)',
   },

}

class App extends Component {
    // component Mounting and Unmounting is needed for subscribing to the store
    constructor(props) {
      super(props)
      let lang = [getLocale()].map(language=>{
                                        if (language.match(/zh.CN|zn.SG/)) {
                                            return 'cn'
                                        } else if (language.match(/zh.TW|zh.HK|zh.MO/)) {
                                            return 'zh'
                                        } else
                                            return cfg.defaultLang
                                    })[0]

      this.state = {
          /* Booklet main qualifiers */
          lang,
          page: 0,
          fontSize: 15,

          /* Show/Hide flags */
          showMenu: false,
          showDone: false,
          showQuizDialog: false,
          showHintDialog: false,
          showCompletionDialog: false,
          showHelperDialog: false,
          showAboutUsDialog: false,
          showViewingPreference: (is_iOS() || is_android()) ? false : true,

          /* record tracking passes and suggestion message if quiz failed */
          quizRecord: [],
          hintMessages: [],

          /* quiz mode enable/disable */
          quizMode: true,

          /* reading header space mode */
          spaceMode: true,

          /* pagination header mode (true) vs pagination footer mode  (false) */
          paginationHeaderMode: true,
          quizButtonClicked: false,

          documentHeight: this.getDocumentHeight()
      }

      /*
       * page realestate management: makes Appbar move up and down
       * based on scrolling position
       */
      this.retractableHeader = {
        rollUp: false,
        scrollTop: 0,
      }
      this.state = {...this.state, ...this.retractableHeader}

      var supportsOrientationChange = "onorientationchange" in window,
      orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";

      window.addEventListener(orientationEvent, () => {
          //alert('HOLY ROTATING SCREENS BATMAN:' + window.orientation + " " + screen.width);
          let self = this
          setTimeout(() => {
              self.forceUpdate()
          }, is_iOS() ? 0 : 130)

      }, false);

    }

    componentDidMount = () => {
      const {store} = this.props;
      const state = store.getState();
      this.unsubscribe = store.subscribe(() => {
          this.forceUpdate()
      })


    }

    componentWillUnmount = () => {
        this.unsubscribe()
    }

    getDocumentHeight = () => {
        // debugger;
        let body = document.body, html = document.documentElement
        return Math.max(  body.scrollHeight,
                          body.offsetHeight,
                          html.clientHeight,
                          html.scrollHeight,
                          html.offsetHeight );
    }

    handleBookScroll = (e) => {

        let currentTop = e.target.scrollTop
        let previousTop = this.state.scrollTop
        let clientHeight = e.target.clientHeight
        let scrollHeight = e.target.scrollHeight

        const reachedMaxScrollBoundary = () => scrollHeight - currentTop <= clientHeight

        // handle momentum scroll case and ending of page movement

        let rollUp = (currentTop > previousTop && currentTop > 0)
                      || (currentTop < previousTop && reachedMaxScrollBoundary())

        this.setState({
                      rollUp,            // handle momentum scroll reach 0 pixel
                      scrollTop: e.target.scrollTop,  // record current scrolled pixels at top
                      })
    }

    handleSubmit = (e) => {
        const props = this.props
        const { store } = props
        const context = this
        const state = context.state
        const pageNum = state.page
        const lang = state.lang

        this.stopEvent(e)
        let {passed, hintMessages} = submitQuiz(pageNum, store.getState().quiz, views, lang)

        context.setState({
            page: pageNum,
            showQuizDialog: false,
            showCompletionDialog: passed,
            showHintDialog: !passed,
            hintMessages: passed ? [] : [...hintMessages],
            });
    }

    handleContinue = (e) => {
        const props = this.props
        const { store } = props
        const context = this
        const state = context.state
        const pageNum = state.page
        const quizRecord = state.quizRecord
        const lang = state.lang

        this.stopEvent(e)
        window.scrollTo(0,0)
        this.setState({
              quizRecord: quizRecord.indexOf(pageNum) < 0 ? [...quizRecord,pageNum] : [...quizRecord],
              showCompletionDialog: false,
              showMenu: false,
             })
    }
    handleCancel = (e) => {

        this.setState({page: this.state.page,
                          showQuizDialog: false,
                          quizButtonClicked: false});
    }
    normalize_pageNum = (pnum, views) => {
      return (pnum === (views.length - 1)) ? 0 : pnum + 1
    }
    stopEvent = (e) => {
        e.preventDefault();
        e.stopPropagation();
    }
    handleSkip = (e) => {
        this.stopEvent(e)
        window.scrollTo(0,0)
        this.setState({
                        showHintDialog: false,
                        quizButtonClicked: false,
                        page: this.normalize_pageNum(this.state.page, views)
                   })
    }
    handleRetry = (e) => {
        this.stopEvent(e)
        window.scrollTo(0,0)
        this.setState({showHintDialog: false,
                       showQuizDialog: true,
                     })
        this.props.store.dispatch(resetCheckboxes(this.state.page))
    }
    handleClose = (e) => {
        this.stopEvent(e)
        this.setState({showAboutUsDialog: false})
    }
    handleSidemenu = (e) => {
        if (this.state.rollUp && this.state.spaceMode) return
        this.stopEvent(e)
        this.setState({showMenu:(!this.state.showMenu), showHelperDialog: false})
    }
    handleHelper = (e)=>{
        if (this.state.rollUp && this.state.spaceMode) return
        this.stopEvent(e)
        this.setState({showHelperDialog:true})
    }
    processRollUp = (page) => {
        let pg = document.getElementById("p"+page)
        let rect = pg.getBoundingClientRect()
        let topLevel = 0
        let spaceMode = this.state.spaceMode
        let headNavMode = this.state.paginationHeaderMode

        // drop appBar and Navigator if page has scrolled up yet
        let status = (spaceMode && !headNavMode && rect.top === 0) ||
                      (spaceMode && headNavMode && rect.top === 0)
                      ? false : true
        return status
    }
    handleChangePageCallback = (page) => {
        this.setState({page})

    }
    handlePageSwipe = (index, indexLatest )=>{
        let rollUp = this.processRollUp(index)
        this.setState({page: index, rollUp  })
    }
    handleQuiz = () => {
        this.setState({showQuizDialog:true, quizButtonClicked: true})
    }
    handleViewPreference = () => {
        this.setState({showViewingPreference: false})
    }

    render() {
        const props = this.props
        const { store } = props
        const context = this
        const state = context.state
        const pageNum = state.page
        const fontSize = bindFontSize(state.fontSize,)
        const lang = state.lang


        const quiz_actions = [
          <FlatButton
            labelStyle={{fontSize}}
            label={cancel_label[lang]}
            primary={true}
            onTouchTap={this.handleCancel}
          />,
          <FlatButton
            labelStyle={{fontSize}}
            label={submit_label[lang]}
            primary={true}
            keyboardFocused={true}
            onTouchTap={this.handleSubmit}
          />,
        ];

        const completion_actions = [
          <FlatButton
            labelStyle={{fontSize}}
            label={continue_label[lang]}
            primary={true}
            keyboardFocused={true}
            onTouchTap={this.handleContinue}
          />,
        ];

        const hint_actions = [
          <FlatButton
            labelStyle={{fontSize}}
            label={(skip_label[lang])}
            primary={true}
            onTouchTap={this.handleSkip}
          />,
          <FlatButton
            labelStyle={{fontSize}}
            label={retry_label[lang]}
            primary={true}
            keyboardFocused={true}
            onTouchTap={this.handleRetry}
          />,
        ];

        const close_action = [
          <FlatButton
            labelStyle={{fontSize}}
            label={close_label[lang]}
            primary={true}
            keyboardFocused={true}
            onTouchTap={this.handleClose}
          />,
        ];

        const viewing_preference_action = [
          <FlatButton
            labelStyle={{fontSize}}
            label={close_label[lang]}
            primary={true}
            keyboardFocused={true}
            onTouchTap={this.handleViewPreference}
          />,
        ]

        return (

          <nav className="App" style={{height: window.innerHeight}}>
            <MuiThemeProvider>
              <AppBar
                     className="AppBarTitle"
                     style={Object.assign({},
                                          styles.container,
                                          (this.state.rollUp && this.state.spaceMode)
                                          ? styles.move
                                          : {})
                                        }
                     titleStyle={styles.titleShift}
                     title={(state.page === 0) && app_title[lang]
                            || titles[state.page][lang]}

                     iconElementLeft={<SideMenu store={store} sidemenuContext={this} />}
                     iconElementRight={<Helper data-helperContext={this}/>}

                     onTouchTap={this.handleSidemenu}
                     onRightIconButtonTouchTap={this.handleHelper}
               >
              </AppBar>
            </MuiThemeProvider>

            <MuiThemeProvider>
            <Dialog
              title={viewing_preference[lang]}
              actions={viewing_preference_action}
              modal={true}
              open={state.showViewingPreference}
              autoScrollBodyContent={true}
              >
            </Dialog>
            </MuiThemeProvider>

            {(state.quizMode && state.quizButtonClicked) && (
            <MuiThemeProvider>
              <Dialog
                title={quiz_label[lang]}
                actions={quiz_actions}
                modal={false}
                open={state.showQuizDialog}
                autoScrollBodyContent={true}
                >
                  <Quizzes state={state} store={store} pageNum={pageNum} data={views} />
              </Dialog>
            </MuiThemeProvider>)}

            {(state.quizMode && state.quizButtonClicked) && (
             <MuiThemeProvider>
              <Dialog
                title={congrad_title[lang]}
                actions={completion_actions}
                modal={false}
                open={state.showCompletionDialog}
                autoScrollBodyContent={true}
                >
              </Dialog>
            </MuiThemeProvider>)}

            {(state.quizMode && state.quizButtonClicked) && (
            <MuiThemeProvider>
              <Dialog
                title={hint_title[lang]}
                actions={hint_actions}
                modal={false}
                open={state.showHintDialog}
                autoScrollBodyContent={true}
                >
                {state.hintMessages.map((msg,idx)=>{
                    return <div key={idx}>{msg}</div>
                })}
              </Dialog>
            </MuiThemeProvider>)}

            <MuiThemeProvider>
              <Dialog
                  title={aboutus_label[lang]}
                  actions={close_action}
                  modal={false}
                  open={state.showAboutUsDialog}
                  autoScrollBodyContent={true}
                >
                <Team teamContext={this} />
              </Dialog>
            </MuiThemeProvider>
            <Pagination
                className="pagination"
                index={state.page}
                count={views.length}
                changePageCallback={this.handleChangePageCallback}
                containerStyle={
                  Object.assign({},
                                styles.paginationStyle,
                                (state.paginationHeaderMode
                                  ? styles.paginationHeader
                                  : styles.paginationFooter),
                                (state.rollUp
                                  && state.spaceMode
                                  && state.paginationHeaderMode)
                                ? styles.paginationMove
                                : {},
                              )}
            >
              <Book
                  onScrollCallBack={this.handleBookScroll}
                  onSwipedCallback={this.handlePageSwipe}
                  onQuizClickCallBack={this.handleQuiz}
                  bookContext={this}
                  store={store}
              />
            </Pagination>
          </nav>
        )
      }
}
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();


export default App;
