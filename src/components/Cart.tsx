import React from "react";
import "./Cart.css";
import { CartProps } from '../interfaces';
import CartItem from './CartItem';

export default class Cart extends React.Component<CartProps> {
    constructor(props: any){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    
    public render() {
        return (
            <div className="cart">
                <h3>Your Cart</h3>
                <ol>
                    { 
                        this.props.cartProducts.slice().map(cartProduct => { 
                            return (
                                <CartItem 
                                    key={cartProduct.id} 
                                    id={cartProduct.id} 
                                    name={cartProduct.name} 
                                    price={cartProduct.price}
                                    quantity={cartProduct.quantity}
                                    handleClick={() => this.handleClick(cartProduct.id)} />
                            ); 
                        }) 
                    }
                </ol>
            </div>
        );
    }

    public handleClick(id: number){
        this.props.handleItemClick(id)
    }
}