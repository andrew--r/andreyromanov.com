---
layout: layouts/article
tags: notes
title: Правильное выравнивание по ширине контейнера
description:
date: 2015-09-18 22:17:00 +6
---
Вёрстка сетки с выравниванием элементов по ширине родительского контейнера — довольно распространённая задача. На первый взгляд эту задачу решить просто — задать инлайн-блокам нужную ширину и отступы, убрать отступы там, где их быть не должно. Но всё становится сложнее, если размер блоков заранее не известен.

Между тем, если вам не нужно поддерживать IE9-, вы можете использовать прекрасное решение на флексбоксе. И сразу кодпен с решением:

<iframe height='460' scrolling='no' src='//codepen.io/andrew-r/embed/yYORwm/?height=461&theme-id=0&default-tab=result' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%; max-width: 760px;'>See the Pen <a href='http://codepen.io/andrew-r/pen/yYORwm/'>Grid</a> by Andrew Romanov (<a href='http://codepen.io/andrew-r'>@andrew-r</a>) on <a href='http://codepen.io'>CodePen</a>.
</iframe>

Немного комментариев. В данном случае в одной строке сетки может размещаться максимум три элемента — пусть это число будет числом n, запомните его. Зададим контейнеру следующие свойства:

```css
.grid {
  display: flex;
  justify-content: space-between;
}
```

Казалось бы, задача решена — элементы выравниваются по ширине. Однако если в последней строке элементов будет меньше, чем нужно для её полного заполнения — например, только два блока с шириной в 33%, то эти два блока тоже будут выровнены по ширине, что не очень красиво.

![Наивное решение](assets/grid.png)

Чтобы блоки в последней строке выравнивались по левому краю, добавим в самый конец контейнера n—1 (помните? n — максимальное количество элементов в строке сетки) пустых элементов. Этим элементам зададим следующие стили:

```css
/* Псевдоселектор :empty автоматически выберет пустые элементы */
.grid__item:empty {
  flex: 0 0 33%; /* ширина наименьшего модуля сетки */
  height: 0; /* убедимся в том, что пустые элементы не будет видно в любом случае */
}
```

На экране этих блоков видно не будет, но браузер будет считать их за полноценные элементы сетки, и если в последней строке останется два видимых элемента, то один из двух пустых блоков подставится в эту же строку и займёт третьего элемента. Этакий элемент-фантом. Таким образом даже при недостатке видимых элементов последняя строка сетки всегда будет заполнена, а значит видимые элементы будут выравниваться по левому краю, что нам и требовалось.