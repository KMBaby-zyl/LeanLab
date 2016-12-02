import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';

const style = {
    display: 'inline-block',
    position: 'absolute',      
    top: '50px',
    left: '50px',
};

export default class Bar extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            appId: props.appId
        }
    }
    shouldComponentUpdate(){
        return false
    }


    render(){
        let {appId} = this.state;
        return (
            <Paper style={style}>
             <Menu>
                <MenuItem href={"/app/" + appId} primaryText="基本信息" />
                <MenuItem href={"/app/" + appId + "/data"} primaryText="数据存储" />
              </Menu>
            </Paper>
        )
    }
}
