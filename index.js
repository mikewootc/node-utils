'use strict'

const fs = require('fs');

/**
 * 获取版本号(js文件中定义)
 *   版本号需要为单行字符串变量定义: const VERSION = '1.2.3';
 *
 * @param {string} versionFilePath 版本号js文件路径
 * @returns {{version:string, major:string, minor:string, patch:string}}
 */
function getVersion(versionFilePath) {
    try {
        let versionFileText = fs.readFileSync(versionFilePath, 'utf8');
        let lstVersionFileText = versionFileText.split(/\r?\n/);
        let ret = {};
        lstVersionFileText.forEach((line) => {
            if (line.search(/const VERSION = '\d+\.\d+\.\d+';/) >= 0) {
                //console.log('got version line');
                let strVersion = line.match(/\d+\.\d+\.\d+/)[0];
                //console.log('strVersion', strVersion);
                let version = strVersion.split('.');
                ret = {version: strVersion, major: version[0], minor: version[1], patch: version[2]}
            }
        });

        return ret;
    } catch(err) {
        throw err;
    }
}

module.exports = {
    getVersion,
};


// vim:set tw=0:
