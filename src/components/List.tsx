import React from 'react';
import ListItem from './ListItem';
import { ListItemProps, ListProps } from '../interfaces';
import "./List.css";

export default class List extends React.Component<ListProps> {
    
    renderListItem({ id, name, price }: ListItemProps){
        return (
            <ListItem 
                key={id} 
                id={id} 
                name={name} 
                price={price} 
            />
        );
    }

    public render() {
        return (
            <div className="products">
                <h3>Available Products</h3>
                <ol>
                    { this.props.products.slice().map(product => { return this.renderListItem(product) }) }
                </ol>
            </div>
        );
    }
}
