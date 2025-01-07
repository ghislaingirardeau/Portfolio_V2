<template>
  <div class="flex flex-center lg:absolute lg:right-64 z-30" @click="spinCubeAnimation">
    <div class="header__logo wrap lg:ml-20 w-1/2 lg:w-1/5">
      <div
        ref="cube"
        @mouseenter="animationSettings.handleClickableEnter"
        @mouseleave="animationSettings.handleClickableLeave"
        class="cube"
        :class="{ anim_cube: launchSpin }"
        :key="cubeRender"
      >
        <div ref="front" class="front">
          <span class="front-color">g</span>
        </div>
        <div ref="back" class="back">
          <span class="reverse-letter back-color" :class="{ anim_revert_web: launchSpin }">
            <span>w</span>
            <span>e</span>
            <span>b</span>
          </span>
        </div>
        <div ref="top" class="top"></div>
        <div ref="bottom" class="bottom"></div>
        <div ref="left" class="left">
          <span class="left-color">G</span>
        </div>
        <div ref="right" class="right">
          <span class="right-color">dev</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, useTemplateRef } from 'vue'
import { gsap } from 'src/boot/gsap'
import { useAnimationSettings } from 'src/stores/animationSettings'

const animationSettings = useAnimationSettings()

const cubeRender = ref(0)
const launchSpin = ref(false)
const front = useTemplateRef('front')
const top = useTemplateRef('top')
const bottom = useTemplateRef('bottom')
const back = useTemplateRef('back')
const right = useTemplateRef('right')
const left = useTemplateRef('left')
const cube = useTemplateRef('cube')

onMounted(() => {
  buildCubeAnimation()
})

function buildCubeAnimation() {
  const duration = 0.8
  gsap.from(back.value, { duration, opacity: 0, delay: 0.8 })
  gsap.from(front.value, { duration, opacity: 0, delay: 0.8 })
  gsap.from(left.value, {
    duration,
    x: '-20px',
    opacity: 0,
  })
  gsap.from(right.value, {
    duration,
    x: '20px',
    opacity: 0,
  })
  gsap.from(top.value, { duration, opacity: 0, delay: 0.8 })
  gsap.from(bottom.value, { duration, opacity: 0, delay: 0.8 })
}

function spinCubeAnimation() {
  animationSettings.isAnimating = true
  launchSpin.value = true
  cubeRender.value++
  setTimeout(() => {
    animationSettings.isAnimating = false
  }, 2700)
}
</script>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Kaushan+Script&display=swap');
$font_logo: 'Kaushan Script', cursive;

.header__logo {
  height: 100px;
  padding: 20px 0px 30px 12%;
}

.wrap {
  perspective: 400px;
  perspective-origin: 50% 50px;
}
.anim_cube {
  animation: spin 2.4s 0.3s linear;
}
.anim_revert_web {
  animation: reverseWeb 2.4s 0.3s ease both;
}
.cube {
  position: relative;
  width: 150px;
  transform-style: preserve-3d;
  transform: rotateY(-50deg) rotateX(10deg);
  cursor: pointer;
}
.cube div {
  position: absolute;
  width: 150px;
  height: 150px;
  text-align: center;
  font-family: $font_logo;
  font-size: 3.4rem;
  padding-top: 20px;

  color: $primary;
}
.back {
  border: $primary 2px solid;
  border-radius: 7px;
  animation: deployedBackLarge 3s ease both;
  position: relative;
  &-color {
    position: absolute;
    top: 0px;
    left: 20%;
    color: $primary;
    & span {
      letter-spacing: 0.05em;
    }
  }
}
.right {
  border: $primary 2px solid;
  border-radius: 7px;
  transform: rotateY(-270deg) translateX(52px);
  transform-origin: top right;
  position: relative;
  &-color {
    position: absolute;
    top: 65px;
    left: 10%;
    color: $primary;
  }
}
.top {
  border: $primary 5px solid;
  border-radius: 12px;
  animation: deployedTopLarge 3s ease both;
  transform-origin: top center;
}
.bottom {
  border: $primary 5px solid;
  border-radius: 7px;
  animation: deployedBottomLarge 3s ease both;

  transform-origin: bottom center;
}
.left {
  border: $primary 2px solid;
  border-radius: 7px;
  transform: rotateY(270deg) translateX(-54px);
  transform-origin: center left;
  position: relative;
  &-color {
    position: absolute;
    top: 15px;
    left: 50%;
    color: $primary;
  }
}

.front {
  border: $primary 2px solid;
  border-radius: 7px;
  animation: deployedFrontLarge 3s ease both;
  position: relative;
  &-color {
    position: absolute;
    top: 40px;
    right: 25%;
    color: $primary;
  }
}

