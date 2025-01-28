<template>
  <div class="flex flex-center">
    <div class="Atom">
      <div class="Atom-nucleus">Front-end</div>
      <div class="Atom-orbit Atom-orbit--left Atom-orbit--foreground">
        <div class="Atom-electron"></div>
      </div>
      <div class="Atom-orbit Atom-orbit--right Atom-orbit--foreground">
        <div class="Atom-electron"></div>
      </div>
      <div class="Atom-orbit Atom-orbit--top Atom-orbit--foreground">
        <div class="Atom-electron"></div>
      </div>
      <!-- <div class="Atom-orbit Atom-orbit--bottom Atom-orbit--foreground">
          <q-img
            class="Atom-electron"
            src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg"
            width="35%"
          ></q-img>
        </div> -->
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
$Atom-size: 120px;
$Atom-bg: #eaf4f9;
$Atom-border-width: 3px;
$Atom-border-color: #0adef3;
$Atom-padding: 10px;

$Atom-nucleus-size: 70px;
$Atom-nucleus-bg: linear-gradient(-180deg, #0adef3 0%, #45beff 100%);
$Atom-nucleus-glow-radius: 12px;

$Atom-orbit-tickness: 4px;
$Atom-orbit-color: white;

$Atom-electron-radius: 6px;
$Atom-electron-border-width: 3px;
$Atom-electron-glow-radius: 6px;

$Atom-Yrotation: 70deg;
$Atom-Ztilt: 60deg;

$Atom-electrons: (
  top: (
    background: linear-gradient(-180deg, #fad161 0%, #f99337 100%),
    glow: #fad161,
    orbitDuration: 6s,
    tilt: 0deg,
    startRotation: 0deg,
  ),
  left: (
    background: linear-gradient(-180deg, #69ee75 0%, #68cc87 100%),
    glow: #69ee75,
    orbitDuration: 1.5s,
    tilt: -$Atom-Ztilt,
    startRotation: 60deg,
  ),
  right: (
    background: linear-gradient(-180deg, #992dd8 0%, #7034af 100%),
    glow: #992dd8,
    orbitDuration: 0.9s,
    tilt: $Atom-Ztilt,
    startRotation: 120deg,
  ),
  bottom: (
    background: linear-gradient(-180deg, #d9541f 0%, #c15c35 100%),
    glow: #d9541f,
    orbitDuration: 4s,
    tilt: 20deg,
    startRotation: 50deg,
  ),
);

@mixin circle($Atom-radius) {
  display: block;
  content: '';
  width: $Atom-radius * 2;
  height: $Atom-radius * 2;
  margin-left: -$Atom-radius;
  margin-top: -$Atom-radius;
  border-radius: 50%;
}

.Atom {
  width: $Atom-size;
  height: $Atom-size;
  position: relative;
  border-radius: 50%;
  padding: $Atom-padding;
}

.Atom-nucleus,
.Atom-nucleus:before {
  position: absolute;
  background: $Atom-nucleus-bg;
}

.Atom-nucleus {
  @include circle($Atom-nucleus-size * 0.5);
  top: $Atom-size * 0.5 + $Atom-padding;
  left: $Atom-size * 0.5 + $Atom-padding;
  box-shadow: 0 0 12px 4px rgba(10, 222, 243, 0.6);
  z-index: 2;
}

.Atom-nucleus:before {
  @include circle($Atom-nucleus-size * 0.5 + $Atom-nucleus-glow-radius);
  top: $Atom-nucleus-size * 0.5;
  left: $Atom-nucleus-size * 0.5;
  opacity: 0.1;
}

.Atom-orbit {
  position: absolute;
  width: $Atom-size;
  height: $Atom-size;
  border: solid $Atom-orbit-tickness transparent;
  transform-style: preserve-3d;
}

.Atom-orbit--visible {
  border-radius: 50%;
  border-color: $Atom-orbit-color;
}

.Atom-electron {
  transform-style: preserve-3d;

  &:after {
    @include circle($Atom-electron-radius);
    position: absolute;
    top: $Atom-size * 0.5;
    left: $Atom-size * 0.5;
    border-color: rgba(255, 255, 255, 0.4);
  }
}

@each $name, $values in $Atom-electrons {
  // tilt each orbit
  .Atom-orbit--#{$name}.Atom-orbit--visible {
    transform: rotateZ(map-get($values, 'tilt')) rotateY($Atom-Yrotation);
  }

  .Atom-orbit--#{$name}.Atom-orbit--foreground {
    transform: translateZ(100px) rotateZ(map-get($values, 'tilt')) rotateY($Atom-Yrotation);
  }

  $startRotation: map-get($values, 'startRotation');

  // animate each electron to rotate around the orbit
  @keyframes rotate-#{$name} {
    0% {
      transform: rotate($startRotation + 0deg) translate(-$Atom-size * 0.5)
        rotate(-$startRotation - 0deg);
    }
    100% {
      transform: rotate($startRotation + 360deg) translate(-$Atom-size * 0.5)
        rotate(-$startRotation - 360deg);
    }
  }

  // animate each electron to rotate around the orbit
  @keyframes zind-left {
    0% {
      z-index: 1;
    }
    49% {
      z-index: 1;
    }
    50% {
      z-index: 3;
    }
    100% {
      z-index: 3;
    }
  }
  // animate each electron to rotate around the orbit
  @keyframes zind-right {
    0% {
      z-index: 3;
    }
    49% {
      z-index: 3;
    }
    50% {
      z-index: 1;
    }
    100% {
      z-index: 1;
    }
  }
  // animate each electron to rotate around the orbit
  @keyframes zind-top {
    0% {
      z-index: 1;
    }
    24% {
      z-index: 1;
    }
    25% {
      z-index: 3;
    }
    75% {
      z-index: 3;
    }
    76% {
      z-index: 1;
    }
  }

  // animate each electron to rotate around the orbit
  @keyframes zind-bottom {
    0% {
      z-index: 1;
    }
    24% {
      z-index: 1;
    }
    25% {
      z-index: 3;
    }
    75% {
      z-index: 3;
    }
    76% {
      z-index: 1;
    }
  }

  .Atom-orbit--#{$name} {
    animation: zind-#{$name} infinite linear;
    animation-duration: map-get($values, 'orbitDuration');
    .Atom-electron {
      animation: rotate-#{$name} infinite linear;
      animation-duration: map-get($values, 'orbitDuration');
      transform: rotate($startRotation + 0deg)
        translate(-$Atom-size * 0.5)
        rotate(-$startRotation - 0deg);

      &:before,
      &:after {
        transform: rotateY(-$Atom-Yrotation) rotateZ(- map-get($values, 'tilt'));
      }
      &:before {
        background: map-get($values, 'background');
        opacity: 0.2;
      }
      &:after {
        background: map-get($values, 'background');
        box-shadow: 0px 0px 5px 0px map-get($values, 'glow');
      }
    }
  }
}
</style>
