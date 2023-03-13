---
prev: false
---
# Button 按钮

按钮用于开始一个即时操作。

## 基础用法

<demo src="../../demos/button/basic.vue"></demo>

## 禁用状态

<demo src="../../demos/button/disabled.vue"></demo>

## 加载中状态

<demo src="../../demos/button/loading.vue"></demo>

## Api
| 属性 | 说明 | 类型 | 默认值 |
| - |:--:| :-:| -:|
| type | 类型 | `default, primary, success, warning, danger, link` | default |
| size | 尺寸 | `normal, small, large` | normal |
| round | 是否为圆角 | boolean | false |
| disabled | 是否禁用 | boolean | false |
| loading | 是否为加载中z状态 | boolean | false |

## Slot
| 插槽名 | 说明 |
| - |:--:|
| default | 默认加载内容 |

## Event
| 事件名称 | 事件参数 | 说明 |
| - |:--:|:--:|
| onClick | e: Event | 点击事件 |