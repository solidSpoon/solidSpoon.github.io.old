---
layout:       post
title:        "《算法-第四版》答案系列-1.1 练习篇"
subtitle:     "本系列是《算法-第四版》一书的课后习题答案"
date:         2018-07-25 12:00:00
author:       "solidSpoon"
header-img:   "img/post-bg.jpg"
header-mask:  0.3
catalog:      true
tags:
    - 算法第四版
---
> 最近开始学习《算法-第四版》一书，将我自己做的书后习题分享给大家，本篇是这一系列的第一篇，包含了书上<1.1 基础编程模型>的习题的练习部分,本篇习题位于P32 ~ P37 ，如有错误，还请指正。

>本篇答案中部分java代码用到了书中的包，如需使用请去书中配套网站安装。

以下的答案在电脑端查看可以显示目录

### 练习

##### 1.1.1 给出下列表达式的值

    a. (0 + 15)/ 2                     ==> 7             // 类型是整形
    b. 2.0e-6 * 100000000.1            ==> 200.0000002   // e-6为科学计数法，即10的-6次方
    c. true && false || true && true   ==> true          // &&-短路与  ||-短路或

##### 1.1.2 给出下列表达式的类型和值

    a. (1 + 2.236)/ 2                  ==> double   1.618
    b. 1 + 2 + 3 + 4.0                 ==> double   10.0
    c. 4.1 >= 4                        ==> boolean  true
    d. 1 + 2 + "3"                     ==> string   33

##### 1.1.3 编写一个程序，从命令行得到三个整数参数。如果他们都相等则打印 `equal` ，否则打印 `not equal` 。
````java
import edu.princeton.cs.algs4.*; //书上的包
public class q113{
    public static void main(String[] args){
        int a = StdIn.readInt();
        int b = StdIn.readInt();
        int c = StdIn.readInt();
        if(a == b && a == c){
            StdOut.println("equal");
        } else {
            StdOut.println("not equal");
        }
    }
}
````

##### 1.1.4 下列语句各有什么问题（如果有的话）？

    a. if (a > b) then c = 0;          ==> java中没有then
    b. if a > b { c = 0; }             ==> a > b应该用括号
    c. if (a > b) c = 0;               ==> 正确
    d. if (a > b) c = 0 else b = 0;    ==> c = 0后添加“;”

##### 1.1.5 编写一段程序，如果double类型的变量x和y都严格位于0和1之间则打印 `true` ，否则打印 `false` 。
````java
import edu.princeton.cs.algs4.*;
public class q115{
    public static void main(String[] args){
        StdOut.println("请输入double类型的数x：");
        double x = StdIn.readDouble();
        StdOut.println("请输入double类型的数y；");
        double y = StdIn.readDouble();
        boolean flag = false;
        if ((x > 0 && x < 1) && (y > 0 && y < 1)){
            flag = true;
        }
        StdOut.printf("结果是：");
        StdOut.println(flag);
    }
}
````

##### 1.1.6 下面这段程序会打印出什么？
````java
int f = 0;
int g = 1;
for (int i = 0; i <= 15; i++) {
    StdOut.println(f);
    f = f + g;
    g = f - g;
}
````
````
结果是:
0
1
1
2
3
5
8
13
21
34
55
89
144
233
377
610
斐波那契数列
````

##### 1.1.7 分别给出以下代码段打印出的值
````java
a.        ==> 3.00009

double t = 9.0;
while (Math.abs(t - 9.0/t) > .001)
    t = (9.0/t + t) / 2.0;
StdOut.printf("%.5f\n",t);
````
````java
b.        ==> 499500

int sum = 0;
for (int i = 1; i < 1000; i++)
    for(int j = 0; j < i; j++)
        sum++;
StdOut.println(sum);
````
````java
c.        ==> 10000

int sum = 0;
for (int i = 1; i <1000; i *= 2)
    for (int j = 0; j < 1000; j++)
        sum++;
StdOut.println(sum);
````

##### 1.1.8 下列语句会打印出什么结果？给出解释。
````java
a. System.out.println('b');              ==> b      // 'b'为字符型直接输出
b. System.out.println('b'+'c');          ==> 197    // 'b'+'c'为ascll码值相加，即98+99=197
c. System.out.println((char) ('a'+4));   ==> e      // 'a'+4后强制转换为字符型
````

