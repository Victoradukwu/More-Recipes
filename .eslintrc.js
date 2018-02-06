module.exports = {
    "extends":['plugin:react/recommended'],
    "plugins": [
      "react",
      "jsx-a11y",
      "import",
    ],
    "rules": {
      "max-len": [1, 80, 2],
    },
    "parser": "babel-eslint",
    "rules": {
        "max-len": [0, 80, 2],
        "jsx-a11y/anchor-is-valid": 0,
        "react/forbid-prop-types": 0,
        "react/require-default-props": 0,
        "one-var": 0,
        "one-var-declaration-per-line": 0,
        "new-cap": 0,
        "consistent-return": 0,
        "no-param-reassign": 0,
        "comma-dangle": 0,
        "linebreak-style": ["off", "windows"],
        "curly": ["error", "multi-line"],
        "import/no-unresolved": [2, { "commonjs": true }],
        "no-shadow": ["error", { "allow": ["req", "res", "err"] }],
        "valid-jsdoc": ["off", {
          "requireReturn": true,
          "requireReturnType": true,
          "requireParamDescription": false,
          "requireReturnDescription": true
        }],
        "require-jsdoc": ["off", {
            "require": {
                "FunctionDeclaration": true,
                "MethodDefinition": true,
                "ClassDeclaration": true
            }
        }],
        "prefer-destructuring": ["off", {
          "array": true,
          "object": true
        }, {
          "enforceForRenamedProperties": false
        }]
      },
      "globals": {
        "underscoreUtils": true,
        "localStorage": true,
        "window": true,
        "$": true,
        "document": true,
        "Firebase":true
      }
  };