import React from "react";
import {Icon} from 'antd';
import btn from './style.css'


export default class Textcontent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null,
            isLoaded: false,
            items: [],
        };
        console.log(btn);
    }


    render() {

        return (
            <div>
                <div className="red_light">This text is red.</div>
            {/* <div>
                <Icon type="close-circle"/>
                <Icon type="edit" />
            </div> */}
            <p>{this.props.items}</p>
            </div>
        )
    }
}
