!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e(t.proxyIO={})}(this,function(t){"use strict";function i(i,u,c,s){return new(c||(c=Promise))(function(t,e){function n(t){try{o(s.next(t))}catch(t){e(t)}}function r(t){try{o(s.throw(t))}catch(t){e(t)}}function o(e){e.done?t(e.value):new c(function(t){t(e.value)}).then(n,r)}o((s=s.apply(i,u||[])).next())})}function u(n,r){var o,i,u,t,c={label:0,sent:function(){if(1&u[0])throw u[1];return u[1]},trys:[],ops:[]};return t={next:e(0),throw:e(1),return:e(2)},"function"==typeof Symbol&&(t[Symbol.iterator]=function(){return this}),t;function e(e){return function(t){return function(e){if(o)throw new TypeError("Generator is already executing.");for(;c;)try{if(o=1,i&&(u=2&e[0]?i.return:e[0]?i.throw||((u=i.return)&&u.call(i),0):i.next)&&!(u=u.call(i,e[1])).done)return u;switch(i=0,u&&(e=[2&e[0],u.value]),e[0]){case 0:case 1:u=e;break;case 4:return c.label++,{value:e[1],done:!1};case 5:c.label++,i=e[1],e=[0];continue;case 7:e=c.ops.pop(),c.trys.pop();continue;default:if(!(u=0<(u=c.trys).length&&u[u.length-1])&&(6===e[0]||2===e[0])){c=0;continue}if(3===e[0]&&(!u||e[1]>u[0]&&e[1]<u[3])){c.label=e[1];break}if(6===e[0]&&c.label<u[1]){c.label=u[1],u=e;break}if(u&&c.label<u[2]){c.label=u[2],c.ops.push(e);break}u[2]&&c.ops.pop(),c.trys.pop();continue}e=r.call(n,c)}catch(t){e=[6,t],i=0}finally{o=u=0}if(5&e[0])throw e[1];return{value:e[0]?e[1]:void 0,done:!0}}([e,t])}}}var e=function(){function t(t){var e=this;this.Record=t;var n=Object.getPrototypeOf(this.endpoint);Object.keys(n).forEach(function(t){e[t]||"function"!=typeof n[t]||(e[t]=function(){return n[t].apply(this.endpoint,arguments)})})}return Object.defineProperty(t.prototype,"endpoint",{get:function(){return this.Record.prototype._endpoint},enumerable:!0,configurable:!0}),t.prototype.subscribe=function(e,n){return i(this,void 0,void 0,function(){return u(this,function(t){return[2,this.endpoint.subscribe(e,n)]})})},t.prototype.unsubscribe=function(t,e){this.endpoint.unsubscribe(t,e)},t.prototype.list=function(n){return i(this,void 0,void 0,function(){var e;return u(this,function(t){switch(t.label){case 0:return[4,(e=new this.Record.Collection).fetch(n)];case 1:return t.sent(),[2,e.toJSON()]}})})},t.prototype.update=function(n,r,o){return i(this,void 0,void 0,function(){var e;return u(this,function(t){switch(t.label){case 0:return r.id=n,[4,(e=new this.Record(r,{parse:!0})).save(o)];case 1:return t.sent(),[2,{_cas:e._cas}]}})})},t.prototype.create=function(n,r){return i(this,void 0,void 0,function(){var e;return u(this,function(t){switch(t.label){case 0:return[4,(e=new this.Record(n,{parse:!0})).save(r)];case 1:return t.sent(),[2,{id:e.id,_cas:e._cas,_type:e._type}]}})})},t.prototype.read=function(n,r){return i(this,void 0,void 0,function(){var e;return u(this,function(t){switch(t.label){case 0:return[4,(e=new this.Record({id:n})).fetch(r)];case 1:return t.sent(),[2,e.toJSON()]}})})},t.prototype.destroy=function(e,n){return i(this,void 0,void 0,function(){return u(this,function(t){switch(t.label){case 0:return[4,this.endpoint.destroy(e,n)];case 1:return t.sent(),[2,{}]}})})},t}();t.proxyIO=function(t){return new e(t)},t.ProxyEndpoint=e,Object.defineProperty(t,"__esModule",{value:!0})});
//# sourceMappingURL=index.js.map