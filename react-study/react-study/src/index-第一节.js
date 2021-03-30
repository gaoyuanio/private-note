import React from 'react'
import ReactDOM from 'react-dom'

/**
 * 元素是react虚拟DOM元素
 * 它其实是一个普通的JS对象，它描述了界面上你想看到的内容
 */

//jsx编译creatElement是在webpack编译的时候，也就是打包的时候执行的
//打包后的代码在浏览器里执行的时候，会执行函数，返回一个js对象
// let element2 = React.createElement("h1", {
//     id: "title"
// }, "hello world");
// console.log(element2)

// let style = {
//     color: 'red',
//     backgroundColor: 'green'
// }
// let element1 = <h1 id = "title"
// className = "title"
// htmlFor = "inputTitle"
// style = {
//     style
// } > hello world </h1>


/**
 * 3.JSX其实也是一个对象，可以在if和for语句中使用JSX
 * 可以把JSX赋值给变量，还可以作为方法的参数，作为方法返回值
 */
// function greeting(name) {
//     if (name) {
//         return <h1> hello, {
//             name
//         } </h1>
//     } else {
//         return <h1> hello, Stranger </h1>
//     }
// }

// const element = greeting('gaoyuan')

let names = ['张三', '李四', '王五'];
let elements = names.map((name,index)=>(<p key={index}>{name}</p>));

//reander方法会负责把虚拟DOM变成真实DOM插入到容器里
ReactDOM.render(<div>{elements}</div>, document.getElementById('root'))
// ReactDOM.render(<h1>hello</h1>,document.getElementById('root'))