import path from 'path'

export default {
  alias: {
    '/@services/': path.resolve(__dirname, './src/services'),
    '/@components/': path.resolve(__dirname, './src/components'),
  },
}
