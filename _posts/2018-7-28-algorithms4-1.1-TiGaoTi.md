---
layout:       post
title:        "《算法-第四版》答案系列-1.1 提高题篇"
subtitle:     "本系列是《算法-第四版》一书的课后习题答案"
date:         2018-07-28 12:00:00
author:       "solidSpoon"
header-img:   "img/post-bg.jpg"
header-mask:  0.3
catalog:      true
tags:
    - 算法第四版
---
> 最近开始学习《算法-第四版》一书，将我自己做的书后习题分享给大家，本篇是这一系列的第一篇，包含了书上<1.1 基础编程模型>的习题的提高题部分,本篇习题位于 P32 ~ P37 ，如有错误，还请指正。

>本篇答案中部分 java 代码用到了书中的包，如需使用请去书中配套网站安装。

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
    if (N == 0 && k == 0) return1.0;
    if (N < 0 || k < 0) return 0.0;
    return (1.0 - p)*binomial(N-1, k, p) + p*binomial(N-1, k-1, p);
}
````
将已经已经计算过的值保存在数组中并给出一个更好的实现。

````
在阿里云Ecs学生机中运行的结果为：
运行了一天，放弃了。

下面程序的计算结果：
4.507310875086383E-8
````
````java
//通过将计算过的值保存在数组中得到更好的实现：

public class q1127{
    private static int N = 100;

    private static int K = 50;

    private static double[][] array = new double[N + 1][K + 1];

    private static double binomial(int N, int k, double p) {
        if(N < 0 || k < 0) {
            return 0.0;
        } else if(N == 0 && k == 0) {
            if(array[N][k] == -1.0)
                array[N][k] = 1.0;
        } else {
            if (array[N][k] == -1.0){
                array[N][k] = (1.0 - p) * binomial(N - 1, k, p) + p * binomial(N - 1, k - 1, p);
            }
        }
        return array[N][k];
    }

    public static void main(String[] args) {
        // 数组array初始化
        for(int i = 0; i <= N; ++i){
            for(int j = 0; j <= K; ++j){
                array[i][j] = -1.0;
            }
        }
        // 计算概率
        double res = binomial(N, K, 0.25);
        System.out.println(res);
    }
}
````

##### 1.1.28 删除重复元素。修改 `BinarySearch` 类的测试用例来删去排序之后白名单中的所有重复元素。
答：在 `BinarySearch` 类中添加该方法并在测试用例中调用,传入 `whitelist` .

````java
    public static int[] clean(int[] wlsort){
        int m = wlsort.length;
        int[] bfnum = new int[m];//不重复的元素的位置；
        int j = 1;
        bfnum[0] = 0;
        for(int i = 1; i < m; i++){
            if(wlsort[i-1] != wlsort[i]){
                bfnum[j] = i;
                j++;
            }
        }
        bfnum[j] = -1;
        int[] afclean = new int[--j];
        for(int i = 0; i < j; i++){
            afclean[i] = wlsort[bfnum[i]];
        }
        return afclean;
    }
````

##### 1.1.29 等值键。为 `BinarySearch` 类添加一个静态方法 `rank()` ，他接受一个键和一个整形有序数组（可能存在重复键）作为参数并返回数组中小于该键的元素数量，以及一个类似的方法 `count()` 来返回数组中等于该键的元素的数量。注意：如果 i 和 j 分别是 `rank(key, a)` 和 `cout(key, a)` 的返回值，那么 a[i..i+j-1] 就是数组中所有和 key 相等的元素。
````java
import edu.princeton.cs.algs4.*;
import java.util.Arrays;
import java.lang.Math;
public class q1129 {
    /**
     * 返回数组中小于该键的元素数量(绝对值)
     * @param Key
     * @param a
     */
    public static int rank(int key, int[] a){
        int lo = 0;
        int hi = a.length - 1;
        if(key < a[0]){
            return 0;
        }else if(key > a[a.length-1]){
            return a.length;
        }
        int mid = 0;
        while(lo < hi){
            mid = lo + (hi - lo)/ 2;
            if (key < a[mid]){
                hi = mid - 1;
            } else if (key > a[mid]){
                lo = mid + 1;
            } else {
                while(mid > 0 && a[mid] == a[mid - 1]){
                    mid--;
                }
                return mid;
            }
        }
        return -((lo+hi)/2+mid)/2;
    }
    /**
     * 返回数组中等于该键的元素数量
     * @param key
     * @param a
     */
    public static int count(int key, int[] a){
        int rank = rank(key, a);
        int big = rank;
        if(key < a[0] || key > a[a.length-1]){
            return 0;
        } else if(rank < 0){
            return 0;
        }
        
        while(big+1 <= a.length-1){
            if(a[big] == a[big+1]){
                big++;
            } else {
                break;
            }
        }
        return big-rank+1;
    }
    public static void main(String[] args){
        int[] whitelist = In.readInts(args[0]);
        Arrays.sort(whitelist);//升序排序
        StdOut.println("请输入一个整数，返回白名单中小于和等于这个数的个数：");
        int key = StdIn.readInt();
        int ranknum = Math.abs(rank(key, whitelist));
        int countnum = count(key, whitelist);
        System.out.println("数组中小于这个数的个数：" + ranknum);
        System.out.println("数组中等于这个数的个数：" + countnum);
        
    }
}

