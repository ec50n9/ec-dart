# ec-dart

## 简介



## 功能

- when 条件匹配

- createPromise 创建 Promise

## 安装

```bash
pnpm i ec-dart
# or
npm i ec-dart
# or
yarn add ec-dart
```

## 使用方法

### when 匹配工具

```ts
// 字符串、正则、数字的匹配

const result2 = when([
  ["foo", "string foo"],
  [/^go/, "string start with go"],
  [1, "number 1"],
  [2, "number 2"],
  (x) => "没有匹配到: " + x,
])(value);
```

```ts
// 当只有字符串和数字匹配的情况会转换为对象键值配对的方式，效果一样，只是更快一点

const result2 = when([
  ["foo", "string foo"],
  ["bar", "string bar"],
  [1, "number 1"],
  [2, "number 2"],
  (x) => "没有匹配到: " + x,
])(15);
```

```ts
// 一个更全面一点的例子，展示了它支持的全部判断方式

const result = when([
  // 匹配字符串 foo
  ["foo", "string foo"],
  // 匹配数字
  [1, "number 1"],
  // 匹配正则表达式
  [/^go/, "string start with go"],
  // 用函数来计算匹配
  [(x) => x.length > 5, "string length > 5"],
  // 默认
  (x) => `匹配不到 ${x} 相关的值哦`,
])("go home");

console.log(result); // => string start with go
```

```ts
// 枚举匹配也挺方便的

enum Status {
  Pending,
  Success,
  Error,
}

const str = when<Status, string>([
  [Status.Pending, "pending"],
  [Status.Success, "success"],
  [Status.Error, "error"],
])(Status.Success);

console.log('str: ', str) // => str: success
```

对了，还可以直接用 `boolean` 值或者嵌套使用 `when()`，就像这样：

```ts
// 星期几
enum Day {
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
  Sunday,
}

// 传入今天天气以及今天星期几来计算今天做啥
const schedule = (sunny: boolean, day: Day) =>
  when([
    [Day.Saturday, "打篮球"], // 周六必打球
    [Day.Sunday, "钓鱼"], // 周日必钓鱼
    [Day.Friday, when([
      [sunny, "去图书馆"], // 周五晴天去图书馆
      () => "上课" // 周五阴天去上课
    ])()],
    [sunny, "去图书馆"], // 周一到周四，并且天气晴朗，就去图书馆
    () => "上课", // 周一到周四，阴天，那就上课
  ])(day);

console.log(schedule(true, Day.Saturday)); // 打篮球
console.log(schedule(true, Day.Sunday)); // 钓鱼
console.log(schedule(false, Day.Friday)); // 上课
console.log(schedule(true, Day.Friday)); // 去图书馆
console.log(schedule(true, Day.Monday)); // 去图书馆
console.log(schedule(false, Day.Monday)); // 上课
```
### createPromise

单纯是为了简化在 Promise 外部调用 resolve 的写法：

```ts
import { createPromise } from "ec-dart";

const { promise, resolve, reject } = createPromise();

promise.then((value) => {
  console.log(value); // => 42
});

resolve(42);
// reject('出错啦！！！')
```
