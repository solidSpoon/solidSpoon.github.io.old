---
layout:       post
title:        "《算法-第四版》答案系列-1.1 提高题篇"
subtitle:     "本系列是《算法-第四版》一书的课后习题答案"
date:         2018-07-28 12:00:00
author:       "ShaLin"
header-img:   "img/in-post/home-bg-art.jpg"
header-mask:  0.3
catalog:      true
tags:
    - 算法第四版
---
> 最近开始学习《算法-第四版》一书，将我自己做的书后习题分享给大家，本篇是这一系列的第一篇，包含了书上<1.1 基础编程模型>的习题的提高题部分,本篇习题位于P32 ~ P37 ，如有错误，还请指正。

>本篇答案中部分java代码用到了书中的包，如需使用请去书中配套网站安装。

以下的答案在电脑端查看可以显示目录

###### ·[练习篇](\2018\07\25\algorithms4-1.1-LianXi) ----- [在新标签页打开](\2018\07\25\algorithms4-1.1-LianXi){:target="_blank"}

### 提高题

##### 1.1.26 将三个数字排序。假设 a、b、c 和 t 都是同一种原始数字类型的变量。证明以下代码能够将 a、b、c 按照升序排列：
    if (a > b) { t = a; a = b; b = t }    ==> 此时，a一定为 a、b 中的较小者
    if (a > c) { t = a; a = c; c = t }    ==> 此时，a一定为 a、b、c 中的最小者
    if (b > c) { t = b; b = c; c = t }    ==> 此时，c一定为 a、b、c 中的最大者，a、b、c 按照升序排列

##### 1.1.27 二项分布。估计用以下代码计算 `binomial(100, 50, 0.25)` 将会发生的递归调用次数：

````java
public static double binomial(int N, int k, double p){
    if (N == 0 && k == 0)
}
````