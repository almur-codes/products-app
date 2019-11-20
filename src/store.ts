import { observable, action, computed } from 'mobx';
import { CartItemProps, StoreItemProps } from './interfaces';

class ECommerceStore {
    storeProducts = observable([
        { id: 1, name: "one", price: 10, stockAvailable: 1, isInCart: false },
        { id: 2, name: "two", price: 20, stockAvailable: 5, isInCart: false },
        { id: 3, name: "three", price: 30, stockAvailable: 8, isInCart: false },
        { id: 4, name: "four", price: 40, stockAvailable: 3, isInCart: false },
        { id: 5, name: "five", price: 50, stockAvailable: 6, isInCart: false },
    ], { deep: true })

    @computed get stockValue(){
        let total = 0
        
        this.storeProducts.forEach(({ price }: StoreItemProps) => {
            total += price
        });

        return total
    }

    decreseStockAvailable(id: number){
        let product: StoreItemProps | undefined = this.storeProducts.find((storeProduct: StoreItemProps) => storeProduct.id === id);
        if( product ){
            product.stockAvailable++
        }
    }

    increaseStockAvailable(id: number){
        // let product: StoreItemProps | undefined = this.storeProducts.find((storeProduct: StoreItemProps) => storeProduct.id === id);
        // if( product ){
        //     product.stockAvailable++
        // }
    }

    cartProducts = observable([], {deep: true})

    @computed get grandTotal(){
        let total = 0
        
        this.cartProducts.forEach(({ price, quantity }: CartItemProps) => {
            total += (price * quantity)
        });

        return total
    }

    @computed get numberOfProducts(){
        return this.cartProducts.length
    }

    @action
    addToCart(id: number){
        // get store product and cart product
        // if cart product is undefined add store product to cart - reduce stockAvailable
        // else increase cart product quantity and reduce stockAvailable
        // set new cart and store

        let cart: Array<CartItemProps> | undefined = this.cartProducts;
        let store: Array<StoreItemProps> = this.storeProducts;
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
    }

    @action
    removeFromCart(id: number){
        // get store product and cart product
        // filter cart to remove product that has been selected
        // increase stock available of removed product
        // set new cart and store

        let cart: Array<CartItemProps> = this.cartProducts;
        let store: Array<StoreItemProps> = this.storeProducts;
        let cartProduct: CartItemProps | undefined = cart.find(cartProduct => cartProduct.id === id)
        let storeProduct: StoreItemProps | undefined = store.find(storeProduct => storeProduct.id === id)

        if( !storeProduct || !cartProduct ){
            // throw exception
            throw new Error("Oops! Unexpected error occurred.")
        }

        cart = cart.filter((product) => product.id !== id);
        storeProduct.stockAvailable += cartProduct.quantity
        storeProduct.isInCart = false;
    }
}

export default new ECommerceStore()