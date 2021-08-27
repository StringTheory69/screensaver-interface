const withImages = require("next-images");

module.exports = withImages({
    images: {
      domains: ['screensaver.mypinata.cloud', 'images.unsplash.com'],
    }
})