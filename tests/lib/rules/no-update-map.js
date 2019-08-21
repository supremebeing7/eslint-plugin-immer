/**
 * @fileoverview Disallow mutating functions on Maps in immer
 * @author Mark Lehman
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/no-update-map"),
  RuleTester = require("eslint").RuleTester;

RuleTester.setDefaultConfig({
  parserOptions: {
    ecmaVersion: 6
  }
});

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("no-update-map", rule, {
  valid: [
    {
      code:
        "draft.exampleFunction().secondFunction(1, 2).fakeArray[arrayIdx].objectProp = newAssignment;"
    }
  ],

  invalid: [
    {
      code:
        "draft.exampleFunction().secondFunction(1, 2).fakeArray[arrayIdx].objectProp.set(key, newValue);",
      errors: [
        {
          message: rule.ERROR_MESSAGE,
          type: "MemberExpression"
        }
      ]
    },
    {
      code:
        "draft.exampleFunction().secondFunction(1, 2).fakeArray[arrayIdx].objectProp.delete(key);",
      errors: [
        {
          message: rule.ERROR_MESSAGE,
          type: "MemberExpression"
        }
      ]
    },
    {
      code:
        "draft.exampleFunction().secondFunction(1, 2).fakeArray[arrayIdx].objectProp.clear();",
      errors: [
        {
          message: rule.ERROR_MESSAGE,
          type: "MemberExpression"
        }
      ]
    }
  ]
});
