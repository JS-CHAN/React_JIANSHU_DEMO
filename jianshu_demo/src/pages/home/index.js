import React,{PureComponent} from 'react'
import {HomeWrapper,HomeLeft,HomeRight} from "./style";
import List from './components/List'
import Topic from './components/Topic'
import Recommend from './components/Recommend'
import Writer from './components/Writer'
import banner from '../../static/banner.jpg'
import {connect} from "react-redux";
import {actionCreators} from './store'
import {BackToTop} from "./style";

class Home extends PureComponent{
    handleScrollTop(){
        window.scrollTo(0,0)
    }
    render () {
        const {showScroll} = this.props
        return (
            <HomeWrapper>
                <HomeLeft>
                    <img className="banner-pic" src={banner} alt="banner"/>
                    <Topic></Topic>
                    <List></List>
                </HomeLeft>
                <HomeRight>
                    <Recommend></Recommend>
                    <Writer></Writer>
                </HomeRight>
                {
                    showScroll?<BackToTop onClick={this.handleScrollTop}>Top</BackToTop>:null
                }
            </HomeWrapper>
        )
    }
    componentDidMount () {
        this.props.changeHomeData();
        this.bindEvents();
    }
    componentWillUnmount () {
        window.removeEventListener('scroll',this.props.changeScrollTopShow)
    }

    bindEvents(){
        window.addEventListener('scroll',this.props.changeScrollTopShow)
    }
}
const mapState = (state)=>{
    return {
        showScroll: state.getIn(["home","showScroll"])
    }
}
const mapDispatch = (dispatch)=>{
    return {
        changeHomeData(){
            dispatch(actionCreators.getHomeInfo())
        },
        changeScrollTopShow(){
            if(document.documentElement.scrollTop > 100){
                dispatch(actionCreators.toggleTopShow(true))
            }else {
                dispatch(actionCreators.toggleTopShow(false))
            }
        }
    }
}
export default connect(mapState,mapDispatch)(Home);
