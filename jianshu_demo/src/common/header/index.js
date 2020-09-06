import React,{PureComponent} from 'react'
import {CSSTransition} from "react-transition-group";
import {HeaderWrapper, Logo, Nav, NavItem, NavSearch, Addition, Button, SearchWrap, SearchInfo, SearchInfoTitle
    ,SearchInfoSwitch, SearchInfoItem, SearchInfoList
} from "./style";
import {connect} from "react-redux";
import {actionCreators} from './store'
import {Link} from "react-router-dom";
import {actionCreators as loginActionCreators} from '../../pages/login/store'

class Header extends PureComponent{
    getListArea(){
        const {focused, list, page, mouseIn, handleMouseEnter, handleMouseLeave, handleSwitch ,totalPage} = this.props;
        const newList = list.toJS();
        const pageList=[]
        if(newList.length){
            for (let i = (page - 1 ) * 10; i < page * 10 ; i++) {
                if(newList[i]){
                    pageList.push(<SearchInfoItem key={newList[i]}>{newList[i]}</SearchInfoItem>)
                }
            }
        }
        if(focused || mouseIn){
            return (
                <SearchInfo onMouseEnter = {handleMouseEnter} onMouseLeave = {handleMouseLeave}>
                    <SearchInfoTitle>
                        Hot Search
                        <SearchInfoSwitch onClick = {() => handleSwitch(page, totalPage, this.spinIcon)}><i ref={(icon)=>{this.spinIcon = icon}} className="iconfont spin">&#xe67e;</i>Switch</SearchInfoSwitch>
                    </SearchInfoTitle>
                    <SearchInfoList>
                        {
                            pageList
                        }
                    </SearchInfoList>
                </SearchInfo>
            )
        }else {
            return null;
        }
    }
    render () {
        const {focused, handleInputFocus, handleInputBlur, list, loginStatus, logout} = this.props
        return (
            <HeaderWrapper>
                <Link to='/'>
                    <Logo/>
                </Link>
                <Nav>
                    <NavItem className='left active'>首页</NavItem>
                    <NavItem className='left'>下载APP</NavItem>
                    {
                        loginStatus?<Link to={'/login'}><NavItem className='right' onClick={logout}>退出</NavItem></Link>:<Link to={'/login'}><NavItem className='right'>登陆</NavItem></Link>
                    }
                    <NavItem className='right'><i className="iconfont">&#xe6aa;</i></NavItem>
                    <SearchWrap>
                        <CSSTransition in={focused} timeout={200} classNames = "slide">
                            <NavSearch className={focused ? 'focused' : ''}
                                       onFocus = {()=>handleInputFocus(list)}
                                       onBlur = {handleInputBlur}
                            />
                        </CSSTransition>
                        <i className={focused ? 'focused iconfont zoom' : 'iconfont zoom'}>&#xe601;</i>
                        {this.getListArea(focused)}
                    </SearchWrap>
                </Nav>
                <Addition>
                    <Link to={'/writer'}>
                    <Button className='writing'><i className="iconfont">&#xe602;</i>写文章</Button>
                    </Link>
                    <Button className='reg'>注册</Button>
                </Addition>
            </HeaderWrapper>
        );
    }
}
const mapStateToProps =(state)=>{
    return {
        focused: state.get("header").get("focused"),
        list: state.getIn(["header","list"]),
        page: state.getIn(["header","page"]),
        totalPage: state.getIn(["header","totalPage"]),
        mouseIn: state.getIn(["header","mouseIn"]),
        loginStatus: state.getIn(["login","loginStatus"]),
    }
}
const mapDispatchToProps =(dispatch)=>{
    return {
        handleInputFocus(list){
            list.size === 0 && dispatch(actionCreators.getList())
            dispatch(actionCreators.searchFocus())
        },
        handleInputBlur(){
            dispatch(actionCreators.searchBlur())
        },
        handleMouseEnter(){
            dispatch(actionCreators.mouseEnter())
        },
        handleMouseLeave(){
            dispatch(actionCreators.mouseLeave())
        },
        handleSwitch(page, totalPage, spin){
            let originAngle = spin.style.transform.replace(/[^0-9]/ig, "");
            if(originAngle){
                originAngle = parseInt(originAngle, 10)
            }else {
                originAngle = 0;
            }
            spin.style.transform = 'rotate('+ (originAngle + 360) +'deg) ';
            if(page < totalPage){
                dispatch(actionCreators.handleSwitch(page + 1))
            }else{
                dispatch(actionCreators.handleSwitch(1))
            }
        },
        logout(){
            dispatch(loginActionCreators.logout())
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Header);
