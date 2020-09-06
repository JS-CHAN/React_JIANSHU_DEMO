import axios from 'axios'
import * as actionTypes from './actionTypes'

const changeLoginStatus = (loginStatus) => ({
    type: actionTypes.CHANGE_LOGIN_STATUS,
    loginStatus
})

export const login = ()=>{
    return (dispatch)=>{
        axios.get('/api/login.json').then((res)=>{
            const result = res.data
            dispatch(changeLoginStatus(result))
        })
    }
}
export const logout = ()=>({
   type:actionTypes.LOGOUT
})
