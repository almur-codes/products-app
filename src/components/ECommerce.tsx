import React from 'react';
import Cart from './Cart';
import { CartItemProps, StoreItemProps } from '../interfaces';
import ListItem from './ListItem';
import "./List.css";


export default class ECommerce extends React.Component {
    
    state = {
        store: [
            { id: 1, name: "one", price: 10, stockAvailable: 10 },
            { id: 2, name: "two", price: 20, stockAvailable: 10 },
            { id: 3, name: "three", price: 30, stockAvailable: 10 },
            { id: 4, name: "four", price: 40, stockAvailable: 10 },
            { id: 5, name: "five", price: 50, stockAvailable: 10 },
        ],
        cart: []
    }

    addToCart(id: number){
        // get store product and cart product
        // if cart product is undefined add store product to cart - reduce stockAvailable
        // else increase cart product quantity and reduce stockAvailable
        // set state for cart and store

        let cart: Array<CartItemProps> | undefined = this.state.cart.slice();
        let store: Array<StoreItemProps> = this.state.store.slice();
        let cartProduct: CartItemProps | undefined = cart.find(cartProduct => cartProduct.id === id)
        let storeProduct: StoreItemProps | undefined = store.find(storeProduct => storeProduct.id === id)

        if( !storeProduct ){
            // throw exception
            // go look at error boundries in ReactJS
            return;
        }

        if( cartProduct ){
            // if stock available is not more than 0
            if( storeProduct.stockAvailable > 0 ){
                cartProduct.quantity++;
                storeProduct.stockAvailable--;
            } else {
                // either do nothing or throw warning that tells user that there is not enough stock
                return;
            }

        } else {
            cart.push({
                id: storeProduct.id,
                name: storeProduct.name,
                price: storeProduct.price,
                quantity: 1
            })
            storeProduct.stockAvailable--;
        }

        this.setState({
            cart: cart,
            store: store
        });
    }

    removeFromCart(id: number){
        // get store product and cart product
        // filter cart to remove product that has been selected
        // increase stock available of removed product
        // set state for cart and store

        let cart: Array<CartItemProps> = this.state.cart.slice();
        let store: Array<StoreItemProps> = this.state.store.slice();
        let cartProduct: CartItemProps | undefined = cart.find(cartProduct => cartProduct.id === id)
        let storeProduct: StoreItemProps | undefined = store.find(storeProduct => storeProduct.id === id)

        if( !storeProduct || !cartProduct ){
            // throw exception
            // go look at error boundries in ReactJS
            return;
        }

        cart = cart.filter((product) => product.id !== id);
        storeProduct.stockAvailable += cartProduct.quantity

        this.setState({
            cart: cart,
            store: store
        });
    }

    renderListItem({ id, name, price, stockAvailable }: StoreItemProps){
        return (
            <ListItem 
                key={id} 
                id={id} 
                name={name} 
                price={price}
                stockAvailable={stockAvailable}
                handleClick={() => this.addToCart(id)}
            />
        );
    }
    
    public render(){
        return (
            <div>
                <div className="products">
                    <h3>Available Products</h3>
                    <ol>
                        { this.state.store.slice().map(product => { return this.renderListItem(product) }) }
                    </ol>
                </div>
			    <Cart cartProducts={this.state.cart} handleItemClick={(id: number) => this.removeFromCart(id)} />
            </div>
        );
    }
}