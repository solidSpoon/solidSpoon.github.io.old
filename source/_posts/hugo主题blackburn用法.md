---
title: hugo 主题 blackburn 用法
date: 2021-02-16 21:04:19
updated: 
tags: 
categories: 
- 翻译
---

# Blackburn

Blackburn 是一个清爽的响应式 [Hugo](//gohugo.io) 主题。

<!-- more -->

## 概述

* 以 Yahoo's [Pure CSS](http://purecss.io/) (v1.0.0) 为基础。
* 带有社交链接的固定侧边栏：
  * Twitter
  * GNU social
  * Facebook
  * Google+
  * Weibo
  * Tumblr
  * Instagram
  * Flickr
  * 500px
  * Pinterest
  * YouTube
  * Vimeo
  * Vine
  * SlideShare
  * LinkedIn
  * Xing
  * Reddit
  * Hacker News
  * GitHub
  * GitLab
  * Bitbucket
  * Stack Overflow
  * Server Fault
  * Steam
  * MobyGames
  * Last.fm
  * Discogs
  * Keybase
* 由 [Highlight.js](//highlightjs.org) (v9.12.0) 提供客户端语法高亮显示
* 由 Google Analytics 提供网页分析
* 由 Disqus 提供评论系统
* 由 Font Awesome (v5.9.0) 提供图标

## 示例网站

* [示例网站](http://themes.gohugo.io/theme/blackburn/)
* 你也可以到我的个人站点看到实际运转的网站 [跳转](http://yoshiharuyamashita.com/)

## 网页快照
```
{{< fluid_imgs
  "pure-u-1-1|https://ced-md-picture.oss-cn-beijing.aliyuncs.com/img/20200608144024.png|网页快照"
>}}
```

![](https://ced-md-picture.oss-cn-beijing.aliyuncs.com/img/20201208172153.png)

## 安装

在你的 Hugo 站点目录运行如下命令：

```shell
$ mkdir themes
$ cd themes
$ git clone https://github.com/yoshiharuyamashita/blackburn.git
```

或直接从 [这里](//github.com/yoshiharuyamashita/blackburn/archive/master.zip) 下载。

浏览 [Hugo Quickstart Guide](//gohugo.io/overview/quickstart/) 以获得更多信息。

## 配置

例如 config.toml:

```toml
baseurl = "https://www.example.com/" # Make sure to end baseurl with a '/'
title = "Your site title"
author = "Your name"
# Shown in the side menu
copyright = "&copy; 2016. All rights reserved."
canonifyurls = true
paginate = 10

[indexes]
  tag = "tags"
  topic = "topics"

[params]
  # Shown in the home page
  subtitle = "A Hugo Theme"
  brand = "Blackburn"
  googleAnalytics = "Your Google Analytics tracking ID"
  disqus = "Your Disqus shortname"
  # CSS name for highlight.js
  highlightjs = "androidstudio"
  highlightjs_extra_languages = ["yaml"]
  dateFormat = "02 Jan 2006, 15:04"
  # Include any custom CSS and/or JS files
  # (relative to /static folder)
  custom_css = ["css/my.css"]
  custom_js = ["js/my.js"]

  [params.piwikAnalytics]
    siteid = 2
    piwikroot = "//analytics.example.com/"

[menu]
  # Shown in the side menu.
  [[menu.main]]
    name = "Home"
    pre = "<i class='fa fa-home fa-fw'></i>"
    weight = 1
    identifier = "home"
    url = "/"
  [[menu.main]]
    name = "Posts"
    pre = "<i class='fa fa-list fa-fw'></i>"
    weight = 2
    identifier = "post"
    url = "/post/"
  [[menu.main]]
    name = "About"
    pre = "<i class='fa fa-user fa-fw'></i>"
    weight = 3
    identifier = "about"
    url = "/about/"
  [[menu.main]]
    name = "Contact"
    pre = "<i class='fa fa-phone fa-fw'></i>"
    weight = 4
    url = "/contact/"

[social]
  # Link your social networking accounts to the side menu
  # by entering your username or ID.

  # SNS microblogging
  twitter = "*"
  gnusocial = "*" # Specify href (e.g. https://quitter.se/yourusername)
  facebook = "*"
  googleplus = "*"
  weibo = "*"
  tumblr = "*"

  # SNS photo/video sharing
  instagram = "*"
  flickr = "*"
  photo500px = "*"
  pinterest = "*"
  youtube = "*"
  vimeo = "*"
  vine = "*"
  slideshare = "*"

  # SNS career oriented
  linkedin = "*"
  xing = "*"

  # SNS news
  reddit = "*"
  hackernews = "*"

  # Techie
  github = "yoshiharuyamashita"
  gitlab = "*"
  bitbucket = "*"
  stackoverflow = "*"
  serverfault = "*"

  # Gaming
  steam = "*"
  mobygames = "*"

  # Music
  lastfm = "*"
  discogs = "*"

  # Other
  keybase = "*"
```

## 用法

* 在 `content/post` 目录下编写 Markdown 文件。
* 在 config.toml 文件中的 `[menu]` 下定义一个在侧边栏中显示的固定页面（例如 about.md)。

```toml
[[menu.main]]
  name = "About"
  pre = "<i class='fa fa-user fa-fw'></i>"
  weight = 2
  identifier = "about"
  url = "/about/"
```

* 通过连接到定制的 CSS 文件或 URL 来重写主题：

```toml
[params]
  custom_css = ["css/my.css"]
```

* 通过链接到定制的 JS 文件或 URL 来添加新的行为：

```toml
[params]
  custom_js = ["js/my.js", "https://cdnjs.cloudflare.com/ajax/libs/zooming/1.4.2/zooming.min.js"]
```

## 短代码

### pure 表格

```
{\{< pure_table
  "columnName1|columnName2|...|columnName99"
  "dataValue1|dataValue2|...|dataValue99"
  "dataValue1|dataValue2|...|dataValue99"
  "dataValue1|dataValue2|...|dataValue99"
  "... and so on"

>}}
```

其中每个定位参数都被竖线 ‘|’ 分开，产生的 `<table>` 被赋予了 `class="pure-table pure-table-striped"`.[更多](https://purecss.io/tables/)

**效果**
```
{{< pure_table
  "columnName1|columnName2|...|columnName99"
  "dataValue1|dataValue2|...|dataValue99"
  "dataValue1|dataValue2|...|dataValue99"
  "dataValue1|dataValue2|...|dataValue99"
  "... and so on"
>}}
```
### 流体图像

```
{\{< fluid_imgs
  "class|src|alt"
  "class|src|alt"
  "... and so on"
>}}
```

其中每个定位参数都呗竖线 ‘|’ 分开。

- `class`: 指定一个 Pure CSS 单位类名 （**必须**）
- `src`: 指定图像的 URL（**必须**）
- `alt`: 指定图片的替换文字 （可选）

点击 [这里](http://yoshiharuyamashita.com/post/hugo-shortcode-to-show-multiple-images/) 来查看示例。

#### `class` 示例

**1. 利用 `pure-u-1-3` 显示三个图像**

```

{{< fluid_imgs
  "pure-u-1-3|https://ced-md-picture.oss-cn-beijing.aliyuncs.com/img/20200608154234.png|小狗"
  "pure-u-1-3|https://ced-md-picture.oss-cn-beijing.aliyuncs.com/img/20200608154234.png|小狗"
  "pure-u-1-3|https://ced-md-picture.oss-cn-beijing.aliyuncs.com/img/20200608154234.png|小狗"

>}}

**2. 利用 `pure-u-1-2` 显示两个图像**

{{< fluid_imgs
  "pure-u-1-2|https://ced-md-picture.oss-cn-beijing.aliyuncs.com/img/20200608154234.png|小狗"
  "pure-u-1-2|https://ced-md-picture.oss-cn-beijing.aliyuncs.com/img/20200608154234.png|小狗"
>}}

**3. 利用 `pure-u-1-3` 显示六个图像**

{{< fluid_imgs
  "pure-u-1-3|https://ced-md-picture.oss-cn-beijing.aliyuncs.com/img/20200608154234.png|小狗"
  "pure-u-1-3|https://ced-md-picture.oss-cn-beijing.aliyuncs.com/img/20200608154234.png|小狗"
  "pure-u-1-3|https://ced-md-picture.oss-cn-beijing.aliyuncs.com/img/20200608154234.png|小狗"
  "pure-u-1-3|https://ced-md-picture.oss-cn-beijing.aliyuncs.com/img/20200608154234.png|小狗"
  "pure-u-1-3|https://ced-md-picture.oss-cn-beijing.aliyuncs.com/img/20200608154234.png|小狗"
  "pure-u-1-3|https://ced-md-picture.oss-cn-beijing.aliyuncs.com/img/20200608154234.png|小狗"
>}}

**4. 利用 `pure-u-1-1` 显示一个图像**

{{< fluid_imgs
  "pure-u-1-1|https://ced-md-picture.oss-cn-beijing.aliyuncs.com/img/20200608154234.png|小狗"
>}}

### 流体图像 （弃用）

#### Positional


{{% fluid_img "https://ced-md-picture.oss-cn-beijing.aliyuncs.com/img/20200606125754.png" %}}
```

#### Named

```
{{% fluid_img class="pure-u-1-2" src="/path/to/img" alt="img description" %}}
{{% fluid_img class="pure-u-1-3" src="/path/to/img" caption="img description" %}}
```

* `class`, `alt` and `caption` are optional.
* See [Pure CSS Grids](http://purecss.io/grids/) for possible `class` values.

## 许可证

* [MIT](//opensource.org/licenses/MIT)