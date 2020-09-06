import React, {PureComponent} from 'react'
import {connect} from "react-redux";
import {Redirect} from 'react-router-dom'

class Writer extends PureComponent {

    render () {
        const {loginStatus} = this.props
        if (loginStatus) {
            return (
                <div>Writer</div>
            )
        } else {
            return (
                <Redirect to={'/login'}/>
            )
        }
    }
}

const mapState = (state) => ({
    loginStatus: state.getIn(["login", "loginStatus"])
})

export default connect(mapState, null)(Writer);
