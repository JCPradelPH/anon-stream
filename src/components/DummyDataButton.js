import React from 'react'
import {ButtonIconLastBlueSm,ButtonIconLastPrimarySm} from './'
import {generateDummyData,saveDataToServer} from '../js/'

export default class DummyDataButton extends React.Component{

  render(){
    return(
      <div>
        <ButtonIconLastPrimarySm onClick={generateDummyData} id={'bt-create-room'}
          iconclass={'fa fa-cog'}
          buttonlabel={'Generate Data to Console'} />
        <ButtonIconLastPrimarySm onClick={saveDataToServer} id={'bt-create-room'}
          iconclass={'fa fa-cog'}
          buttonlabel={'Save Data to Server'} />
      </div>
    )
  }
}
