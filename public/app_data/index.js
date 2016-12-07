import {MuiThemeProvider} from 'components';
import Bar from '../app_detail/Bar';
import KeyDialog from './KeyDialog';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import './index.scss';

const styles = {
    deleteBtn: {
        'backgroundColor': 'none',
        'minWidth': '40px',
        'borderRight': '1px solid #aaa'
    }
}

class ListBar extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            new_coll: '',
            cur_coll: null,
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
                                onClick={()=>self.props.changeCur(item._id, index)} >
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
            cur_index: null,
            openKeyDialog: false,
            collections: props.collections
        }
    }

    changeCur(collectionId, index){
        this.setState({
            cur_coll: collectionId,
            cur_index: index,
        });
    }

    addKey(opt){
        let self = this;
        let {collections, cur_index, cur_coll} = this.state;

        let curObj = this.getCurObj();
        let keys = curObj.keys;
        keys.push(opt);

        let data = {
            keys: keys,
            collectionId: cur_coll
        };

        $.ajax({
            url: global.apiUrl + '/collection',
            type: 'put',
            data: data
        })
        .done(json=>{
            let c = collections.slice(0);
            c[cur_index].keys = keys;
            c[cur_index].keyArr.splice(1, 0, opt.name);

            self.setState({
                collections: c
            });
        });
    }

    deleteKey(index){
        let self = this;
        let {collections, cur_index, cur_coll} = this.state;

        let curObj = this.getCurObj();
        let keys = curObj.keys;
        keys.splice(index - 1, 1);


        let data = {
            keys: keys,
            collectionId: cur_coll
        };

        $.ajax({
            url: global.apiUrl + '/collection',
            type: 'put',
            data: data,
        })
        .done(json=>{
            let c = collections.slice(0);
            c[cur_index].keys = keys;
            c[cur_index].keyArr.splice(index, 1);

            self.setState({
                collections: c
            });
        });
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

    getCurObj(){
        let {cur_coll, collections} = this.state;
        let r = collections.filter( item => {
            return item._id === cur_coll
        });

        if( r && r[0] ) return r[0];

        return null;
    }
    render(){
        let _id = this.props.appId;
        let {collections} = this.state;
        let {openKeyDialog, cur_coll} = this.state;
        let self = this;
        let cur_coll_obj = self.getCurObj();

        console.log(cur_coll_obj);

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
                                        cur_coll_obj.keyArr.map(function(item, index){
                                            let len = cur_coll_obj.keyArr.length;
                                            let canD = false;
                                            if( index > 0 && (index + 3) < len ){
                                                canD = true;
                                            }
                                            return [
                                                    <span className="table-h-span" key={item} >{item}</span>,
                                                    canD ? <RaisedButton  
                                                        style={styles.deleteBtn}
                                                        onClick={self.deleteKey.bind(self, index)}>删除</RaisedButton> : null
                                                    ]
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

