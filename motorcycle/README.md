# Motorcycle parts 🏍️

## Introduction
[GitHub](https://github.com/hyttttt/web_practice/tree/main/motorcycle)

主要想嘗試做出一個能回傳指定位置資訊的網頁
因此試做了一個點擊摩托車特定部位，會回傳指定文字的樣子

![](https://i.imgur.com/QhdYoHi.png)
figure 1: 點擊前輪時會顯示 front tire

![](https://i.imgur.com/VgWW1pn.png)
figure 2: 點擊車身會顯示 body 

***

## Method
主要的作法是把右半切成網格狀來定位
每個小格都是 div
再來指定每格應該回傳的內容

![](https://i.imgur.com/EKSov2K.png)
figure 3: 將圖片區域切成網格

![](https://i.imgur.com/NKR8R62.png)
figure 4: 指定第一個網格回傳 empty

***

## Reflection
分割及指定回傳資訊都是人工標註的
覺得這個解法太過粗暴而且繁瑣
如果是要判定一個 graph 中的 node 是哪一個（如圖5）
有想到兩種可以嘗試的方法

1. 一樣顯示圖片後畫網格，但判定用指定好的 xy 資訊
    => 不知行不行得通
    => 依舊需要人工畫網格

2. 首先規定好 graph，定義好 node 之間的關係，圖直接用 javascript 畫
    => 應該能很簡單的判定
    => 要去研究如何畫圖
    => 畫圖可能不簡單

![](https://i.imgur.com/5wtwvKZ.png)
figure 5: [A Gentle Introduction to Graph Neural Networks](https://distill.pub/2021/gnn-intro/)

***

## What to do next
1. 想試試從第二個方法下手
2. 想讓點擊後的資訊顯示在點擊的區域附近

***

###### tags: `web` 2022.10.21
