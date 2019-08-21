# Disallow mutating functions on Maps in immer (no-update-map)

## Rule Details

This rule warns/prevents users from using ES6 Maps incorrectly with immer. When used improperly, it can cause some disturbing behavior. For example, with React and Redux, improperly updating a Map on an immer `draft` proxy can rewrite the entire history of `state`!

Examples of **incorrect** code for this rule:

```js
// .set()
draft.objectProp.set(key, newValue)
draft.exampleFunction().secondFunction(1, 2).fakeArray[arrayIdx].objectProp.set(key, newValue);
// .delete()
draft.objectProp.delete(key)
draft.exampleFunction().secondFunction(1, 2).fakeArray[arrayIdx].objectProp.delete(key);
// .clear()
draft.objectProp.clear()
draft.exampleFunction().secondFunction(1, 2).fakeArray[arrayIdx].objectProp.clear();
```

Examples of **correct** code for this rule:

```js
draft.objectProp = newAssignment;
draft.exampleFunction().secondFunction(1, 2).fakeArray[arrayIdx].objectProp = newAssignment;
```

## When Not To Use It

As soon as immer supports ES6 Maps in ES5 mode (currently [targeted for 4.0 release](https://github.com/immerjs/immer/pull/354)), this rule should no longer be necessary

## Further Reading

https://github.com/immerjs/immer/blob/v3.2.0/readme.md#supported-object-types
