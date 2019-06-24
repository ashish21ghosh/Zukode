import React from "react";
import './style.css';

export default class ParentTitle extends React.Component {
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
                <h1>{this.props.items}</h1>
            </div>
        )
    }
}