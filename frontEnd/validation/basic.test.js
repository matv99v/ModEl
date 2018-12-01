import moment from 'moment';


import {
    isFutureDay,
    isPresentDay,
    isPastDay,
    isSameDay,
    isIncOrderDays
} from './basic.js';

describe('Basic validation rules', () => {
    let todayDate;
    let tomorrowDate;
    let yesterdayDate;

    beforeEach(() => {
        yesterdayDate = moment().add(-1, 'days').format('YYYY-MM-DD');
        todayDate = moment().format('YYYY-MM-DD');
        tomorrowDate = moment().add(1, 'days').format('YYYY-MM-DD');
    });

    describe('isPresentDay', () => {
        it('should define today as present', async () => {
            expect(isPresentDay(todayDate)).toBeTruthy();
        });
        it('should not define yesterdayDate as present', async () => {
            expect(isPresentDay(yesterdayDate)).toBeFalsy();
        });
        it('should not define tomorrowDate as present', async () => {
            expect(isPresentDay(tomorrowDate)).toBeFalsy();
        });
    });

    describe('isPastDay', () => {
        it('should define yesterdayDate as past', async () => {
            expect(isPastDay(yesterdayDate)).toBeTruthy();
        });
        it('should not define todayDate as past', async () => {
            expect(isPastDay(todayDate)).toBeFalsy();
        });
        it('should not define tomorrowDate as past', async () => {
            expect(isPastDay(tomorrowDate)).toBeFalsy();
        });
    });

    describe('isFutureDay', () => {
        it('should define tomorrowDate as future', async () => {
            expect(isFutureDay(tomorrowDate)).toBeTruthy();
        });
        it('should not define todayDate as future', async () => {
            expect(isFutureDay(todayDate)).toBeFalsy();
        });
        it('should not define yesterdayDate as future', async () => {
            expect(isFutureDay(yesterdayDate)).toBeFalsy();
        });
    });

    describe('isIncOrderDays: dates are in increasing oreder, precision = day', () => {
        it('should return false for the same dates', async () => {
            expect(isIncOrderDays(yesterdayDate, yesterdayDate)).toBeFalsy();
        });
        it('should return true for the same dates if allowSame=true', async () => {
            expect(isIncOrderDays(yesterdayDate, yesterdayDate, true)).toBeTruthy();
        });
        it('should return false for todayDate and yesterdayDate', async () => {
            expect(isIncOrderDays(todayDate, yesterdayDate)).toBeFalsy();
        });
        it('should return true for yesterdayDate and todayDate', async () => {
            expect(isIncOrderDays(yesterdayDate, todayDate)).toBeTruthy();
        });
        it('should return true for yesterdayDate and tomorrowDate', async () => {
            expect(isIncOrderDays(yesterdayDate, tomorrowDate)).toBeTruthy();
        });
    });

    describe('isSameDay', () => {
        it('should return true for the same dates 1', async () => {
            expect(isSameDay(todayDate, todayDate)).toBeTruthy();
        });
        it('should return true for the same dates 2', async () => {
            expect(isSameDay(tomorrowDate, moment().add(1, 'day').format('YYYY-MM-DD'))).toBeTruthy();
        });
        it('should return false for the different dates', async () => {
            expect(isSameDay(tomorrowDate, todayDate)).toBeFalsy();
        });
    });
});