````

##### 1.1.30 数组练习。编写一段程序，创建一个 N × N 的布尔数组 `a[][]` 。其中当 i 和 j 互质时（没有相同因子），`a[i][j]` 为 `true` ，否则为 `false` 。
````java
import edu.princeton.cs.algs4.*;
public class q1130{
    /**
    * 判断两数是否互质，若两数的最大公约数是1则两数互质
    * @param a
    * @param b
    * @return  若互质则true，否则false
    */
    private static boolean isCoprime(int a, int b) {
        if (gcd(a, b) == 1){
            return true;
        }
        return false;
    }

    /**
    * 使用欧几里得算法求解两数的最大公约数
    * @param p 数一
    * @param q 数二
    * @return  最大公约数
    */
    private static int gcd(int p, int q) {
        if(q == 0)
            return p;
        int r = p % q;
        return gcd(q, r);
    }
    /**
     * 创建 N×N的布尔二维数组
     * @param N 数组的维数
     */
    private static boolean[][] boolArray(int N) {
        boolean[][] boolArr = new boolean[N][N];
        for(int i = 1; i < N; i++){
            for(int j = 1; j < N; j++){
                boolArr[i][j] = isCoprime(i,j);
            }
        }
        return boolArr;
    }

    public static void main(String[] args) {
        int N = StdIn.readInt();
        boolean[][] boolArr = boolArray(N);
        for(int i = 0; i < N; ++i) {
            for (int j = 0; j < N; ++j){
                StdOut.print(boolArr[i][j] + "\t");
            }
            StdOut.println();
        }
    }
}
````

##### 1.1.31 随机连接。编写一段程序，从命令行接受一个整数 N 和 double 值 p（ 0 到 1 之间）作为参数，在一个圆上画出大小为 0.05 且间距相等的 N 个点，然后将每对点按照概率 p 用灰线链接。
````java
import edu.princeton.cs.algs4.*;
public class q1131{
    /**
     * 画圆
     * @param x 圆心x坐标
     * @param y 圆心y坐标
     * @param r 半径r
     */
    private static void drawCircle(double x, double y, double r) {
        StdDraw.setXscale(0, 2 * x);
        StdDraw.setYscale(0, 2 * y);
        StdDraw.setPenRadius(0.003);
        StdDraw.setPenColor(StdDraw.BLACK);
        StdDraw.circle(x, y, r);
       
    }

    /**
     * 在圆上描点
     * @param x0 圆心x坐标
     * @param y0 圆心y坐标
     * @param r 半径r
     * @param N N个点
     */
    private static double[][] drawPoints(double x0, double y0, double r, int N) {
        double[][] points = new double[N][2];
        StdDraw.setPenRadius(0.005);
        StdDraw.setPenColor(StdDraw.GRAY);
        for(int idx = 0; idx < N; ++idx) {
            double x = x0 + r * Math.cos(2 * Math.PI * idx / N);
            double y = y0 + r * Math.sin(2 * Math.PI * idx / N);
            StdDraw.point(x, y);
            points[idx][0] = x;
            points[idx][1] = y;
        }
        return points;
    }

    /**
     * 以概率p随机连接顶点集points中的点
     * @param points    点集
     * @param p 概率p
     */
    private static void randomLinkPoints(double[][] points, double p) {
        StdDraw.setPenRadius(0.002);
        StdDraw.setPenColor(StdDraw.RED);//按照题目要求，此处应该是灰色。
        int length = points.length;
        for(int i = 0; i < length; ++i)
            for(int j = 0; j < length; ++j)
                if(true == StdRandom.bernoulli(p))
                    StdDraw.line(points[i][0], points[i][1], points[j][0], points[j][1]);
    }

    public static void main(String[] args) {
        int N = 25;  //在圆上描点的个数
        double p = 1;  //链接概率
        double x = 16.0;
        double y = 16.0;
        double r = 15.0;
        drawCircle(x, y, r);
        double[][] points = drawPoints(x, y, r, N);
        randomLinkPoints(points, p);
    }
}
````
运行结果（改成了红线，概率为 1 时）：
![](\img\in-post\2018\7\28\q1131.jpg)