##### 1.1.9 编写一段代码，将一个正整数N用二进制表示并转换为一个 `String` 类型的值s。
解答：Java有一个内置方法 `Integer.toBinaryString(N)` 专门完成这个任务，但该题的就是给出这个方法的其他实现方法。下面就是一个特别简洁的答案。

````java
String s = "";
for (int n= N; n > 0; n /= 2)
    s = (n % 2) + s;
````

##### 1.1.10 下面这段代码有什么问题？
````java
int [] a;
for (int i = 0; i < 10; i++)
    a[i] = i * i;
````
解答：它没有用 `new` 为 `a[]` 分配内存。这段代码会产生一个 `variable a might not have been initialized` 的编译错误。

##### 1.1.11 编写一段代码，打印出一个二维布尔数组的内容。其中，使用 * 表示真，空格表示假，打印出行号和列号。
````java
public class q1111{
    public static void main(String[] args){
        boolean[][] array = new boolean[3][];
        array [0] = new boolean[] {false, true, false};
        array [1] = new boolean[]{true, false, true};
        array [2] = new boolean[]{false, true, false};//使用常规方法赋值会导致博客软件jelyll报错。
        int i = 0;
        int j = 0;
        System.out.print("\\");
        for (j=1; j <= array[0].length; j++){
            System.out.print(j);
        }
        System.out.println();
        for(i=0; i< array[0].length; i++){
            System.out.print(i+1);
            for(j=0; j< array.length; j++){
                System.out.print(array[i][j] ? "*" : " ");
            }
            System.out.println();
        }
    }
}
````
````
运行结果:
\123
1 * 
2* *
3 * 
````

##### 1.1.12 以下代码会打印出什么结果？
````java
int[] a = new int[10];
for (int i = 0; i < 10; i++)
    a[i] = 9 - i;
for (int i = 0; i < 10; i++)
    a[i] = a[a[i]];
for (inr i = 0; i < 10; i++)
    System.out.println(i);
````
````
运行结果：
0
1
2
3
4
5
6
7
8
9
````

##### 1.1.13 编写一段代码，打印出一个M行N列的二位数组的转置（交换行和列）。
````java
public class q1113{
    public static void main(String[] args){
        
        int[][] array = new int[3][];
        array [0] = new int[]{1,2,3};
        array [1] = new int[]{4,5,6};
        array [2] = new int[]{7,8,9};
        System.out.println("转置之前");
        for(int i = 0; i < array[0].length; i++){
            for(int num : array[i]){
                System.out.print(num+" ");
            }
            System.out.println();
        }
        for(int i = 0; i < array[0].length; i++){
            for(int j = 0; j < i; j++){
                array[i][j] = array[i][j] ^ array[j][i];
                array[j][i] = array[i][j] ^ array[j][i];
                array[i][j] = array[i][j] ^ array[j][i];
            }
        }
        System.out.println("转置之后");
        for(int i = 0; i < array[0].length; i++){
            for(int num : array[i]){
                System.out.print(num+" ");
            }
            System.out.println();
        }        
    }
}
````
````
转置之前
1 2 3
4 5 6
7 8 9
转置之后
1 4 7
2 5 8
3 6 9
````

##### 1.1.14 编写一个静态方法 `lg()` ，接受一个整型参数N，返回不大于 log<sub>2</sub>N 的最大整数。不要使用 `Math` 库。
````java
import java.util.Scanner;
public class q1114{
    //***
    static int lg(int N){
        int i = 1;
        int ans = 1;
        while(ans <= N){
            ans *= 2;
            i++;
        }
        return i-2;
    }
    //***
    public static void main(String[] args){
        Scanner scanner = new Scanner(System.in);
        int n = scanner.nextInt();
        int answer = lg(n);
        System.out.println(answer);
    }
}
````

##### 1.1.15 编写一个静态方法 `histogram()` ，接受一个整型数组a[]和一个整数M为参数并返回一个大小为M的数组，其中第i个元素的值为整数i在参数数组中出现的次数。如果a[]中的值均在0到M-1之间，返回数组所有元素之和应该和 `a.length` 相等。
````java
public class q1115{
    //***
    public static int[] histogram(int[] a, int M){
        int[] args = new int[M];
        for(int num : a){
            if(num < M){
                args[num]++;
            }            
        }
        return args;
    }
    //***
    public static void main(String[] args){
        int[] p = {1,1,2,2,3,3,4,4,4,5,5,5,6,6,6,6,6,7,7,7,8};
        int n = 8;
        int[] ans = histogram(p,n);
        for(int a : ans){
            System.out.print(a+" ");
        }
        System.out.println();
    }
}
````
````
运行结果：0 2 2 2 3 3 5 3
````

