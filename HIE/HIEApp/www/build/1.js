webpackJsonp([1],{

/***/ 846:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MerchantProfilePageModule", function() { return MerchantProfilePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__merchant_profile__ = __webpack_require__(943);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_list_cuisines_list_cuisines_module__ = __webpack_require__(944);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';





var MerchantProfilePageModule = /** @class */ (function () {
    function MerchantProfilePageModule() {
    }
    MerchantProfilePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__merchant_profile__["a" /* MerchantProfilePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__merchant_profile__["a" /* MerchantProfilePage */]),
                __WEBPACK_IMPORTED_MODULE_3__components_list_cuisines_list_cuisines_module__["a" /* ListCuisinesComponentModule */]
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_2__merchant_profile__["a" /* MerchantProfilePage */]
            ],
            schemas: [__WEBPACK_IMPORTED_MODULE_0__angular_core__["CUSTOM_ELEMENTS_SCHEMA"]]
        })
    ], MerchantProfilePageModule);
    return MerchantProfilePageModule;
}());

//# sourceMappingURL=merchant-profile.module.js.map

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

/***/ 943:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MerchantProfilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_api_service__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_properties__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ng2_validation_manager__ = __webpack_require__(862);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ng2_validation_manager___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_ng2_validation_manager__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



//  import { FormBuilder, FormGroup, Validators } from
'@angular/forms';
//import { LoginService } from '../../providers/login-service';

//import { LoadingController, ToastController } from "ionic-angular";
//import { LoadingController } from "ionic-angular";



