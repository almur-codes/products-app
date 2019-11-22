import { observable, action, computed } from 'mobx';
import { CartItemProps, StoreItemProps } from '../interfaces';

class ECommerceStore {
    useMobX = true

    storeProducts = observable<StoreItemProps>([
        { id: 1, name: "one", price: 10, stockAvailable: 1, isInCart: false },
        { id: 2, name: "two", price: 20, stockAvailable: 5, isInCart: false },
        { id: 3, name: "three", price: 30, stockAvailable: 8, isInCart: false },
        { id: 4, name: "four", price: 40, stockAvailable: 3, isInCart: false },
        { id: 5, name: "five", price: 50, stockAvailable: 6, isInCart: false },
        { id: 6, name: "six", price: 60, stockAvailable: 4, isInCart: false },
        { id: 7, name: "seven", price: 70, stockAvailable: 5, isInCart: false },
        { id: 8, name: "eight", price: 80, stockAvailable: 8, isInCart: false },
    ], { deep: true })

    @computed get stockValue(){
        let total = 0
        
        this.storeProducts.forEach(({ price, stockAvailable }: StoreItemProps) => {
            total += (price * stockAvailable)
        });

        return total
    }

    cartProducts = observable<CartItemProps>([], {deep: true})

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
        // if cart product is undefined add store product to cart
        // else increase cart product quantity 
        // reduce stockAvailable

        let cart: Array<CartItemProps> | undefined = this.cartProducts;
        let store: Array<StoreItemProps> = this.storeProducts;
        let cartProduct: CartItemProps | undefined = cart.find(cartProduct => cartProduct.id === id)
        let storeProduct: StoreItemProps | undefined = store.find(storeProduct => storeProduct.id === id)

        if( !storeProduct ){
            // throw exception
            throw new Error("Oops! Unexpected error occurred.")
        }

        if( storeProduct.stockAvailable < 0 ){
            throw new Error("Oops! Unexpected error occurred.")
        }

        if( storeProduct.stockAvailable === 0 ){
            // request to replenish stock probably
            return
        }

        if( cartProduct ){
            cartProduct.quantity++;
        } else {
            cart.push({
                id: storeProduct.id,
                name: storeProduct.name,
                price: storeProduct.price,
                quantity: 1
            })
            storeProduct.isInCart = true;
        }
        
        storeProduct.stockAvailable--;
    }

    @action
    removeFromCart(id: number){
        // get store product and cart product
        // increase stock available of removed product
        // filter cart to remove product that has been selected
        
        let cart: Array<CartItemProps> = this.cartProducts;
        let store: Array<StoreItemProps> = this.storeProducts;
        let cartProductIndex: number = cart.findIndex(cartProduct => cartProduct.id === id)
        let storeProduct: StoreItemProps | undefined = store.find(storeProduct => storeProduct.id === id)
        
        if( typeof(storeProduct) === "undefined" || cartProductIndex < 0 ){
            // throw exception
            throw new Error("Oops! Unexpected error occurred.")
        }
        
        storeProduct.stockAvailable += this.cartProducts[cartProductIndex].quantity
        storeProduct.isInCart = false;
        
        this.cartProducts.splice( cartProductIndex, 1 )
    }
}

export default new ECommerceStore();