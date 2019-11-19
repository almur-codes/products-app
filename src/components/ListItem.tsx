import React from "react";
import { StoreItemProps } from '../interfaces';
import "./ListItem.css";

export default class ListItem extends React.Component<StoreItemProps> {
    public render() {
        return (
            <li key={this.props.id} className="list-item">
                <div>
                    <b>Name:</b> { this.props.name }
                </div> 
                <div>
                    <b>Price:</b> CAD { this.props.price }
                </div>
                <div>
                    <b>Stock Available:</b> { this.props.stockAvailable }
                </div>
                <div>
                    { this.renderButton(this.props) }
                </div>
            </li>
        );
    }

    renderButton({ isInCart, stockAvailable}: StoreItemProps){
        if(isInCart && stockAvailable > 0){
            return (
                <button onClick={this.props.handleClick}>Add Quantity</button>
            )
        }
        if (stockAvailable < 1) {
            return (
                <button disabled>Insufficient Stock</button>
            )
        }
        return (
            <button onClick={this.props.handleClick}>Add to Cart</button>
        )
    }
}