---
prev: false
---
# Input 输入框

通过鼠标或键盘输入字符

## 基础用法

<demo src="../../demos/input/basic.vue"></demo>

## Input 校验

<demo src="../../demos/input/valid.vue"></demo>

## Input 内置方法与属性

<demo src="../../demos/input/method.vue"></demo>

## Input Api
| 属性 | 说明 | 类型 | 默认值 |
| - | - | - | - |
| v-model | 属性绑定 | string | `''` |
| size | 尺寸 | `normal, small, large` | normal |
| disabled | 是否禁用 | boolean | false |

## Input Exposes
| 名称 | 说明 | 类型 |
| - | - | - |
| validate | 触发校验 | Function |
| clearValid | 清除校验 | Function |
| reset | 重置输入框 | Function |
| inputEl | 内置input元素 | HTMLInputElement |
| isValidFailed | 是否为校验失败状态 | Boolean |