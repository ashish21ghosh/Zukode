import React from "react";
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';
import './style.css';

export default class Paragraph extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null,
            isLoaded: false,
        };
    }

    render() {
        return (
            <div>
                <BlockMath math={this.props.items} />
            </div>
        )
    }
}
