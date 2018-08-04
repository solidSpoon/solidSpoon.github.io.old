---
layout:       post
title:        "《算法-第四版》答案系列-1.2 练习篇"
subtitle:     "本系列是《算法-第四版》一书的课后习题答案"
date:         2018-08-04 12:00:00
author:       "ShaLin"
header-img:   "img/in-post/home-bg-art.jpg"
header-mask:  0.3
catalog:      true
tags:
    - 算法第四版
---
> 最近开始学习《算法-第四版》一书，将我自己做的书后习题分享给大家，本篇是这一系列的第二篇，包含了书上<1.2 数据抽象>的习题的练习部分,本篇习题位于P71 ~ P73 ，如有错误，还请指正。

>本篇答案中部分java代码用到了书中的包，如需使用请去书中配套网站安装。

以下的答案在电脑端查看可以显示目录

### 练习

##### 1.2.1 编写一个 `Point2D` 的用例，从命令行接受一个整数 N 。在单位正方形中生成 N 个随机点，然后计算两点之间的最接近距离。
````java
import edu.princeton.cs.algs4.*;
public class q121{
    public static void main(String[] args){
        int N = Integer.parseInt(args[0]);
        Point2D[] p = new Point2D[N];
        double min = 2.00;
        for (int t = 0; t < N; t++){
            double x = Math.random();
            double y = Math.random();
            p[t] = new Point2D(x, y);
            p[t].draw();
        }
        for (int i = 0; i < N-1; i++){
            for (int j = i+1; j < N; j++){
                if (p[i].distanceTo(p[j]) < min){
                    min = p[i].distanceTo(p[j]);
                }
            }
        }
        StdOut.print("两点之间最近的距离是：" + min);
    }
}
````

##### 1.2.2 编写一个 `Interval1D` 的用例，从命令行接受一个整数 N 。从保准输入中读取 N 个间隔（每个间隔有一对 double 值定义）并打印出所有相交的间隔对。
````java
import edu.princeton.cs.algs4.*;
public class q122{
    public static void main(String[] args){
        int N = Integer.parseInt(args[0]);
        double[] d = new double[2*N];
        for (int i = 0; i < d.length; i++){
            d[i] = StdIn.readDouble();
        }
        
        Interval1D[] interval = new Interval1D[N];
        for (int i = 0; i < N; i++){
            interval[i] = new Interval1D(d[2*i], d[2*i+1]);
        }
        for (int i = 0; i < N-1; i++){
            for (int j = i+1; j < N; j++){
                if (interval[i].intersects(interval[j])){
                StdOut.println("Interval(" + d[2*i] + ", " + d[2*i+1]+ ") intersects with interval(" + d[2*j] +", "+ d[2*j+1] + ").");
                }
            }
        }
    }
}
````
````
运行结果：

java q122 5
.3 .5 .7 .9 .1 .3 .6 .8 .8 .9

Interval(0.3, 0.5) intersects with interval(0.1, 0.3).
Interval(0.7, 0.9) intersects with interval(0.6, 0.8).
Interval(0.7, 0.9) intersects with interval(0.8, 0.9).
Interval(0.6, 0.8) intersects with interval(0.8, 0.9).
````

##### 1.2.3 编写一个 `Interval2D` 的用例，从命令行接受参数 N、 min 和 max 。生成 N 个随机的 2D 间隔，其宽和高均匀地分布在单位正方形中的 min 和 max 之间。用 `StdDraw` 画出他们并打印出相交的间隔对的数量以及有包含关系的间隔对数量。
````java
import edu.princeton.cs.algs4.*;
public class q123{
    public static void main(String[] args){
        int N = Integer.parseInt(args[0]);
        double min = Double.parseDouble(args[1]);
        double max = Double.parseDouble(args[2]);
        double[] point = new double[N*4];
        Point2D[] point2D = new Point2D[N*2];//每个框对角线上的点 
        Interval1D[] interval1D = new Interval1D[N*2];
        Interval2D[] interval2D = new Interval2D[N];
        for (int i = 0; i < interval1D.length; i++){
            double a;
            double b;
            do{
                a = StdRandom.uniform(min, max);
                b = StdRandom.uniform(min, max);
            }while (a >= b);
            point[i*2] = a;
            point[i*2+1] = b;
            interval1D[i] = new Interval1D(a, b);
        }
        for (int i = 0; i< interval2D.length; i++){
        interval2D[i] = new Interval2D(interval1D[2*i], interval1D[2*i+1]);
        interval2D[i].draw();
        }
        for (int i = 0; i< interval2D.length; i++){
            point2D[i*2] = new Point2D(point[i*4], point[i*4+3]);
            point2D[i*2+1] = new Point2D(point[i*4+1], point[i*4+2]);
            
        }
        int intersectnum = 0;//相交的个数
        for (int i = 0, k = -1; i < N-1; i++){
            for (int j = i+1; j < N; j++){
                if (interval2D[i].intersects(interval2D[j])){
                    intersectnum++;
                 }
            }
        }
        int includenum = 0;//包含的个数
        for (int i = 0; i < N; i++){//从不相交的中选出包含的
            for (int j = 0;j < N; j++){
                if(interval2D[i].contains(point2D[2*j]) && interval2D[i].contains(point2D[2*j+1]) && i != j){
                    includenum++;
                }
            }
        }
        StdOut.println("inersect:" + intersectnum + ";includenum:" + includenum);
    }
}
````
````
命令：
java q123 10 0.1 0.9
运行结果：
inersect:27;includenum:1
````
![](\img\in-post\2018\8\4\q123.jpg)
