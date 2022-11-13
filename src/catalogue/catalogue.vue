<template>
   <div class="editor_menu">
     <h4 class="title">大纲</h4>
     <ul class="header-container" ref="headerList">
       <li v-for="(item, index) in headers" @click="handScroll" :id="item.id" :type="item.type" class="cata_list"
         :class="{ active: activeTitle === item.id }">
         {{ item.children[0].text }}
       </li>
     </ul>
   </div>
 </template>
 <script lang="ts" setup>
 import {ref, withDefaults, watch,onMounted } from "vue";
 import * as _ from "lodash";
 const headerList = ref<HTMLUListElement>()
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
 let isScroll = true;
 let scrollContiner = props.scrollContinerDom ? props.scrollContinerDom : document;
 
 //当前活跃标题
 const activeTitle = ref("");
 //监听activeTitle
 let activeDom:any = null;
 let intersectionObserver:any = null;
 watch(activeTitle,()=>{
   console.log(isScroll);
     //取消上一个的intersectionObserver监听
     intersectionObserver && activeDom && intersectionObserver.unobserve(activeDom);
 
     activeDom = headerList.value && headerList.value.querySelector(`#${activeTitle.value}`);
 
     intersectionObserver = new IntersectionObserver(function (entries) {
      // 与可视区相交 isIntersecting = true 
       if (!entries[0].isIntersecting && isScroll) {
         // 获取活跃标题距离顶部的位置
         let Atop = activeDom && activeDom.offsetTop
         console.log(Atop,activeDom);
         Atop && headerList.value?.scrollTo(0,Atop-20)
       }
     });
 
     //监听当前的activeDOM
     activeDom && intersectionObserver.observe(activeDom);
 })
 
 onMounted(()=>{
   headerList.value && headerList.value.addEventListener('scroll',(e: any)=>{
     isScroll = false;
   })
 })
 
 watch(
   () => props.headers,
   () => {
     activeTitle.value = props.headers.length > 0 ? props.headers[0].id : null;
   }
 );
 // 标题点击事件
 const handScroll = (event: any) => {
   if (event) {
     if (event.target.tagName !== "LI") return;
     event.preventDefault();
     const id = event.target!.id;
     activeTitle.value = id;
     // 滚动到标题
     console.log(id);
     const curHead = document.querySelector<HTMLElement>(`#${id}`);
     //获取元素的位置信息
     function getRect(ele: HTMLElement) {
       const params = ele.offsetTop;
       if(props.scrollContinerDom){
          props.scrollContinerDom.scrollTo(0, params + props.clickDistance)
       }else{
          window.scrollTo(0, params + props.clickDistance);
       }
     }
     curHead && getRect(curHead);
   }
 };
 
 let scrollTimer: any;
 //监听滚轮的滚动事件 实现标题跟随滚动
 scrollContiner.addEventListener("scroll", function (e: any) {
   isScroll = true;
   clearTimeout(scrollTimer)
   scrollTimer = setTimeout(() => {
     let doe = props.scrollContinerDom ? props.scrollContinerDom : document.documentElement || document.body;
     const list = document.querySelectorAll<HTMLElement>(`.cata_list`);
    /* 遍历每一个标题，比较标题距离顶部的距离和滚动条滚动的距离
    如果遍历到第一个大于滚动条滚动的距离，那么该标题就是活跃标题 */
     for (let i = 0; i < list.length; i++) {
       const curHead = document.querySelector<HTMLElement>(`#${list[i].id}`);
       if (curHead!.offsetTop + props.scrollToFirstHeader > doe.scrollTop && i > 0) {
         activeTitle.value = list[i - 1].id;
         break;
       }
     }
   }, 100);
 });
 </script>
 <style lang="less" scoped>
 li {
   list-style-type: none;
 }
 
 .editor_menu {
   width: 250px;
   padding: 10px;
 
   .title {
     text-align: center;
   }
 
   .header-container {
     position: relative;
     overflow-y: scroll;
     max-height: 500px;
 
     /* 设置垂直滚动条的宽度和水平滚动条的高度 */
     &::-webkit-scrollbar {
       width: 2px;
       height: 2px;
     }
 
     /* 设置滚动条的滑轨 */
     &::-webkit-scrollbar-track {
       background-color: #ddd;
     }
 
     /* 滑块 */
     &::-webkit-scrollbar-thumb {
       background-color: #0080ff;
       border-radius: 4px;
     }
 
     /* 滑轨两头的监听按钮 */
     &::-webkit-scrollbar-button {
       background-color: #888;
       display: none;
     }
 
     /* 横向滚动条和纵向滚动条相交处尖角 */
     &::-webkit-scrollbar-corner {
       background-color: black;
     }
 
     .cata_list {
       width: 100%;
       overflow-x: hidden;
       white-space: nowrap;
       text-overflow: ellipsis;
       box-sizing: border-box;
       border-left: 2px solid #e0e0e0;
       padding: 10px 10px 10px 5px;
       font-size: 14px;
       cursor: pointer;
 
       &:hover {
         color: #0080ff;
       }
 
       &[type="header1"] {
         padding-left: 5px;
         font-size: 18px;
       }
 
       &[type="header2"] {
         padding-left: 15px !important;
         font-size: 16px;
       }
 
       &[type="header3"] {
         padding-left: 30px !important;
         font-size: 15px;
       }
 
       &[type="header4"] {
         padding-left: 45px !important;
         font-size: 12px;
       }
 
       &[type="header5"] {
         padding-left: 60px !important;
         font-size: 10px;
       }
     }
 
     .active {
       color: #0080ff;
       border-left: 2px solid #0080ff;
     }
   }
 }
 </style>
 