import SharedStore from 'shared-store';
import fileContent from 'shared-store/file';

const WATCH_INTERVAL = 2000; // 2s

export default new SharedStore({
  loader: opts => fileContent(opts.filename, {watch: false, interval: WATCH_INTERVAL, root: opts.root}),
  temp: 'tmp/config'
});
