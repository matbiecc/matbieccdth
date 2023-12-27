const { EmbedBuilder } = require('discord.js');
module.exports = {
    config: {
        name: 'color',
        description: 'Xem trước màu',
        category: 'Info',
        aliases: [''],
        cooldown: 10,
    },
    permissions: ['SendMessages'],
    owner: false,
    run: async ({ message, args, report, log }) => {
        try {
            if (args[0]) {
                if (!args[0].includes('#') && args[0].length != 6)
                    return message.error(
                        `Không tìm thấy hex color: ${args[0]}`
                    );
                const res = args[0].replace('#', ``);
                color = parseHex(res);
                preview = `https://some-random-api.ml/canvas/colorviewer?hex=${color.hex.replace(
                    '#',
                    ``
                )}`;
                const embed = new EmbedBuilder()
                    .setThumbnail(preview)
                    .setTimestamp()
                    .addFields({
                        name: 'Hex',
                        value: color.hex,
                    })
                    .addFields({
                        name: 'Int',
                        value: `hsl(${color.intValue})`,
                    })
                    .addFields({
                        name: 'Rgb',
                        value: `rgb(${color.rgb})`,
                    })
                    .addFields({
                        name: 'Hsl',
                        value: `hsl(${color.hsl})`,
                    })
                    .setFooter({
                        text: `Yêu cầu bởi: ${message.author.username}`,
                    })

                    .setColor(color.hex);
                message.channel.send({ embeds: [embed] });
            } else {
                color = randColor();
                preview = `https://some-random-api.ml/canvas/colorviewer?hex=${color.hex.replace(
                    '#',
                    ``
                )}`;
                const embed = new EmbedBuilder()
                    .setThumbnail(preview)
                    .setTimestamp()
                    .addFields({
                        name: 'Hex',
                        value: color.hex,
                    })
                    .addFields({
                        name: 'Int',
                        value: `hsl(${color.intValue})`,
                    })
                    .addFields({
                        name: 'Rgb',
                        value: `rgb(${color.rgb})`,
                    })
                    .addFields({
                        name: 'Hsl',
                        value: `hsl(${color.hsl})`,
                    })
                    .setFooter({
                        text: `Yêu cầu bởi: ${message.author.username}`,
                    })
                    .setColor(color.hex);
                message.channel.send({ embeds: [embed] });
            }
        } catch (e) {
            log.error(e.message, e.stack);
            report.error(e.message, e.stack);
        }
    },
};

function parseHex(hex) {
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);

    let intValue = parseInt(hex.toLowerCase(), 16);

    let { hsl, h, s, l } = rgbToHsl(r, g, b);

    return {
        r,
        g,
        b,
        hex: '#' + hex,
        intValue,
        rgb: r + ',' + g + ',' + b,
        h,
        s,
        l,
        hsl,
    };
}

function randColor() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);

    let hex = toHex(r) + toHex(g) + toHex(b);

    let intValue = parseInt(hex.toLowerCase(), 16);

    let { hsl, h, s, l } = rgbToHsl(r, g, b);

    return {
        r,
        g,
        b,
        hex: '#' + hex,
        intValue,
        rgb: r + ',' + g + ',' + b,
        h,
        s,
        l,
        hsl,
    };
}

function toHex(num) {
    let hex = num.toString(16).toUpperCase();
    if (hex.length < 2) {
        hex = '0' + hex;
    }
    return hex;
}
function rgbToHsl(r, g, b) {
    (r /= 255), (g /= 255), (b /= 255);
    let max = Math.max(r, g, b),
        min = Math.min(r, g, b);
    let h,
        s,
        l = (max + min) / 2;

    if (max == min) {
        h = s = 0; // achromatic
    } else {
        let d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h /= 6;
    }

    let hsl =
        Math.round(h * 100) +
        '%, ' +
        Math.round(s * 100) +
        '%, ' +
        Math.round(l * 100) +
        '%';
    return { h, s, l, hsl };
}
