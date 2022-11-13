# wangeditor-catalogue

二次开发 wangeditor 的标题目录，实现了类似语雀的标题目录。

功能：

1. 标题滚动跟随
2. 点击标题滚动到文章相应的位置
3. 活跃标题持续显示在可视区中

查看效果可访问我的个人博客，查看文章进行体验。

博客地址：http://longzai1024.top
视频讲解地址：https://www.bilibili.com/video/BV1Qe4y1W7wE/?vd_source=152be3b20868b67eb5ae64df542d6339

# 使用说明

### 安装

npm install wangeditor-catalogue

### 使用

在页面中引入组件

```js
//导入组件
import catalogue from "wangeditor-catalogue";
//导入样式
import "wangeditor-catalogue/css";
```

使用组件:需要传入 headers 列表，headers 通过 wangeditor 的 getElemsByTypePrefix()获取到的。

```js
<Editor
    class="editor-content-view"
    style="min-height: 500px; overflow-y: hidden"
    v-model="valueHtml"
    :defaultConfig="editorConfig"
    :mode="mode"
    @onCreated="handleCreated"
/>
 <catalogue :headers="headers" class="catelogue"></catalogue>


//editor实例创建完成以后获取文章中的标题
const handleCreated = (editor: IDomEditor) => {
  editorRef.value = editor; // 记录 editor 实例，重要！
  //获取header标题列表
  headers.value = editor.getElemsByTypePrefix("header");
  console.log(headers.value,'ppppppppppppp');
};
```

组件需要传递的 props：

1. headers : header 数组
2. scrollContinerDom : 产生滚动条的标签
3. scrollToFirstHeader : 跟随滚动时，滚动条与标题距离差
4. clickDistance : 点击标题滚动到相应标题滚动距离调整值

```js
 const props = withDefaults(
   defineProps<{
     headers: any; //header数组
     scrollContinerDom:HTMLElement, //产生滚动条的标签
     scrollToFirstHeader:number, //跟随滚动时，滚动条与标题距离差
     clickDistance:number //点击标题滚动到相应标题滚动距离调整值
   }>(),
   {
    scrollToFirstHeader:0,
    clickDistance:0
   }
 );
```