var MerchantProfilePage = /** @class */ (function () {
    function MerchantProfilePage(zone, navCtrl, navParams, oBuilder
    //, private readonly oLoginService: LoginService
    , oAPIService, oEvents, alert
    //    private readonly loadingCtrl: LoadingController,
    //  private readonly toastCtrl: ToastController
    ) {
        this.zone = zone;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.oBuilder = oBuilder;
        this.oAPIService = oAPIService;
        this.oEvents = oEvents;
        this.alert = alert;
        this.oItem = {};
        this.bLoaded = false;
        this.bIsFormValid = true;
        //    Global_Variables.sCurrentPage = 'Profile';
        this.fetchItems();
    }
    MerchantProfilePage.prototype.fetchItems = function () {
        var _this = this;
        this.bLoaded = false;
        this.oAPIService.send2ServerP("profile").then(function (data) {
            _this.oItem = data.result[0];
            //      console.log(this.oItem);
            // this.oInputForm = this.oBuilder.group({
            //   NAME: [this.oItem.NAME, Validators.compose([Validators.maxLength(V.Name_Max), Validators.minLength(V.Name_Min), Validators.pattern(V.Name)])],
            //   LOCATION: [this.oItem.LOCATION, Validators.compose([Validators.required])],
            //   FOOD_TYPE: [this.oItem.FOOD_TYPE, Validators.compose([Validators.required])],
            //   EMAIL: [this.oItem.EMAIL, Validators.compose([Validators.maxLength(V.Email_Max), Validators.minLength(V.Email_Min), Validators.pattern(V.Email)])],
            //   PASSWORD: [{value: this.oItem.PASSWORD, disabled:true}, Validators.compose([Validators.maxLength(V.Password_Max), Validators.minLength(V.Password_Min), Validators.pattern(V.Password)])],
            //   MOBILE: [this.oItem.MOBILE, Validators.compose([Validators.maxLength(V.Phone_Max), Validators.minLength(V.Phone_Min)])],
            //   OUTLET_PHONE: [this.oItem.OUTLET_PHONE, Validators.compose([Validators.maxLength(V.Phone_Max), Validators.minLength(V.Phone_Min)])],
            //   ADDRESS: [this.oItem.ADDRESS, Validators.compose([Validators.maxLength(V.Address_Max), Validators.pattern(V.Address)])]
            // });
            _this.oForm = new __WEBPACK_IMPORTED_MODULE_5_ng2_validation_manager__["ValidationManager"]({
                'NAME': 'required|rangeLength:' + __WEBPACK_IMPORTED_MODULE_4__app_properties__["b" /* V */].Name_Min + "," + __WEBPACK_IMPORTED_MODULE_4__app_properties__["b" /* V */].Name_Max + '|pattern:' + __WEBPACK_IMPORTED_MODULE_4__app_properties__["b" /* V */].Name,
                'LOCATION': 'required',
                'FOOD_TYPE': 'required',
                'EMAIL': 'required|email',
                //        'EMAIL': 'required|rangeLength:' + V.Email_Min + "," + V.Email_Max + '|pattern:' + V.Email,
                'PASSWORD': 'required|rangeLength:' + __WEBPACK_IMPORTED_MODULE_4__app_properties__["b" /* V */].Password_Min + "," + __WEBPACK_IMPORTED_MODULE_4__app_properties__["b" /* V */].Password_Max + '|pattern:' + __WEBPACK_IMPORTED_MODULE_4__app_properties__["b" /* V */].Password,
                'MOBILE': 'required|rangeLength:' + __WEBPACK_IMPORTED_MODULE_4__app_properties__["b" /* V */].Phone_Min + "," + __WEBPACK_IMPORTED_MODULE_4__app_properties__["b" /* V */].Phone_Max,
                'OUTLET_PHONE': 'required|rangeLength:' + __WEBPACK_IMPORTED_MODULE_4__app_properties__["b" /* V */].Phone_Min + "," + __WEBPACK_IMPORTED_MODULE_4__app_properties__["b" /* V */].Phone_Max,
                'ADDRESS': ''
                //rangeLength:' + 0 + "," + V.Address_Max + '|pattern:' + V.Address,
            });
            _this.oForm.setValue('NAME', _this.oItem.NAME);
            _this.oForm.setValue('EMAIL', _this.oItem.EMAIL);
            _this.oForm.setValue('LOCATION', _this.oItem.LOCATION);
            _this.oForm.setValue('FOOD_TYPE', _this.oItem.FOOD_TYPE);
            _this.oForm.setValue('PASSWORD', _this.oItem.PASSWORD);
            _this.oForm.setValue('MOBILE', _this.oItem.MOBILE);
            _this.oForm.setValue('OUTLET_PHONE', _this.oItem.OUTLET_PHONE);
            _this.oForm.setValue('ADDRESS', _this.oItem.ADDRESS);
            //      this.oForm.setErrorMessage('MOBILE', 'maxlength', 'must be 8 digits') ;
            //      this.oForm.setErrorMessage('OUTLET_PHONE', 'maxlength', 'must be 8 digits') ;
            _this.oInputForm = _this.oForm.getForm();
            _this.bLoaded = true;
        });
    };
    MerchantProfilePage.prototype.ionViewWillEnter = function () {
        __WEBPACK_IMPORTED_MODULE_4__app_properties__["a" /* Global_Variables */].sCurrentPage = 'Profile';
    };
    MerchantProfilePage.prototype.ionViewDidEnter = function () {
        var _this = this;
        __WEBPACK_IMPORTED_MODULE_4__app_properties__["a" /* Global_Variables */].sCurrentPage = 'Profile';
        this.fetchItems();
        this.oEvents.subscribe("Cuisines", function (data) {
            _this.zone.run(function () {
                _this.oInputForm.value.FOOD_TYPE = data;
                _this.isFormValid();
            });
        });
    };
    // ionViewDidEnter() {
    //   Global_Variables.sCurrentPage = 'Profile';
    // }
    MerchantProfilePage.prototype.ionViewWillLeave = function () {
        this.oEvents.unsubscribe("Cuisines");
        this.bLoaded = false;
    };
    MerchantProfilePage.prototype.onSave = function (formData) {
        var _this = this;
        console.log(JSON.stringify(formData));
        var s = formData.FOOD_TYPE;
        if (s.length == 0) {
            var alert_1 = this.alert.create({
                title: 'Error',
                subTitle: 'Please select Food Type',
                buttons: ['OK']
            });
            alert_1.present();
            console.log("No Food Type Selected");
            return;
        }
        formData.CUISINES = s.replace("'", "");
        formData.CUISINES = formData.CUISINES.replace("'", "");
        formData.CUISINES = formData.CUISINES.replace("'", "");
        formData.CUISINES = formData.CUISINES.replace("'", "");
        formData.CUISINES = formData.CUISINES.replace("'", "");
        formData.CUISINES = formData.CUISINES.replace("'", "");
        formData.CUISINES = formData.CUISINES.replace("'", "");
        this.oAPIService.send2ServerP("profile/update", true, formData).then(function (data) {
            //      console.log(JSON.stringify(data));
            var alert = _this.alert.create({
                title: 'Profile',
                subTitle: 'Saved successfully.',
                buttons: ['OK']
            });
            alert.present();
        });
    };
    MerchantProfilePage.prototype.onChangePassword = function () {
        this.navCtrl.push('ChangePasswordPage', { 'Item': this.oItem });
    };
    MerchantProfilePage.prototype.isFormValid = function () {
        this.bIsFormValid = !("" == this.oInputForm.value.FOOD_TYPE);
    };
    MerchantProfilePage.prototype.getCuisines = function () {
        return this.oItem.FOOD_TYPE;
    };
    MerchantProfilePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-merchant-profile',template:/*ion-inline-start:"/Users/krisprojects/HIEv2/HIE/HIEApp/src/pages/merchant-profile/merchant-profile.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-buttons left>\n      <button ion-button icon-only menuToggle>\n        <ion-icon name="hie-menu"></ion-icon>\n      </button>\n    </ion-buttons>\n    <ion-title>Profile</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content padding>\n  <!-- <ion-grid no-padding>\n    <ion-item no-lines no-padding>\n      <select-region></select-region>\n    </ion-item>\n    <div class="ksd-field-spacer"></div>\n    <ion-item class="ksd-select" no-lines no-padding>\n      <select-cuisine [current]="getCuisines()"></select-cuisine>\n    </ion-item>\n  </ion-grid> -->\n\n  <div *ngIf="bLoaded">\n    <div class="ksd-spacer"></div>\n    <!-- <ion-item style="display:none" class="ksd-select" no-lines no-padding>\n      <list-cuisines [current]="getCuisines()"></list-cuisines>\n    </ion-item> -->\n\n    <form [formGroup]="oInputForm" (ngSubmit)="onSave(oInputForm.value)">\n      <ion-row>\n        <ion-col>\n          <ion-item no-padding>\n            <ion-label floating>Name</ion-label>\n            <ion-input formControlName="NAME" minlength="3" maxlenth="25" type="text"></ion-input>\n          </ion-item>\n          <div class="ksd-field-spacer"></div>\n          <ion-item no-padding>\n            <ion-label floating>Location</ion-label>\n            <ion-select read-only formControlName="LOCATION">\n              <ion-option value="North" checked="true">North</ion-option>\n              <ion-option value="East">East</ion-option>\n              <ion-option value="West">West</ion-option>\n              <ion-option value="South">South</ion-option>\n            </ion-select>\n\n            <!--<ion-input text-justify formControlName="LOCATION" type="text"></ion-input>\n            <p text-right>Change</p>-->\n          </ion-item>\n          <!-- <div class="ksd-field-spacer"></div> -->\n\n          <!-- <ion-item>\n            <ion-label floating>Food type</ion-label>\n            <ion-input formControlName="FOOD_TYPE" type="text"></ion-input>\n          </ion-item> -->\n\n          <!-- <ion-item class="ksd-select" no-lines> -->\n            <!-- <ion-label floating>Food type</ion-label> -->\n            <!--<ion-item class="ksd-select" no-lines no-padding> -->\n                <div class="ksd-field-spacer"></div>\n                <list-cuisines [readonly]=true [current]="getCuisines()"></list-cuisines>\n            <!-- </ion-item> -->\n\n            <!-- <select-cuisine [current]="this.oItem.FOOD_TYPE"></select-cuisine> -->\n            <!-- <p class="ksd-change">{{oItem.FOOD_TYPE}}</p> -->\n            <!-- <ion-input formControlName="FOOD_TYPE" read-only type="text"></ion-input> -->\n            <!-- <p class="ksd-change" item-right (click)="onChangePassword()">Change</p> -->\n            <!-- <select-cuisine></select-cuisine> -->\n            <!-- <select-cuisine (select)="onCuisineChange($event)"></select-cuisine>\n          </ion-item>\n          <ion-item class="ksd-select" no-lines no-padding>\n            <select-cuisine></select-cuisine>\n            <!-- <select-cuisine (select)="onCuisineChange($event)"></select-cuisine> -->\n          <!-- </ion-item> -->\n\n          <div class="ksd-field-spacer"></div>\n\n          <ion-item no-padding>\n            <ion-label floating>Email</ion-label>\n            <ion-input formControlName="EMAIL" trim type="text"></ion-input>\n          </ion-item>\n          <div class="ksd-field-spacer"></div>\n          \n          <!-- read-only disabled  -->\n          <ion-item no-padding>\n            <ion-label floating>Password</ion-label>\n            <ion-input read-only disabled formControlName="PASSWORD" type="password"></ion-input>\n            <p class="ksd-change" item-right (click)="onChangePassword()">Change</p>\n          </ion-item>\n          <!-- <ion-item>\n            <ion-label floating>Password</ion-label>\n            <ion-input formControlName="PASSWORD" type="password"></ion-input>\n            <p item-right (click)="onChangePassword()">Change</p>\n          </ion-item> -->\n          <div class="ksd-field-spacer"></div>\n\n          <ion-item no-padding>\n            <ion-label floating>Mobile</ion-label>\n            +65\n            <ion-input formControlName="MOBILE" type="text"></ion-input>\n          </ion-item>\n          <div class="ksd-field-spacer"></div>\n\n          <!-- minlength="8" maxlength="8" -->\n          <ion-item no-padding>\n            <ion-label floating>Outlet phone no. +65</ion-label>\n            <ion-input formControlName="OUTLET_PHONE" type="text"></ion-input>\n          </ion-item>\n          <div class="ksd-field-spacer"></div>\n\n          <ion-item no-padding>\n            <ion-label floating>Address</ion-label>\n            <ion-textarea class="ksd-address" text-justify formControlName="ADDRESS" type="textarea"></ion-textarea>\n          </ion-item>\n          <div class="ksd-field-spacer"></div>\n\n        </ion-col>\n\n      </ion-row>\n      <div class="ksd-err">\n        <div *ngIf="oForm.hasError(\'NAME\')" class="alert alert-danger">\n          {{oForm.getError(\'NAME\')}}\n        </div>\n        <div *ngIf="oForm.hasError(\'EMAIL\')" class="alert alert-danger">\n          {{oForm.getError(\'EMAIL\')}}\n        </div>\n        <div *ngIf="oForm.hasError(\'MOBILE\')" class="alert alert-danger">\n          {{oForm.getError(\'MOBILE\')}}\n        </div>\n        <div *ngIf="oForm.hasError(\'OUTLET_PHONE\')" class="alert alert-danger">\n          {{oForm.getError(\'OUTLET_PHONE\')}}\n        </div>\n        <!-- <div *ngIf="oForm.hasError(\'ADDRESS\')" class="alert alert-danger">\n          {{oForm.getError(\'ADDRESS\')}}\n        </div> -->\n      </div>\n      <div class="ksd-field-spacer"></div>\n      <button ion-button full type="submit" [disabled]="!oInputForm.valid">\n        <p>Save</p>\n      </button>\n\n    </form>\n  </div>\n  <!--<p *ngIf="submitAttempt" style="color: #ea6153;">Please fill out all details accurately.</p>-->\n\n</ion-content>\n<!-- <ion-footer>\n</ion-footer> -->'/*ion-inline-end:"/Users/krisprojects/HIEv2/HIE/HIEApp/src/pages/merchant-profile/merchant-profile.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"]
            //, private readonly oLoginService: LoginService
            ,
            __WEBPACK_IMPORTED_MODULE_3__providers_api_service__["a" /* APIService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["Events"],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["AlertController"]
            //    private readonly loadingCtrl: LoadingController,
            //  private readonly toastCtrl: ToastController
        ])
    ], MerchantProfilePage);
    return MerchantProfilePage;
}());

//# sourceMappingURL=merchant-profile.js.map

/***/ }),

