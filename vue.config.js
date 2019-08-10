module.exports = {
    pwa: {
        // configure the workbox plugin
        workboxOptions: {
            runtimeCaching: [ {
                urlPattern: new RegExp('^https://.*\.wikipedia\.org/api/'),
                handler: 'cacheFirst',
                options: {
                    cacheName: 'Wikipedia-api',
                    expiration: {
                        maxEntries: 1000,
                        maxAgeSeconds: 24 * 60 * 60, // A day
                    },
                    cacheableResponse: {
                        statuses: [0, 200]
                    }
                }
            },
            {
                urlPattern: new RegExp('^https://upload\.wikimedia\.org/wikipedia/commons/'),
                handler: 'cacheFirst',
                options: {
                    cacheName: 'Wikipedia-commons',
                    expiration: {
                        maxEntries: 10000,
                        maxAgeSeconds: 7 * 24 * 60 * 60, // A week
                    },
                    cacheableResponse: {
                        statuses: [0, 200]
                    }
                }
            }]
        }
    },
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            config.output.chunkFilename= '[name].bundle.js';
        } else {
            config.output.chunkFilename= '[name].bundle.js';
        }
      }
}