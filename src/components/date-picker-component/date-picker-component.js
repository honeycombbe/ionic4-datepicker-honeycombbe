var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var core_1 = require('@angular/core');
var dayspan_1 = require('dayspan');
var moment = require('moment');
var HTML_CODE = "\n<div class=\"ionicCalendarContainer\"  [ngStyle]=\"backgroundStyle\">\n    <ion-item *ngIf=\"showView === 'calendar'\" [ngStyle]=\"backgroundStyle\">\n        <ion-icon name=\"calendar\" slot=\"start\">\n        </ion-icon>\n        <ion-button fill=\"clear\" (click)=\"showMonthView()\" class=\"calendar-button ionicCalendarMonthBtn\">\n            {{monthLabels[monthSelected-1]}}\n        </ion-button>\n        <ion-button fill=\"clear\" [disabled]=\"!hasYearSelection()\" (click)=\"showYearView()\" class=\"calendar-button ionicCalendarYearBtn\">\n            {{yearSelected}}\n        </ion-button>\n\n        <span slot=\"end\" *ngIf=\"hasPrevious() || hasNext()\">\n            <ion-button class=\"ionicCalendarPrevious\"  fill=\"clear\" [disabled]=\"!hasPrevious()\" (click)=\"previous()\">\n                <ion-icon slot=\"icon-only\" name=\"ios-arrow-back\"></ion-icon>\n            </ion-button>\n            <ion-button class=\"ionicCalendarNext\" fill=\"clear\" [disabled]=\"!hasNext()\" (click)=\"next()\">\n                <ion-icon slot=\"icon-only\" name=\"ios-arrow-forward\"></ion-icon>\n            </ion-button>\n        </span>\n    </ion-item>\n\n    <ion-grid *ngIf=\"showView === 'calendar'\">\n        <ion-row>\n            <ion-col *ngFor=\"let daylabel of dayLabels\" text-center [ngStyle]=\"dayLabelsStyle\">\n                {{daylabel}}\n            </ion-col>\n        </ion-row>\n        <ion-row *ngFor=\"let week of weeks\">\n            <ion-col *ngFor=\"let day of week\" (click)=\"selectDay(day)\" [ngStyle]=\"getDayStyle(day)\" text-center>\n                <span [ngStyle]=\"!day.inCalendar && notInCalendarStyle\">\n                   <span [ngStyle]=\"isValidDay(day) && !isOneOfTheValidDates(day) && invalidDateStyle\">{{isValidDay(day) ? day.dayOfMonth : '&nbsp;&nbsp;'}}</span>\n                </span>\n            </ion-col>\n        </ion-row>\n    </ion-grid>\n\n    <ion-grid *ngIf=\"showView === 'month'\">\n        <ion-row justify-content-end>\n            <ion-col text-end>\n                <ion-button fill=\"clear\" (click)=\"resetView()\">\n                    <ion-icon slot=\"icon-only\" name=\"close\"></ion-icon>\n                </ion-button>\n            </ion-col>\n        </ion-row>\n        <ion-row>\n            <ion-col *ngFor=\"let monthLabel of monthLabels; let i = index\" [ngStyle]=\"getMonthStyle(i)\" size=\"3\" (click)=\"selectMonth(i+1)\" text-center>\n                <span [class.invalidMonth]=\"!isValidMonth(i)\">{{monthLabel}}</span>\n            </ion-col>\n        </ion-row>\n    </ion-grid>\n\n    <ion-grid *ngIf=\"showView === 'year'\">\n        <ion-row>\n            <ion-col size=\"10\" text-center>\n                    <div *ngIf=\"hasPreviousYears() || hasNextYears()\">\n                        <ion-button fill=\"clear\" [disabled]=\"!hasPreviousYears()\"  (click)=\"showPreviousYears()\">\n                            <ion-icon slot=\"icon-only\" name=\"ios-arrow-back\"></ion-icon>\n                        </ion-button>\n                        <ion-button fill=\"clear\" [disabled]=\"true\" class=\"year-range\">\n                            {{startYear}} to {{endYear}}\n                        </ion-button>\n                    \n                        <ion-button fill=\"clear\" [disabled]=\"!hasNextYears()\" (click)=\"showNextYears()\">\n                            <ion-icon slot=\"icon-only\" name=\"ios-arrow-forward\"></ion-icon>\n                        </ion-button>\n                    </div>\n            </ion-col>\n            <ion-col size=\"2\" text-center>\n                <ion-button fill=\"clear\" (click)=\"resetView()\">\n                    <ion-icon slot=\"icon-only\" name=\"close\"></ion-icon>\n                </ion-button>\n            </ion-col>\n        </ion-row> \n        <ion-row>\n            <ion-col *ngFor=\"let year of years\" [ngStyle]=\"getYearStyle(year)\" size=\"3\" (click)=\"selectYear(year)\" text-center>\n                {{year}}\n            </ion-col>\n        </ion-row>\n    </ion-grid>\n</div>\n";
var CSS_STYLE = "\n  .item {\n      .item-inner {\n        border-bottom: none !important;\n      }\n    }\n\n  ion-icon {\n    font-size: 25px;\n  }\n\n  .year-range {\n    font-size: 15px;\n    font-weight: 550;\n    &.button[disabled] {\n      opacity: 1;\n      color: gray !important;\n    }\n  }\n\n  .calendar-button {\n    text-decoration: underline;\n    padding-right: 2px !important;\n    padding-left: 2px !important;\n  }\n\n  .invalidMonth {\n    color: #8b8b8b\n  }\n";
var DatePickerComponent = (function () {
    function DatePickerComponent() {
        this.monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        this.dayLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
        this.validDates = [];
        this.dateStyles = {};
        this.backgroundStyle = { 'background-color': '#ffffff' };
        this.notInCalendarStyle = { 'color': '#8b8b8b' };
        this.dayLabelsStyle = { 'font-weight': 500, 'font-size': '14px' };
        this.monthLabelsStyle = { 'font-size': '15px' };
        this.yearLabelsStyle = { 'font-size': '15px' };
        this.itemSelectedStyle = { 'background': '#488aff', 'color': '#f4f4f4 !important' };
        this.invalidDateStyle = { 'text-decoration': 'line-through', 'color': 'red' };
        this.todaysItemStyle = { 'color': '#32db64' };
        this.onSelect = new core_1.EventEmitter();
        this.showView = 'calendar';
        this.yearSelected = new Date().getFullYear();
        this.monthSelected = new Date().getMonth() + 1;
        this.currentYear = new Date().getFullYear();
        this.currentMonth = new Date().getMonth() + 1;
        this.currentDay = new Date().getDate();
    }
    DatePickerComponent.prototype.ngOnInit = function () {
        this.initOptions();
        this.createCalendarWeeks();
    };
    DatePickerComponent.prototype.initOptions = function () {
        if (this.date && this.fromDate && this.date < this.fromDate) {
            throw new Error('Invalid date input. date must be same or greater than fromDate');
        }
        if (this.date && this.toDate && this.toDate < this.date) {
            throw new Error('Invalid date input. date must be same or lesser than toDate');
        }
        if (this.toDate && this.fromDate && this.fromDate > this.toDate) {
            throw new Error('Invalid date input. from date must be lesser than or equal to toDate');
        }
        this.yearSelected = this.date ? this.date.getFullYear() : this.toDate ? this.toDate.getFullYear() : new Date().getFullYear();
        this.monthSelected = this.date ? this.date.getMonth() + 1 : this.toDate ? this.toDate.getMonth() + 1 : new Date().getMonth() + 1;
        this.dayHighlighted = this.date ? dayspan_1.Day.fromDate(this.date) : this.toDate ? dayspan_1.Day.fromDate(this.toDate) : dayspan_1.Day.today();
        if (this.date) {
            this.daySelected = this.dayHighlighted;
        }
    };
    DatePickerComponent.prototype.createCalendarWeeks = function () {
        this.weeks = this.generateCalendarWeeks(dayspan_1.Day.fromMoment(moment(this.monthSelected + '-01-' + this.yearSelected, 'MM-DD-YYYY')));
    };
    DatePickerComponent.prototype.hasPrevious = function () {
        if (!this.fromDate) {
            return true;
        }
        var previousMonth;
        var previousYear;
        if (this.monthSelected === 1) {
            previousMonth = 11;
            previousYear = this.yearSelected - 1;
        }
        else {
            previousMonth = this.monthSelected;
            previousYear = this.yearSelected;
        }
        // The last day of previous month should be greatar than or equal to fromDate
        return new Date(previousYear, previousMonth, 0) >= this.fromDate;
    };
    DatePickerComponent.prototype.hasNext = function () {
        if (!this.toDate) {
            return true;
        }
        var nextMonth;
        var nextYear;
        if (this.monthSelected === 12) {
            nextMonth = 0;
            nextYear = this.yearSelected + 1;
        }
        else {
            nextMonth = this.monthSelected;
            nextYear = this.yearSelected;
        }
        // The first day of next month should be less than or equal to toDate
        return new Date(nextYear, nextMonth, 1) <= this.toDate;
    };
    DatePickerComponent.prototype.previous = function () {
        if (this.monthSelected === 1) {
            this.monthSelected = 12;
            this.yearSelected--;
        }
        else {
            this.monthSelected--;
        }
        this.createCalendarWeeks();
    };
    DatePickerComponent.prototype.next = function () {
        if (this.monthSelected === 12) {
            this.monthSelected = 1;
            this.yearSelected++;
        }
        else {
            this.monthSelected++;
        }
        this.createCalendarWeeks();
    };
    DatePickerComponent.prototype.confirmDay = function (day) {
        this.onSelect.emit(day.toDate());
    };
    DatePickerComponent.prototype.selectDay = function (day) {
        var _this = this;
        if (!this.isValidDay(day) || !this.isOneOfTheValidDates(day)) {
            return;
        }
        this.daySelected = day;
        setTimeout(function () {
            _this.confirmDay(day);
        }, 200);
    };
    DatePickerComponent.prototype.showMonthView = function () {
        this.showView = 'month';
        "";
    };
    DatePickerComponent.prototype.hasYearSelection = function () {
        if (!this.toDate || !this.fromDate) {
            return true;
        }
        return this.toDate.getFullYear() !== this.fromDate.getFullYear();
    };
    DatePickerComponent.prototype.showYearView = function () {
        this.showView = 'year';
        var startYear = this.yearSelected - 10;
        if (startYear % 10 !== 0) {
            startYear = startYear - (startYear % 10);
        }
        var endYear = startYear + 19;
        this.startYear = startYear;
        this.endYear = endYear;
        this.generateYears();
    };
    DatePickerComponent.prototype.generateYears = function () {
        if (this.fromDate && this.startYear < this.fromDate.getFullYear()) {
            this.startYear = this.fromDate.getFullYear();
        }
        if (this.toDate && this.endYear > this.toDate.getFullYear()) {
            this.endYear = this.toDate.getFullYear();
        }
        this.years = [];
        for (var i = this.startYear; i <= this.endYear; i++) {
            this.years.push(i);
        }
    };
    DatePickerComponent.prototype.showPreviousYears = function () {
        this.endYear = this.startYear - 1;
        this.startYear = this.endYear - 19;
        this.generateYears();
    };
    DatePickerComponent.prototype.showNextYears = function () {
        this.startYear = this.endYear + 1;
        this.endYear = this.startYear + 19;
        this.generateYears();
    };
    DatePickerComponent.prototype.hasPreviousYears = function () {
        if (!this.fromDate) {
            return true;
        }
        return this.startYear > this.fromDate.getFullYear();
    };
    DatePickerComponent.prototype.hasNextYears = function () {
        if (!this.toDate) {
            return true;
        }
        return this.endYear < this.toDate.getFullYear();
    };
    DatePickerComponent.prototype.selectMonth = function (month) {
        var _this = this;
        if (!this.isValidMonth(month - 1)) {
            return;
        }
        this.monthSelected = month;
        this.createCalendarWeeks();
        setTimeout(function () {
            _this.showView = 'calendar';
        }, 200);
    };
    DatePickerComponent.prototype.selectYear = function (year) {
        var _this = this;
        this.yearSelected = year;
        this.createCalendarWeeks();
        setTimeout(function () {
            _this.showView = 'calendar';
        }, 200);
    };
    DatePickerComponent.prototype.resetView = function () {
        this.showView = 'calendar';
    };
    DatePickerComponent.prototype.isToday = function (day) {
        return this.yearSelected === this.currentYear && this.monthSelected === this.currentMonth && this.currentDay === day;
    };
	 DatePickerComponent.prototype.isTodayCheck = function (day) {
		return moment().format('YYYY-MM-DD') == day;
    };
    DatePickerComponent.prototype.generateCalendarWeeks = function (forDay) {
        var weeks = [];
        var month = dayspan_1.Calendar.months(1, forDay);
        var numOfWeeks = month.days.length / 7;
        var dayIndex = 0;
        for (var week = 0; week < numOfWeeks; week++) {
            var days = [];
            for (var day = 0; day < 7; day++) {
                days.push(month.days[dayIndex]);
                dayIndex++;
            }
            weeks.push(days);
        }
        return weeks;
    };
    DatePickerComponent.prototype.isValidDay = function (day) {
        if (!this.toDate && !this.fromDate) {
            return true;
        }
        if (this.toDate && this.fromDate) {
            return day.toDate() >= this.fromDate && day.toDate() <= this.toDate;
        }
        if (this.toDate) {
            return day.toDate() <= this.toDate;
        }
        if (this.fromDate) {
            return day.toDate() >= this.fromDate;
        }
    };
    DatePickerComponent.prototype.isOneOfTheValidDates = function (day) {
        if (this.validDates && this.validDates.length) {
            var index = this.validDates.findIndex(function (validDate) {
                return validDate.getFullYear() === day.toDate().getFullYear() &&
                    validDate.getMonth() === day.toDate().getMonth() &&
                    validDate.getDate() === day.toDate().getDate();
            });
            return index !== -1;
        }
        return true;
    };
    DatePickerComponent.prototype.isValidMonth = function (index) {
        if (this.toDate && this.toDate.getFullYear() !== this.yearSelected && this.fromDate && this.fromDate.getFullYear() !== this.yearSelected) {
            return true;
        }
        if (!this.toDate && !this.fromDate) {
            return true;
        }
        if (this.fromDate && !this.toDate) {
            return new Date(this.yearSelected, index, 1) >= this.fromDate;
        }
        if (this.toDate && !this.fromDate) {
            return new Date(this.yearSelected, index, 1) <= this.toDate;
        }
        return new Date(this.yearSelected, index, 1) >= this.fromDate &&
            new Date(this.yearSelected, index, 1) <= this.toDate;
    };
    //Styles
    DatePickerComponent.prototype.getDayStyle = function (day) {
        var style = {};
        if (this.isTodayCheck(day.format('YYYY-MM-DD'))) {
            style = this.todaysItemStyle;
        }
        if (this.daySelected && day.dayIdentifier === this.daySelected.dayIdentifier) {
            style = { style: style, this: .itemSelectedStyle };
        }
        var dayStyle = this.dateStyles && this.dateStyles[day.toDate().toISOString().slice(0, 10)];
        if (dayStyle) {
            style = { style: style, dayStyle: dayStyle };
        }
        return style;
    };
    DatePickerComponent.prototype.getMonthStyle = function (index) {
        var style = {};
        style = { style: style, this: .monthLabelsStyle };
        if (index === this.currentMonth - 1) {
            style = { style: style, this: .todaysItemStyle };
        }
        if (index === this.monthSelected - 1) {
            style = { style: style, this: .itemSelectedStyle };
        }
        return style;
    };
    DatePickerComponent.prototype.getYearStyle = function (year) {
        var style = {};
        style = { style: style, this: .yearLabelsStyle };
        if (year === this.currentYear) {
            style = { style: style, this: .todaysItemStyle };
        }
        if (year === this.yearSelected) {
            style = { style: style, this: .itemSelectedStyle };
        }
        return style;
    };
    __decorate([
        core_1.Input()
    ], DatePickerComponent.prototype, "monthLabels");
    __decorate([
        core_1.Input()
    ], DatePickerComponent.prototype, "dayLabels");
    __decorate([
        core_1.Input()
    ], DatePickerComponent.prototype, "date");
    __decorate([
        core_1.Input()
    ], DatePickerComponent.prototype, "fromDate");
    __decorate([
        core_1.Input()
    ], DatePickerComponent.prototype, "toDate");
    __decorate([
        core_1.Input()
    ], DatePickerComponent.prototype, "validDates");
    __decorate([
        core_1.Input()
    ], DatePickerComponent.prototype, "dateStyles");
    __decorate([
        core_1.Input()
    ], DatePickerComponent.prototype, "backgroundStyle");
    __decorate([
        core_1.Input()
    ], DatePickerComponent.prototype, "notInCalendarStyle");
    __decorate([
        core_1.Input()
    ], DatePickerComponent.prototype, "dayLabelsStyle");
    __decorate([
        core_1.Input()
    ], DatePickerComponent.prototype, "monthLabelsStyle");
    __decorate([
        core_1.Input()
    ], DatePickerComponent.prototype, "yearLabelsStyle");
    __decorate([
        core_1.Input()
    ], DatePickerComponent.prototype, "itemSelectedStyle");
    __decorate([
        core_1.Input()
    ], DatePickerComponent.prototype, "invalidDateStyle");
    __decorate([
        core_1.Input()
    ], DatePickerComponent.prototype, "todaysItemStyle");
    __decorate([
        core_1.Output()
    ], DatePickerComponent.prototype, "onSelect");
    DatePickerComponent = __decorate([
        core_1.Component({
            selector: 'ionic-calendar-date-picker',
            template: HTML_CODE,
            styles: [CSS_STYLE]
        })
    ], DatePickerComponent);
    return DatePickerComponent;
})();
exports.DatePickerComponent = DatePickerComponent;
