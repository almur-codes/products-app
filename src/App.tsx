import React from 'react';
import './App.css';
import List from './components/List';

const App: React.FC = () => {
	
	const prods = [
		{ id: 1, name: "one", price: 10, quantity: 10 },
		{ id: 2, name: "two", price: 20, quantity: 20 },
		{ id: 3, name: "three", price: 30, quantity: 30 },
		{ id: 4, name: "four", price: 40, quantity: 40 },
		{ id: 5, name: "five", price: 50, quantity: 50 },
	]
	
	return (
		<div className="App">
			<List products={prods} />
			
		</div>
	);
}

export default App;
