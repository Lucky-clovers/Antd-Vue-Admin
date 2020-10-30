const deepMerge = require('deepmerge')//深度合并
const _config = require('./config')
const {setting} = require('./default')
const config = deepMerge(setting, _config)

module.exports = config
