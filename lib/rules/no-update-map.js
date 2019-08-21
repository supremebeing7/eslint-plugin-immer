/**
 * @fileoverview Disallow mutating functions on Maps in immer
 * @author Mark Lehman
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

var isDraft = function isDraft(node) {
  if (node.type === "Identifier" && node.name === "draft") return true;
  if (node.type === "MemberExpression") return isDraft(node.object);
  if (node.type === "CallExpression") return isDraft(node.callee);
  return false;
};

var isMutatingFunction = function isMutatingFunction(node) {
  if (node.property.type !== "Identifier") return false;
  return ["set", "clear", "delete"].includes(node.property.name);
};

var ERROR_MESSAGE =
  "Cannot mutate Maps in immer - you must create a copy first, then assign to where you need it in the `draft`. Reference: https://github.com/immerjs/immer/blob/86be737d8502aeb351296afe28ceb3e506a3a2ec/readme.md#supported-object-types";

module.exports = {
  ERROR_MESSAGE,
  meta: {
    docs: {
      description: "Disallow mutating functions on Maps in immer",
      category: "Errors/Unexpected behavior",
      recommended: false
    },
    fixable: null, // or "code" or "whitespace"
    schema: []
  },
  create: function(context) {
    return {
      MemberExpression(node) {
        // Find where `set()`, `delete()`, or `clear()` is called
        if (isMutatingFunction(node)) {
          // Recursively walk the tree looking for the beginning,
          // then check if it is "draft"
          if (isDraft(node.object)) context.report(node, ERROR_MESSAGE);
        }
      }
    };
  }
};
