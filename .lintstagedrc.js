const escape = require('shell-quote').quote
const isWin = process.platform === 'win32'

module.exports = {
  '**/*.{js,ts}?(x)': (filenames) => {
    const escapedFileNames = filenames
      .map((filename) => `"${isWin ? filename : escape([filename])}"`)
      .join(' ')
    return [
      `prettier --ignore-unknown --write ${escapedFileNames}`,
      `next lint --fix --file ${filenames
        .map((file) => file.split(process.cwd())[1])
        .join(' --file ')}`,
    ]
  },
  '**/*.{json,md,mdx,css,html,yml,yaml,scss}': (filenames) => {
    const escapedFileNames = filenames
      .map((filename) => `"${isWin ? filename : escape([filename])}"`)
      .join(' ')
    return [`prettier --ignore-unknown --write ${escapedFileNames}`]
  },
}
