import React from 'react';
import Cart from './Cart';
import { CartItemProps, ListItemProps } from '../interfaces';
import ListItem from './ListItem';
import "./List.css";


export default class ECommerce extends React.Component {
    
    state = {
        products: [
            { id: 1, name: "one", price: 10, quantity: 10 },
            { id: 2, name: "two", price: 20, quantity: 20 },
            { id: 3, name: "three", price: 30, quantity: 30 },
            { id: 4, name: "four", price: 40, quantity: 40 },
            { id: 5, name: "five", price: 50, quantity: 50 },
        ],
        cart: []
    }

    addToCart(id: number){
        let cart: Array<CartItemProps | undefined> = this.state.cart.slice();
        let newProduct = this.state.products.find(product => product.id === id);
        cart.push(newProduct);
        this.setState({"cart": cart});
    }

    renderListItem({ id, name, price }: ListItemProps){
        return (
            <ListItem 
                key={id} 
                id={id} 
                name={name} 
                price={price}
                handleClick={() => this.addToCart(id)}
            />
        );
    }

    removeFromCart(event: any){
        alert(event)
    }
    
    public render(){
        return (
            <div>
                <div className="products">
                    <h3>Available Products</h3>
                    <ol>
                        { this.state.products.slice().map(product => { return this.renderListItem(product) }) }
                    </ol>
                </div>
			    <Cart cartProducts={this.state.cart} handleItemClick={(event) => {console.log("hey",event); this.removeFromCart(event)}} />
            </div>
        );
    }
}