module.exports = {
  "parser": "babel-eslint",
  "extends": [
    "plugin:react/recommended",
    "airbnb"
  ],
  "env": {
    "browser": true,
    "node": true
  },
  "settings": {
    "import/resolver": {
      "webpack": {
        "config": "./config/webpack.base.js"
      }
    }
  },
  "plugins": [
    // ...
    "react-hooks"
  ],
  "rules": {
    "indent": ["error", 4],
    "no-tabs": "off",
    "jsx-a11y/click-events-have-key-events": 0,
    "jsx-a11y/no-static-element-interactions": 0,
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "react/jsx-indent": [2, 4],
    "react/jsx-props-no-spreading": 0,
    "jsx-a11y/no-noninteractive-element-interactions": 0,
    "no-mixed-spaces-and-tabs": "off",
    "react/prefer-stateless-function": 0,
    "import/no-unresolved": 0,
    "react/no-array-index-key": 0,
    "react/jsx-indent-props": [2, 4],
    "no-extraneous-dependencies": 0,
    "no-param-reassign": ["error", { "props": false }], 
    "react/forbid-prop-types": 0,
    "no-nested-ternary": 0,
    "no-underscore-dangle": 0,
    "no-param-reassign": 1,
    "class-methods-use-this": 1,
    "max-len" : ["error", {code : 300}] ,
    "react-hooks/rules-of-hooks": "error", // 检查 Hook 的规则
    "react-hooks/exhaustive-deps": 0, // 检查 effect 的依赖
    "linebreak-style": 0,
    "no-unused-expressions": 0,
    "prefer-destructuring": 1,
    "no-plusplus": 0
  }
}