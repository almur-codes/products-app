import { observable, action, computed } from 'mobx';
import { CartItemProps, StoreItemProps } from './interfaces';

class ECommerceStore {
    storeProducts = observable([], {deep: true})

    @computed get stockValue(){
        let total = 0
        
        this.storeProducts.forEach((storeProduct: StoreItemProps) => {
            total += storeProduct.price
        });

        return total
    }

    @action
    decreseStockAvailable(id: number){
        // let product: StoreItemProps | undefined = this.storeProducts.find((storeProduct: StoreItemProps) => storeProduct.id === id);
        // if( product ){
        //     product.stockAvailable++
        // }
    }

    cartProducts = observable([], {deep: true})

    @computed get grandTotal(){
        let total = 0
        
        this.cartProducts.forEach((cartProduct: CartItemProps) => {
            total += (cartProduct.price * cartProduct.quantity)
        });

        return total
    }

    @computed get numberOfProducts(){
        return this.cartProducts.length
    }

    @action
    addToCart(product: CartItemProps){
        
    }

    @action
    removeFromCart(id: number){

    }
}

export default new ECommerceStore()