##### 1.1.16 给出 `exR1(6)` 的返回值：
````java
public static String exR1(int n){
    if(n <= 0) return "";
    return exR1(n - 3) + n + exr1(n - 2) + n;
}
````
````
运行结果：311361142246
````

##### 1.1.17 找出以下递归函数的问题：
````java
public static String exR2(int n){
    String s = exR2(n - 3) + n + exR2(n - 2) + n;
    if (n <= 0) return "";
    return s;
}
````
答：这段代码中的基础情况永远不会被访问。调用 `exR2(3)` 会产生调用 `exR2(0)` 、`exR2(-3)` 和 `exR2(-6)` ，循环往复直到发生 `StackOverflowError` 。

##### 1.1.18 请看以下递归函数：
````java
public static int mystery(int a, int b){
    if (b == 0) return 0;
    if (b % 2 == 0) return mystery(a + a, b / 2);
    return mystery(a + a, b / 2) + a;
}
````
`mystery(2, 25)` 和 `mystery(3, 11)` 的返回值是多少？给定正数 a 和 b ，`mystery(a, b)` 的计算结果是什么？将代码中的 + 替换为 * 并将 `return 0` 改为 `return 1` ，然后回答相同的问题。

答： 
`mystery(2, 25)` 的返回值是50，`mystery(3, 11)` 的返回值是33.给定正数 a 和 b `mystery(a, b)` 的计算结果是 a*b；
将代码中的 + 替换为 * 并将 `return 0` 改为 `return 1` :
`mystery(2, 25)` 的返回值是33554432，`mystery(3, 11)` 的返回值是177147.给定正数 a 和 b `mystery(a, b)` 的计算结果是 a<sup>b</sup>

##### 1.1.19 在计算机上运行以下程序：
````java
public class Fibonacci{
    public static long F(int N){
        if (N == 0) return 0;
        if (N == 1) return 1;
        return F(N - 1) + F(N - 2);
    }
    public static void main(String[] args){
        for (int N = 0; N < 100; N++)
            System.out.println(N + " " + F(N));
    }
}
````
计算机用这段程序在一个小时之内能够得到 F(N) 结果的最大 N 值是多少？开发 F(N) 的一个更好的实现，用数组保存已经计算过的值。

答：为了方便计算一个小时的时间，为此程序增加了时间戳如下：

````java
public class Fibonacci{
    public static long F(int N){
        if (N == 0) return 0;
        if (N == 1) return 1;
        return F(N - 1) + F(N - 2);
    }
    public static void main(String[] args){
        long t1=System.currentTimeMillis();
        long t2;
        long s;
        for (int N = 0; N < 100; N++){
            s = F(N);
            t2=System.currentTimeMillis();
            if (t2 - t1 < 3600000){
                System.out.println(N + " " + s);
            } else {
                break;
            }
        }
    }
}
````
将此程序在阿里云ECS学生机中后台运行得到F(N)最大值是 `55 139583862445` .
以下是一个更好的实现：

````java
public class FFibonacci {
    private static int M = 100;
    private static long[] fib = new long[M];
    //***
    public static long FF(int N) {
        if(0 == N)
            fib[0] = 0;
        else if(1 == N)
            fib[1] = 1;
        else
            fib[N] = fib[N - 1] + fib[N -2];
        return fib[N];
    }
    //***
    public static void main(String[] args) {
        for(int N = 0; N < 100; N++) {
            System.out.println(N + " " + FF(N));
        }
    }
}
````

##### 1.1.20 编写一个递归的静态方法计算 ln(N!) 的值。
````java
import java.lang.Math;
import java.util.Scanner;
public class q1120 {
    //***
    private static long factorial (long N){
        if (N == 0 || N == 1){
            return 1;
        } else {
            return N * factorial(N - 1);
        }
    }
    public static double ln (long N){
        long s = factorial(N);
        return Math.log(s);
    }
    //***
    public static void main(String[] args){
        Scanner scanner = new Scanner(System.in);
        int n = scanner.nextInt();
        System.out.println(ln(n));
    }
}
````

