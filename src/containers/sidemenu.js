import React, {Component} from 'react'
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import {titles,booklet_label,table_of_content_label,aboutus_label} from '../contents/control-text.js'
import Done from 'material-ui/svg-icons/action/done';
import Divider from 'material-ui/Divider';
import cfg from '../defaults/config.js'
import bindFontSize from '../actions/bind-fontsize.js'

const marginTop = cfg.marginTop

const styles = {
    menuFooter: {
        postion: 'absolute!important',
        right: 0,
        bottom: 0,
        left: 0,
        padding: '1rem',
        textAlign: 'center',
    }
}
const testStyles = cfg.testStyles

export default class SideMenu extends Component {

  handleAboutusTouchTap = (e) =>{
    const context = this.props.sidemenuContext
    e.stopPropagation()
    context.setState({
        showMenu: false,
        showAboutUsDialog: true,
      })
  }
  handleMenuItemTouchTap = (e, idx)=>{
    const context = this.props.sidemenuContext
    const skipLeadingCoverPageAndAuthorPage = 0
    const nonIndexPageNum = idx + skipLeadingCoverPageAndAuthorPage
    e.preventDefault()
    e.stopPropagation()
    context.setState({
        page: nonIndexPageNum,
        showMenu: false,
        //showQuizDialog: true,
        quizButtonClicked: true,
    })
  }

  showDone = (pg, state) => {
      // console.log("pg", pg, "quizRecord", state.quizRecord)
      return state.quizRecord.indexOf(pg-1) > -1
  }

  render() {
      const props = this.props
      const { store } = props
      const storeState = store.getState()
      const context = props.sidemenuContext
      const state = context.state
      const lang = state.lang
      const iconStyles = props.iconStyles
      return (
        <nav>
              <div>
                <IconButton>
                  <MenuIcon className="SvgColorWhite" />
                </IconButton>
                <Drawer
                      containerStyle={{marginTop}}
                      disableSwipeToOpen={true}
                      docked={false}
                      width={305}
                      height={500}
                      open={state.showMenu}
                      onRequestChange={(open) => {
                          //debugger
                          this.setState({open})
                      }}
                      >

                    <AppBar className="AppBarTitle"

                        title={`${booklet_label[lang]} ${table_of_content_label[lang]}`}
                        titleStyle={{fontSize: 15}}
                        iconElementLeft={<IconButton></IconButton>}
                      />
                          {
                            //titles.filter((title,idx)=>idx > 0).map((title,idx)=>{
                            titles.map((title,idx)=>{
                            //console.log("title", title, idx)
                            return <MenuItem
                                        key={idx}
                                        style={{overflow: 'auto'}}
                                        onTouchTap={(e)=> {
                                            this.handleMenuItemTouchTap(e,idx)
                                        }}
                                      >
                                      <p key={`${idx}`}
                                           style={{
                                              fontSize: bindFontSize(state.fontSize),
                                              wordWrap: 'break-word',
                                              whiteSpace: 'normal',
                                              overflow: 'auto',
                                            }}>
                                        {title[lang]}
                                        {this.showDone(idx+1, state)
                                          &&
                                          (<IconButton>
                                              <Done className="SvgColorCyan500"/>
                                           </IconButton>
                                          )
                                        }
                                      </p>
                                  </MenuItem>
                           })}


                           <Divider />
                           <p><span></span></p>
                           <Divider />
                           <div key={titles.length -1 + titles.length}
                                     style={styles.menuFooter}
                                       onTouchTap={this.handleAboutusTouchTap}>
                                   <div
                                      key={titles.length -1}
                                      style={{
                                         postion: 'absolute',
                                         bottom: 20,
                                         fontSize: bindFontSize(state.fontSize),
                                         wordWrap: 'break-word',
                                       }}>
                                   {aboutus_label[lang]}
                                   </div>
                           </div>
                           <Divider />
                </Drawer>
              </div>

        </nav>
      )
  }
}
