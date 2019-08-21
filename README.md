# eslint-plugin-immer

ESlint rules specific to the [immer](https://github.com/immerjs/immer) immutability package

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-immer`:

```
$ npm install eslint-plugin-immer --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-immer` globally.

## Usage

Add `immer` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "immer"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "immer/rule-name": 2
    }
}
```

## Supported Rules

* [no-update-map](https://github.com/supremebeing7/eslint-plugin-immer/blob/master/docs/rules/no-update-map.md)
