import {MuiThemeProvider} from 'components';
import Bar from './Bar';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import './index.scss';

class Detail extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            appname: props.app.name
        }
    }

    changeName(e){
        this.setState({
            appname: e.target.value
        });
    }

    update(){
        $.ajax({
            url: global.apiUrl + '/app',
            type: 'put',
            data: {
                name: this.state.appname,
                _id: this.props.app._id
            }
        })
        .done(json => {
            alert('修改成功');
        });
    }

    render(){
        let {_id, appId, appKey} = this.props.app;
        let {appname} = this.state;

        return (
            <MuiThemeProvider>
                <div className="mod-detail-wrp">
                    <Bar {...{appId: _id}} />

                    <Paper className="mod-detail-form">
                        <label>应用名称</label>
                        <TextField value={appname} 
                                    onChange={this.changeName.bind(this)} />
                        <br />
                        <label>APPID</label>
                        <TextField value={appId} 
                                    disabled={true}/>
                        <br />
                        <label>APPKey</label>
                        <TextField value={appKey} 
                                    disabled={true}/>
                     
                        <br />
                        <RaisedButton label="更新" onClick={this.update.bind(this)} />
                    </Paper>
                </div>
            </MuiThemeProvider>
        )
    }
}

let props = pageConfig.reactData.Detail;
ReactDOM.render(<Detail {...props} />, $('.mod-app')[0]);