.reverse-letter {
  transform: rotateY(180deg);
  display: inline-block;
}
@keyframes reverseWeb {
  0% {
    transform: rotateY(180deg);
  }
  45% {
    transform: rotateY(0deg);
  }
  50% {
    transform: rotateY(0deg);
  }
  80% {
    transform: rotateY(180deg);
  }
  100% {
    transform: rotateY(180deg);
  }
}

@keyframes deployedFrontLarge {
  0% {
    transform: translateZ(100px);
  }
  10% {
    transform: translateZ(120px);
  }
  90% {
    transform: translateZ(120px);
  }
  100% {
    transform: translateZ(100px);
  }
}

@keyframes deployedFront {
  0% {
    transform: translateZ(50px);
  }
  10% {
    transform: translateZ(60px);
  }
  90% {
    transform: translateZ(60px);
  }
  100% {
    transform: translateZ(50px);
  }
}
@keyframes deployedTopLarge {
  0% {
    transform: rotateX(-90deg) translateY(-100px) translateZ(0px);
  }
  10% {
    transform: rotateX(-90deg) translateY(-100px) translateZ(-15px);
  }
  90% {
    transform: rotateX(-90deg) translateY(-100px) translateZ(-15px);
  }
  100% {
    transform: rotateX(-90deg) translateY(-100px) translateZ(0px);
  }
}
@keyframes deployedTop {
  0% {
    transform: rotateX(-90deg) translateY(-50px) translateZ(0px);
  }
  10% {
    transform: rotateX(-90deg) translateY(-50px) translateZ(-5px);
  }
  90% {
    transform: rotateX(-90deg) translateY(-50px) translateZ(-5px);
  }
  100% {
    transform: rotateX(-90deg) translateY(-50px) translateZ(0px);
  }
}
@keyframes deployedBottomLarge {
  0% {
    transform: rotateX(90deg) translateY(100px) translateZ(0px);
  }
  10% {
    transform: rotateX(90deg) translateY(100px) translateZ(-15px);
  }
  90% {
    transform: rotateX(90deg) translateY(100px) translateZ(-15px);
  }
  100% {
    transform: rotateX(90deg) translateY(100px) translateZ(0px);
  }
}
@keyframes deployedBottom {
  0% {
    transform: rotateX(90deg) translateY(50px) translateZ(0px);
  }
  10% {
    transform: rotateX(90deg) translateY(50px) translateZ(-5px);
  }
  90% {
    transform: rotateX(90deg) translateY(50px) translateZ(-5px);
  }
  100% {
    transform: rotateX(90deg) translateY(50px) translateZ(0px);
  }
}
@keyframes deployedBackLarge {
  0% {
    transform: translateZ(-54px) rotateY(180deg);
  }
  10% {
    transform: translateZ(-74px) rotateY(180deg);
  }
  90% {
    transform: translateZ(-74px) rotateY(180deg);
  }
  100% {
    transform: translateZ(-54px) rotateY(180deg);
  }
}
@keyframes deployedBack {
  0% {
    transform: translateZ(-54px) rotateY(180deg);
  }
  10% {
    transform: translateZ(-64px) rotateY(180deg);
  }
  90% {
    transform: translateZ(-64px) rotateY(180deg);
  }
  100% {
    transform: translateZ(-54px) rotateY(180deg);
  }
}

@keyframes spin {
  0% {
    transform: rotateY(-50deg) rotateX(10deg);
  }
  50% {
    transform: rotateY(-230deg) rotateX(10deg);
  }
  100% {
    transform: rotateY(-410deg) rotateX(10deg);
  }
}

@media screen and (max-width: 992px) {
  .cube {
    width: 100px;
  }
  .cube div {
    width: 100px;
    height: 100px;
    font-size: 2.4rem;
  }
  .right {
    &-color {
      top: 45px;
      left: 35%;
    }
  }
  .left {
    &-color {
      left: 57%;
    }
  }
  .front {
    animation: deployedFront 3s ease both;
    &-color {
      top: 30px;
      right: 28%;
    }
  }
  .top {
    animation: deployedTop 3s ease both;
  }
  .bottom {
    animation: deployedBottom 3s ease both;
  }
  .back {
    animation: deployedBack 3s ease both;
  }
}

@media (prefers-reduced-motion: reduce) {
  @keyframes spin {
    0% {
      transform: rotateY(-50deg) rotateX(10deg);
    }
    100% {
      transform: rotateY(-50deg) rotateX(10deg);
    }
  }
}
</style>
