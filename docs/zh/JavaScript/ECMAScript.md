# ECMAScript6

## 扩展运算符（ spread ）

是三个点（...）。它好比 rest 参数的逆运算，将一个数组转为用逗号分隔的参数序列。

```js
console.log(...[1, 2, 3])
// 1 2 3
console.log(1, ...[2, 3, 4], 5)
// 1 2 3 4 5
[...document.querySelectorAll('div')]
```

## 箭头函数

```js
  const Person = {
    'name': 'little bear',
    'age': 18,
    'sayHello': function () {
      setInterval(function () {
        console.log('我叫' + this.Person + '我今年' + this.age + '岁!')
      }, 1000)
    }
  }
  Person.sayHello()
```

基础语法

- (参数1, 参数2, …, 参数N) => {函数声明}
- (参数1, 参数2, …, 参数N) => 表达式（单一）

相当于：(参数1, 参数2, …, 参数N) =>{ return表达式}

1. 当只有一个参数时，圆括号是可选的：
- (单一参数) => {函数声明}
- 单一参数 => {函数声明}

2. 没有参数的函数应该写成一对圆括号。
- () => {函数声明}

在上面的代码里面，谁调用，this指向谁，所以this指向的是setInterval, 就是window（因为setInterval）是window就注入的函数。 所以在setInterval 上一行，我们可以var self = this此时的this是sayHello 由Person来调用，这样才能得到我们想要的结果。

箭头函数最大特点： 不绑定this  不绑定arguments

## 继承

理解继承的机制

```js
function DOG(name){
this.name = name
}
```

这个函数我们称为构造函数，js通过对构造函数使用new 关键字创建实例（构造函数相当于Class），这样我们就从原型对象生产了一个实例对象。

1. 共有属性：

- 这样创建的实例没有共有属性，于是通过为构造函数设置prototype属性，来让从这个构造函数创建的实例都有共有属性。
- 这个属性包含一个对象（以下简称"prototype对象"），所有实例对象需要共享的属性和方法，都放在这个对象里面；那些不需要共享的属性和方法，就放在构造函数里面。

实例对象一旦创建，将自动引用prototype对象的属性和方法。也就是说，实例对象的属性和方法，分成两种，一种是本地的，另一种是引用的。

这个prototype是大家共同引用的，修改它会影响实例。


2. constructor：

通过构造函数创建的实例，访问这个属性就可以知道实例的构造函数是谁。

`cat1 instanceof Cat` 判断实例cat1是否是通过构造函数Cat来的，类似python的isinstance。

```
6.1 isPrototypeOf()

这个方法用来判断，某个proptotype对象和某个实例之间的关系。

　　alert(Cat.prototype.isPrototypeOf(cat1)); //true

　　alert(Cat.prototype.isPrototypeOf(cat2)); //true

6.2 hasOwnProperty()

每个实例对象都有一个hasOwnProperty()方法，用来判断某一个属性到底是本地属性，还是继承自prototype对象的属性。

　　alert(cat1.hasOwnProperty("name")); // true

　　alert(cat1.hasOwnProperty("type")); // false
```

```
prototype constructor
__proto__
```

3. 普通对象

- 最普通的对象：有__proto__属性（指向其原型链），没有prototype属性。
- 原型对象(person.prototype 原型对象还有constructor属性（指向构造函数对象）)。

4. 函数对象：
- 凡是通过new Function()创建的都是函数对象。
- 拥有__proto__、prototype属性（指向原型对象）。
- Function、Object、Array、Date、String、自定义函数。

特例： Function.prototype(是原型对象，却是函数对象，下面会有解释)

4. 如何判断是什么对象 typeof 对象

其实原型对象就是构造函数的一个实例对象。person.prototype就是person的一个实例对象。相当于在person创建的时候，自动创建了一个它的实例，并且把这个实例赋值给了prototype。

## 早绑定和晚绑定

所谓绑定（binding），即把对象的接口与对象实例结合在一起的方法。

早绑定（early binding）是指在实例化对象之前定义它的属性和方法，这样编译器或解释程序就能够提前转换机器代码。在 Java 和 Visual Basic 这样的语言中，有了早绑定，就可以在开发环境中使用 IntelliSense（即给开发者提供对象中属性和方法列表的功能）。ECMAScript 不是强类型语言，所以不支持早绑定。

另一方面，晚绑定（late binding）指的是编译器或解释程序在运行前，不知道对象的类型。使用晚绑定，无需检查对象的类型，只需检查对象是否支持属性和方法即可。ECMAScript 中的所有变量都采用晚绑定方法。这样就允许执行大量的对象操作，而无任何惩罚。