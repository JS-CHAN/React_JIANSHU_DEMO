import React,{PureComponent} from 'react'
import {TopicWrapper, TopicItem} from "../style";
import {connect} from "react-redux";

class Topic extends PureComponent{
    render () {
        const {topicList} = this.props;
        return (
            <TopicWrapper>
                {
                    topicList.map((item)=>(
                            <TopicItem key={item.get('id')}>
                                <img  className='topic-pic' src={item.get('imgUrl')} alt="topic"/>
                                {item.get('topicName')}
                            </TopicItem>
                    ))
                }
            </TopicWrapper>
        )
    }
}
const mapStateToProps = (state)=>{
    return{
        topicList: state.getIn(["home","topicList"])
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {}

}
export default connect(mapStateToProps,mapDispatchToProps)(Topic);
