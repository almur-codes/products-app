import React from "react";
import { ListItemProps } from '../interfaces';
import "./ListItem.css";

export default class ListItem extends React.Component<ListItemProps> {
    public render() {
        return (
            <li key={this.props.id} className="list-item"> 
                <div>
                    <b>Name:</b> { this.props.name }
                </div> 
                <div>
                    <b>Price:</b> CAD { this.props.price }
                </div>
            </li>
        );
    }
}