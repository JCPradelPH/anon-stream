import React from 'react'

export default class LocalDisplay extends React.Component{

  constructor(props){
    super(props)
  }

  componentWillMount(){

  }

  componentDidMount(){

  }

  render(){
    const {
      loading, mediaAllowed, localVideoEl
    } = this.props
    console.log(`loading: ${loading}`)
    return(
      <article>
        <div id={localVideoEl}></div>
        <div class={mediaAllowed?'hidden':'screen-blocked'}>{loading==undefined?"Accessing media devices...":"No Permission to access media devices"}</div>
      </article>
    )
  }
}
