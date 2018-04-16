import React from 'react'


import {connect} from 'react-redux'

@connect( store => {
  return {
    realTimeData: store.firebaseIntegration.realTimeData,
    user: store.firebaseIntegration.user,
  }
} )
export default class RoomList extends React.Component{
  componentDidMount(){
    
  }
  render(){
    const {realTimeData,user} = this.props
    const ListItems = realTimeData!=null?
      realTimeData
        .filter( item => item.data.user.email!=user.email )
        .map( item => <RoomListItem key={item.id} owner={item.data.user.email}
          photo={item.data.user.photoURL} roomId={item.data.roomId}
          participants={item.data.participants==undefined||item.data.participants.length==0?1:item.data.participants.length}
          name={item.data.name} /> ) : <p></p>
    return(
      <section id="room-list-view" class="list">
        <ul class="list-group"> {ListItems} </ul>
      </section>
    )
  }
}
const RoomListItem = (props) => {
  return <a href="#" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
      <img class="list-img" src={props.photo} />
      <div class="vertical list-details">
        <h6>{props.name}</h6>
        <p>{props.roomId}</p>
        <p class="sup-sub-title">{props.owner}</p>
      </div>
      <span class="badge badge-primary badge-pill">{props.participants}</span>
  </a>
}
