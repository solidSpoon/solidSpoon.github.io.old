---
layout:       post
title:        "《算法-第四版》答案系列-1.1 实验题篇"
subtitle:     "本系列是《算法-第四版》一书的课后习题答案"
date:         2018-07-30 12:00:00
author:       "ShaLin"
header-img:   "img/in-post/home-bg-art.jpg"
header-mask:  0.3
catalog:      true
tags:
    - 算法第四版
---
> 最近开始学习《算法-第四版》一书，将我自己做的书后习题分享给大家，本篇是这一系列的第一篇，包含了书上<1.1 基础编程模型>的习题的实验题部分,本篇习题位于P32 ~ P37 ，如有错误，还请指正。

>本篇答案中部分java代码用到了书中的包，如需使用请去书中配套网站安装。

以下的答案在电脑端查看可以显示目录

###### ·[练习篇](\2018\07\25\algorithms4-1.1-LianXi) ----- [在新标签页打开](\2018\07\25\algorithms4-1.1-LianXi){:target="_blank"}

###### ·[提高题篇](\2018\07\28\algorithms4-1.1-TiGaoTi) ----- [在新标签页打开](\2018\07\28\algorithms4-1.1-TiGaoTi){:target="_blank"}

### 实验题

##### 1.1.35 模拟掷骰子。以下代码能够计算每种两个骰子之和的准确概率分布：
````java
int SIDES = 6;
double[] dist = new double[2*SIDES+1];
for (int i = 1; i <= SIDES; i++){
    for (int j = 1; j <= SIDES; j++){
        dist[i+j] += 1.0;
    }
}
for (int k = 2; k <= 2*SIDES; k++){
    disk[k] /= 36.0;
}
````
`dist[i]` 的值就是两个骰子之和为 i 的概率。用实验模拟 N 次掷骰子，并在计算两个 1 到 6 之间的随机整数之和时记录每个值出现的频率以验证他们的概率。 N 要多大才能保证你的经验数据和准确数据的吻合程度达到小数点后三位？

````java
import edu.princeton.cs.algs4.*;
public class q1135{
    private static int SIDES = 6;
    /**
     * 计算每种两个骰子之和的准确概率分布
     */
    public static double[] theoryThrow(){
         int[] dist = new int[2*SIDES+1];
         for (int i = 1; i <=  SIDES; i++){
             for (int j = 1; j <= SIDES; j++){
                 dist[i+j] ++;
             }
         }
         double[] disk = frequency(dist);
         return disk;
     }
    /**
     * 计算概率
     * @param num[] 投掷频数数组
     */
    public static double[] frequency(int[] num){
        int sum = 0;
        double[] dist = new double[2*SIDES+1];
        for (int i = 0; i < 2*SIDES; i++){
            sum += num[i];
        }
        double dsume = sum*1.0;
        double[] disk = new double[2*SIDES+1];
        for (int k = 2; k <= 2*SIDES; k++){
            disk[k] = (num[k]*1.0)/dsume;
        }
        return disk;
    }
    /**
     * 掷骰子 n 次，返回得到的所有可能值得数目
     * @param n 投掷得次数
     */
    public static int[] dice(int n){
        int[] dist = new int[2*SIDES+1];
        for (int i = 0; i < n; i++){
            int a = StdRandom.uniform(1, SIDES+1);
            int b = StdRandom.uniform(1, SIDES+1);
            dist[a+b]++;
        }
        return dist;
    }
    /**
     * 比较a与b的误差是否在10的-k次方之内
     * @param a[]
     * @param b[]
     * @param k 10的-k次方
     */
    public static boolean statisticalError(double[] a, double[] b, int k){
        if(a.length != b.length){
            System.exit(1);
        }
        double m = 1.0;
        for(int i = 1; i <= k; i++){
            m /= 10.0;
        }
        for(int i = 0; i < a.length; i++){
            if (a[i]-b[i] > m){
                return false;
            }
        }
        return true;
    }
    public static void main(String[] args){
        int timesall = 10000;//试验次数
        double[] average = new double[timesall];
        for(int times = 0; times < timesall; times++){
            int[] count = new int[2*SIDES+1];//保存总频数
            int n = 100;//每次增加的次数
            int N = 0;//实验总次数
            int k = 3;//10的-3次方
            double[] thought = theoryThrow();
            double[] actual = new double[2*SIDES+1];
            do{
                int[] a = dice(n);//掷骰子n次
                for(int i = 0; i < a.length; i++){
                    count[i] += a[i];
                }
                N += n;//统计总数
                actual = frequency(count);//计算频率
            } while (!statisticalError(thought, actual, k));
            average[times] = N;
        }
        System.out.println(StdStats.mean(average));
    }     
}
````
答：在运行一万次后，发现平均 128639.41 次就可保证经验数据和准确数据的吻合程度达到小数点后三位

##### 1.1.36 乱序检查。通过实验检查表 1.1.10 中的乱序代码是否能够产生预期的效果。编写一个程序 `ShuffleTest` ,接受命令行参数 M 和 N ，将大小为 M 的数组打乱 N 次切每次打乱之前都将数组重新初始化为 a[i] = i 。打印一个 M×M 的表格，对于所欲的列 j ，行 i 表示的是 i 在打乱之后落到 j 的位置的次数。 数组中的所有元素的值都应该接近于N/M。