import React from 'react'
import {pipe,Subject} from 'rxjs/Rx'
import {distinctUntilChanged,debounceTime} from 'rxjs/operators'
import RoomList from '../components/room-list/RoomList'

export default class SearchRoomPanel extends React.Component{
  componentDidMount(){
    this.obs$ = new Subject()
    this.passFieldSubs = this.obs$
      .pipe( debounceTime(500),distinctUntilChanged() )
      .subscribe( val => console.log(val) )
  }
  handleSearchChange = (e) => {
    this.obs$.next(e.target.value)
  }

  render(){
    return (
      <section id="search-panel">
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1"><i class="fa fa-search"></i></span>
          </div>
          <input type="text" onChange={this.handleSearchChange} placeholder="Enter room name or id" class="form-control" aria-describedby="basic-addon2" />
          <small class="form-text text-muted">You can search other rooms by name or by id.</small>
        </div>
        <div id="list-holder">
          <RoomList {...this.props} />
        </div>
      </section>
    )
  }
}
