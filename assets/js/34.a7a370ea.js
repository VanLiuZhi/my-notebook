(window.webpackJsonp=window.webpackJsonp||[]).push([[34],{485:function(t,n,i){"use strict";i.r(n);var e=i(1),s=Object(e.a)({},function(){var t=this.$createElement,n=this._self._c||t;return n("div",{staticClass:"content"},[n("h1",{attrs:{id:"javascript-相关设计"}},[this._v("JavaScript 相关设计")]),this._v(" "),n("h2",{attrs:{id:"自定义遮蔽罩"}},[this._v("自定义遮蔽罩")]),this._v(" "),n("p",[this._v("使用了jQuery-WeUI，需要根据情况做调整")]),this._v(" "),n("highlight-code",{attrs:{lang:"html"}},[n("pre",[n("code",[this._v('\x3c!--自定义遮罩层--\x3e\n<div id="bg" class="weui-mask weui-mask--visible"\n    style="display: none;opacity: 1;visibility: visible;z-index: 100">\n</div>\n\n\x3c!-- 简单示例 --\x3e\n<!DOCTYPE html>\n<html>\n\n<head>\n    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>\n    <title>html 最简遮罩层</title>\n    <script type="text/javascript">\n        function showDiv() {\n            document.getElementById(\'popDiv\').style.display = \'block\';\n            document.getElementById(\'bg\').style.display = \'block\';\n        }\n\n        function closeDiv() {\n            document.getElementById(\'popDiv\').style.display = \'none\';\n            document.getElementById(\'bg\').style.display = \'none\';\n        }\n    <\/script>\n</head>\n\n<body>\n<div id="popDiv"\n    style="z-index:99;display:none;position:absolute;margin-top: 20%;margin-left: 40%;background-color: #FFF;">html\n    最简遮罩层<br/>html 最简遮罩层<br/>\n    <a href="javascript:closeDiv()">关闭遮罩层</a>\n</div>\n<div id="bg"\n    style="display:none;background-color: #ccc;width: 100%;position:absolute;height: 100%;opacity: 0.5;z-index: 1;"></div>\n<div style="padding-top: 10%;padding-left:40%;z-index:1;">\n    <input type="Submit" name="" value="打开遮罩层" onclick="javascript:showDiv()"/>\n</div>\n</body>\n\n</html>\n')])])])],1)},[],!1,null,null,null);s.options.__file="README.md";n.default=s.exports}}]);