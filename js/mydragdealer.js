$(function () {
    var convertSingleNo = function (hour, minute) {
        var singleNo = hour * 100 + minute;
        return singleNo;
    }
    var convertIntoMinutes = function (time) {
        var intoMinutes = Math.floor(time / 100) * 60 + Math.floor(((time / 100) - Math.floor(time / 100)) * 100);
        return intoMinutes;
    }
    var convertIntoTime = function (totalMinutes) {
        var intoTime = Math.floor(totalMinutes / 60) * 100 + Math.floor(((totalMinutes / 60) - Math.floor(totalMinutes / 60)) * 100);
        return intoTime;
    }
    var getSteps = function (startTime, endTime) {
        startTime = convertIntoMinutes(startTime);
        endTime = convertIntoMinutes(endTime);
        var steps = (endTime - startTime) / 30;
        console.log(steps);
        return steps + 1;
    }
    var now = new Date();
    var DAY_START_TIME = convertSingleNo(11, 0);
    console.log(DAY_START_TIME);
    var DAY_END_TIME = convertSingleNo(23, 0);
    console.log(DAY_END_TIME);
    var TIME = convertSingleNo(now.getHours(), now.getMinutes());
    console.log(TIME);
    var STEPS = getSteps(DAY_START_TIME, DAY_END_TIME);
    //    $('#slotBox').attr('width', 200 / STEPS + '%');
    var datePicked = "22 03";
    var isToday = function (now) {
        if (now.getDate() == datePicked.split(" ")[0]) {
            return true;
        } else {
            return false;
        }
    }

    var convertIntoString = function (time) {
        var hours = Math.floor(time / 100);
        var minutes = Math.floor((time / 100 - hours) * 100);
        if (minutes == 0) {
            return hours - getAmOrPm(hours).adjustment + ":00 " + getAmOrPm(hours).ampm;
        } else {
            return hours - getAmOrPm(hours).adjustment + ":" + minutes + " " + getAmOrPm(hours).ampm;
        }
    }

    var getX = function (startTime, endTime, time) {
        var x = 0;
        time = convertIntoMinutes(time);
        startTime = convertIntoMinutes(startTime);
        endTime = convertIntoMinutes(endTime);
        if (time < startTime) {
            x = 0;
        } else if (time > endTime) {
            x = 1;
        } else {
            x = (time - startTime) / (endTime - startTime);
        }
        console.log(x);
        return x;
    }

    var getTime = function (startTime, endTime, x) {
        startTime = convertIntoMinutes(startTime);
        endTime = convertIntoMinutes(endTime);
        var time = convertIntoTime(startTime + Math.floor((endTime - startTime) * x));
        return {
            'value': time,
            'stringValue': convertIntoString(time)
        };
    }

    var getInitialX = function (startTime, endTime, currentTime) {
        var currentHours = Math.floor(currentTime / 100);
        var currentMinutes = Math.floor(((currentTime / 100) - currentHours) * 100);
        if (currentMinutes > 30) {
            currentHours = currentHours + 1;
            currentMinutes = 00;
        } else {
            currentMinutes = 30;
        }
        return getX(startTime, endTime, convertSingleNo(currentHours, currentMinutes));
    }
    var getAmOrPm = function (hours) {
        if (hours > 11) {
            return {
                'adjustment': 12,
                'ampm': "PM"
            };
        } else {
            return {
                'adjustment': 0,
                'ampm': "AM"
            };
        }
    }
    new Dragdealer('just-a-slider', {
        steps: STEPS,
        snap: true,
        x: getInitialX(DAY_START_TIME, DAY_END_TIME, TIME),
        animationCallback: function (x, y) {
            console.log(x);
            $('#just-a-slider .value').text(getTime(DAY_START_TIME, DAY_END_TIME, x).stringValue);
        }
    });
})