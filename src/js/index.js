import {add,mul} from './module1';
import {sum} from './module2';
import '../less/demo.less';
import MyImage from '../img/vue.png';

/*
* 当入口文件引入json文件的时候，由于webpack可以自动处理json文件，所以不用安装任何的loader或插件。
* 但是如果此时还是用 jshint这种语法检查工具，会报错，但不影响编译。
* 两种解决办法：
*     1.const json = require('json-loader!./file.json');-----仅限于webpack4使用。
*     2.新增一个loader配置项
* */


console.log(add(2,1));
console.log(add(100,100));
console.log(mul(3,3));
console.log(sum(1,2,3,4,5,6));
console.log(MyImage);
setTimeout(()=>{

},200);
