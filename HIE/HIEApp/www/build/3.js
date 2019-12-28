webpackJsonp([3],{

/***/ 852:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegisterPageModule", function() { return RegisterPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__register__ = __webpack_require__(950);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var RegisterPageModule = /** @class */ (function () {
    function RegisterPageModule() {
    }
    RegisterPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__register__["a" /* RegisterPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__register__["a" /* RegisterPage */]),
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_2__register__["a" /* RegisterPage */]
            ]
        })
    ], RegisterPageModule);
    return RegisterPageModule;
}());

//# sourceMappingURL=register.module.js.map

/***/ }),

/***/ 862:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(863));
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 863:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var forms_1 = __webpack_require__(23);
var validators_1 = __webpack_require__(864);
var ValidationManager = (function () {
    function ValidationManager(formValidations, displayError) {
        if (displayError === void 0) { displayError = ['invalid', 'dirty', 'submitted']; }
        var _this = this;
        this.displayError = displayError;
        this.controls = {};
        this.errors = {};
        this.submitted = false;
        this.children = {};
        this.formGroup = new forms_1.FormGroup({});
        this._fb = new forms_1.FormBuilder();
        for (var key in formValidations) {
            if (typeof formValidations[key] == 'string') {
                this.controls[key] = this.buildControl(key, formValidations[key]);
            }
            else if (formValidations[key] instanceof ValidationManager) {
                this.children[key] = formValidations[key];
                this.controls[key] = { control: formValidations[key].getForm(), messages: {} };
            }
            else if (formValidations[key] instanceof Array) {
                this.children[key] = [];
                var formArray = this._fb.array([]);
                for (var _i = 0, _a = formValidations[key]; _i < _a.length; _i++) {
                    var group = _a[_i];
                    if (group instanceof ValidationManager) {
                        formArray.push(group.getForm());
                        this.children[key].push(group);
                    }
                    else
                        formArray.push(new forms_1.FormControl(group));
                }
                this.controls[key] = { control: formArray, messages: {} };
            }
            else if (typeof formValidations[key] == 'object') {
                if (!formValidations[key].value)
                    formValidations[key].value = '';
                this.controls[key] = this.buildControl(key, formValidations[key].rules, formValidations[key].value);
            }
            this.formGroup.addControl(key, this.controls[key].control);
            this.errors[key] = '';
        }
        this.formGroup.valueChanges.subscribe(function (data) { return _this.onValueChanged(); });
    }
    ValidationManager.prototype.getForm = function () {
        return this.formGroup;
    };
    ValidationManager.prototype.getChildGroup = function (field, index) {
        if (index === void 0) { index = null; }
        if (index !== null)
            return this.children[field][index];
        return this.children[field];
    };
    ValidationManager.prototype.getChildren = function (field) {
        return this.children[field];
    };
    ValidationManager.prototype.addChildGroup = function (field, mgr) {
        if (this.formGroup.controls[field] && this.formGroup.controls[field] instanceof forms_1.FormArray) {
            var control = this.formGroup.controls[field];
            if (mgr instanceof ValidationManager) {
                control.push(mgr.getForm());
                this.children[field].push(mgr);
            }
            else
                control.push(new forms_1.FormControl(mgr));
            return control.length - 1;
        }
        else {
            this.children[field] = mgr;
            this.formGroup.addControl(field, mgr.getForm());
            return -1;
        }
    };
    ValidationManager.prototype.removeChildGroup = function (field, index) {
        if (index === void 0) { index = null; }
        if (!this.formGroup.controls[field]) {
            return;
        }
        if (index !== null) {
            var control = this.formGroup.controls[field];
            control.removeAt(index);
            this.children[field].splice(index, 1);
        }
        else {
            this.formGroup.removeControl(field);
            delete this.children[field];
        }
    };
    ValidationManager.prototype.isValid = function () {
        this.submitted = true;
        this.__setOnChild('submitted', true);
        this.onValueChanged();
        return !this.formGroup.invalid;
    };
    ValidationManager.prototype.hasError = function (field) {
        return this.errors[field] ? true : false;
    };
    ValidationManager.prototype.getError = function (field) {
        return this.errors[field];
    };
    ValidationManager.prototype.getErrors = function () {
        for (var child in this.children) {
            if (this.children[child] instanceof Array) {
                this.errors[child] = {};
                for (var subChild in this.children[child])
                    this.errors[child][subChild] = this.children[child][subChild].errors;
            }
            else
                this.errors[child] = this.children[child].errors;
        }
        return this.errors;
    };
    ValidationManager.prototype.reset = function () {
        this.submitted = false;
        this.formGroup.reset();
        this.__setOnChild('submitted', false);
        for (var fld in this.children) {
            for (var _i = 0, _a = this.children[fld]; _i < _a.length; _i++) {
                var child = _a[_i];
                child.formGroup.reset();
            }
        }
    };
    ValidationManager.prototype.onValueChanged = function (displayError) {
        if (displayError === void 0) { displayError = null; }
        if (!this.formGroup) {
            return;
        }
        var form = this.formGroup;
        var _loop_1 = function (field) {
            var control = form.get(field);
            this_1.errors[field] = '';
            if (displayError == null)
                displayError = this_1.displayError;
            if (control && displayError.length && (displayError.every(function (element) {
                return (element == "submitted") ? true : control[element];
            }) || this_1.submitted)) {
                for (var rule in control.errors) {
                    this_1.errors[field] = this_1.getErrorMessage(field, rule);
                }
            }
        };
        var this_1 = this;
        for (var field in this.errors) {
            _loop_1(field);
        }
        this.__callOnChild('onValueChanged');
    };
    ValidationManager.prototype.setValue = function (values, value) {
        if (value === void 0) { value = null; }
        console.log(typeof values, values);
        if (typeof values === "string") {
            var control = this.formGroup.get(values);
            if (!control || control instanceof forms_1.FormArray) {
                return;
            }
            if (value !== null) {
                this.formGroup.get(values).setValue(value.toString());
                this.formGroup.get(values).markAsTouched();
                this.formGroup.get(values).markAsDirty();
            }
        }
        if (typeof values === "object") {
            for (var key in values) {
                if (this.formGroup.get(key)) {
                    this.setValue(key, values[key]);
                }
            }
        }
    };
    ValidationManager.prototype.getValue = function (controlKey) {
        return this.formGroup.value[controlKey];
    };
    ValidationManager.prototype.getData = function () {
        return this.formGroup.value;
    };
    ValidationManager.prototype.getControl = function (controlName) {
        if (!this.formGroup.controls[controlName])
            return;
        return this.formGroup.controls[controlName];
    };
    ValidationManager.prototype.buildControl = function (name, rules, value) {
        var _this = this;
        if (value === void 0) { value = null; }
        var controlRules = [];
        var messages = {};
        rules = rules.replace(/pattern:(\/.+\/)(\|?)/, function (a, b, c) {
            return 'pattern:' + btoa(b) + c;
        });
        rules.split('|').forEach(function (rule) {
            if (rule) {
                var rule_spilted = rule.split(':');
                var rule_name = rule_spilted[0];
                var rule_vars = [];
                if (rule_spilted[1])
                    rule_vars = rule_spilted[1].split(',');
                if (!validators_1.Validators[rule_name])
                    throw new TypeError('Validation rule [' + rule_name + '] does not exists.');
                if (rule_vars.length > 1)
                    controlRules.push(validators_1.Validators[rule_name](rule_vars));
                else if (rule_vars.length == 1) {
                    if (rule_name == 'pattern' && isBase64(rule_vars[0]))
                        rule_vars[0] = atob(rule_vars[0]).slice(1, -1);
                    controlRules.push(validators_1.Validators[rule_name](rule_vars[0]));
                }
                else
                    controlRules.push(validators_1.Validators[rule_name]);
                messages[rule_name.toLowerCase()] = _this.buildMessage(name, rule_name, rule_vars);
            }
        });
        var formControl = new forms_1.FormControl(value, controlRules);
        return { control: formControl, messages: messages };
    };
    ValidationManager.prototype.getErrorMessage = function (field, rule) {
        if (!this.controls[field].messages[rule.toLowerCase()])
            throw Error('Message not found inside the control:' + field + ' message:' + rule.toLowerCase());
        return this.controls[field].messages[rule.toLowerCase()];
    };
    ValidationManager.prototype.setErrorMessage = function (field, rule, message) {
        if (this.controls[field].messages[rule.toLowerCase()])
            this.controls[field].messages[rule.toLowerCase()] = message;
    };
    ValidationManager.prototype.buildMessage = function (name, rule, arg) {
        if (arg === void 0) { arg = []; }
        if (!this.getMessage(rule))
            throw Error('Validation message is missing for: ' + rule);
        var message = this.getMessage(rule);
        message = message.replace(/%n/g, ucFirst(name)).replace(/_/g, ' ');
        if (arg.length) {
            arg.forEach(function (arg, key) {
                message = message.replace('%' + key, arg);
            });
        }
        return message;
    };
    ValidationManager.prototype.getMessage = function (rule) {
        return exports.VALIDATION_MESSAGES[rule.toLowerCase()];
    };
    ValidationManager.prototype.__callOnChild = function (funct) {
        for (var fld in this.children) {
            if (this.children[fld] instanceof Array) {
                for (var _i = 0, _a = this.children[fld]; _i < _a.length; _i++) {
                    var child = _a[_i];
                    child[funct].apply(child, Array.prototype.slice.call(arguments, 1));
                }
            }
            else {
                this.children[fld][funct].apply(this.children[fld], Array.prototype.slice.call(arguments, 1));
            }
        }
    };
    ValidationManager.prototype.__setOnChild = function (field, value) {
        for (var fld in this.children) {
            if (this.children[fld] instanceof Array) {
                for (var _i = 0, _a = this.children[fld]; _i < _a.length; _i++) {
                    var child = _a[_i];
                    child[field] = value;
                }
            }
            else {
                this.children[fld][field] = value;
            }
        }
    };
    return ValidationManager;
}());
exports.ValidationManager = ValidationManager;
exports.VALIDATION_MESSAGES = {
    'required': '%n is required',
    'minlength': '%n must be at least %0 characters long.',
    'maxlength': '%n cannot be more than %0 characters long.',
    'alpha': '%n accepts only alphabetic characters.',
    'alphaspace': '%n accepts only alphabetic characters and space.',
    'alphanum': '%n accepts only alphabetic characters and numbers.',
    'alphanumspace': '%n accepts only alphabetic characters, numbers and space.',
    'url': '%n is not valid url.',
    'number': '%n is not valid number.',
    'digits': '%n is not valid number.',
    'creditcard': '%n is not valid credit card.',
    'range': '%n must be between %0 and %1.',
    'rangelength': '%n must be between %0 and %1.',
    'max': '%n must be equal or lower then %0',
    'min': '%n must be equal or higher then %0',
    'email': '%n is not valid email.',
    'date': '%n is not valid date.',
    'mindate': 'The minimum date allowed in %n is %0',
    'maxdate': 'The maximum date allowed in %n is %0',
    'dateiso': '%n is not valid ISO date[yyyy-mm-dd].',
    'equal': '%n should be equal to %0',
    'equalto': '%n must be equal to %0',
    'json': '%n is not valid json.',
    'pattern': '%n does not match the pattern.',
    'count': '%n must count %0'
};
function ucFirst(str) {
    var firstLetter = str.substr(0, 1);
    return firstLetter.toUpperCase() + str.substr(1);
}
function isBase64(str) {
    try {
        return btoa(atob(str)) == str;
    }
    catch (err) {
        return false;
    }
}
//# sourceMappingURL=validation-manager.js.map

