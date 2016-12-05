import {MuiThemeProvider} from 'components';
import Bar from '../app_detail/Bar';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import './index.scss';

class ListBar extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            new_coll: '',
            cur_coll: null,
            cur_coll_obj: null 
        }
    }

    addCollection(){
        $.ajax({
            url: global.apiUrl + '/collection',
            type: 'post',
            data: {
                name: this.state.new_coll,
                appId: this.props.appId
            }
        })
    }
    
    changeNewColl(e){
        this.setState({
            new_coll: e.target.value
        });
    }

    render(){
        let self = this;
        let {collections} = this.props;
        let {new_coll} = this.state;

        return (
            <div className="coll-list">
            {
                collections.map(function(item, index){
                    return <div className="coll-item" key={index}
                                onClick={()=>self.props.changeCur(item._id)} >
                                {item.name}
                        </div>
                })
            }
            <div className="add-coll-wrp clearfix">
                <input className="new-coll-input" 
                    onChange={this.changeNewColl.bind(this)} value={new_coll} />
                <RaisedButton className="new-coll-btn" 
                    onClick={this.addCollection.bind(this)}>add + </RaisedButton>
            </div>
            </div>
        );
    }
}

class Detail extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            cur_coll: null
        }
    }

    changeCur(collectionId){
        let obj = this.props.collections.filter(function(item){
            return  item._id === collectionId
        });

        this.setState({
            cur_coll: collectionId,
            cur_coll_obj: obj.length && obj[0] 
        });
    }

    render(){
        let _id = this.props.appId;
        let {collections} = this.props;
        let {cur_coll_obj} = this.state;

        return (
            <MuiThemeProvider>
                <div className="mod-detail-wrp">
                    <Bar   {...{appId: _id}} />

                    <Paper className="mod-detail-form clearfix">
                        <ListBar {...this.props} changeCur={this.changeCur.bind(this)} />
                        { cur_coll_obj ?
                        <div className="table-wrp">
                            <div className="title">{cur_coll_obj.name}</div>
                            <div className="table">
                                <div className="table-header"></div>
                            </div>
                        </div> : null
                        }
                    </Paper>
                </div>
            </MuiThemeProvider>
        )
    }
}

let props = pageConfig.reactData.Detail;
ReactDOM.render(<Detail {...props} />, $('.mod-app')[0]);

