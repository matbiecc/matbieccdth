module.exports = {
    secondsToDhms: (seconds) => {
        seconds = Number(seconds);
        var d = Math.floor(seconds / (3600 * 24));
        var h = Math.floor((seconds % (3600 * 24)) / 3600);
        var m = Math.floor((seconds % 3600) / 60);
        var s = Math.floor(seconds % 60);

        var dDisplay = d > 0 ? d + (d == 1 ? 'd, ' : 'd, ') : '';
        var hDisplay = h > 0 ? h + (h == 1 ? 'h, ' : 'h, ') : '';
        var mDisplay = m > 0 ? m + (m == 1 ? 'm, ' : 'm, ') : '';
        var sDisplay = s > 0 ? s + (s == 1 ? 's' : 's') : '';
        return dDisplay + hDisplay + mDisplay + sDisplay;
    },
    formatBytes: function (bytes) {
        if (bytes === 0) return '0 Bytes';
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${
            sizes[i]
        }`;
    },
    capitalizeWords: function (string) {
        return string.replace(
            /(?!^[0-9])(^|[^a-zA-Z\u00C0-\u017F\u0400-\u04FF'])([a-zA-Z\u00C0-\u017F\u0400-\u04FF])/g,
            function (m) {
                return m.toUpperCase();
            }
        );
    },
    laysodep: function (num) {
        const pattern = /\B(?=(\d{3})+(?!\d))/g;
        return num.toString().replace(pattern, ',');
    },
    sleep: async function (ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    },
    RemoveOneItem: function (arr, item) {
        var i = arr.indexOf(item);
        if (i !== -1) {
            arr.splice(i, 1);
        }
    },

    laysonho: function (count, digits) {
        const nums = {
            0: '⁰',
            1: '¹',
            2: '²',
            3: '³',
            4: '⁴',
            5: '⁵',
            6: '⁶',
            7: '⁷',
            8: '⁸',
            9: '⁹',
            10: '¹⁰',
            11: '¹¹',
        };
        let result = '';
        if (!digits) digits = count.toString().length;
        for (i = 0; i < digits; i++) {
            let digit = count % 10;
            count = Math.trunc(count / 10);
            result = nums[digit] + result;
        }
        result.length == 1 ? (result = '⁰' + result) : result;
        return result;
    },
};
