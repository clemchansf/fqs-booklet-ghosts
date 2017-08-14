
import React, {Component} from 'react'
import IconMenu from 'material-ui/IconMenu';
import {language_types, aboutus_label, close_label,
        quiz_mode_label, space_mode_label, navigator_top_mode_label} from '../contents/control-text.js'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import NavigationClose from 'material-ui/svg-icons/navigation/close'
import AppBar from 'material-ui/AppBar'
import {grey900, cyan500} from 'material-ui/styles/colors';
import Toggle from 'material-ui/Toggle';
import Divider from 'material-ui/Divider'
import cfg from '../defaults/config.js'
import bindFontSize from '../actions/bind-fontsize.js'

export default class Helper extends Component {

  handleUnfocus = (e) => {
     const context = this.props['data-helperContext']
     e.preventDefault()
     e.stopPropagation()
     context.setState({showHelperDialog: false})
  }

  handleItemTouchTap = (e,child) => {
    const props = this.props
    const context = props['data-helperContext']

    e.preventDefault()
    e.stopPropagation()
    let helpEvent = JSON.parse(child.key)
    // should be a reducer here TBD
    switch (helpEvent.type) {
      case 'CHANGE_LANGUAGE':
        context.setState({lang: helpEvent.lang, showHelperDialog: false})
        break
      case 'QUIZ_MODE':
        context.setState({quizMode: !context.state.quizMode, quizButtonClicked: false, showHelperDialog: false})
        break;
      case 'SPACE_MODE':
          context.setState({spaceMode: !context.state.spaceMode, quizButtonClicked: false, showHelperDialog: false})
          break;
      case 'HEADER_NAV_MODE':
          context.setState({paginationHeaderMode: !context.state.paginationHeaderMode, quizButtonClicked: false, showHelperDialog: false})
          break;
      case 'SHOW_ABOUTUS':
        context.setState({showAboutUsDialog: true, showHelperDialog: false})
        break;
      case 'HIDE_ABOUTUS':
        context.setState({showHelperDialog: false})
        break;
      default:
        break;
    }
  }
  render() {
  const props = this.props
  const context = props['data-helperContext']
  const state = context.state
  const fontSize = bindFontSize(state.fontSize)
  const showHelperDialog = state.showHelperDialog
  const lang = state.lang

  const styles = {
    menuItem: {
      textAlign: 'left',
    },
    closeItem: {
      color: '#00BCD4',
      textDecoration: 'underline',
    }
  }

  let HelpMenuItems = Object.keys(language_types).map((lang) => {
    return <MenuItem
              style={Object.assign({}, styles.menuItem, {fontSize})}
              key={JSON.stringify({type:'CHANGE_LANGUAGE', lang: lang})}
              primaryText={language_types[lang]} />
  })

  return (
    <IconMenu
      {...props}
      iconButtonElement={
        <IconButton><MoreVertIcon className="SvgColorWhite" /></IconButton>
      }
      onBlur={this.handleUnfocus}
      targetOrigin={{horizontal: 'right', vertical: 'top'}}
      anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
      onItemTouchTap={this.handleItemTouchTap}
      open={state.showHelperDialog}
    >
      {HelpMenuItems}
        <Divider/>
        <MenuItem
            style={Object.assign({}, styles.MenuItem, {fontSize, width: 223})}
            key={JSON.stringify({type:'QUIZ_MODE'})}>
          <Toggle
               defaultToggled={state.quizMode}
               name={`ckbox-quizmode`}
               label={quiz_mode_label[state.lang]}
               style={styles.checkBox}
           />
        </MenuItem>
        <MenuItem
            style={Object.assign({}, styles.MenuItem, {fontSize, width: 223})}
            key={JSON.stringify({type:'SPACE_MODE'})}>
          <Toggle
               defaultToggled={state.spaceMode}
               name={`ckbox-quizmode`}
               label={space_mode_label[state.lang]}
               style={styles.checkBox}
           />
        </MenuItem>
        <MenuItem
            style={Object.assign({}, styles.MenuItem, {fontSize, width: 223})}
            key={JSON.stringify({type:'HEADER_NAV_MODE'})}>
          <Toggle
               defaultToggled={state.paginationHeaderMode}
               name={`ckbox-quizmode`}
               label={navigator_top_mode_label[state.lang]}
               style={styles.checkBox}
           />
        </MenuItem>
      </IconMenu>
    )
  }
}
