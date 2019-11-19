import { observable, action } from 'mobx';

class ECommerceStore {
    @observable grandTotal = 0;

    @action
    increase(value: number){
        this.grandTotal += value
    }
}

const eCommerceStore = new ECommerceStore()
export default eCommerceStore