/***/ 944:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListCuisinesComponentModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__list_cuisines__ = __webpack_require__(945);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var ListCuisinesComponentModule = /** @class */ (function () {
    function ListCuisinesComponentModule() {
    }
    ListCuisinesComponentModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__list_cuisines__["a" /* ListCuisinesComponent */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicModule"],
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_2__list_cuisines__["a" /* ListCuisinesComponent */]
            ]
        })
    ], ListCuisinesComponentModule);
    return ListCuisinesComponentModule;
}());

//# sourceMappingURL=list-cuisines.module.js.map

/***/ }),

/***/ 945:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListCuisinesComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_properties__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(12);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



//import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
//https://stackoverflow.com/questions/45500899/create-custom-dialog-box-in-ionic-2
var ListCuisinesComponent = /** @class */ (function () {
    function ListCuisinesComponent(oEvents) {
        this.oEvents = oEvents;
        this.select = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.oItems = [{ Name: 'Others' },
            { Name: 'Japanese' },
            { Name: 'Chinese' },
            { Name: 'Indian' },
            { Name: 'Thai' },
            { Name: 'Western' }
        ];
        console.log("In SelectCuisines");
    }
    ListCuisinesComponent.prototype.onSelected = function (o) {
        var s = "";
        o.forEach(function (item, index) {
            if (index > 0)
                s += ",";
            s += "'" + item.trim() + "'";
        });
        console.log(s);
        if (this.current === null)
            __WEBPACK_IMPORTED_MODULE_1__app_properties__["a" /* Global_Variables */].selectedCuisines = s;
        else
            this.current = s;
        this.oEvents.publish("Cuisines", s);
    };
    ListCuisinesComponent.prototype.ngOnInit = function () {
        var v = __WEBPACK_IMPORTED_MODULE_1__app_properties__["a" /* Global_Variables */].selectedCuisines;
        if (this.current !== null) {
            v = this.current;
        }
        console.log(v);
        this.oItems.forEach(function (item) {
            if (v.indexOf(item.Name) > -1)
                item['checked'] = true;
            else
                item['checked'] = false;
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", Object)
    ], ListCuisinesComponent.prototype, "select", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], ListCuisinesComponent.prototype, "current", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Boolean)
    ], ListCuisinesComponent.prototype, "readonly", void 0);
    ListCuisinesComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'list-cuisines',template:/*ion-inline-start:"/Users/krisprojects/HIEv2/HIE/HIEApp/src/components/list-cuisines/list-cuisines.html"*/'<!-- <ion-row  no-padding>\n  <ion-col> -->\n    <!--<ion-row syte="padding:0px">\n      <ion-col syte="padding:0px">\n        <ion-label>Cuisine</ion-label>\n      </ion-col>\n    </ion-row>-->\n    <ion-item no-padding>\n      <ion-label color="#ffffff" floating>Food Type</ion-label>\n      <ion-select required read-only="readonly" (ionChange)="onSelected($event)" multiple>\n        <ion-option *ngFor="let o of oItems" selected="{{o.checked}}">{{o.Name}}\n        </ion-option>\n      </ion-select>\n    </ion-item>\n  <!-- </ion-col>\n</ion-row> -->'/*ion-inline-end:"/Users/krisprojects/HIEv2/HIE/HIEApp/src/components/list-cuisines/list-cuisines.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["Events"]])
    ], ListCuisinesComponent);
    return ListCuisinesComponent;
}());

//# sourceMappingURL=list-cuisines.js.map

/***/ })

});
//# sourceMappingURL=1.js.map