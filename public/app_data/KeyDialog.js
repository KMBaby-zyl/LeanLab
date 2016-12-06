import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Checkbox from 'material-ui/Checkbox';

let styles = {
    select: {
        "display": "block",
        "paddingTop": "1px"
    }
};

export default class KeyDialog extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            open: props.open,
            type: 'String',
            keyname: '',
            required: false,
            ifOnlyRead: false
        }
    }

    componentWillReceiveProps(nextProps){
        if( nextProps.open != this.state.open) {
            this.setState({
                open: nextProps.open,
            });
        }
    }

    changeType(e, index, val){
        this.setState({
            type: val
        });
    }

    changeName(e, val){
        this.setState({
            keyname: val
        });
    }
    
    handleConfirm(){
        let {keyname, type, required, ifOnlyRead} = this.state;
        this.props.addKey({
            name: keyname,
            type: type,
            required: required,
            ifOnlyRead: ifOnlyRead
        });
    }

    changeRequired(e, val){
        this.setState({
            ifOnlyRead: val
        })
    }

    changeRead(e, val){
        this.setState({
            required: val
        })
    }

    render(){
        let {handleClose} = this.props;
        let {keyname} = this.state;

        const actions = [
            <FlatButton
                label="取消"
                primary={true}
                onTouchTap={()=>handleClose()}
            />,
            <FlatButton
                label="确认"
                primary={true}
                onTouchTap={this.handleConfirm.bind(this)}
            />,
        ];

        return (
            <div>
                <Dialog
                  actions={actions}
                  modal={false}
                  open={this.state.open}
                  onRequestClose={()=>handleClose()}
                >
                    <TextField
                        floatingLabelText="字段名"
                        name="name" 
                        onChange={this.changeName.bind(this)}
                        value={keyname}/>
                    <SelectField
                        name="type"
                        style={styles.select}
                        floatingLabelText={"字段类型"}
                        value={this.state.type}
                        onChange={this.changeType.bind(this)}
                        autoWidth={true}
                    >
                        <MenuItem value={'String'} primaryText="String" />
                        <MenuItem value={'Object'} primaryText="Object" />
                        <MenuItem value={'Number'} primaryText="Number" />
                        <MenuItem value={'Date'} primaryText="Date" />
                        <MenuItem value={'Boolean'} primaryText="Boolean" />
                        <MenuItem value={'Array'} primaryText="Array" />
                    </SelectField>
                    <Checkbox
                        label="只读"
                        onCheck={this.changeRead.bind(this)}
                        style={styles.checkbox}
                    />
                    <Checkbox
                        label="必填"
                        onCheck={this.changeRequired.bind(this)}
                        style={styles.checkbox}
                    />
                </Dialog>
            </div>
        );
    }
}
