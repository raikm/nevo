/// <reference types="node" />

import { MiFloraDevice } from '@nevo/domain-types';
declare module 'miflora' {
  export class MiFlora {
    discover(options?: any): Promise<MiFloraDevice[]>;
  }
}