##### 1.1.32 直方图。假设标准输入流中含有一系列 `double` 值。编写一段程序，从命令行接受一个整数 N 和两个 `double` 值 l 和 r。将 `(l, r)` 分为 N 段并使用 `StdDraw` 画出输入流中的值落入每段的数量的直方图。
````java
import edu.princeton.cs.algs4.*;
import java.util.Arrays;
public class q1132{
    /**
     * 将接受到的数组分配到段落中
     * @param args
     * @param N
     * @param l
     * @param r
     */
     public static int[] allocation (double[] dargs, int N, double l, double r){
         Arrays.sort(dargs);
         double[] xnum = new double[N+1];//每一段的端点坐标
         double a = (r - l)/ N;//每一段长度
         for (int i = 0; i <= N; i++){
             xnum[i] = l + i*a;
         }
         int[] num = new int[N];//每一段的个数
         for(int i = 1; i < xnum.length; i++){
             num[i-1] = number(dargs, xnum[i-1], xnum[i]);
         }
         return num;
     }
     /**
     * 返回数组中小于该键的元素数量
     * @param Key
     * @param a
     */
    public static int rank(double[] a, double key){
        int lo = 0;
        int hi = a.length - 1;
        if(key < a[0]){
            return 0;
        }else if(key > a[a.length-1]){
            return a.length;
        }int mid = 0;
        while(lo < hi){
            mid = lo + (hi - lo)/ 2;
            if (key < a[mid]){
                hi = mid - 1;
            } else if (key > a[mid]){
                lo = mid + 1;
            } else {
                while(mid > 0 && a[mid] == a[mid - 1]){
                    mid--;
                }
                return mid;
            }
        }
        return ((lo+hi)/2+mid)/2;
    }
    /**
     * 计算一个升序排列double数组中大于等于 a 小于 b 的元素个数
     * @param args
     * @param a
     * @param b
     */
    public static int number (double[] args, double a, double b){
        int n1 = rank(args, a);
        int n2 = rank(args, b);
        return n2 - n1;
    }
    /**
     * 绘制直方图
     * @param N 分段个数
     * @param a 取值在 0~1 的double数组
     */
    public static void histogram (int N, double[] a){
        StdDraw.setPenColor(StdDraw.BOOK_BLUE);
        for(int i = 0;i < N; i++){
            double x = 1.0*i/N;
            double y = a[i]/2.0;
            double rw = 0.5/N;
            double rh = a[i]/2.0;
            StdDraw.filledRectangle(x, y, rw, rh);
        }
    }
    public static void main(String[] args){
        //读取N的值
        StdOut.print("请输入要分割的段数N：");
        int N = StdIn.readInt();
        StdOut.println();
        //读取l的值
        StdOut.print("图像的最小x值l(double)：");
        double l = StdIn.readDouble();
        StdOut.println();
        //读取r的值
        StdOut.print("请输入图像的最大x值r(double)：");
        double r = StdIn.readDouble();
        StdOut.println();
        
        int n = 2000;//double样本的数量
        double lo = 0.0;//样本的最小值
        double hi = 100.0;//样本的最大值
        double[] an = new double[n];//样本数组
         for(int i = 0; i < n; i++){
            an[i] = StdRandom.uniform(lo, hi);
        }
        int[] num = allocation(an, N, l, r);//得到每段的数目
        //求每段的概率
        double[] b = new double[n];
        for(int i = 0; i < N; i++){
            StdOut.println();
            b[i] = (num[i]*1.0)/n;
        }
        histogram(N, b);
    }
}
````
运行结果：
![](\img\in-post\2018\7\28\q1132.jpg)

##### 1.1.33 矩阵库。编写一个 `Matrix` 库并实现以下API：
````
==================================================================================
    public class Matrix
----------------------------------------------------------------------------------
        static     double dot(double[] x, double[] y)        向量点乘
        static double[][] mult(double[][] a, double[][] b)   矩阵和矩阵之积
        static double[][] transpose(double[][] a)            转置矩阵
        static   double[] mult(double[][] a, double[] x)     矩阵和向量之积
        static   double[] mult(double[] y, double[][] a)     向量和矩阵之积
==================================================================================
````
````java
import edu.princeton.cs.algs4.*;
public class q1133{
    /**
     * 向量点乘
     * @param x x向量
     * @param y y向量
     * @return  向量点乘
     */
    public static double dot(double[] x, double[] y) {
        // 点乘必须是向量a的长度等于向量b的长度才能运算
        if(x.length != y.length)
            System.exit(1);
        double res = 0.0;
        for(int i = 0; i < x.length; i++){
            res += x[i] * y[i];
        }
        return res;
    }

