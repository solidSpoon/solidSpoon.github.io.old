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
````java
import edu.princeton.cs.algs4.*;
public class q1136{
    /**
     * 随机将 double 数组中的元素排序
     */
    public static void shuffle(int[] a){
        int N = a.length;
        for (int i = 0; i < N; i++){
            //将 a[i] 和 a[i..N-i] 中任意一个元素交换
            int r = i + StdRandom.uniform(N-i);
            int temp = a[i];
            a[i] = a[r];
            a[r] = temp;
        }
    }
    public static void main(String[] args){
        int M = StdIn.readInt();//数组大小
        int N = StdIn.readInt();//打乱次数
        int[] array = new int[M];
        int[][] exal = new int[M][M];
        for (int i = 0; i < N; i++){
            for (int j = 0; j < M; j++){
                //System.out.println("j:"+j);
                array[j] = j;
            }
            shuffle(array);
            for(int k = 0; k < M; k++){
                exal [array[k]][k]++;
                //System.out.println(array[k]);
            }
        }
        for(int i = 0; i < M; i++){
            for(int j = 0; j < M; j++){
                System.out.print(exal[i][j]+"\t");
            }
            System.out.println();
        }
    }
}
````
````
M=10
N=10000000
运行结果：
1000125 1002701 1000123 999941  998460  998247  1001654 998478  1000194 1000077
998618  1001400 1000146 1000526 999514  1000185 1000057 1000484 998135  1000935
998984  1001470 1000030 999937  1000037 999900  999298  1000187 1000275 999882
999302  997559  999851  1000042 1000360 1000301 1001621 1000925 1000557 999482
999465  997970  999940  1001040 999667  1001078 1000853 999033  1001058 999896
1000576 999557  999687  1000324 998885  1000500 1000763 1000869 999800  999039
1001858 1000688 999901  999096  999045  1000684 998944  999273  1000210 1000301
1001321 998768  1001317 998415  1001425 1000167 999267  999064  999873  1000383
999501  999099  998095  1000804 1001714 999615  999237  1000303 1000350 1001282
1000250 1000788 1000910 999875  1000893 999323  998306  1001384 999548  998723
````
答：打乱10000000次后，数组中所有元素的值都接近 N/M ，该乱序代码可以产生预期的效果。

##### 1.1.37 糟糕的打乱。假设在我们的乱序代码中你选择的是一个 0 到 N-1 而非 i 到 N-1 之间的随机整数。证明得到的结果并非均匀地分布在 N! 种可能性之间。用上一题中的测试检验这个版本。
答：将1.1.36中 `int r = i + StdRandom.uniform(N-i);` 替换为 `int r = i + StdRandom.uniform(N-i);` 后，再次运行10000000次，可以发现，结果不是均匀分布。

````
M=10
N=10000000
运行结果：
1000512 998403  998755  1001409 999491  1001334 999986  999791  1000627 999692
0       1015798 1035054 1069850 1131659 1201769 1166053 1144051 1124908 1110858
0       638419  1070539 1142224 1266417 1401483 1333772 1287170 1248904 611072
0       472150  1024152 1216205 1401275 1599316 1498780 1426079 917823  444220
0       388051  857665  1464177 1533597 1799259 1666849 1178928 749903  361571
0       388336  858027  1464694 2333409 1000428 1666780 1177122 750201  361003
0       638571  1355932 2214444 533755  798620  666697  1929717 1250644 611620
0       1305738 2692216 213467  399844  598315  500518  428702  2582851 1278349
0       4140574 71709   142410  267287  399491  333710  285574  249436  4109809
8999488 13960   35951   71120   133266  199985  166855  142866  124703  111806
````

