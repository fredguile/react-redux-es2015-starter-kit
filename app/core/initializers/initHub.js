import {resolve} from 'bluebird';

import hub from '../hub';

export default function initHub() {
  return resolve(hub);
}