##### 1.1.21 编写一段程序，从标准输入按行读取数据，其中每行都包含一个名字和两个整数。然后用 `printf()` 打印一张表格。每行的若干列数据包括名字、两个整数和第一个整数除以第二个整数的结果，精确到小数点后三位。可以用这种程序将棒球球手的击球名中率或者学生的考试分数制成表格。
````java
import java.util.*;
import java.lang.String;
public class q1121{
    public static void main(String[] args){
        Scanner scan = new Scanner(System.in);
        ArrayList name = new ArrayList();//保存名字的Arraylist
        ArrayList num1 = new ArrayList();//保存数字1的Arraylist
        ArrayList num2 = new ArrayList();//保存数字2的Arraylist
        System.out.println("请按照名字<空格>分数一<空格>分数二<回车>的格式输入");
        System.out.println("输入完成后另起一行输入over敲<回车>");
        while(true){
            String aline = scan.nextLine();//读取一行字符
            char[] ach = aline.toCharArray();//将字符转化为字符串数组
            int i = 0;
            StringBuffer first = new StringBuffer("");//创建三个StringBuffer对象用于累加字符
            StringBuffer second = new StringBuffer("");
            StringBuffer third = new StringBuffer("");
            for(;i < ach.length && ach[i] != ' ';i++){
                first.append(ach[i]);//累加名字
            }
            String over = "over";
            String kk = first.toString();
            if(kk.equals(over)){
                break;
            } else {
                for(i++;ach[i] != ' ';i++){
                    second.append(ach[i]);//累加分数一
                }
                for(i++; i < ach.length; i++){
                    third.append(ach[i]);//累加分数二
                }
                String aa = first.toString();
                String bb = second.toString();
                String cc = third.toString();
                name.add(aa);
                num1.add(bb);
                num2.add(cc); 
            }
            
        }
        System.out.println("==================================================");
        System.out.printf("||%-10s||%-10s||%-10s||%-10s||\n","姓名","分数一","分数二","相除");
        for(int i = 0; i < name.size(); i++){
            double n1 = 0;
            double n2 = 0;
                n1 = Double.parseDouble(num1.get(i).toString());
                n2 = Double.parseDouble(num2.get(i).toString());
            double n3 = n1 / n2;
            System.out.printf("||%-10s||%-10.0f||%-10.0f||%-10.3f||\n",name.get(i),n1,n2,n3);
        }
        System.out.println("==================================================");
    }
}
````
````
运行结果：

小红 98 76
小明 76 54
小兰 87 65
over
==================================================
||姓名        ||分数一       ||分数二       ||相除        ||
||小红        ||98        ||76        ||1.289     ||
||小明        ||76        ||54        ||1.407     ||
||小兰        ||87        ||65        ||1.338     ||
==================================================
````

##### 1.1.22 使用 1.1.6.4 节中的 `rank()` 递归方法重新实现 `BinarySearch` 并跟踪该方法调用。每当该方法被调用时，打印出他的参数 `lo` 和 `hi` 并按照递归的深度缩进。
提示：为该递归方法添加一个参数来保存递归的深度。

````java
import edu.princeton.cs.algs4.*;
import java.util.Arrays;
public class q1122 {
    
