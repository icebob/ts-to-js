# ts-to-js
It's a CLI too which is able to convert Typescript files to (readable) Javascript files. It uses [ts-blank-space](https://github.com/bloomberg/ts-blank-space) to remove the types from typescript files and convert them to blank spaces. After that, it uses [Prettier](https://prettier.io/) to format the code to a more readable Javascript code.

# Example

**Typescript**
```ts
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
```

**Javascript**
```js
                                           

                    
                  
 

export class C    extends Array                        {
           field         ;

    method   (                a         )       {
       this.field = a          ;
    }
}

```

**Javascript with Prettier**
```js
export class C extends Array {
  field;

  method(a) {
    this.field = a;
  }
}
```

# Installation
```bash
npm install -g @icebob/ts-to-js
```

# Usage

**Print the result to the console**
```bash
$ ts-to-js file.ts
```

**Write the result to a file and use prettier**
```bash
$ ts-to-js --prettier file.ts file.js
```

**Convert all .ts files in a directory**
```bash
$ ts-to-js --prettier src dist
```

# Options

- `--prettier, -p`: Format the output with Prettier

## License
ts-to-js is available under the [MIT license](https://tldrlegal.com/license/mit-license).

## Contact

Copyright (C) 2025 Icebob

[![@icebob](https://img.shields.io/badge/github-icebob-green.svg)](https://github.com/icebob) [![@icebob](https://img.shields.io/badge/twitter-Icebobcsi-blue.svg)](https://twitter.com/Icebobcsi)