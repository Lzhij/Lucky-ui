<docs>
---
title: 基础按钮
---

你可以通过指定type, size, round来指定按钮的样式

</docs>
<template>
  <div>
    <LyButton>type</LyButton>
    <LyButton type="primary">primary</LyButton>
    <LyButton type="success">success</LyButton>
    <LyButton type="warning">warning</LyButton>
    <LyButton type="danger">danger</LyButton>
    <LyButton type="link">link</LyButton>
  </div>
  <div style="margin-top: 20px">
    <LyButton size="small">Small</LyButton>
    <LyButton>Normal</LyButton>
    <LyButton size="large">Large</LyButton>
  </div>
  <div style="margin-top: 20px">
    <LyButton round>type</LyButton>
    <LyButton round type="primary">primary</LyButton>
    <LyButton round type="success">success</LyButton>
    <LyButton round type="warning">warning</LyButton>
    <LyButton round type="danger">danger</LyButton>
    <LyButton round type="link">link</LyButton>
  </div>
</template>
