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

##### 为 `FixedCapacityStackOfStrings` 添加一个方法 `isFull()`。

````java
    public boolean isFull(){
        return N == a.length;
    }
````

##### 1.3.2 给定以下输入，`java Stack` 的输出是什么?

    was best  times of the was the it 

##### 1.3.3 假设某个用例程序会进行一系列入栈和出栈的混合栈操作。入栈操作会将证书 0 到 9 按顺序压入栈；出栈操作会打印出返回值。下面哪种序列是不可能产生的？

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

编写以下程序帮助我们判断：

````java
import edu.princeton.cs.algs4.*;
public class q133{
    public static void main(String[] args){
        StdOut.println("请输入判断的数据：")；
        int[] num = new int[10]; //选项数组
        for (int i = 0; i < 10; i++){
            num[i] = StdIn.readInt();
        }
        Stack<Integer> detection = new Stack<Integer>(); //检测栈
        int[] ans = new int[10]; //结果数组
        for (int i = 0, n = 0, a = 0; i < 10; i++){
            if (i != num[n]){
                detection.push(i);
            } else {
                int c = 0;
                do {
                    ans[a] = num[n];
                    a++;
                    n++;
                    if (!detection.isEmpty()){
                        c = detection.pop();
                        detection.push(c);
                    }
                } while (!detection.isEmpty() && detection.pop() == num[n]);
                if (!detection.isEmpty()){
                    detection.push(c);
                }
            }
        }
        int s = 0;
        for (int p = 0; p < 10; p++ ){
            if (ans[p] != num[p]){
                s = 1;
                StdOut.print("false");
                break;
            }
        }
        if (s == 0){
            StdOut.print("true");
        }

    }
````
````
运行结果：
a: true
b: false
c: true
d: true
e: true
f: false
g: false
h: true
````

##### 1.3.4 编写一个 `Stack` 的用例 `Parehtheses` 从标准输入中读取文本流并使用栈判定其中的括号是否配对完整。例如，对于 `[()]{}{[()()]()}` 程序应该打印 `true` 对于 `[(])` 则应打印 `false`。

````
import edu.princeton.cs.algs4.Stack;
import edu.princeton.cs.algs4.StdIn;
import edu.princeton.cs.algs4.StdOut;

public class q134 {
    public static void main(String[] args){
        Stack<String> sta = new Stack<String>();
        boolean ans = true;
        while (!StdIn.isEmpty()){
            //读取字符串，如果是左括号则压入栈
            //括号之间以空格分开
            String s = StdIn.readString();
            if (s.equals("(")){
                sta.push(s);
            }else if (s.equals("{")){
                sta.push(s);
            }else if (s.equals("[")){
                sta.push(s);
                // 如果是右括号则弹出一个运算符
            }else if (s.equals("]")){
                ans = s.equals(sta.pop());
            }else if (s.equals("}")){
                ans = s.equals(sta.pop());
            }else if (s.equals(")")){
                ans = s.equals(sta.pop());
            }
        }
        StdOut.print(ans);
    }
}
````

##### 1.3.5 当 N 为 50 时下面段代码会打印什么？从较高抽象层次描述给定正整数 N 时这段代码的行为。

````
    Stack<Integer> stack = new Stack<Integer>;
    while (N > 0){
        stack.push(N % 2);
        N = N / 2；
    }
    for (int d : stack){
        StdOut.println();
    }
````
答：打印 N 的二进制表示（当 N 为 50 时打印 110010）。

##### 1.3.6 下面这段代码对队列 q 进行了什么操作？

````
    Stack<String> stack = new Stack<String>();
    while (!q.isEmpty()){
        stack.push(q.dequeue());
    }
    while (!stack.isEmpty()){
        q.enqueue(stack.pop());
    }
````

答：对队列 q 进行了前后颠倒位置的操作。

##### 1.3.7 为 `Stack` 添加一个方法 `peek()`，返回栈中最近添加的元素（而不弹出它）。

````
    public Item peek(){
        Item item = a[N];
        return item;
    }
````

##### 1.3.8 给定以下输入，给出 `DoublingStackOfStrings` 的数组的内容和大小。

    it was - the best - of times - - - it was - the - -

