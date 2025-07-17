// .prettierrc.cjs 文件 PS:后缀.js可能会报CommonJS 语法错误（如下），将后缀改为.cjs即可
module.exports = {
  semi: true, // 强制在语句末尾使用分号。
  trailingComma: 'none', // 不允许在多行结构的最后一个元素或属性后添加逗号。\
  singleQuote: true, // 使用单引号而不是双引号来定义字符串。
  printWidth: 80, // 指定每行代码的最大字符宽度，超过这个宽度的代码将被换行
  arrowParens: 'avoid' // 箭头函数参数只有一个时是否要有小括号（avoid - 省略）

  // 其他更多配置
  // bracketSpacing: true, // 在对象，数组括号与文字之间加空格 "{ foo: bar }"
  // disableLanguages: ['vue'], // 不格式化vue文件，vue文件的格式化单独设置
  // endOfLine: 'auto', // 结尾是 \n \r \n\r auto
  // eslintIntegration: false, //不让prettier使用eslint的代码格式进行校验
  // htmlWhitespaceSensitivity: 'ignore',
  // ignorePath: '.prettierignore', // 不使用prettier格式化的文件填写在项目的.prettierignore文件中
  // jsxBracketSameLine: true, // 在jsx中把'>' 是否单独放一行
  // jsxSingleQuote: true, // 在jsx中使用单引号代替双引号
  // parser: 'babylon', // 格式化的解析器，默认是babylon
  // requireConfig: false, // Require a 'prettierconfig' to format prettier
  // stylelintIntegration: false, //不让prettier使用stylelint的代码格式进行校验
  // trailingComma: 'es5', // 在对象或数组最后一个元素后面是否加逗号（在ES5中加尾逗号）
  // tslintIntegration: false // 不让prettier使用tslint的代码格式进行校验=
};