/***/ }),

/***/ 864:
/***/ (function(module, exports, __webpack_require__) {

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
var forms_1 = __webpack_require__(23);
var Validators = (function (_super) {
    __extends(Validators, _super);
    function Validators() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Validators.alpha = function (control) {
        if (isPresent(Validators.required(control)))
            return null;
        var v = control.value;
        return /^[A-Za-z]+$/.test(v) ? null : { 'alpha': true };
    };
    Validators.alphaSpace = function (control) {
        if (isPresent(Validators.required(control)))
            return null;
        var v = control.value;
        return /^[A-Za-z ]+$/.test(v) ? null : { 'alphaSpace': true };
    };
    Validators.alphaNum = function (control) {
        if (isPresent(Validators.required(control)))
            return null;
        var v = control.value;
        return /^[A-Za-z0-9]+$/.test(v) ? null : { 'alphaNum': true };
    };
    Validators.alphaNumSpace = function (control) {
        if (isPresent(Validators.required(control)))
            return null;
        var v = control.value;
        return /^[A-Za-z0-9 ]+$/.test(v) ? null : { 'alphaNumSpace': true };
    };
    Validators.requiredWith = function (field) {
        return function (control) {
            if (!control['_parent'])
                return null;
            var controlRequired = control['_parent'].controls[field];
            return controlRequired.value ? null : { 'requiredWith': true };
        };
    };
    Validators.requiredWithout = function (field) {
        return function (control) {
            if (!control['_parent'])
                return null;
            var controlRequired = control['_parent'].controls[field];
            return controlRequired.value ? { 'requiredWithout': true } : null;
        };
    };
    Validators.rangeLength = function (rangeLength) {
        return function (control) {
            if (isPresent(Validators.required(control)))
                return null;
            var v = control.value;
            return v.length >= rangeLength[0] && v.length <= rangeLength[1] ? null : { 'rangeLength': true };
        };
    };
    Validators.count = function (len) {
        return function (control) {
            if (isPresent(Validators.required(control)))
                return null;
            var v = control.value;
            return v.length == len ? null : { 'count': true };
        };
    };
    Validators.min = function (min) {
        return function (control) {
            if (isPresent(Validators.required(control)))
                return null;
            var v = control.value;
            return v >= parseFloat(min) ? null : { 'min': true };
        };
    };
    Validators.max = function (max) {
        return function (control) {
            if (isPresent(Validators.required(control)))
                return null;
            var v = control.value;
            return v <= parseFloat(max) ? null : { 'max': true };
        };
    };
    Validators.range = function (range) {
        return function (control) {
            if (isPresent(Validators.required(control)))
                return null;
            var v = control.value;
            return v >= range[0] && v <= range[1] ? null : { 'range': true };
        };
    };
    Validators.digits = function (control) {
        if (isPresent(Validators.required(control)))
            return null;
        var v = control.value;
        return /^\d+$/.test(v) ? null : { 'digits': true };
    };
    Validators.number = function (control) {
        if (isPresent(Validators.required(control)))
            return null;
        var v = control.value;
        return /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(v) ? null : { 'number': true };
    };
    Validators.url = function (control) {
        if (isPresent(Validators.required(control)))
            return null;
        var v = control.value;
        return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(v) ? null : { 'url': true };
    };
    Validators.email = function (control) {
        if (isPresent(Validators.required(control)))
            return null;
        var v = control.value;
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) ? null : { 'email': true };
    };
    Validators.date = function (control) {
        if (isPresent(Validators.required(control)))
            return null;
        var v = control.value;
        return !/Invalid|NaN/.test(new Date(v).toString()) ? null : { 'date': true };
    };
    Validators.minDate = function (minDate) {
        if (!isDate(minDate))
            throw Error('minDate value must be a formatted date');
        return function (control) {
            if (isPresent(Validators.required(control)))
                return null;
            var d = new Date(control.value);
            if (!isDate(d))
                return { minDate: true };
            return d >= new Date(minDate) ? null : { minDate: true };
        };
    };
    Validators.maxDate = function (maxDate) {
        if (!isDate(maxDate))
            throw Error('maxDate value must be a formatted date');
        return function (control) {
            if (isPresent(Validators.required(control)))
                return null;
            var d = new Date(control.value);
            if (!isDate(d))
                return { maxDate: true };
            return d <= new Date(maxDate) ? null : { maxDate: true };
        };
    };
    Validators.dateISO = function (control) {
        if (isPresent(Validators.required(control)))
            return null;
        var v = control.value;
        return /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(v) ? null : { 'dateISO': true };
    };
    Validators.creditCard = function (control) {
        if (isPresent(Validators.required(control)))
            return null;
        var v = control.value;
        var sanitized = v.replace(/[^0-9]+/g, '');
        if (!(/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/.test(sanitized))) {
            return { 'creditCard': true };
        }
        var sum = 0;
        var digit;
        var tmpNum;
        var shouldDouble;
        for (var i = sanitized.length - 1; i >= 0; i--) {
            digit = sanitized.substring(i, (i + 1));
            tmpNum = parseInt(digit, 10);
            if (shouldDouble) {
                tmpNum *= 2;
                if (tmpNum >= 10) {
                    sum += ((tmpNum % 10) + 1);
                }
                else {
                    sum += tmpNum;
                }
            }
            else {
                sum += tmpNum;
            }
            shouldDouble = !shouldDouble;
        }
        if (Boolean((sum % 10) === 0 ? sanitized : false)) {
            return null;
        }
        return { 'creditCard': true };
    };
    Validators.json = function (control) {
        if (isPresent(Validators.required(control)))
            return null;
        var v = control.value;
        try {
            var obj = JSON.parse(v);
            if (Boolean(obj) && typeof obj === 'object') {
                return null;
            }
        }
        catch (e) {
        }
        return { 'json': true };
    };
    Validators.base64 = function (control) {
        if (isPresent(Validators.required(control)))
            return null;
        var v = control.value;
        return /^(?:[A-Z0-9+\/]{4})*(?:[A-Z0-9+\/]{2}==|[A-Z0-9+\/]{3}=|[A-Z0-9+\/]{4})$/i.test(v) ? null : { 'base64': true };
    };
    Validators.phone = function (locale) {
        var phones = {
            'zh-CN': /^(\+?0?86\-?)?((13\d|14[57]|15[^4,\D]|17[678]|18\d)\d{8}|170[059]\d{7})$/,
            'zh-TW': /^(\+?886\-?|0)?9\d{8}$/,
            'en-ZA': /^(\+?27|0)\d{9}$/,
            'en-AU': /^(\+?61|0)4\d{8}$/,
            'en-HK': /^(\+?852\-?)?[569]\d{3}\-?\d{4}$/,
            'fr-FR': /^(\+?33|0)[67]\d{8}$/,
            'de-DE': /^(\+?49|0)[1-9]\d{10}$/,
            'pt-PT': /^(\+351)?9[1236]\d{7}$/,
            'el-GR': /^(\+?30)?(69\d{8})$/,
            'en-GB': /^(\+?44|0)7\d{9}$/,
            'en-US': /^(\+?1)?[2-9]\d{2}[2-9](?!11)\d{6}$/,
            'en-ZM': /^(\+26)?09[567]\d{7}$/,
            'ru-RU': /^(\+?7|8)?9\d{9}$/,
            'nb-NO': /^(\+?47)?[49]\d{7}$/,
            'nn-NO': /^(\+?47)?[49]\d{7}$/,
            'vi-VN': /^(0|\+?84)?((1(2([0-9])|6([2-9])|88|99))|(9((?!5)[0-9])))([0-9]{7})$/,
            'en-NZ': /^(\+?64|0)2\d{7,9}$/,
            'hu-HU': /^(?:\+?(?:36|\(36\)))[ -\/]?(?:(?:(?:(?!1|20|21|30|31|70|90)[2-9][0-9])[ -\/]?\d{3}[ -\/]?\d{3})|(?:(?:1|20|21|30|31|70|90)[ -\/]?\d{3}[ -\/]?\d{2}[ -\/]?\d{2}))$/,
            'nl-NL': /^(^\+[0-9]{2}|^\+[0-9]{2}\(0\)|^\(\+[0-9]{2}\)\(0\)|^00[0-9]{2}|^0)([0-9]{9}$|[0-9\-\s]{10}$)$/
        };
        return function (control) {
            if (isPresent(Validators.required(control)))
                return null;
            var v = control.value;
            var pattern = phones[locale] || phones['en-US'];
            return (new RegExp(pattern)).test(v) ? null : { 'phone': true };
        };
    };
    Validators.uuid = function (version) {
        var uuid = {
            '3': /^[0-9A-F]{8}-[0-9A-F]{4}-3[0-9A-F]{3}-[0-9A-F]{4}-[0-9A-F]{12}$/i,
            '4': /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
            '5': /^[0-9A-F]{8}-[0-9A-F]{4}-5[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
            'all': /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i
        };
        return function (control) {
            if (isPresent(Validators.required(control)))
                return null;
            var v = control.value;
            var pattern = uuid[version] || uuid.all;
            return (new RegExp(pattern)).test(v) ? null : { 'uuid': true };
        };
    };
    Validators.equal = function (val) {
        return function (control) {
            if (isPresent(Validators.required(control)))
                return null;
            var v = control.value;
            return val === v ? null : { equal: true };
        };
    };
    Validators.equalTo = function (equalControlName) {
        return function (control) {
            if (!control['_parent'])
                return null;
            if (!control['_parent'].controls[equalControlName])
                throw new TypeError('Form Control ' + equalControlName + ' does not exists.');
            var controlMatch = control['_parent'].controls[equalControlName];
            return controlMatch.value == control.value ? null : { 'equalTo': true };
        };
    };
    return Validators;
}(forms_1.Validators));
exports.Validators = Validators;
function isPresent(obj) {
    return obj !== undefined && obj !== null;
}
exports.isPresent = isPresent;
function isDate(obj) {
    return !/Invalid|NaN/.test(new Date(obj).toString());
}
exports.isDate = isDate;
//# sourceMappingURL=validators.js.map

/***/ }),

