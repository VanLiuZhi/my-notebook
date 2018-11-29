在通过ajax获取到数据需要赋值到data里面的时候，如果是不可变变量，可以直接赋值，但是如果是arrey，需要迭代每个值，加到data中。   Ajax.data.forEach(function(val, index){  vue.data.push(val) })。

vue:在html中传递 this  ，在vue中this都是指向vue的组件，如果我们想使用原本的this指向这个dom,需要这样使用dofunc($event)。在函数里面dofunc(v){ v.target   }   如果转换为jQuery 对象 $(v.target)  

vue:由于dom是由js去渲染的，所以你在渲染的时候去操作dom，是选不到的。这里涉及到了vue的生命周期的问题，实例创建完毕(挂载)，再去渲染dom。

vue:template不会渲染成元素，用div的话会被渲染成元素。把if,show,for等语句抽取出来放在template上面，把绑定的事件放在temlpate里面的元，可以使html结构更加清晰，还可以改善一个标签过长的情况。