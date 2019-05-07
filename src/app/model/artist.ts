import { TrustedScriptString } from '@angular/core/src/sanitization/bypass';

export class Artist{

    constructor(
        public id: number,
        public name: string,
        public bio: string,
        public thumbnail?: string,
        public soundcloudUrl?: string
    ) {}
}