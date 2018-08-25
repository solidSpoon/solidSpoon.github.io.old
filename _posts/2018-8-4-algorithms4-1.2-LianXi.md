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

##### 1.2.4 以下这段代码会打印出什么？
````java
String string1 = "hello";
String string2 = string1;
string1 = "world";
StdOut.println(string1);
StdOut.println(string2);
````
````
world
hello
````

##### 1.2.5 以下这段代码会打印出什么？
````java
String s = "Hello World"
s.toUpperCase();
s.substring(6,11);
StdOut.println(s);
````
答： `"Hello World"` 。`String` 对象是不可变的—————所有字符串方法都会返回一个新的 `String` 对象（但他们不会改变参数对象的值）。这段代码忽略了返回的对象并直接打印了原字符串。要打印出 `"WORD"` ,请用 `s = s.tuUpperCase()` 和 `s = s.substring(6.11)` .

##### 1.2.6 如果字符串 s 中的字符循环移动任意位置之后得到另一个字符串 t ，那么 s 就被称为 t 的回环变位（circular rotation）。例如，ACTGACG 就是 TGACGAC 的一个回环变位，反之亦然。判定这个条件在基因组排序的研究中是很重要的。编写一个程序检查给定的两个字符串 s 和 t 是否为回环变位。
提示：答案只需要一行用到 `indexOf()` 、 `length()` 和字符串链接的代码。

````java
import edu.princeton.cs.algs4.*;
public class q126{
    /**
     * 判断两个字符串是否为回环变位
     * @param s 字符串一
     * @param t 字符串二     
     */
    public static boolean isCircularRotation(String s, String t){
        //将 t 和 t 自身连接，这样如果 t 是 s 的回环变位，那么s肯定是 “t+t” 的一个子串！
        return (s.length() == t.length()) && ((t + t).indexOf(s) > 0);
    }
    public static void main(String[] args){
        String s = args[0];
        String t = args[1];
        if (isCircularRotation(s, t)){
            System.out.println("二者是回环变位");
        } else {
            System.out.println("二者不是回环变位");
        }
    }
}
````
````
java q126 ACTGACG TGACGAC
二者是回环变位
````

##### 1.2.7 以下递归函数的返回值是什么？
````java
public static String mystery(String s){
    int N = s.length();
    if (N <= 1){
        return s;
    }
    String a = s.substring(0, N/2);
    String b = s.substring(N/2, N);
    return mystery(b) + mystery(a);
}
````
答：会将字符串的后半部分移到前边
例：abcdefg => gfedcba

##### 1.2.8 设 a[] 和 b[] 均为长数百万的整形数组。以下代码的作用是什么？有效吗？
    int t = a; a = b; b = t;

答：这段代码会将他们交换。它的效率不可能再高了，因为它复制的是引用而不需要复制数百万个元素。

##### 1.2.9 修改 `BinarySearch` （请见 1.1.10.1 节中的二分查找代码），使用 `Counter` 统计在有查找中被检查的键的总数并在查找全部结束后打印该值。
提示：在 `main()` 中创建一个 `Counter` 对象并将他作为参数传给 `rank()` 。

````java
import edu.princeton.cs.algs4.*;
import java.util.Arrays;
public class q129{
    public static int rank(int key, int[] a, Counter counter){
        //数组必须是有序的
        int lo = 0;
        int hi = a.length-1;
        counter.increment();
        while(lo <= hi){
            //被查找的键要么不存在，要么必然存在于 a[lo..hi] 之中
            int mid = lo + (hi - lo) / 2;
            if (key < a[mid]){
                hi = mid - 1;
            } else if (key > a[mid]){
                lo = mid + 1;
            } else {
                return mid;
            }
        }
        return -1;
    }
    public static void main(String[] args){
        int[] whitelist = In.readInts(args[0]);
        Arrays.sort(whitelist);
        Counter counter = new Counter("BinarySearch");
        while (!StdIn.isEmpty()){
            //读取键值，如果不存在于白名单中则将其打印
            int key = StdIn.readInt();
            if (rank(key, whitelist, counter) < 0){
                StdOut.println(key);
            }
        }
        System.out.println("总数：" + counter);
    }
}
````
````
java q129 tinyW.txt < tinyT.txt
50
99
13
总数：18 BinarySearch
````

##### 1.2.10 编写一个类 `VisualCounter` ，支持加一和减一操作。它的构造函数接受两个参数 N 和 max ，其中 N 指定了操作的最大次数， max 指定了计数器的最大绝对值。作为副作用，用图像显示每次计数器变化后的值。
````java
import edu.princeton.cs.algs4.*;
class VisualCounter{
    private int count;
    private int x;
    public VisualCounter(int N, int max){
        StdDraw.setXscale(0, N);
        StdDraw.setYscale(-max, max);
        StdDraw.setPenRadius(.007);
    }
    
    public void increment(){
        count++;
        x++;
        StdDraw.point(x, count);
    }
    public void decrement(){
        count--;
        x++;
        StdDraw.point(x, count);
    }
}
    
public class q1210{
    public static void main(String[] args){
        int N = 100;
        int max = 50;
        double p = 0.7;
        VisualCounter vc = new VisualCounter(N, max);
        for (int t = 0; t < 100; t++){
            boolean padd = StdRandom.bernoulli(p);//加的概率为p
            if (padd){
                vc.increment();
            } else {
                vc.decrement();
            }
        }
    }
}
````
![](\img\in-post\2018\8\4\q1210.jpg)

##### 1.2.11 根据 `Date` 的 API 实现一个 `smartDate` 类型，在日期非法时抛出一个异常。

