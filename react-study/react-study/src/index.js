import React from 'react'
import ReactDOM from 'react-dom'

/**
 * 5.1 函数（定义的）组件
 * React元素不仅可以是DOM标签，还可以是用户自定义的组件
 * 1.自定组件的名称必须是首字母大写的 原生组件消协开头 ，自定义组件打斜字母开头的
 * 2.组件必须使用前先定义
 * 3.组件需要返回并且只能返回一个根元素
 */
function FunctionComponet(props) {
    return (
        <div className="title" style={{color:'red',backgroundColor:'#fafafa'}}>
            <span>{props.name}</span>{props.children}
        </div>
    )
}

ReactDOM.render((
    <FunctionComponet name = "gaoyuan">
        <span>hello</span>
    </FunctionComponet>
), document.getElementById('root'))