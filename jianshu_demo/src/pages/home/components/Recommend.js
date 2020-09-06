import React,{PureComponent} from 'react'
import {RecommendWrapper, RecommendItem} from "../style";
import {connect} from "react-redux";

class Recommend extends PureComponent{
    render () {
        const {commendList} = this.props
        return (
            <RecommendWrapper>
                {
                    commendList.map((item)=>(
                        <RecommendItem imgUrl={item.get('imgUrl')} alt='none' key={item.get('id')}/>
                    ))
                }
            </RecommendWrapper>
        )
    }
}
const mapState = (state)=>{
    return {
        commendList: state.getIn(["home","commendList"])
    }
}
export default connect(mapState, null)(Recommend);
