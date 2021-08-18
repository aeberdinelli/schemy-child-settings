const Plugin = {
    // Minimum schemy version
    REQUIRES_VERSION: '3.1.0',

    versionCheck() {
        if (!Plugin.Schemy || !Plugin.Schemy.getVersion) {
            throw new Error(
                `Schemy object is not currently available within the plugin. Check you are using schemy version ${Plugin.REQUIRES_VERSION} or above`
            );
        }

        const [ major, minor ] = Plugin.Schemy.getVersion().split(/\./g).map(value => parseInt(value));
        const [ reqMajor, reqMinor ] = Plugin.REQUIRES_VERSION.split(/\./g).map(value => parseInt(value));

        if (major < reqMajor || (major === reqMajor && minor < reqMinor)) {
            throw new Error(`Child Settings plugin requires schemy version ${Plugin.REQUIRES_VERSION} or above`);
        }
    },

    beforeParse(schema) {
        Plugin.versionCheck();

        for (var [key, properties] of Object.entries(schema)) {
            if (typeof properties === 'object' && typeof properties.schema !== 'undefined') {
                try {
                    schema[key] = {
                        type: new Plugin.Schemy(properties.schema, properties.settings || {})
                    };
                }
                catch (err) {}
            }
        }
    }
}

module.exports = Plugin;