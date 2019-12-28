webpackJsonp([7],{

/***/ 838:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChangePasswordPageModule", function() { return ChangePasswordPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__change_password__ = __webpack_require__(935);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(23);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var ChangePasswordPageModule = /** @class */ (function () {
    function ChangePasswordPageModule() {
    }
    ChangePasswordPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__change_password__["a" /* ChangePasswordPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["IonicPageModule"].forChild(__WEBPACK_IMPORTED_MODULE_2__change_password__["a" /* ChangePasswordPage */]),
                __WEBPACK_IMPORTED_MODULE_3__angular_forms__["ReactiveFormsModule"]
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_2__change_password__["a" /* ChangePasswordPage */]
            ]
        })
    ], ChangePasswordPageModule);
    return ChangePasswordPageModule;
}());

//# sourceMappingURL=change-password.module.js.map

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

/***/ 935:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChangePasswordPage; });
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



//import { Camera, FileEntry, File } from "ionic-native";
//import { LoadingController, AlertController, ToastController } from "ionic-angular";



//import { SamePasswordValidator } from './validator/SamePasswordValidator';
//import { FormControl } from '@angular/forms';

var ChangePasswordPage = /** @class */ (function () {
    function ChangePasswordPage(navCtrl, navParams, oBuilder
    //    private readonly loadingCtrl: LoadingController,
    , oAPIService, alertCtrl
    //    ,private readonly toastCtrl: ToastController
    ) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.oBuilder = oBuilder;
        this.oAPIService = oAPIService;
        this.alertCtrl = alertCtrl;
        this.sErrorText = "";
        this.oItem = navParams.get('Item');
        // this.oInputForm = this.oBuilder.group({
        //   CURRENT_PASSWORD: ['', Validators.compose([Validators.required, Validators.maxLength(V.Password_Max), Validators.minLength(V.Password_Min), Validators.pattern(V.Password)])],
        //   PASSWORD: ['', Validators.compose([Validators.required, Validators.maxLength(V.Password_Max), Validators.minLength(V.Password_Min), Validators.pattern(V.Password)])],
        //   PASSWORD_REENTRY: ['', Validators.compose([Validators.required, Validators.maxLength(V.Password_Max), Validators.minLength(V.Password_Min), Validators.pattern(V.Password), this.passwordMatch])],
        // });
        this.setupForm();
    }
    ChangePasswordPage.prototype.setupForm = function () {
        this.oForm = new __WEBPACK_IMPORTED_MODULE_5_ng2_validation_manager__["ValidationManager"]({
            // 'CURRENT_PASSWORD': 'required|equal:"' + this.oItem.PASSWORD + '"',
            'CURRENT_PASSWORD': 'required',
            //'PASSWORD': 'required|equalTo:CURRENT_PASSWORD|rangeLength:' + V.Password_Min + ',' + V.Password_Max,
            'PASSWORD': 'required|rangeLength:' + __WEBPACK_IMPORTED_MODULE_4__app_properties__["b" /* V */].Password_Min + ',' + __WEBPACK_IMPORTED_MODULE_4__app_properties__["b" /* V */].Password_Max,
            'PASSWORD_REENTRY': 'required|equalTo:PASSWORD'
        });
        //    this.form.setValue('CURRENT_PASSWORD', 'fff');
        this.oForm.setErrorMessage('PASSWORD_REENTRY', 'equalTo', 'Reentered Password is not same as New Password');
        this.oForm.setErrorMessage('PASSWORD', 'required', 'New Password is required');
        // this.oForm.setErrorMessage('CURRENT_PASSWORD', 'equal', 'Incorrect corrent password');
        // this.oForm.setErrorMessage('PASSWORD', 'equalTo', 'New Password should not be the same');
        this.oInputForm = this.oForm.getForm();
    };
    ChangePasswordPage.prototype.shouldShowOldPassword = function () {
        if (this.oItem.LOGINTYPE == 'F' &&
            this.oItem.CURRENT_PASSWORD == '')
            return false;
        return true;
    };
    ChangePasswordPage.prototype.onSave = function (formData) {
        var _this = this;
        this.sErrorText = '';
        // if (formData.PASSWORD === formData.CURRENT_PASSWORD) {
        //   this.sErrorText = 'New Password should not be the same';
        //   return;
        // }
        if (formData.PASSWORD !== formData.PASSWORD_REENTRY) {
            //      this.showPasswordNotSame();
            this.sErrorText = 'Repeat Password is not same as New Password';
            return;
        }
        var sService = "changepassword";
        if (this.shouldShowOldPassword() == false) {
            sService = "changefbpassword";
        }
        this.oAPIService.send2ServerP(sService, true, formData).then(function (data) {
            //      console.log(JSON.stringify(data));
            if (data.result[0].ID != null) {
                var alert_1 = _this.alertCtrl.create({
                    title: 'Change Successful',
                    subTitle: 'Password was changed',
                    buttons: ['Dismiss']
                });
                alert_1.present();
                //        this.navCtrl.setRoot()
                //        this.navCtrl.pop();
            }
            else
                _this.showPasswordNotChanged();
        });
    };
    // showPasswordNotSame() {
    //   let alert = this.alertCtrl.create({
    //     title: 'Password Check Failed',
    //     subTitle: 'Pls check New Passwords',
    //     buttons: ['Dismiss']
    //   });
    //   alert.present();
    // }
    ChangePasswordPage.prototype.showPasswordNotChanged = function () {
        var alert = this.alertCtrl.create({
            title: 'Password Changed Failed',
            subTitle: 'Pls enter correct current Password',
            buttons: ['Dismiss']
        });
        alert.present();
    };
    ChangePasswordPage.prototype.goBack = function () {
        this.navCtrl.pop();
    };
    ChangePasswordPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-change-password',template:/*ion-inline-start:"/Users/krisprojects/HIEv2/HIE/HIEApp/src/pages/change-password/change-password.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-title text-center>Change password</ion-title>\n    <!-- <button ion-button menuToggle (click)="goBack()">\n      <ion-icon name="back"></ion-icon>\n    </button> -->\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content>\n  <form [formGroup]="oInputForm" (ngSubmit)="onSave(oInputForm.value)">\n      <ion-grid>\n        <ion-row *ngIf="shouldShowOldPassword()">\n          <ion-col>\n            <ion-item>\n              <ion-label stacked>Current password</ion-label>\n              <ion-input formControlName="CURRENT_PASSWORD" type="password" name="CURRENT_PASSWORD"></ion-input>\n            </ion-item>\n          </ion-col>\n        </ion-row>\n        <ion-row>\n          <ion-col>\n            <ion-item>\n              <ion-label stacked>New password</ion-label>\n              <ion-input formControlName="PASSWORD" name="PASSWORD" type="password"></ion-input>\n            </ion-item>\n          </ion-col>\n        </ion-row>\n        <ion-row>\n          <ion-col>\n            <ion-item>\n              <ion-label stacked>Repeat new password</ion-label>\n              <ion-input formControlName="PASSWORD_REENTRY" name="PASSWORD_REENTRY" autocomplete="off" type="password"></ion-input>\n            </ion-item>\n            <!-- <ion-item no-lines *ngIf="oForm.hasError(\'PASSWORD_REENTRY\')">\n            <div class="alert alert-danger">\n              {{oForm.getError(\'PASSWORD_REENTRY\')}}\n            </div>\n          </ion-item> -->\n          </ion-col>\n        </ion-row>\n        <!-- <div>\n        {{oForm.hasError(\'PASSWORD_REENTRY\')}}, {{form.getErrors() | json}}\n      </div> -->\n        <ion-row></ion-row>\n        <ion-row>\n          <ion-col>\n            <p class="alert">{{sErrorText}}</p>\n          </ion-col>\n        </ion-row>\n        <ion-row>\n          <ion-col>\n            <div class="ksd-err">\n              <!-- <div *ngIf="oForm.hasError(\'CURRENT_PASSWORD\')" class="alert alert-danger">\n              {{oForm.getError(\'CURRENT_PASSWORD\')}}\n              <br/>\n              {{oItem.PASSWORD}}\n            </div> -->\n              <div *ngIf="oInputForm.controls.PASSWORD.dirty && oForm.hasError(\'PASSWORD\')" class="alert alert-danger">\n                {{oForm.getError(\'PASSWORD\')}}\n              </div>\n              <div *ngIf="oInputForm.controls.PASSWORD_REENTRY.dirty && oForm.hasError(\'PASSWORD_REENTRY\')" class="alert alert-danger">\n                {{oForm.getError(\'PASSWORD_REENTRY\')}}\n              </div>\n            </div>\n          </ion-col>\n        </ion-row>\n        <!-- <div class="ksd-field-spacer"></div> -->\n\n        <ion-row text-center style="padding-top: 20px; padding-left:10px">\n          <ion-col>\n            <button ion-button full type="submit" [disabled]="!oForm.isValid()">\n              <p>Save</p>\n            </button>\n          </ion-col>\n        </ion-row>\n\n      </ion-grid>\n    </form>\n\n    <!--<p *ngIf="submitAttempt" style="color: #ea6153;">Please fill out all details accurately.</p>-->\n\n</ion-content>\n'/*ion-inline-end:"/Users/krisprojects/HIEv2/HIE/HIEApp/src/pages/change-password/change-password.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavController"], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["NavParams"], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"]
            //    private readonly loadingCtrl: LoadingController,
            ,
            __WEBPACK_IMPORTED_MODULE_3__providers_api_service__["a" /* APIService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["AlertController"]
            //    ,private readonly toastCtrl: ToastController
        ])
    ], ChangePasswordPage);
    return ChangePasswordPage;
}());

//# sourceMappingURL=change-password.js.map

/***/ })

});
//# sourceMappingURL=7.js.map