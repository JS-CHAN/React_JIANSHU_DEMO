import React, {PureComponent} from 'react'
import {connect} from "react-redux";
import {LoginWrapper, LoginBox, Input, Button} from "./style";
import {actionCreators} from './store'
import {Redirect} from 'react-router-dom'

class Login extends PureComponent {

    render () {
        const {login, loginStatus} = this.props
        if (!loginStatus) {
            return (
                <LoginWrapper>
                    <LoginBox>
                        <Input placeholder="Account" ref={(input) => {
                            this.account = input
                        }}/>
                        <Input placeholder="Password" type='password' ref={(input) => {
                            this.password = input
                        }}/>
                        <Button onClick={() => login(this.account, this.password)}>Login</Button>
                    </LoginBox>
                </LoginWrapper>
            )
        } else {
            return (
                <Redirect to={'/'}/>
            )
        }
    }
}

const mapState = (state) => ({
    loginStatus: state.getIn(["login", "loginStatus"])
})

const mapDispatch = (dispatch) => ({
    login (account, password) {
        dispatch(actionCreators.login())
    }
})
export default connect(mapState, mapDispatch)(Login);