     /**
     * 二分查找 ： 递归描述
     * @param key
     * @param arr
     * @return
     */
    public static int rank(int key, int[] a){
        return rank(key, a, 0, a.length - 1, 0);//0是深度信息
    }
    /**
     * 递归查找关键词的索引
     * @param key
     * @param arr
     * @param lo
     * @param hi
     * @return
     */
    public static int rank(int key, int[] a, int lo, int hi, int depth){
        printIndent(lo, hi, depth);
        //如果key存在于a[]中，它的索引不会小于lo且不会大于hi
        if (lo > hi){
            return -1;
        }
        int mid = lo + (hi - lo) / 2;
        if(key < a[mid]){
            return rank(key, a, lo, mid-1, ++depth);
        } else if (key > a[mid]){
            return rank(key, a, mid + 1, hi, ++depth);
        } else {
            return mid;
        }
    }
    /**
     * 按缩进打印调用信息
     * @param lo
     * @param hi
     * @param depth
     */
    public static void printIndent(int lo, int hi, int depth) {
        StdOut.print(depth + "\t");
        for(int i = 0; i < depth; i++){
            StdOut.print("----------");
        }
        StdOut.println(lo + "\t" + hi);
    }
    public static void main(String[] args){
        int[] whitelist = In.readInts(args[0]);
        Arrays.sort(whitelist);//升序排序
        while (!StdIn.isEmpty()){
            //读取键值，如果不存在于白名单中则将其打印
            int key  = StdIn.readInt();
            if (rank(key, whitelist) < 0){
                StdOut.println(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>" + key);
            }
        }
    }
}
````
````
以下是运行教材的数据集 tinyW.txt 和 tinyT.txt 搜索到第一个数据时的结果：

0       0       14
1       ----------0     6
2       --------------------4   6
0       0       14
1       ----------8     14
2       --------------------8   10
3       ------------------------------8 8
4       ----------------------------------------9       8
>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>50
````

##### 1.1.23 为 `BinarySearch` 添加一个参数： `+` 打印出标准输入中不在白名单上的值； `-` 则打印出标准输入中在白名单上的值。
````java
//将此段代码替换 1.1.22 中的测试用例

public static void main(String[] args){
        //'+' ==> 打印出标准输入中不在白名单上的值
        //'-' ==> 打印出标准输入中在白名单上的值
        char symbol = '+';
        int[] whitelist = In.readInts(args[0]);
        Arrays.sort(whitelist);//升序排序
        while (!StdIn.isEmpty()){
            //读取键值，如果不存在于白名单中则将其打印
            int key  = StdIn.readInt();
            if ('+' == symbol && rank(key, whitelist) >= 0){
                StdOut.println(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>" + key);
            }
            if ('-' == symbol && rank(key, whitelist) < 0){
                StdOut.println(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>" + key);
            }
        }
    }
````
````
以下是运行教材的数据集 tinyW.txt 和 tinyT.txt 搜索到第一个数据时的结果：

0       0       14
1       ----------0     6
2       --------------------4   6
>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>23
````

##### 1.1.24 给出使用欧几里得算法计算 105 和 24 的最大公约数的过程中得到的一系列 p 和 q 的值。扩展该算法中的代码得到一个程序 `Euclid` ，从命令行接受两个参数， 计算出他们的最大公约数并打印出每次调用递归方法是的两个参数。 使用你的程序计算 1 111 111 和 1 234 567 的最大公约数。

````
使用欧几里得算法计算 105 和 24 的最大公约数的过程中得到的一系列 p 和 q 的值为：

0       105     24
1       ----------24    9
2       --------------------9   6
3       ------------------------------6 3
4       ----------------------------------------3       0
````
````java
import edu.princeton.cs.algs4.*;
import java.util.Arrays;
public class q1124 {
    /**
     * 按缩进打印调用信息
     * @param p
     * @param q
     * @param depth
     */
    public static void printIndent(int p, int q, int depth) {
        StdOut.print(depth + "\t");
        for(int i = 0; i < depth; i++){
            StdOut.print("----------");
        }
        StdOut.println(p + "\t" + q);
    }
   /**
    * 使用欧几里得算法求解两数的最大公约数
    * @param p 数一
    * @param q 数二
    * @return  最大公约数
    */
    public static int Euclid(int p, int q, int depth) {
        printIndent(p, q, depth);
        if(q == 0)
            return p;
        int r = p % q;
        return Euclid(q, r, ++depth);
    }

    public static void main(String[] args) {
        int p = Integer.parseInt(args[0]);
        int q = Integer.parseInt(args[1]);
        int gcd = Euclid(p, q, 0);
        StdOut.println("\n" + p + " 和 " + q + " 的最大公约数是： " + gcd);
    }
}
````
````
计算 1 111 111 和 1 234 567:

0       1111111 1234567
1       ----------1234567       1111111
2       --------------------1111111     123456
3       ------------------------------123456    7
4       ----------------------------------------7       4
5       --------------------------------------------------4     3
6       ------------------------------------------------------------3   1
7       ----------------------------------------------------------------------1 0

1111111 和 1234567 的最大公约数是： 1

````

##### 1.1.25 用数学归纳法证明欧几里得算法能够计算任意一对非负整数 p 和 q 的最大公约数。

###### ·[提高题篇](\2018\07\28\algorithms4-1.1-TiGaoTi) ----- [在新标签页打开](\2018\07\28\algorithms4-1.1-TiGaoTi){:target="_blank"}

###### ·[实验题篇](\2018\07\30\algorithms4-1.1-ShiYanTi) ----- [在新标签页打开](\2018\07\30\algorithms4-1.1-ShiYanTi){:target="_blank"}