import React from "react";
import Prism from "prismjs";
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-sql';

export class PrismCode extends React.Component {
  constructor(props) {
    super(props)
    this.ref = React.createRef()
  }
  componentDidMount() {
    this.highlight()
  }
  componentDidUpdate() {
    this.highlight()
  }
  highlight = () => {
    if (this.ref && this.ref.current) {
      Prism.highlightElement(this.ref.current)
    }
  }
  render() {
    const { code, plugins, language } = this.props
    return (
      <pre className={!plugins ? "" : plugins.join(" ")}>
        <code ref={this.ref} className={`language-${language}`}>
          {code.trim()}
        </code>
      </pre>
    )
  }
}