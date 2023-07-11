<template>
    <!-- 整个note布局的框架 -->
    <div class="note-container">
        <!-- 暂时不知道这个作者信息显示在哪里  现在知道了 当最小宽度小于960时 显示这个隐藏下面那个author-container :pagination="{ clickable: true }" 
        @mouseenter="navigationflag = !navigationflag" @mouseleave="navigationflag = !navigationflag"  @mouseenter="showBtn(true)" @mouseleave="showBtn(false)"-->
        <div class="author" style="display: none;"></div>
        <div class="media-container" @mouseenter="navigationflag = !navigationflag"
            @mouseleave="navigationflag = !navigationflag">
            <swiper-container navigation="true" pagination="true" slides-per-view="3" spaceBetween=10
                :centered-slides="true" :css-mode="true" :mousewheel="true" :speed="500" :loop="true"
                :loopAdditionalSlides=2 :zoom="true">
                <swiper-slide v-for="item in noteInfo.images"
                    :style="{ 'background-image': `url(${item})` }"></swiper-slide>
            </swiper-container>
            <!-- <div class="fraction" :style="{ display: !navigationflag ? 'none' : 'block' }">{{curPage}}/{{noteInfo.images.length}}</div>
            <div class="arrow-controller left" :style="{ display: !navigationflag ? 'none' : 'block' }" @click="slidePrev">
                <svg t="1688720029036" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                    p-id="5478" width="30" height="30">
                    <path
                        d="M301.568 536.32c-7.168 0-14.336-2.816-19.968-8.192-11.008-11.008-11.008-28.928 0-39.936L702.464 67.584c11.008-11.008 28.928-11.008 39.936 0 11.008 11.008 11.008 28.928 0 39.936L321.536 528.128c-5.376 5.376-12.8 8.192-19.968 8.192z"
                        p-id="5479" fill="#8a8a8a"></path>
                    <path
                        d="M722.432 964.864c-7.168 0-14.336-2.816-19.968-8.192L281.6 535.808c-11.008-11.008-11.008-28.928 0-39.936 11.008-11.008 28.928-11.008 39.936 0L742.4 916.736c11.008 11.008 11.008 28.928 0 39.936-5.632 5.376-12.8 8.192-19.968 8.192z"
                        p-id="5480" fill="#8a8a8a"></path>
                </svg>
            </div>
            <div class="arrow-controller right" :style="{ display: !navigationflag ? 'none' : 'block' }" @click="slideNext">
                <svg t="1688719972808" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                    p-id="4891" width="32" height="32">
                    <path
                        d="M357.376 852.309333a25.6 25.6 0 0 0 36.181333 36.181334l358.4-358.4a25.6 25.6 0 0 0 0-36.181334l-358.4-358.4a25.6 25.6 0 0 0-36.181333 36.181334L697.685333 512l-340.309333 340.309333z"
                        fill="#8a8a8a" p-id="4892"></path>
                </svg>
            </div>
            <div class="pagination" :style="{ display: !navigationflag ? 'none' : 'flex' }" >
                <div class="pagination-item " :class="{active : (index+1)==curPage}" v-for="(item,index) in noteInfo.images" @click="slidPagination(index)"></div>
            </div> -->
        </div>
        <div class="interaction-container">
            <div class="author-container"> 作者信息</div>
            <div class="note-scroller">评论区</div>
            <div class="interactions">留言</div>
        </div>
        <div class="close-circle">关闭按钮</div>
        <div class="close-box" style="display: none;">关闭按钮</div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';

import "swiper/css";
let navigationflag = ref(false);
let curPage = ref(1);
let swiperEl: any = '';
onMounted(() => {
    swiperEl = document.querySelector('swiper-container');
    swiperEl.addEventListener('progress', (event: any) => {
        const [swiper] = event.detail;
        // console.log(swiper.activeIndex);
        curPage.value = swiper.activeIndex;
        console.log(curPage.value);

    });
})

const noteInfo = reactive({
    images: ['https://sns-img-hw.xhscdn.com/2b7251e6-098f-1133-5aee-4512c218b009?imageView2/2/w/1920/format/webp|imageMogr2/strip', 'https://sns-img-hw.xhscdn.com/2b7251e6-098f-1133-5aee-4512c218b009?imageView2/2/w/1920/format/webp|imageMogr2/strip', 'https://sns-img-bd.xhscdn.com/2709d22e-eb1f-327a-e896-60fc470cc8b8?imageView2/2/w/1920/format/webp|imageMogr2/strip', 'https://sns-img-hw.xhscdn.com/74113caa-ab98-800b-db00-74e63b362c4a?imageView2/2/w/1920/format/webp|imageMogr2/strip'],
    author: '宋雨琦_G-I-DLE',
    avatar: 'https://sns-avatar-qc.xhscdn.com/avatar/609e89fee733be8eb0b3bb05.jpg?imageView2/2/w/120/format/webp|imageMogr2/strip',
})
// 前后图片轮回按钮
function slideNext() {
    if (curPage.value === 2) {
        console.log('slideToLoop');
        swiperEl.swiper.slideToLoop(-1, 10, false);
    } else {
        console.log("slideNext");
        swiperEl.swiper.slideNext(500);
    }
}
function slidePrev() {
    if (curPage.value === 0) {
        console.log('slideToLoop');
        swiperEl.swiper.slideToLoop(1, 10, false)
    } else {
        console.log("slidePrev");
        swiperEl.swiper.slidePrev(500);
    }

}
//下方导航
function slidPagination(index: number) {
    swiperEl.swiper.slideToLoop(index, 10, false)
}


</script>

<style>
swiper-container::part(container) {
    width: 60%;
    overflow: visible;
}



swiper-container::part(button-prev) {
    left:-40px;
}

swiper-container::part(button-next) {
    right:-40px;
}
</style>

<style lang="less" scoped>
*{
    margin: 0;
    padding: 0;
}
.note-container {
    border-radius: 10%;

    @media screen and (min-width: 960px) {
        display: flex;
        flex-direction: row;
        width: 78vw;
        height: 100vh;
        box-shadow: 0 0 100px rgba(0, 0, 0, .1);
        border-radius: 20px;
        background: #fff;
        margin: 0 auto;
        transform: translate(5vw, 1vh) scale(1);
        height: calc(100vh - 64px);

        & .media-container {
            position: relative;

            swiper-container {
                width: 38vw;
                height: 100%;

                swiper-slide {
                    width: 100%;
                    height: 100%;
                    border-radius: 5% 0 0 5%;
                    background-repeat: no-repeat;
                    background-position: 50%;
                    background-size: contain;

                    
                  
                    /* Center slide text vertically */
                    
                  
                }
            }

            .fraction {
                position: absolute;
                right: 0;
                top: 0;
                z-index: 1;
                background-color: rgb(14, 230, 230);
            }

            .arrow-controller {
                position: absolute;
                top: 48%;
                z-index: 1;
                background-color: #fff;
                border-radius: 50%;
                display: flex;
                align-items: center;
                opacity: .8;
                display: none;
                transition: .3s;
            }

            .left {
                left: 1vw;
            }

            .right {
                right: 1vw;
            }

            .pagination {
                display: flex;
                justify-content: center;
                position: absolute;
                bottom: 15px;
                width: 100%;
                display: none;
            }

            .pagination-item {
                margin: 0 3px;
                width: 6px;
                height: 6px;
                border-radius: 6px;
                background: hsla(0, 0%, 100%, .2);
                z-index: 2;
                cursor: pointer;
                transition: background .3s;
                opacity: .5;
            }

            .active {
                background: #fff;
                
            }

        }
    }

}
</style>
