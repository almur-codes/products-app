import React from 'react';
import './App.css';
import ECommerce from './components/ECommerce';

class ErrorBoundary extends React.Component {
	// Tutorial can be found here --> https://blog.pusher.com/react-error-boundaries/

	state = {
		error: Object,
		errorInfo: {
			componentStack: null
		},
		hasError: false
	}

	componentDidCatch(error: Object, errorInfo: Object){
		console.log( error, errorInfo )
		this.setState({
			hasError: true,
			error: error,
			errorInfo: errorInfo
		})
	}

	render(){
		if( this.state.hasError ){
			return (
				<div>
					<h2>Oops! This is awkward...an error occured.</h2>
					<div>
						<h2>Something went wrong.</h2>
						<details style={{ whiteSpace: "pre-wrap" }}>
							{this.state.error && this.state.error.toString()}
							<br />
							{this.state.errorInfo.componentStack}
						</details>
					</div>
				</div>
			)
		}

		return this.props.children
	}
}

const App: React.FC = () => {	
	return (
		<div className="App">
			<ErrorBoundary>
				<ECommerce />
			</ErrorBoundary>
		</div>
	);
}

export default App;
