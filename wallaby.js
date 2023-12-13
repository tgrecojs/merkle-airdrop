export default function () {
  return {
    testFramework: 'ava',
    files: [
      'src/**/*.js',
      'lib/**/*.js',
      'package.json', // important
    ],
    tests: [
      'test/**/*.test.js',
      '!test/support/**/*',
      '!src/**/*.js',
    ],
    env: {
      type: 'node',
      params: {
        runner: '--experimental-vm-modules' // important
      }
    },
    workers: { restart: true } // important
  }
}