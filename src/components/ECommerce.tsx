import React from 'react';
import Cart from './Cart';
import { CartItemProps, StoreItemProps } from '../interfaces';
import ListItem from './ListItem';
import "./List.css";
// import ECommerceStore from '../store';


export default class ECommerce extends React.Component {
    
    state = {
        store: [
            { id: 1, name: "one", price: 10, stockAvailable: 1, isInCart: false },
            { id: 2, name: "two", price: 20, stockAvailable: 5, isInCart: false },
            { id: 3, name: "three", price: 30, stockAvailable: 8, isInCart: false },
            { id: 4, name: "four", price: 40, stockAvailable: 3, isInCart: false },
            { id: 5, name: "five", price: 50, stockAvailable: 6, isInCart: false },
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
            throw new Error("Oops! Unexpected error occurred.")
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
            storeProduct.isInCart = true;
        }

        // ECommerceStore.increase( storeProduct.price )

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
            throw new Error("Oops! Unexpected error occurred.")
        }

        cart = cart.filter((product) => product.id !== id);
        storeProduct.stockAvailable += cartProduct.quantity
        storeProduct.isInCart = false;

        this.setState({
            cart: cart,
            store: store
        });
    }

    renderListItem({ id, name, price, stockAvailable, isInCart }: StoreItemProps){
        return (
            <ListItem 
                key={id} 
                id={id} 
                name={name} 
                price={price}
                stockAvailable={stockAvailable}
                isInCart={isInCart}
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
                    <div>
                        {/* Current Stock Value CAD { ECommerceStore.stockValue } */}
                    </div>
                </div>
			    <Cart cartProducts={this.state.cart} handleItemClick={(id: number) => this.removeFromCart(id)} />
            </div>
        );
    }
}