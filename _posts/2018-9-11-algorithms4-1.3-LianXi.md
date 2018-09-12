---
layout:       post
title:        "《算法-第四版》答案系列-1.3 练习篇"
subtitle:     "本系列是《算法-第四版》一书的课后习题答案"
date:         2018-09-11 12:00:00
author:       "solidSpoon"
header-img:   "img/post-bg.jpg"
header-mask:  0.3
catalog:      true
tags:
    - 算法第四版
---
> 最近开始学习《算法-第四版》一书，将我自己做的书后习题分享给大家，本篇是这一系列的第二篇，包含了书上<1.3 背包、队列和栈>的习题的练习部分,本篇习题位于 P101 ~ P107 ，如有错误，还请指正。

>本篇答案中部分 java 代码用到了书中的包，如需使用请去书中配套网站安装。

以下的答案在电脑端查看可以显示目录

#### 为 `FixedCapacityStackOfStrings` 添加一个方法 `isFull()`。

````java
    public boolean isFull(){
        return N == a.length;
    }
````

#### 1.3.2 给定以下输入，`java Stack` 的输出是什么?

    was best  times of the was the it 

#### 1.3.3 假设某个用例程序会进行一系列入栈和出栈的混合栈操作。入栈操作会将证书 0 到 9 按顺序压入栈；出栈操作会打印出返回值。下面哪种序列是不可能产生的？

````
a. 4 3 2 1 0 9 8 7 6 5
b. 4 6 8 7 5 3 2 9 0 1
c. 2 5 6 7 4 8 9 3 1 0
d. 4 3 2 1 0 5 6 7 8 9
e. 1 2 3 4 5 6 9 8 7 0
f. 0 4 6 5 3 8 1 7 2 9
g. 1 4 7 9 8 6 5 3 0 2
h. 2 1 4 3 6 5 8 7 9 0
````
