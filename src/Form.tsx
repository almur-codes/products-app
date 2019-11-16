import React from 'react';
import { string } from 'prop-types';

interface Props {
    text: string,
    age?: number
}

interface State {
    email: string,
    name: string
}

export default class Form extends React.Component<Props, State> {
    
    state: State = {
        email: "",
        name: ""
    }

    handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        alert(e.target.value)
    }
    
    public render() {
        const {text} = this.props;
        const {name} = this.state;
        return (
            <div>
                <div>{text}</div>
                {/* <div>{name}</div> */}
                <input type="text" name="name" value={name} onChange={this.handleChange}/>
            </div>
        );
    }
}
