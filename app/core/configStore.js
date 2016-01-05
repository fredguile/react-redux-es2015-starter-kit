import cluster from 'cluster';
import SharedStore from 'shared-store';
import fileContent from 'shared-store/file';

export default new SharedStore({
  temp: 'tmp/config',

  loader(options) {
    return fileContent(options.filename, {
      watch: true
    });
  },

  active: process.env.NODE_ENV === 'development' || cluster.isMaster()
});