    /**
     * 矩阵和矩阵之积
     * @param a
     * @param b
     * @return
     */
    public static double[][] multiple(double[][] a, double[][] b) {
        // 只有矩阵a的列数等于矩阵b的行数时，相乘才有意义
        if(a[0].length != b.length)
            System.exit(1);
        double[][] matrix = new double[a.length][b[0].length];
        for (int i = 0; i < a.length; i++){
            for (int j = 0; j < b[0].length; j++){
                for (int k = 0; k < b.length; ++k){
                    matrix[i][j] += a[i][k] * b[k][j];
                }
            }
        }
        return matrix;
    }

    /**
     * 矩阵和向量之积
     * @param a
     * @param x
     * @return
     */
    public static double[] multiple(double[][] a, double[] x) {
        if(a[0].length != x.length)
            System.exit(1);
        double[] matrix = new double[x.length];
        for(int i = 0; i < a.length; i++){
            for(int j = 0; j < x.length; j++){
                matrix[i] += a[i][j] * x[j];
            }
        }
        return matrix;
    }

    /**
     * 向量和矩阵之积
     * @param y
     * @param a
     * @return
     */
    public static double[] multiple(double[] y, double[][] a) {
        double[] matrix = new double[y.length];
        for(int i = 0; i < y.length; i++){
            for(int j = 0; j < a[i].length; j++){
                matrix[i] += y[j] * a[j][i];
            }
        }
        return matrix;
    }

    /**
     * 转置矩阵
     * @param a
     * @return
     */
    public static double[][] transpose(double[][] a) {
        for(int i = 0; i < a.length; i++){
            for(int j = 0; j < i; j++) {
                double temp = a[i][j];
                a[i][j] = a[j][i];
                a[j][i] = temp;
            }
        }
        return a;
    }

    public static void main(String[] args) {
        StdOut.println("-------- 向量点乘 ---------");
        double[] a0 = {1, 2, 3};
        double[] b0 = {4, 5, 6};
        double res0 = dot(a0, b0);
        StdOut.println(res0);

        StdOut.println("-------- 矩阵乘法 ---------");
        double[][] a1 = {
                {1, 2},
                {3, 4},
                {5, 6}
        };
        double[][] b1 = {
                {1, 2, 3},
                {4, 5, 6}
        };
        double[][] res1 = multiple(a1, b1);
        for(int i = 0; i < res1.length; i++) {
            for (int j = 0; j < res1[i].length; j++){
                StdOut.printf("%-10.3f", res1[i][j]);
            }
            StdOut.println();
        }

        StdOut.println("-------- 矩阵转置 ---------");
        double[][] a2 = {
                {1, 2, 3},
                {4, 5, 6},
                {7, 8, 9}
        };
        double[][] c2 = transpose(a2);
        for(int i = 0; i < a2.length; i++) {
            for (int j = 0; j < a2[i].length; j++){
                StdOut.printf("%-10.3f", a2[i][j]);
            }
            StdOut.println();
        }

        StdOut.println("----- 矩阵和向量之积 ------");
        double[][] a3 = {
                {1, 2, 3},
                {4, 5, 6},
                {7, 8, 9}
        };
        double[] b3 = {1, 2, 3};
        double[] c3 = multiple(a3, b3);
        for(int i = 0; i < c3.length; i++){
            StdOut.printf("%-10.3f\n", c3[i]);
        }

        StdOut.println("----- 向量和矩阵之积 ------");
        double[] a4 = {1, 2, 3};
        double[][] b4 = {
                {1, 2, 3},
                {4, 5, 6},
                {7, 8, 9}
        };
        double[] c4 = multiple(a4, b4);
        for(int i = 0; i < c4.length; i++){
            StdOut.printf("%-10.3f", c4[i]);
        }
    }
}
````

##### 1.1.34 过滤。以下哪些任务需要以下哪些任务需要（在数组中，比如）保存标准输入中的所有值？哪些可以被实现为一个过滤器且仅使用固定数量的变量和固定大小的数组（和N无关）？在每个问题中，输入都来自于标准输入且含有N个0到1的实数。
````
A.保存标准输入中的所有值
B.被实现为一个过滤器且仅使用固定数量的变量和固定大小的数组（和N无关）
    　　
        (B)       打印出最大和最小的数
        (A)       打印出所有数的中位数
        (B)       打印出第 k 小的数，k 小于100
        (B)       打印出所有数的平方和
        (B)       打印出 N 数的平均值
        (A)       打印出大于平均值的数的百分比
        (A)       将 N 个数按照升序打印 
        (A)       将 N 个数按照随机顺序打印 
````

###### ·[实验题篇](\2018\07\30\algorithms4-1.1-ShiYanTi) ----- [在新标签页打开](\2018\07\30\algorithms4-1.1-ShiYanTi){:target="_blank"}