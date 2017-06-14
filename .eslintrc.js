// .eslintrc.js
module.exports = {
    "extends": "airbnb",
    "plugins": [
        "react",
        "jsx-a11y",
        "import"
    ],
  "rules": {
        "no-underscore-dangle": [2, { "allow": ["_id"] }],
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
        "react/prefer-stateless-function": [0, { "ignorePureComponents":true }],
    },
    
};