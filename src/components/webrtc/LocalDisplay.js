import React from 'react'
import {connect} from 'react-redux'

@connect( store => {
  return {
    localVideoEl: store.webrtc.localVideoEl
  }
} )
export default class LocalDisplay extends React.Component{

  componentWillMount(){ }

  componentDidMount(){ }

  render(){
    const { loading, mediaAllowed, localVideoEl } = this.props
    console.log(`LocalDisplay render`)
    return(
      <article>
        <div id={localVideoEl}></div>
        <div class={mediaAllowed?'hidden':'screen-blocked'}>{loading==undefined?"Accessing media devices...":"No Permission to access media devices"}</div>
      </article>
    )
  }
}
