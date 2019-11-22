import React from 'react';
import { CartItemProps } from '../interfaces';
import ECommerceStore from '../stores/ECommerce.store';

export default class CartItem extends React.Component<CartItemProps> {
    public render(){
        if( ECommerceStore.useMobX ){
            return (
                <li key={this.props.id} className="list-item"> 
                    <div>
                        <b>Name:</b> { this.props.name }
                    </div> 
                    <div>
                        <b>Price:</b> CAD { this.props.price }
                    </div>
                    <div>
                        <b>Quantity:</b> { this.props.quantity }
                    </div>
                    <div>
                        <b>Sub Total:</b> CAD { this.props.price * this.props.quantity }
                    </div>
                    <div>
                        <button onClick={() => ECommerceStore.removeFromCart(this.props.id)}>Remove from cart</button>
                    </div>
                </li>
            )
        }
        return (
            <li key={this.props.id} className="list-item"> 
                <div>
                    <b>Name:</b> { this.props.name }
                </div> 
                <div>
                    <b>Price:</b> CAD { this.props.price }
                </div>
                <div>
                    <b>Quantity:</b> { this.props.quantity }
                </div>
                <div>
                    <b>Sub Total:</b> CAD { this.props.price * this.props.quantity }
                </div>
                <div>
                    <button onClick={this.props.handleClick}>Remove from cart</button>
                </div>
            </li>
        )
    }
}