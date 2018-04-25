import { ShoppingCart } from "./shopping-cart";

export class Order {
    datePlaed: number;
    items: any[];

    constructor(public userId: string, public shipping: any, shoppingCart: ShoppingCart) {
        this.datePlaed = new Date().getTime();

        this.items = shoppingCart.items.map(i => {
            return {
                product: {
                    title: i.title,
                    imageUrl: i.imageUrl,
                    price: i.price
                },
                quantity: i.quantity,
                totalPrice: i.totalPrice
            }
        })
    }
}