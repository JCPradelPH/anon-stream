import React from 'react'

import {ButtonIconLastBlueSm,ButtonIconLastPrimarySm} from './'

import {connect} from 'react-redux'

export default class ButtonTether extends React.Component{

  constructor(props) {
    super(props)
    this.state = {
      shown: false
    }
  }

  componentDidMount(){ }

  container = () => document.getElementById('theter-modal')
  containerOffLeft = () => this.container()!=null?this.container().offsetLeft:0
  theter = () => document.getElementById('theter-main')
  offTop = () => this.theter()!=null?(this.theter().clientHeight/2)+this.container().clientHeight:0
  containerWidth = () => this.container()!=null?this.container().offsetWidth:0
  handleClick = () => {this.setState({ shown: !this.state.shown })}
  render(){
    const {title,ComponentContent} = this.props
    const transform = {
        transform: `translateY(${this.offTop()-10}px)`,
        left: `${this.containerOffLeft()-this.containerWidth()-50}px`
    }
    return(
      <section id="theter-modal" class="tether-holder">
        <ButtonIcon {...this.props} clickAction={this.handleClick} />
        <div id="theter-main" data-tether-visibility={this.state.shown?'open':'close'} class="popover open bs-tether-element-attached-middle bs-tether-element-attached-right bs-tether-target-attached-middle bs-tether-target-attached-right"
          style={transform}>
          <div class="popover-arrow"></div>
          <h3 class="popover-title">{title}</h3>
          <div class="popover-content">
            <ComponentContent {...this.props} />
          </div>
        </div>
      </section>
    )
  }
}
@connect( store => {
  return {
    firebaseLoading: store.firebaseIntegration.loading,
    saved: store.roomsettings.saved,
  }
} )
class ButtonIcon extends React.Component{
  render(){
    const {clickAction,firebaseLoading,saved} = this.props
    return(
      <ButtonIconLastPrimarySm disabled={firebaseLoading} onClick={clickAction} id={'bt-create-room'}
        iconclass={firebaseLoading?'':(saved?'fa fa-cog':'fa fa-sign-in-alt')}
        buttonlabel={firebaseLoading?'Loading...':(saved?'Show Room Settings':'Create Room')} />
    )
  }
}
