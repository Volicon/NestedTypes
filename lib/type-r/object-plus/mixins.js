"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var tools_1 = require("./tools");
var Mixable = (function () {
    function Mixable() {
        this.initialize.apply(this, arguments);
    }
    Mixable.prototype.initialize = function () { };
    Mixable.create = function (a, b) {
        return new this(a, b);
    };
    Mixable.mixins = function () {
        var mixins = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            mixins[_i] = arguments[_i];
        }
        var proto = this.prototype, mergeRules = this._mixinRules || {}, _appliedMixins = this._appliedMixins = (this._appliedMixins || []).slice();
        for (var _a = 0, mixins_1 = mixins; _a < mixins_1.length; _a++) {
            var mixin = mixins_1[_a];
            if (mixin instanceof Array) {
                return Mixable.mixins.apply(this, mixin);
            }
            if (_appliedMixins.indexOf(mixin) >= 0)
                continue;
            _appliedMixins.push(mixin);
            if (typeof mixin === 'function') {
                tools_1.defaults(this, mixin);
                mergeProps(proto, mixin.prototype, mergeRules);
            }
            else {
                mergeProps(proto, mixin, mergeRules);
            }
        }
        return this;
    };
    Mixable.mixTo = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        for (var _a = 0, args_1 = args; _a < args_1.length; _a++) {
            var Ctor = args_1[_a];
            Mixable.mixins.call(Ctor, this);
        }
        return this;
    };
    Mixable.mixinRules = function (mixinRules) {
        var Base = Object.getPrototypeOf(this.prototype).constructor;
        if (Base._mixinRules) {
            mergeProps(mixinRules, Base._mixinRules);
        }
        this._mixinRules = mixinRules;
        return this;
    };
    Mixable.define = function (definition, staticProps) {
        if (definition === void 0) { definition = {}; }
        if (!this.define) {
            tools_1.log.error("[Class Defininition] Class must have class extensions to use @define decorator. Use '@extendable' before @define, or extend the base class with class extensions.", definition);
            return this;
        }
        this.predefine();
        var proto = this.prototype;
        var protoProps = tools_1.omit(definition, 'properties', 'mixins', 'mixinRules'), _a = definition.properties, properties = _a === void 0 ? {} : _a, mixins = definition.mixins, mixinRules = definition.mixinRules;
        tools_1.assign(proto, protoProps);
        tools_1.assign(this, staticProps);
        properties && Object.defineProperties(proto, tools_1.transform({}, properties, toPropertyDescriptor));
        mixinRules && this.mixinRules(mixinRules);
        mixins && this.mixins(mixins);
        return this;
    };
    Mixable.extend = function (spec, statics) {
        var Subclass;
        if (spec && spec.hasOwnProperty('constructor')) {
            Subclass = spec.constructor;
            __extends(Subclass, this);
        }
        else {
            Subclass = (function (_super) {
                __extends(_Subclass, _super);
                function _Subclass() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return _Subclass;
            }(this));
        }
        return spec ? Subclass.define(spec, statics) : Subclass.predefine();
    };
    Mixable.predefine = function () {
        var BaseClass = tools_1.getBaseClass(this);
        if (BaseClass.create === this.create) {
            this.create = Mixable.create;
        }
        this.__super__ = BaseClass.prototype;
        return this;
    };
    return Mixable;
}());
Mixable._mixinRules = { properties: 'merge' };
exports.Mixable = Mixable;
function toPropertyDescriptor(x) {
    if (x) {
        return typeof x === 'function' ? { get: x } : x;
    }
}
function mixinRules(rules) {
    return createDecorator('mixinRules', rules);
}
exports.mixinRules = mixinRules;
function mixins() {
    var list = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        list[_i] = arguments[_i];
    }
    return createDecorator('mixins', list);
}
exports.mixins = mixins;
function extendable(Type) {
    Mixable.mixTo(Type);
}
exports.extendable = extendable;
function predefine(Constructor) {
    Constructor.predefine();
}
exports.predefine = predefine;
function define(spec) {
    if (typeof spec === 'function') {
        spec.define({});
    }
    else {
        return createDecorator('define', spec);
    }
}
exports.define = define;
function createDecorator(name, spec) {
    return function (Ctor) {
        if (Ctor[name]) {
            Ctor[name](spec);
        }
        else {
            Mixable[name].call(Ctor, spec);
        }
    };
}
function mergeObjects(a, b, rules) {
    var x = tools_1.assign({}, a);
    return mergeProps(x, b, rules);
}
var mergeFunctions = {
    pipe: function (a, b) {
        return function (x) {
            return a.call(this, b.call(this, x));
        };
    },
    mergeSequence: function (a, b) {
        return function () {
            return tools_1.defaults(a.call(this), b.call(this));
        };
    },
    overwrite: function (a, b) {
        return b;
    },
    sequence: function (a, b) {
        return function () {
            a.apply(this, arguments);
            b.apply(this, arguments);
        };
    },
    reverse: function (a, b) {
        return function () {
            b.apply(this, arguments);
            a.apply(this, arguments);
        };
    },
    every: function (a, b) {
        return function () {
            return a.apply(this, arguments) && b.apply(this, arguments);
        };
    },
    some: function (a, b) {
        return function () {
            return a.apply(this, arguments) || b.apply(this, arguments);
        };
    }
};
function mergeProps(target, source, rules) {
    if (rules === void 0) { rules = {}; }
    for (var _i = 0, _a = Object.keys(source); _i < _a.length; _i++) {
        var name_1 = _a[_i];
        if (name_1 === 'constructor')
            continue;
        var sourceProp = Object.getOwnPropertyDescriptor(source, name_1), destProp = tools_1.getPropertyDescriptor(target, name_1), value = destProp && destProp.value;
        if (value != null) {
            var rule = rules[name_1];
            if (rule) {
                target[name_1] = typeof rule === 'object' ?
                    mergeObjects(value, sourceProp.value, rule) : (rule === 'merge' ?
                    mergeObjects(value, sourceProp.value) :
                    mergeFunctions[rule](value, sourceProp.value));
            }
        }
        else {
            Object.defineProperty(target, name_1, sourceProp);
        }
    }
    return target;
}
exports.mergeProps = mergeProps;
//# sourceMappingURL=mixins.js.map