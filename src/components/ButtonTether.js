import React from 'react'

import {ButtonIconLastBlueSm,ButtonIconLastPrimarySm} from './'

import {connect} from 'react-redux'
@connect( store => {
  return {
    firebaseLoading: store.firebaseIntegration.loading,
    successcreate: store.firebaseIntegration.successcreate,
  }
} )
export default class ButtonTether extends React.Component{

  constructor(props) {
    super(props)
    this.state = {
      shown: false
    }
  }

  componentDidMount(){ }

  container = () => document.getElementById('theter-modal')
  theter = () => document.getElementById('theter-main')
  offTop = () => this.theter()!=null?(this.theter().clientHeight/2)+this.container().clientHeight:0
  buttonHeight = () => document.getElementById('bt-create-room').clientHeight/2
  containerWidth = () => this.container()!=null?this.container().clientWidth:0

  render(){
    const {title,ComponentContent,firebaseLoading,successcreate} = this.props
    const transform = {
        transform: `translateX(${this.containerWidth()+20}px)
          translateY(${this.offTop()}px)`
    }
    return(
      <section id="theter-modal" class="tether-holder">
        <ButtonIconLastPrimarySm disabled={firebaseLoading} onClick={() => {this.setState({ shown: !this.state.shown })}} id={'bt-create-room'}
          iconclass={firebaseLoading?'':(successcreate?'fa fa-cog':'fa fa-sign-in-alt')} buttonlabel={firebaseLoading?'Loading...':(successcreate?'Show Room Settings':'Create Room')} />
        <div id="theter-main" data-tether-visibility={this.state.shown?'open':'close'} class="popover open bs-tether-element-attached-left"
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
