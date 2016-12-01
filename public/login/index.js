import './index.scss';
import LinkedStateMixin from 'react-addons-linked-state-mixin';
import reactMixin from 'react-mixin';

class Login extends React.Component {

    constructor(props){
        super(props);

        this.state = {}
    }

    componentDidMount(){

    }

    create(){
        let self = this;
        $.ajax({
            url: global.apiUrl + '/user',
            type: 'post',
            data: {
                name: self.state.name,
                pwd: self.state.pwd
            }
        })
        .done(json => {
            self.login();
        });
    }

    login(){
        let self = this;
        $.ajax({
            url: global.apiUrl + '/user/login',
            type: 'post',
            data: {
                name: self.state.name,
                pwd: self.state.pwd
            }
        })
        .done(json => {
            location.href = '/app';
        });
    }

    render(){
        return (
            <div className="login-form">
                <div className="input-group">
                    <span className="input-group-addon">账号</span>
                    <input type="text" className="form-control" placeholder="Username" valueLink={this.linkState('name')}/>
                </div>
                <div className="input-group">
                    <span className="input-group-addon">密码</span>
                    <input type="text" className="form-control" placeholder="password" valueLink={this.linkState('pwd')}/>
                </div>
                <button type="button" className="btn btn-primary"
                   onClick={this.login.bind(this)} >登录</button>
                <button type="button" className="btn btn-primary"
                   onClick={this.create.bind(this)} >创建并登录</button>
            </div>
        );
    }
}

reactMixin.onClass(Login, LinkedStateMixin);



ReactDOM.render(<Login />, $('.mod-login')[0]);
