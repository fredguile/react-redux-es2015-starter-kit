import del from 'del';

export default function clean(inject) {
  const {gulp, webpackConfig} = inject;
  const deletePaths = [webpackConfig.backend.output.path, webpackConfig.frontend.output.path];

  gulp.task('clean', 'Clean files from previous build.', () => del(deletePaths));
}
