import React from 'react';

export default class AppList extends React.Component {

    constructor(props){
        super(props);

        this.state = {}
    }

    componentDidMount(){

    }

    render(){
        return (
            <div className="applist">{this.props.number}</div>
        );
    }
}
