# Make a graph

## Introduction
這是一個可以加入點並讓他們用直線相連的程式\
透過按鈕可以增減點的數量並自動連線

![](https://i.imgur.com/IpFO4iQ.png)
figure 1: 新增第一個點

![](https://i.imgur.com/OX1CMoK.png)
figure 2: 多於1個點後會自動相連

![](https://i.imgur.com/67W4vgk.png)
figure 3: 刪除點時也會刪除相連的線

![](https://i.imgur.com/iN22MMZ.png)
figure 4: 當滑鼠懸浮在點上時，會出現相應的資訊在附近

![](https://i.imgur.com/Uf2a1MU.png)
figure 5: 可以透過拖拉移動現有點與線的位置

***

## Method
主要分成幾個階段完成
1. 嘗試畫出點與線\
繪圖的部分主要透過 JSXGraph 這個 javascript 的 library 協助完成\
JSXGraph 畫出的點與線就支援了移動的功能，很方便（也可以關掉）
2. 建立按鈕，儲存所有點與線的資訊，同時畫出這些點與線
3. 找出滑鼠位置
4. 建立額外的資訊視窗來顯示點的資訊

***

## Reflection
這次有成功畫出圖並用更有效率的方法顯示資訊\
接下來要思考的是假設給定一張產好的圖\
如何有效轉換給定的位置資訊\
(depends on 取得的資料格式)

***

## What to do next
可以開始決定之後想如何呈現\
以及實際用加鈞那邊分析產出的圖試做

***

###### tags: `web` 2022.11.18