/***/ 950:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_api_service__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__login_login__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_properties__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ng2_validation_manager__ = __webpack_require__(862);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ng2_validation_manager___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_ng2_validation_manager__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




//import { FormBuilder, FormGroup, Validators } from '@angular/forms';




var RegisterPage = /** @class */ (function () {
    function RegisterPage(navCtrl, oAPIService, oStorage, viewCtrl, oBuilder, alertCtrl) {
        // this.oInputForm = oBuilder.group({
        //   NAME: ['', Validators.compose([Validators.maxLength(V.Name_Max), Validators.minLength(V.Name_Min), Validators.pattern(V.Name)])],
        //   EMAIL: ['', Validators.compose([Validators.maxLength(V.Email_Max), Validators.minLength(V.Email_Min), Validators.pattern(V.Email)])],
        //   PASSWORD: ['', Validators.compose([Validators.maxLength(V.Password_Max), Validators.minLength(V.Password_Min), Validators.pattern(V.Password)])],
        //   MOBILE: ['', Validators.compose([Validators.maxLength(V.Phone_Max), Validators.minLength(V.Phone_Min)])],
        //   ADDRESS: ['', Validators.compose([Validators.maxLength(V.Address_Max), Validators.pattern(V.Address)])]
        // });
        this.navCtrl = navCtrl;
        this.oAPIService = oAPIService;
        this.oStorage = oStorage;
        this.viewCtrl = viewCtrl;
        this.oBuilder = oBuilder;
        this.alertCtrl = alertCtrl;
        this.oForm = new __WEBPACK_IMPORTED_MODULE_7_ng2_validation_manager__["ValidationManager"]({
            'NAME': 'required|rangeLength:' + __WEBPACK_IMPORTED_MODULE_6__app_properties__["b" /* V */].Name_Min + "," + __WEBPACK_IMPORTED_MODULE_6__app_properties__["b" /* V */].Name_Max + '|pattern:' + __WEBPACK_IMPORTED_MODULE_6__app_properties__["b" /* V */].Name,
            'EMAIL': 'required|rangeLength:' + __WEBPACK_IMPORTED_MODULE_6__app_properties__["b" /* V */].Email_Min + "," + __WEBPACK_IMPORTED_MODULE_6__app_properties__["b" /* V */].Email_Max + '|pattern:' + __WEBPACK_IMPORTED_MODULE_6__app_properties__["b" /* V */].Email,
            'PASSWORD': 'required|rangeLength:6'
                // + V.Password_Min 
                + "," + __WEBPACK_IMPORTED_MODULE_6__app_properties__["b" /* V */].Password_Max + '|pattern:' + __WEBPACK_IMPORTED_MODULE_6__app_properties__["b" /* V */].Password,
            'MOBILE': 'required|rangeLength:' + __WEBPACK_IMPORTED_MODULE_6__app_properties__["b" /* V */].Phone_Min + "," + __WEBPACK_IMPORTED_MODULE_6__app_properties__["b" /* V */].Phone_Max,
            'ADDRESS': ''
        });
        this.oInputForm = this.oForm.getForm();
    }
    RegisterPage.prototype.onCreate = function (formData) {
        var _this = this;
        if (formData.ADDRESS === null)
            formData.ADDRESS = ' ';
        this.oAPIService.send2ServerP("register", true, formData).then(function (data) {
            {
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__login_login__["a" /* LoginPage */]).then(function () {
                    _this.navCtrl.remove(_this.viewCtrl.index);
                });
            }
        });
    };
    RegisterPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-register',template:/*ion-inline-start:"/Users/krisprojects/HIEv2/HIE/HIEApp/src/pages/register/register.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-title>Create account</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <div class="ksd-spacer-top"></div>\n  <form [formGroup]=\'oInputForm\'>\n    <ion-list class="ksd-list-padding">\n      <ion-row class="ksd-spacer">\n        <ion-col col-3>\n          <ion-label>Name</ion-label>\n        </ion-col>\n        <ion-col col-9>\n          <ion-input required class="ksd-left-padding" required formControlName="NAME" type=\'text\'>\n          </ion-input>\n        </ion-col>\n      </ion-row>\n      <ion-item-divider></ion-item-divider>\n      <ion-row class="ksd-spacer">\n        <ion-col col-3>\n          <ion-label>Email</ion-label>\n        </ion-col>\n        <ion-col>\n          <ion-input class="ksd-left-padding" formControlName="EMAIL" type=\'text\'>\n          </ion-input>\n        </ion-col>\n      </ion-row>\n      <ion-item-divider></ion-item-divider>\n      <ion-row class="ksd-spacer">\n        <ion-col col-3>\n          <ion-label>Password</ion-label>\n        </ion-col>\n        <ion-col>\n          <ion-input class="ksd-left-padding" formControlName="PASSWORD" type=\'password\'>\n          </ion-input>\n        </ion-col>\n      </ion-row>\n      <ion-item-divider></ion-item-divider>\n      <ion-row class="ksd-spacer">\n        <ion-col col-3>\n          <ion-label>Mobile</ion-label>\n        </ion-col>\n        <ion-col>\n          <ion-input class="ksd-left-padding" formControlName="MOBILE" type=\'phone\'>\n          </ion-input>\n        </ion-col>\n      </ion-row>\n      <ion-item-divider></ion-item-divider>\n      <ion-row class="ksd-spacer">\n        <ion-col col-3>\n          <ion-label>Address</ion-label>\n        </ion-col>\n        <ion-col>\n          <ion-textarea class="ksd-left-padding" class="ksd-address" formControlName="ADDRESS"></ion-textarea>\n        </ion-col>\n      </ion-row>\n      <ion-item-divider></ion-item-divider>\n    </ion-list>\n    <ion-item no-lines>\n      <button ion-button block class="ksd-login" (click)="onCreate(oInputForm.value)" [disabled]="!oInputForm.valid">Create</button>\n    </ion-item>\n    <div class="ksd-err">\n      <div *ngIf="oForm.hasError(\'NAME\')" class="alert alert-danger">\n        {{oForm.getError(\'NAME\')}}\n      </div>\n      <div *ngIf="oForm.hasError(\'EMAIL\')" class="alert alert-danger">\n        {{oForm.getError(\'EMAIL\')}}\n      </div>\n      <div *ngIf="oForm.hasError(\'PASSWORD\')" class="alert alert-danger">\n        {{oForm.getError(\'PASSWORD\')}}\n      </div>\n      <div *ngIf="oForm.hasError(\'MOBILE\')" class="alert alert-danger">\n        {{oForm.getError(\'MOBILE\')}}\n      </div>\n      <!-- <div *ngIf="oForm.hasError(\'ADDRESS\')" class="alert alert-danger">\n        {{oForm.getError(\'ADDRESS\')}}\n      </div> -->\n    </div>\n    <div class="ksd-spacer"></div>\n    <!--<button ion-button full (click)="onCreate()" class="ksd-create" [disabled]="!oInputForm.valid">Create</button>-->\n    <div text-center no-padding class="ksd-or">\n      or\n    </div>\n    <div class="ksd-spacer-1"></div>\n    <ion-item no-lines>\n      <button icon-left ion-button clear outline class="ksd-fb-button" full (click)="fbLogin()">\n        <ion-icon class="ksd-icon" name="logo-facebook">\n          <span class="ksd-fb-login-text"> Sign in using facebook</span>\n        </ion-icon>\n      </button>\n    </ion-item>\n    <div>\n      <p text-center class="ksd-terms">By pressing sign up you agree with the Terms of Service and Privacy Policy.\n      </p>\n    </div>\n    <!--<ion-item no-lines>\n      <button icon-left ion-button clear outline class="ksd-fb-button" full (click)="fbLogin()">\n      <ion-icon class="ksd-icon" name="logo-facebook"><span class="ksd-fb-login-text"> Sign in using facebook</span></ion-icon>\n      </button>\n    </ion-item>-->\n  </form>\n</ion-content>'/*ion-inline-end:"/Users/krisprojects/HIEv2/HIE/HIEApp/src/pages/register/register.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_2__providers_api_service__["a" /* APIService */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["ViewController"],
            __WEBPACK_IMPORTED_MODULE_4__angular_forms__["FormBuilder"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["AlertController"]])
    ], RegisterPage);
    return RegisterPage;
}());

//# sourceMappingURL=register.js.map

/***/ })

});
//# sourceMappingURL=3.js.map