import {MuiThemeProvider} from 'components';
import Bar from '../app_detail/Bar';
import KeyDialog from './KeyDialog';
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
            cur_coll: null,
            openKeyDialog: false 
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

    addKey(opt){
        let keys = this.state.cur_coll_obj.keys;
        keys.push(opt);

        let data = {
            keys: keys,
            collectionId: this.state.cur_coll
        };

        $.ajax({
            url: global.apiUrl + '/collection',
            type: 'put',
            data: data
        })
    }

    showKeyDialog(){
        this.setState({
            openKeyDialog: true
        });
    }

    closeKeyDialog(){
        this.setState({
            openKeyDialog: false 
        });
    }

    render(){
        let _id = this.props.appId;
        let {collections} = this.props;
        let {openKeyDialog, cur_coll_obj} = this.state;
        let self = this;

        return (
            <MuiThemeProvider>
                <div className="mod-detail-wrp">
                    <Bar   {...{appId: _id}} />

                    <Paper className="mod-detail-form clearfix">
                        <ListBar {...this.props} changeCur={this.changeCur.bind(this)} />
                        { cur_coll_obj ?
                        <div className="table-wrp">
                            <div className="title">
                                <span>{cur_coll_obj.name}</span>
                                <div className="add-key-btn" 
                                    onClick={self.showKeyDialog.bind(this)}>增加列</div>
                            </div>
                            <div className="table">
                                <div className="table-header">
                                    {
                                        cur_coll_obj.keyArr.map(function(item){
                                            return <span className="table-h-span" key={item} >{item}</span>
                                        })
                                    }
                                </div>
                            </div>
                        </div> : null
                        }
                    </Paper>
                    <KeyDialog 
                        open={openKeyDialog} 
                        handleClose={this.closeKeyDialog.bind(this)}
                        addKey={this.addKey.bind(this)}
                    />
                </div>
            </MuiThemeProvider>
        )
    }
}

let props = pageConfig.reactData.Detail;
ReactDOM.render(<Detail {...props} />, $('.mod-app')[0]);

