import {add,mul} from './module1';
import {sum} from './module2';
import data from '../json/data.json';
import '../less/demo.less'


console.log(add(2,3));
console.log(add(100,100));
console.log(mul(3,3));
console.log(sum(1,2,3,4,5,6));

console.log(data,typeof data)