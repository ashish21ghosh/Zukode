import React from "react"
import { render } from "react-dom"
// import { DatePicker } from 'antd';
import AppContainer from "./containers/AppContainer"

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }
  
  render() {
    return (
      <AppContainer />
    )
  }
}

render(<App/>, document.getElementById('App'))