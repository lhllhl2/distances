class App extends React.Component {
    render() {
        return (<div className="jumbotron jumbotron-fluid">
            <div className="container">
                <h1 className="display-4">Distance Demo From Huinan Luo</h1>
                <p className="lead">You can input the distance with different units.</p>
                <ToAdd></ToAdd>
            </div>
        </div>);
    }
}

class ToAdd extends React.Component {
	constructor(props){
		super();
		this.state={
			distances:[],
			distancesSubmit:[],
			distance:'',
			newDistances:[],
			units:['KM','M','CM','MM'],
			unit:'KM',
			fresh:'0'
		};
		
		this.fetchAction = this.fetchAction.bind(this);
	};
	
	componentDidMount() {

    }
	
	inputChange(e){
		if(e.target.value!==""&&!isNaN(e.target.value)){
			this.setState({
				distance:e.target.value
			})
		}else{
			alert("please enter a valid number");
		}
		
	}
	
	handleSelected(e){
		this.setState({
			unit:e.target.value
		});
	}
	
	getInputValue(e){
		e.preventDefault();
		const newDistances = this.state.distances;
		const newDistancesSubmit = this.state.distancesSubmit;
		if(this.state.distance!==''&& this.state.distance){
			if(this.state.fresh==='1'){
				newDistances.length = 0;
				newDistancesSubmit.length = 0;
			}
			newDistances.push(this.state.distance+this.state.unit);
			newDistancesSubmit.push(this.state.distance+'-'+this.state.unit);
		}else{
			alert("please enter a value!");
		}
		this.setState({
			distances:newDistances,
			distancesSubmit:newDistancesSubmit,
			distance:'',
			fresh:'0'
		});
	}
	
	fetchAction() {
		if(this.state.distancesSubmit.length>0){
			let formData = new FormData();
			formData.append('unsortedlist',this.state.distancesSubmit);
			
			const init = {
	            method: 'POST',
	            body: formData
	        };
	        
	        fetch('http://localhost:8080/sortlist', init)
	        	.then((response) => response.json())
	            .then((responseJson) => {
	                this.setState({
	                	newDistances: responseJson,
	                	fresh:'1'
	                });
	            })
	            .catch(e => {console.log('error ${e}')});
	            
		}else{
			alert("please add values first!");
		}
	}
	
	render() {
		var style={
			color:'blue'
		};
		var newStyle = {
			color:'red'
		};
		return (
			<div>
				<div class="row">
				<div class="col-xs-2">
				<input class="form-control" placeholder="please enter your distance" onChange={(e)=>this.inputChange(e)} value={this.state.distance}/>
				</div>
				<div class="col-xs-3">
				<select class="form-control" value={this.state.unit} onChange={(e)=>this.handleSelected(e)}>
					{this.state.units.map(unit => (
						<option key={unit}>{unit}</option>
					))}
				</select>
				</div>
				</div>
				<div class="row">
				<button className="btn btn-primary btn-lg" onClick={(e)=>this.getInputValue(e)}>Add distances</button>
				&nbsp;
	            <button className="btn btn-primary btn-lg" onClick={this.fetchAction}>Sort distances</button>
	          	<table class="table">
	          		<tr><strong>unsorted list</strong></tr>
	          		{this.state.distances.map(distance => (
	          			<tr style={style} key={distance}>{distance}</tr>
	          		))}
				</table>
				<table class="table">
					<tr><strong>sorted list</strong></tr>
					{this.state.newDistances.map(newDistance => (
	          			<tr style={newStyle} key={newDistance}>{newDistance}</tr>
	          		))}
				</table>
				</div>
			</div>
		);
	};
}

ReactDOM.render(<App/>, document.getElementById('root'));
