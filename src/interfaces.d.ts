export interface StoreItemProps {
    id: number,
    name: string,
    price: number,
    stockAvailable: number,
    isInCart: boolean,
    handleClick?: ((event: MouseEvent<HTMLLIElement, MouseEvent>) => void) | undefined = () => {}
}

export interface ListProps {
    products: Array<StoreItemProps>
}

export interface CartProps {
    cartProducts: Array<CartItemProps>
    handleItemClick: (id: number) => void = () => {}
}

export interface CartItemProps {
    id: number,
    name: string,
    price: number,
    quantity: number,
    handleClick?: ((event: MouseEvent<HTMLLIElement, MouseEvent>) => void) | undefined = () => {}
}