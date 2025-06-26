import type { MyType } from './types.d.ts';

interface HasField {
    field: string;
}

export class C<T> extends Array<T> implements HasField {
    public field!: string;

    method<T>(this: HasField, a?: MyType): void {
       this.field = a as string;
    }
}
