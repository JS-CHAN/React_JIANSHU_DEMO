import {fromJS} from "immutable";
import * as actionTypes from './actionTypes'

const defaultState = fromJS({
    topicList: [],
    articleList: [],
    commendList:[],
    nextPage:1,
    showScroll: false
})

const changeHomeData = (state, action) =>{
    return state.merge(
        {
            topicList: fromJS(action.topicList),
            articleList: fromJS(action.articleList),
            commendList: fromJS(action.commendList)
        }
    )
}
const getMoreListData = (state, action) =>{
    return state.merge(
        {
            articleList: state.get('articleList').concat(fromJS(action.articleList)),
            nextPage: action.page
        }
    )
}

export default (state=defaultState,action)=>{
    switch (action.type) {
        case actionTypes.CHANGE_HOME_DATA:
            return changeHomeData(state, action)
        case actionTypes.GET_MORE_LIST_DATA:
            return getMoreListData(state, action)
        case actionTypes.TOGGLE_SCROLL_TOP:
            return state.merge(
                {
                    showScroll: action.show
                }
            )
        default:
            return state;
    }
}

