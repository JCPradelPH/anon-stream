import React from 'react'

import RoomListItem from '../components/room-list/RoomListItem'

import {connect} from 'react-redux'

@connect( store => {
  return {
    realTimeData: store.firebaseIntegration.realTimeData,
  }
} )
export default class RoomList extends React.Component{
  componentDidMount(){
    this.props.action.firebaseIntegration
      .fetchRealtimeData(`rooms`)
      .then( success => {} )
      .catch( err => console.log(err) )
  }
  render(){
    const {realTimeData} = this.props
    const ListItems = realTimeData!=null?
      realTimeData.map( item => {
        console.log(item)
        return <RoomListItem key={item.userRef}>{item.name}</RoomListItem>
      } ) :
      `No Result`
    return(
      <section id="room-list-view" class="list">
        <ul>
          {ListItems}
        </ul>
      </section>
    )
  }
}
