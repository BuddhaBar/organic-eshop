import { Product } from './product';
import { ShoppingCartItem } from './shopping-cart-item';
export class ShoppingCart {
    items: ShoppingCartItem[] = [];
    
    constructor(private itemMap: any) {
        this.itemMap = itemMap || {};

        for(let productId in itemMap){
            let item = itemMap[productId];
            this.items.push(new ShoppingCartItem({...item, key: productId}));
        }
    }
    
    getQuantity(product: Product) {
        for(let productId in this.itemMap)
            console.log(productId);
        let item = this.itemMap[product.key];
        return item ? item.quantity : 0;
      }

    get totalItemCount() {
        let count = 0;
        for(let productId in this.items)
            count += this.items[productId].quantity;
        return count;
    }

    get totalPrice() {
        let sum = 0;
        for(let productId in this.items)
            sum += this.items[productId].totalPrice;
        return sum;
    }

    

}