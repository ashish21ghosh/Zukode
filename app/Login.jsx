import React from "react"
import { render } from "react-dom"
import LoginContainer from "./containers/LoginContainer"

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }
  
  render() {
    return (
      <LoginContainer />
    )
  }
}

render(<Login/>, document.getElementById('App'))