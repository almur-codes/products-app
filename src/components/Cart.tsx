import React from "react";
import "./Cart.css";
import { CartProps } from '../interfaces';

export default class Cart extends React.Component<CartProps> {
    public render() {
        return (
            <div>
                <h3>Your Cart</h3>
                <ol>
                    
                </ol>
            </div>
        );
    }
}