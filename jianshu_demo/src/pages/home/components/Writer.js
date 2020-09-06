import React,{PureComponent} from 'react'
import {WriterWrapper, WriterAuthor} from "../style";

class Writer extends PureComponent{
    render () {
        return (
            <WriterWrapper>
                <WriterAuthor>
                    <div className='title'></div>
                    <div className='list'></div>
                </WriterAuthor>
            </WriterWrapper>
        )
    }
}
export default Writer;