##### 1.2.12 为 `smartDate` 添加一个方法 `dayOfTheWeek()` ，为日期中每周的日返回 Monday、 Tuesday、 Wednesday、 Thursday、 Friday、 Saturday 和 Sunday 中的适当值。你可以假定时间是21世纪。
````java
import edu.princeton.cs.algs4.*;
interface Date{
    int day();
    int month();
    int year();
    String toString();
    boolean equals(Object that);
    int compareTo(smartDate that);
    int hashCode();
}
class smartDate implements Date {
    private static final int[] DAYS = { 0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 };

    private final int month;   // month (between 1 and 12)
    private final int day;     // day   (between 1 and DAYS[month]
    private final int year;    // year

   /**
     * Initializes a new date from the month, day, and year.
     * @param month the month (between 1 and 12)
     * @param day the day (between 1 and 28-31, depending on the month)
     * @param year the year
     * @throws IllegalArgumentException if this date is invalid
     */
    public smartDate(int month, int day, int year) {
        if (!isValid(month, day, year)) throw new IllegalArgumentException("Invalid date");
        this.month = month;
        this.day   = day;
        this.year  = year;
    }

    /**
     * Initializes new date specified as a string in form MM/DD/YYYY.
     * @param date the string representation of this date
     * @throws IllegalArgumentException if this date is invalid
     */
    public smartDate(String date) {
        String[] fields = date.split("/");
        if (fields.length != 3) {
            throw new IllegalArgumentException("Invalid date");
        }
        month = Integer.parseInt(fields[0]);
        day   = Integer.parseInt(fields[1]);
        year  = Integer.parseInt(fields[2]);
        if (!isValid(month, day, year)) throw new IllegalArgumentException("Invalid date");
    }

    /**
     * Return the month.
     * @return the month (an integer between 1 and 12)
     */
    public int month() {
        return month;
    }

    /**
     * Returns the day.
     * @return the day (an integer between 1 and 31)
     */
    public int day() {
        return day;
    }

    /**
     * Returns the year.
     * @return the year
     */
    public int year() {
        return year;
    }


    // is the given date valid?
    private static boolean isValid(int m, int d, int y) {
        if (m < 1 || m > 12)      return false;
        if (d < 1 || d > DAYS[m]) return false;
        if (m == 2 && d == 29 && !isLeapYear(y)) return false;
        return true;
    }

    // is y a leap year?
    private static boolean isLeapYear(int y) {
        if (y % 400 == 0) return true;
        if (y % 100 == 0) return false;
        return y % 4 == 0;
    }


    /**
     * Returns a string representation of this date.
     *
     * @return the string representation in the format MM/DD/YYYY
     */
    @Override
    public String toString() {
        return month + "/" + day + "/" + year;
    }

    /**
     * Compares this date to the specified date.
     *
     * @param  other the other date
     * @return {@code true} if this date equals {@code other}; {@code false} otherwise
     */
    @Override
    public boolean equals(Object other) {
        if (other == this) return true;
        if (other == null) return false;
        if (other.getClass() != this.getClass()) return false;
        smartDate that = (smartDate) other;
        return (this.month == that.month) && (this.day == that.day) && (this.year == that.year);
    }
    
        /**
     * Returns the next date in the calendar.
     *
     * @return a date that represents the next day after this day
     */
    public smartDate next() {
        if (isValid(month, day + 1, year))    return new smartDate(month, day + 1, year);
        else if (isValid(month + 1, 1, year)) return new smartDate(month + 1, 1, year);
        else                                  return new smartDate(1, 1, year + 1);
    }

    /**
     * Compares two dates chronologically.
     *
     * @param  that the other date
     * @return {@code true} if this date is after that date; {@code false} otherwise
     */
    public boolean isAfter(smartDate that) {
        return compareTo(that) > 0;
    }

    /**
     * Compares two dates chronologically.
     *
     * @param  that the other date
     * @return {@code true} if this date is before that date; {@code false} otherwise
     */
    public boolean isBefore(smartDate that) {
        return compareTo(that) < 0;
    }

    /**
     * Compares two dates chronologically.
     *
     * @return the value {@code 0} if the argument date is equal to this date;
     *         a negative integer if this date is chronologically less than
     *         the argument date; and a positive ineger if this date is chronologically
     *         after the argument date
     */
    
    public int compareTo(smartDate that) {
        if (this.year  < that.year)  return -1;
        if (this.year  > that.year)  return +1;
        if (this.month < that.month) return -1;
        if (this.month > that.month) return +1;
        if (this.day   < that.day)   return -1;
        if (this.day   > that.day)   return +1;
        return 0;
    }
    /**
     * Difference between a and b
     * @return the number of days between a and b
     */
    public int numBetween(smartDate b){
        smartDate t = new smartDate(this.month, this.day, this.year);
        int num = 0;
        while (t.isBefore(b)){
            t=t.next();
            num++;
        }
        return num;
    }
    /**
     * week
     * @return The week of the smartDay
     */
    public String week(){
        smartDate a = new smartDate(12, 31, 1999);
        final String[] WEEK = {"Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thurday", "Friday"};
        return WEEK[a.numBetween(this)%7-1];
        
    }
    /**
     * Returns an integer hash code for this date.
     *
     * @return an integer hash code for this date
     */
    @Override
    public int hashCode() {
        int hash = 17;
        hash = 31*hash + month;
        hash = 31*hash + day;
        hash = 31*hash + year;
        return hash;
    }

}
public class q1211{
    public static void main(String[] args) {
        smartDate today = new smartDate(2, 25, 2018);
        smartDate birthday = new smartDate(10, 16, 1971);
        StdOut.println(today);
        StdOut.println(birthday);
        StdOut.println(birthday.equals(today));
        StdOut.println(today.week());
    }
}
````
````
java q1211
2/25/2018
10/16/1971
false
Sunday
````

