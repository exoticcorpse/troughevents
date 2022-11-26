require('isomorphic-fetch')
const path = require('path')
const fs = require('fs')

const downloadJS = async ($, outputDir, siteId) => {
  try {
    const scripts = $('script[src*="jquery"]')
    let file = null
    $(scripts).each(async (i, el) => {
      const src = $(el).attr('src')
      file = src
      if (file) {
        const filename = new URL(file).pathname.split('/').pop()
        if (!fs.existsSync(path.join(__dirname, `/../../../${outputDir}/flowty/js/${filename}`))) {
          const mainJS = path.join(__dirname, `/../../../${outputDir}/flowty/js/${filename}`)
          const response = await fetch(file)
          const data = await response.text()
          fs.writeFileSync(mainJS, data)
        }

        $(el).attr('src', `/flowty/js/${filename}?site=${siteId}`)
      } else {
        throw new Error('No jQuery script found')
      }
    })
  } catch (error) {
    throw new Error('Error downloading jQuery')
  }

  return $
}

module.exports = downloadJS
