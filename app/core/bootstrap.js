import initHub from './initializers/initHub';
import initConfig from './initializers/initConfig';

export default function bootstrap() {
  return initHub().then(hub => initConfig(hub));
}
