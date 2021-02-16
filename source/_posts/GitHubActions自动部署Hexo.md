---
title: GitHub Actions 自动部署 Hexo
date: 2021-02-16 17:22:03
tags:
---

简单介绍下 GitHub Actions 中的术语：

- workflow：表示一次持续集成的过程
- job：构建任务，一个 workflow 可以由一个或者多个 job 组成，可支持并发执行 job
- step：一个 job 由一个或多个 step 组成，按顺序依次执行
- action：每个 step 由一个或多个 action 组成，按顺序依次执行
## 博客工程
采用源码与部署放置在不同分支的方式，在本教程中

- 部署分支为：`master`
- 源码分支为：`MyBlog2021`
## 生成公私钥
在源码分支通过下面命令生成公钥私钥
```bash
git checkout MyBlog2021
ssh-keygen -t rsa -b 4096 -C "$(git config user.email)" -f github-deploy-key -N ""
```
目录中生成两个文件：

- `github-deploy-key.pub` — 公钥文件
- `github-deploy-key` — 私钥文件



> 公钥和私钥切记要添加到 `.gitignore` 中！！！

## GitHub 添加公钥
在 GitHub 中博客工程中按照 `Settings->Deploye keys->Add deploy key` 找到对应的页面，然后进行公钥添加。该页面中 `Title` 自定义即可，`Key` 中添加 `github-deploy-key.pub` 文件中的内容。

![image.png](https://cdn.nlark.com/yuque/0/2021/png/1548042/1613468496216-29690050-70f8-4fb0-adcb-03cf28e1cf13.png##align=left&display=inline&height=417&margin=%5Bobject%20Object%5D&name=image.png&originHeight=833&originWidth=1698&size=98406&status=done&style=none&width=849)
> 注意：切记不要多复制空格!!!
> 切记要勾选 Allow write access，否则会出现无法部署的情况。

## GitHub 添加私钥
在 GitHub 中博客工程中按照 `Settings->Secrets->Add a new secrets` 找到对应的页面，然后进行私钥添加。该页面中 `Name` 自定义即可，`Value` 中添加 `github-deploy-key` 文件中的内容。

我的名字叫做 `HEXO_DEPLOY_PRI`，这个跟下文的配置文件保持一致就行
![image.png](https://cdn.nlark.com/yuque/0/2021/png/1548042/1613468640620-8fe657b6-b244-40cc-a7cc-5dc710ffc865.png##align=left&display=inline&height=442&margin=%5Bobject%20Object%5D&name=image.png&originHeight=884&originWidth=1839&size=147834&status=done&style=none&width=919.5)
## 创建编译脚本
在博客源码分支（我这里是 `MyBlog2021` 分支）中创建 `.github/workflows/deployblog.yml` 文件，内容如下：

```yaml
name: Deploy Blog
on:
  push:
    branches:
      - MyBlog2021
jobs:
  build:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: 
          - 14.x

    steps:
      - name: Checkout source
        uses: actions/checkout@v1
        with:
          ref: MyBlog2021
      - name: Use Node.js ${{ matrix.node_version }}
        uses: actions/setup-node@v2
        with:
          node-version: ${{ matrix.node_version }}
      - name: Configuration environment
        env:
          ACTION_DEPLOY_KEY: ${{ secrets.HEXO_DEPLOY_PRI }}
        run: |
          mkdir -p ~/.ssh/
          echo "$ACTION_DEPLOY_KEY" > ~/.ssh/id_rsa
          chmod 600 ~/.ssh/id_rsa
          ssh-keyscan github.com >> ~/.ssh/known_hosts
          git config --global user.email "lujiahao0708@gmail.com"
          git config --global user.name "lujiahao0708"
      - name: Config hexo 
        run: |  
          sudo npm install hexo-cli -g
          sudo npm install
      - name: Hexo deploy
        run: |
          hexo clean
          hexo d

```
## Hexo 配置
在项目根目录中修改 `_config.yml` ，增加部署相关内容：
```yaml
deploy:
  type: git
  repo: 博客项目的资源地址.git
  branch: master
```
## 验证
push 好我们的分支之后，在项目 Action 目录即可看到
![image.png](https://cdn.nlark.com/yuque/0/2021/png/1548042/1613469082707-ac72ddb3-6303-4210-b3b1-e057120d4c7b.png##align=left&display=inline&height=228&margin=%5Bobject%20Object%5D&name=image.png&originHeight=456&originWidth=1850&size=69817&status=done&style=none&width=925)

---

- [https://zhuanlan.zhihu.com/p/133764310](https://zhuanlan.zhihu.com/p/133764310)
