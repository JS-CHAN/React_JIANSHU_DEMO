import React, {PureComponent} from 'react'
import {ListItem, ListInfo, LoadMore} from "../style";
import {connect} from "react-redux";
import {actionCreators } from '../store'
import {Link} from "react-router-dom";

class List extends PureComponent {
    render () {
        const {articleList, loadMore, page} = this.props;
        return (
            <div>
                {
                    articleList.map((item,index) => (
                        <Link key={index} to={'/detail/'+item.get("id")} >
                            <ListItem>
                                <img className='pic' src={item.get("imgUrl")} alt="none"/>
                                <ListInfo>
                                    <h3 className='title'>{item.get("title")}</h3>
                                    <p className='desc'>{item.get("desc")}</p>
                                </ListInfo>
                            </ListItem>
                        </Link>
                        )
                    )
                }
                <LoadMore onClick={()=>loadMore(page)}>Load More</LoadMore>
            </div>
        )
    }
}

const mapState = (state) => {
    return {
        articleList: state.getIn(["home", "articleList"]),
        page: state.getIn(["home", "nextPage"])
    }
}
const mapDispatch = (dispatch) => {
    return {
        loadMore(page){
            dispatch(actionCreators.loadMore(page + 1))
        }
    }
}
export default connect(mapState, mapDispatch)(List);
