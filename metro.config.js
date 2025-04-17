const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

config.resolver.sourceExts.push("jsx", "js", "ts", "tsx");

module.exports = config;
