Language : 🇺🇸 | [🇨🇳](./README.zh-CN.md) 

<p align="center">
  <a href="https://nextjs.org">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://assets.vercel.com/image/upload/v1662130559/nextjs/Icon_dark_background.png">
      <img src="https://assets.vercel.com/image/upload/v1662130559/nextjs/Icon_light_background.png" height="128">
    </picture>
    <h1 align="center">Next-Admin</h1>
  </a>
</p>

<div align="center">

An out-of-box UI solution for enterprise applications as a React boilerplate.



![](https://user-images.githubusercontent.com/8186664/44953195-581e3d80-aec4-11e8-8dcb-54b9db38ec11.png)

</div>

- Preview: http://preview.pro.ant.design
- Home Page: http://pro.ant.design
- Documentation: http://pro.ant.design/docs/getting-started
- ChangeLog: http://pro.ant.design/docs/changelog
- FAQ: http://pro.ant.design/docs/faq
- Mirror Site in China: http://ant-design-pro.gitee.io

## 1.0 is out! 🎉🎉🎉

[Next-Admin 1.0.0](https://github.com/ant-design/ant-design-pro/issues/8656)

## Translation Recruitment :loudspeaker:

We need your help: https://github.com/ant-design/ant-design-pro/issues/120

## Features

- :bulb: **TypeScript**: A language for application-scale JavaScript
- :scroll: **Blocks**: Build page with block template
- :gem: **Neat Design**: Follow [Ant Design specification](http://ant.design/)
- :triangular_ruler: **Common Templates**: Typical templates for enterprise applications
- :rocket: **State of The Art Development**: Newest development stack of React/umi/dva/antd
- :iphone: **Responsive**: Designed for variable screen sizes
- :art: **Theming**: Customizable theme with simple config
- :globe_with_meridians: **International**: Built-in i18n solution
- :gear: **Best Practices**: Solid workflow to make your code healthy
- :1234: **Mock development**: Easy to use mock development solution
- :white_check_mark: **UI Test**: Fly safely with unit and e2e tests

## Page Playground

```
- Dashboard
  - Analytic
  - Custom Dashboard
- List
  - Standard Table
  - Standard List
  - Card List
  - Search List (Project/Applications/Article)
- FormDesign
- MindMap
- Page Design
- Result
  - Success
  - Failed
- Exception
  - 403
  - 404
  - 500
- User
  - Login
  - Register
```

## Usage

### Use bash

We provide pro-cli to quickly initialize scaffolding.

```bash
# use npm
npm i @ant-design/pro-cli -g
pro create myapp
```

select umi version

```shell
🐂 Use umi@4 or umi@3 ? (Use arrow keys)
❯ umi@4
  umi@3
```

> If the umi@4 version is selected, full blocks are not yet supported.

If you choose umi@3, you can also choose the pro template. Pro is the basic template, which only provides the basic content of the framework operation. Complete contains all blocks, which is not suitable for secondary development as a basic template.

```shell
? 🚀 Full or a simple scaffold? (Use arrow keys)
❯ simple
  complete
```

Initialized Git repository:

```shell
$ git init myapp
```

Install dependencies:

```shell
$ cd myapp && tyarn
// or
$ cd myapp && npm install
```

## Browsers support

Modern browsers.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --- | --- | --- | --- | --- |
| Edge | last 2 versions | last 2 versions | last 2 versions | last 2 versions |

## Contributing

Any type of contribution is welcome, here are some examples of how you may contribute to this project:

- Use Ant Design Pro in your daily work.
- Submit [issues](http://github.com/ant-design/ant-design-pro/issues) to report bugs or ask questions.
- Propose [pull requests](http://github.com/ant-design/ant-design-pro/pulls) to improve our code.
