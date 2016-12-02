import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import TextField from 'material-ui/TextField';
import {cyan500} from 'material-ui/styles/colors';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import './list.scss';

const muiTheme = getMuiTheme({
    palette: {
        textColor: cyan500,
    },
    appBar: {
        height: 50,
    },
});

class Item extends React.Component{

    constructor(props){
        super(props);

        this.state = {
        }
    }

    render(){
        let {name, _id} = this.props;
        return (
            <div className="appItem">
                <div className="item-con">
                    <div className="item-title">{name}</div>
                </div>
                <div className="item-foot">
                    <RaisedButton label="设置" href={"/app/" + _id} />
                </div>
            </div>
        )
    }
}

export default class AppList extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            appname: '',
            open: false
        }
    }

    componentDidMount(){

    }

    handleOpen () {
        this.setState({open: true});
    }

    handleClose () {
        if(this.state.appname){
            $.ajax({
                url: global.apiUrl + '/app',
                type: 'post',
                data: {
                    name: this.state.appname
                }
            })
            .done(json => {
                console.log(json);
            });
        }

        this.setState({
            appname: '',
            open: false
        });
    }

    changeName(e){
        this.setState({
            appname: e.target.value
        });
    }

    render(){
        let {appname} = this.state;
        let {apps} = this.props;
        const actions = [
          <FlatButton
            label="Submit"
            primary={true}
            onClick={this.handleClose.bind(this)}
          />,
        ];
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div className="mod-app-wrp">
                    <div className="applist clearfix">
                    {
                        apps.map(item =>{
                            return <Item {...item} />   
                        })
                    }
                    </div>
                    <RaisedButton label="创建" onClick={this.handleOpen.bind(this)} />
                    <Dialog
                      title="输入应用名称"
                      actions={actions}
                      modal={true}
                      //contentStyle={}
                      open={this.state.open}
                    >
                        <TextField onChange={this.changeName.bind(this)} value={appname}/>
                    </Dialog>
                </div>
            </MuiThemeProvider>
        );
    }
}

