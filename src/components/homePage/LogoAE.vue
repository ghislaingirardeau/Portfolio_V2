<template>
  <div class="flex flex-center lg:absolute lg:right-64 z-30">
    <div class="header__logo wrap lg:ml-20 w-1/2 lg:w-1/5">
      <div
        ref="cube"
        class="cube kaushan-regular"
        :class="{ anim_cube: launchSpin }"
        :key="cubeRender"
      >
        <div ref="front" class="front" :class="cubeColor">
          <span class="front-color cube_letter-radient">g</span>
        </div>
        <div ref="back" class="back" :class="cubeColor">
          <span class="reverse-letter back-color" :class="{ anim_revert_web: launchSpin }">
            <span class="cube_letter-radient">w</span>
            <span class="cube_letter-radient">e</span>
            <span class="cube_letter-radient">b</span>
          </span>
        </div>
        <div ref="top" class="top" :class="cubeColor"></div>
        <div ref="bottom" class="bottom" :class="cubeColor"></div>
        <div ref="left" class="left" :class="cubeColor">
          <span class="left-color cube_letter-radient">G</span>
        </div>
        <div ref="right" class="right" :class="cubeColor">
          <span class="right-color cube_letter-radient">dev</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, useTemplateRef, watch } from 'vue'
import { gsap } from 'src/boot/gsap'
import { useAnimationSettings } from 'src/stores/animationSettings'
import { storeToRefs } from 'pinia'
import { useQuasar } from 'quasar'

const animationSettings = useAnimationSettings()
const { pageMounted, isRobotClickable, isCubeSpining, presentationMounted, logoMounted } =
  storeToRefs(animationSettings)

const $q = useQuasar()

const cubeRender = ref(0)
const launchSpin = ref(false)
const front = useTemplateRef('front')
const top = useTemplateRef('top')
const bottom = useTemplateRef('bottom')
const back = useTemplateRef('back')
const right = useTemplateRef('right')
const left = useTemplateRef('left')

onMounted(() => {
  buildCubeAnimation()
})

watch(
  () => isCubeSpining.value,
  (newValue) => {
    if (newValue) {
      spinCubeAnimation()
    }
  },
)

const cubeColor = computed(() => {
  return $q.dark.mode ? 'cube-dark' : 'cube-light'
})

function buildCubeAnimation() {
  logoMounted.value = false
  const duration = 0.4
  const delay = 0.4
  gsap.from(back.value, { duration, opacity: 0, delay })
  gsap.from(front.value, { duration, opacity: 0, delay })
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
  gsap.from(top.value, { duration, opacity: 0, delay })
  gsap.from(bottom.value, {
    duration,
    opacity: 0,
    delay,
    onComplete() {
      setTimeout(() => {
        pageMounted.value = true
        logoMounted.value = true
        if (presentationMounted.value) {
          isRobotClickable.value = true
        }
      }, 1000)
    },
  })
}

function spinCubeAnimation() {
  isRobotClickable.value = false
  pageMounted.value = false
  launchSpin.value = true
  cubeRender.value++
  setTimeout(() => {
    pageMounted.value = true
    // isRobotClickable.value = true
    isCubeSpining.value = false
  }, 2700)
}
</script>

<style scoped lang="scss">
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
  font-size: 3.4rem;
  padding-top: 20px;
}

.back {
  border-width: 2px;
  border-style: solid;
  border-radius: 7px;
  animation: deployedBackLarge 3s ease both;
  position: relative;

  &-color {
    position: absolute;
    top: 0px;
    left: 20%;
    & span {
      letter-spacing: 0.05em;
    }
  }
}
.right {
  border-width: 2px;
  border-style: solid;
  border-radius: 7px;
  transform: rotateY(-270deg) translateX(52px);
  transform-origin: top right;
  position: relative;

  &-color {
    position: absolute;
    top: 65px;
    left: 10%;
  }
}
.top {
  border-width: 5px;
  border-style: solid;
  border-radius: 12px;
  animation: deployedTopLarge 3s ease both;
  transform-origin: top center;
}
.bottom {
  border-width: 5px;
  border-style: solid;
  border-radius: 7px;
  animation: deployedBottomLarge 3s ease both;

  transform-origin: bottom center;
}
.left {
  border-width: 2px;
  border-style: solid;
  border-radius: 7px;
  transform: rotateY(270deg) translateX(-54px);
  transform-origin: center left;
  position: relative;

  &-color {
    position: absolute;
    top: 15px;
    left: 50%;
  }
}

.front {
  border-width: 2px;
  border-style: solid;
  border-radius: 7px;
  animation: deployedFrontLarge 3s ease both;
  position: relative;

  &-color {
    position: absolute;
    top: 40px;
    right: 25%;
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

@media screen and (max-width: 673px), screen and (min-width: 1025px) {
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
