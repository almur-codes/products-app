import React from 'react';
import { CartItemProps } from '../interfaces';

export default class CartItem extends React.Component<CartItemProps> {
    public render(){
        return (
            <li key={this.props.id} className="list-item" onClick={this.props.handleClick}> 
                <div>
                    <b>Name:</b> { this.props.name }
                </div> 
                <div>
                    <b>Price:</b> CAD { this.props.price }
                </div>
            </li>
        )
    }
}