##### 1.1.38 二分查找与暴力查找。根据 1.1.10.4 节给出的暴力查找法编写一个程序 `BruteForceSearch` ，在你的计算机上比较它和 `BinartSearch` 处理 largeW.txt 和 largeT.txt 所需的时间。
````java
import edu.princeton.cs.algs4.*;
import java.util.Arrays;
public class q1138{
    /**
     * 二分查找
     */
    public static int BinarySearch(int key,int[] a){
        //数组必须是有序的
        int lo = 0;
        int hi = a.length - 1;
        while(lo <= hi){
            //被查找的键要么不存在，要么必然存在与a[lo~hi]之中
            int mid = lo + (hi - lo) / 2;
            if(key < a[mid]){
                hi = mid - 1;
            } else if (key > a[mid]) {
                lo = mid + 1;
            } else {
                return mid;
            }
        }
        return -1;
    }
    /**
     * 暴力查找
     */
    public static int BruteForceSearch(int key, int[] a){
        for (int i = 0; i < a.length; i++){
            if (a[i] == key){
                return i;
            }
        }
        return -1;
    }
    public static void main(String[] args){
        int[] whitelist = In.readInts(args[0]);
        Arrays.sort(whitelist);
        long t1=System.currentTimeMillis();
        while(!StdIn.isEmpty()){
            //读取键值，如果不存在与白名单中则将其打印
            int key = StdIn.readInt();
            BinarySearch(key,whitelist);//二分
            //BruteForceSearch(key,whitelist);//暴力
        }
        long t2=System.currentTimeMillis();
        System.out.println(t2 - t1);
    }
}
````
在阿里云Ecs学生机上运行：
1.二分查找：13701毫秒 = 13.701秒
2.暴力查找：1925849毫秒 = 1925.849秒 大约半小时

##### 1.1.39 随机匹配。编写一个使用 `BinarySearch` 的程序，它从命令行接受一个整形参数 T ，并分别会针对 N = 10<sup>3</sup>, 10<sup>4</sup>, 10<sup>5</sup> 和 10<sup>6</sup> 将一下实验运行 T 遍：生成两个大小为 N 的随机 6 位正整数数组并找出同时存在于两个数组中的整数的数量。 打印一个表格，对于每个 N ，给出 T 次实验中该数量的平均值。
````java
import edu.princeton.cs.algs4.*;
public class q1139{
    /**
     * 二分查找
     */
    public static int BinarySearch(int key,int[] a){
        //数组必须是有序的
        int lo = 0;
        int hi = a.length - 1;
        while(lo <= hi){
            //被查找的键要么不存在，要么必然存在与a[lo~hi]之中
            int mid = lo + (hi - lo) / 2;
            if(key < a[mid]){
                hi = mid - 1;
            } else if (key > a[mid]) {
                lo = mid + 1;
            } else {
                return mid;
            }
        }
        return -1;
    }
    /**
     * 生成大小为 N 的六位随机数组
     */
    public static int[] buld (int N){
        int[] array = new int[N];
        for (int i = 0; i < N; i++){
            StdOut.println("i"+ i);
            array[i] = StdRandom.uniform(100000, 1000000);
            
        }
        return array;
    }
    /**
     * 做实验
     * @param T 实验次数
     * @param N 生成数组大小
     */
    public static double[] running(int T, int N){
        double[] num = new double[T];
        for (int t = 0; t < T; t++){
            int ans = 0;
            int[] a = buld(N);
            int[] b = buld(N);
            for(int i = 0; i < N; i++){
                int c = BinarySearch(a[i], b);
                if(c >= 0){
                    ans++;
                }
            }
            num[t] = ans*1.0;
        }
        return num;
    }
    public static void main(String[] args){
        StdOut.print("实验次数：");
        int T = StdIn.readInt();
        StdOut.println();
        double[] ans = new double[T];//存储结果
        {
            int N = 1000;
            double[] answer = running(T, N);
            StdOut.println("N=" + N +"，T=" + T + "，平均值:"+StdStats.mean(answer));
        }
        {
            int N = 10000;
            double[] answer = running(T, N);
            StdOut.println("N=" + N +"，T=" + T + "，平均值:"+StdStats.mean(answer));
        }
        {
            int N = 100000;
            double[] answer = running(T, N);
            StdOut.println("N=" + N +"，T=" + T + "，平均值:"+StdStats.mean(answer));
        }
        {
            int N = 1000000;
            double[] answer = running(T, N);
            StdOut.println("N=" + N +"，T=" + T + "，平均值:"+StdStats.mean(answer));
        }
    }
    
}
````
````
实验次数：10

N=1000，T=10，平均值:0.1
N=10000，T=10，平均值:0.2
N=100000，T=10，平均值:1.9
N=1000000，T=10，平均值:23.4
其实算一下午了也没算出来
````