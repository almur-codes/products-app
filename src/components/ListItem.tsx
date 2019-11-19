import React from "react";
import { StoreItemProps } from '../interfaces';
import "./ListItem.css";

export default class ListItem extends React.Component<StoreItemProps> {
    public render() {
        return (
            <li key={this.props.id} className="list-item" onClick={this.props.handleClick}>
                <div>
                    <b>Name:</b> { this.props.name }
                </div> 
                <div>
                    <b>Price:</b> CAD { this.props.price }
                </div>
                <div>
                    <b>Stock Available:</b> { this.props.stockAvailable }
                </div>
            </li>
        );
    }
}