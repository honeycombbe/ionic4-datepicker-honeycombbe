var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var core_1 = require('@angular/core');
var angular_1 = require('@ionic/angular');
var common_1 = require('@angular/common');
var forms_1 = require('@angular/forms');
var date_picker_component_1 = require('./components/date-picker-component/date-picker-component');
var DatePickerModule = (function () {
    function DatePickerModule() {
    }
    DatePickerModule.forRoot = function () {
        return {
            ngModule: DatePickerModule,
            providers: []
        };
    };
    DatePickerModule = __decorate([
        core_1.NgModule({
            imports: [
                angular_1.IonicModule,
                common_1.CommonModule,
                forms_1.FormsModule
            ],
            declarations: [
                date_picker_component_1.DatePickerComponent,
            ],
            exports: [
                date_picker_component_1.DatePickerComponent
            ]
        })
    ], DatePickerModule);
    return DatePickerModule;
})();
exports.DatePickerModule = DatePickerModule;
