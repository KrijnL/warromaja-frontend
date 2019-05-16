export class Product {

    constructor(
        public id: number,
        public name: string,
        public bio: string,
        public thumbnail?: string,
        public soundcloudUrl?: string
    ) {}
}
