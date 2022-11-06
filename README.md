# wangeditor-catalogue
二次开发wangeditor的标题目录，实现了类似语雀的标题目录。

功能：

1. 标题滚动跟随
2. 点击标题滚动到文章相应的位置
3. 活跃标题持续显示在可视区中

查看效果可访问我的个人博客，查看文章进行体验。

博客地址：http://longzai1024.top

# 使用说明

### 安装
npm install wangeditor-catalogue

### 使用
在页面中引入组件

```js
 //导入组件 
import catalogue from 'wangeditor-catalogue';
//导入样式  
import 'wangeditor-catalogue/css';
```

使用组件:需要传入headers列表，headers通过wangeditor的getElemsByTypePrefix()获取到的。

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





