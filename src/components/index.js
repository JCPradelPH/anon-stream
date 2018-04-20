import React from 'react'

export const MainLogoLt = (props) => {
  return(
    process.env.NODE_ENV=='development'?
      <img id="main-logo" src="../css/images/main-logo-lt.png" /> :
      <img id="main-logo" src="css/images/main-logo-lt.png" />
  )
}

export const MainLogoDk = (props) => {
  return(
    process.env.NODE_ENV=='development'?
      <img id="main-logo" src="../css/images/main-logo-dk.png" /> :
      <img id="main-logo" src="css/images/main-logo-dk.png" />
  )
}
export const LoaderAnimSm = (props) => {
  return(
    process.env.NODE_ENV=='development'?
    <img class="loader-anim-sm" src="../css/images/loader.gif" /> :
    <img class="loader-anim-sm" src="css/images/loader.gif" />
  )
}
export const LoaderAnimSLg = (props) => {
  return(
    process.env.NODE_ENV=='development'?
    <img class="loader-anim-lg" src="../css/images/loader.gif" /> :
    <img class="loader-anim-lg" src="css/images/loader.gif" />
  )
}

export const FacebookButton = (props) => {
  return(
    <button type="button" {...props} class="btn btn-primary bt-def bt-icon-last bt-facebook-theme">
      <p>{props.buttonlabel}</p>
      <i class={props.iconclass}></i>
    </button>
  )
}
export const GoogleButton = (props) => {
  return(
    <button type="button" {...props} class="btn btn-primary bt-def bt-icon-last bt-google-theme">
      <p>{props.buttonlabel}</p>
      <i class={props.iconclass}></i>
    </button>
  )
}

export const ButtonIconLastWhite = (props) => {
  return(
    <button type="button" {...props} class="btn btn-primary bt-def bt-icon-last bt-white-theme">
      <p>{props.buttonlabel}</p>
      <i class={props.iconclass}></i>
    </button>
  )
}
export const ButtonIconLastWhiteSm = (props) => {
  return(
    <button type="button" {...props} class="btn btn-primary bt-icon-last-sm bt-def bt-white-theme">
      <p>{props.buttonlabel}</p>
      <i class={props.iconclass}></i>
    </button>
  )
}

export const ButtonIconLastPrimary = (props) => {
  return(
    <button type="button" {...props} class="btn btn-primary bt-def bt-icon-last bt-primary-theme">
      <p>{props.buttonlabel}</p>
      <i class={props.iconclass}></i>
    </button>
  )
}
export const ButtonIconLastPrimarySm = (props) => {
  return(
    <button type="button" {...props} class="btn btn-primary bt-icon-last-sm bt-def bt-primary-theme">
      <p>{props.buttonlabel}</p>
      <i class={props.iconclass}></i>
    </button>
  )
}
export const ButtonIconLastRed = (props) => {
  return(
    <button type="button" {...props} class="btn btn-primary bt-def bt-icon-last bt-red-theme">
      <p>{props.buttonlabel}</p>
      <i class={props.iconclass}></i>
    </button>
  )
}
export const ButtonIconLastRedSm = (props) => {
  return(
    <button type="button" {...props} class="btn btn-primary bt-icon-last-sm bt-def bt-red-theme">
      <p>{props.buttonlabel}</p>
      <i class={props.iconclass}></i>
    </button>
  )
}
export const ButtonIconLastBlue = (props) => {
  return(
    <button type="button" {...props} class="btn btn-primary bt-def bt-icon-last bt-blue-theme">
      <p>{props.buttonlabel}</p>
      <i class={props.iconclass}></i>
    </button>
  )
}
export const ButtonIconLastBlueSm = (props) => {
  return(
    <button type="button" {...props} class="btn btn-primary bt-icon-last-sm bt-def bt-blue-theme">
      <p>{props.buttonlabel}</p>
      <i class={props.iconclass}></i>
    </button>
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
