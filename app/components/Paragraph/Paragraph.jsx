import React from "react";
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
                <p>{this.props.items}</p>
            </div>
        )
    }
}
