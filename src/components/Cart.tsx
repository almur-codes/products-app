import React from "react";
import "./Cart.css";
import { CartProps, CartItemProps } from '../interfaces';
import CartItem from './CartItem';
import { observer } from 'mobx-react';
import ECommerceStore from '../stores/ECommerce.store';

@observer
export default class Cart extends React.Component<CartProps> {
    constructor(props: any){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    
    public render() {
        if( ECommerceStore.useMobX ){
            return (
                <div className="cart">
                    <h3>Your Cart</h3>
                    <ol>
                        { 
                            ECommerceStore.cartProducts.slice().map((cartProduct: CartItemProps) => { 
                                return (
                                    <CartItem 
                                        key={cartProduct.id} 
                                        id={cartProduct.id} 
                                        name={cartProduct.name} 
                                        price={cartProduct.price}
                                        quantity={cartProduct.quantity}
                                        handleClick={() => {}} />
                                ); 
                            }) 
                        }
                    </ol>
                    <span>
                        Your grand total is CAD { ECommerceStore.grandTotal }
                    </span>
                </div>
            );
        }
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

    // public handleClick = (id: number): void => {

    // }

    public handleClick(id: number){
        this.props.handleItemClick(id)
    }
}