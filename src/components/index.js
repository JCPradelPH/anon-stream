import React from 'react'

export const MainLogoLt = (props) => {
  return(
    <img id="main-logo" src="../css/images/main-logo-lt.png" />
  )
}

export const MainLogoDk = (props) => {
  return(
    <img id="main-logo" src="../css/images/main-logo-dk.png" />
  )
}

export const JoinRoomInput = () => (
    <div id="room-id-holder" class="input-group mb-3">
      <input type="text" id="room-id" name="room-id" class="room-id form-control" placeholder="Enter room id"
        aria-label="Enter room id" aria-describedby="basic-addon2" />
      <div class="input-group-append">
        <button class="btn btn-primary" type="button">Join<i class="fa fa-sign-in-alt"></i></button>
      </div>
    </div>
  )

export const RoomLink = () => {
  const roomId = generateUniqid()
  return(
    <Link id="bt-goto-room" class="btn btn-primary"
      to={{
        pathname: '/room',
        exact: true,
        params: {
          roomId: roomId
        }
      }}>
      <p>Continue with</p>
      <i class="fab fa-camera"></i>
    </Link>
  )
}
