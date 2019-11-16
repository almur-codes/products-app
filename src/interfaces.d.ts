export interface ListItemProps {
    id: number,
    name: string,
    price: number,
    quantity?: number
}

export interface ListProps {
    products: Array<ListItemProps>
}

export interface CartProps {
    cartProducts: Array<CartItemProps>
}

export interface CartItemProps {
    id: number,
    name: string,
    price: number,
    quantity: number
}