import axios from 'axios'
import * as actionTypes from './actionTypes'
const changeHomeData = (result)=> ({
    type: actionTypes.CHANGE_HOME_DATA,
    topicList: result.topicList,
    articleList: result.articleList,
    commendList: result.commendList
})
const getMoreListData = (result ,page)=> ({
    type: actionTypes.GET_MORE_LIST_DATA,
    articleList: result.articleList,
    page
})
export const toggleTopShow = (show)=> ({
    type: actionTypes.TOGGLE_SCROLL_TOP,
    show
})

export const getHomeInfo = ()=>{
    return (dispatch)=>{
        axios.get('/api/homeData.json').then((res)=>{
            const result = res.data.data;
            dispatch(changeHomeData(result))
        })
    }
}
export const loadMore = (page)=>{
    return (dispatch)=>{
        axios.get('/api/homeList.json?page='+page).then((res)=>{
            const result = res.data.data;
            dispatch(getMoreListData(result, page));
//            dispatch(changeHomeData(result))
        })
    }
}
