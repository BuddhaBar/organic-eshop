import { ShoppingCart } from './shopping-cart';
export class Order {
    datePlaced: number;
    items: any[] = [];
    orderPrice: number;
    

    constructor(public userId?, public shipping?: any, shoppingCart?: ShoppingCart,) {

        this.datePlaced = new Date().getTime();

        this.items = shoppingCart.items.map(i => {
            return {
              product: {
                title: i.title,
                imageUrl: i.imageUrl,
                price: i.price
              },
              quantity: i.quantity,
              totalPrice: i.totalPrice,
            }
          })

          this.orderPrice = shoppingCart.totalPrice;
    }

    get totalPrice() {
      let sum = 0;
      for(let itemId in this.items)
          sum += this.items[itemId].totalPrice;
      return sum;
  }
}