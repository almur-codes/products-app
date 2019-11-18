export interface ListItemProps {
    id: number,
    name: string,
    price: number,
    quantity?: number,
    handleClick?: ((event: MouseEvent<HTMLLIElement, MouseEvent>) => void) | undefined = () => {}
}

export interface ListProps {
    products: Array<ListItemProps>
}

export interface CartProps {
    cartProducts: Array<CartItemProps>
    handleItemClick: ((event: MouseEvent<HTMLLIElement, MouseEvent>) => void) | undefined = () => {}
}

export interface CartItemProps {
    id: number,
    name: string,
    price: number,
    quantity: number,
    handleClick?: ((event: MouseEvent<HTMLLIElement, MouseEvent>) => void) | undefined = () => {}
}