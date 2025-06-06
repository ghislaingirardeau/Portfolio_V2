<template>
  <q-drawer
    v-model="leftDrawerOpen"
    ref="'drawer'"
    side="left"
    :behavior="useIsMobile() ? 'mobile' : 'desktop'"
    bordered
    :class="drawerColor"
    :width="250"
    @show.once="handleShowMenu"
  >
    <q-list>
      <template v-for="(menuItem, index) in menuList" :key="index">
        <q-item
          :exact="!menuItem.children"
          :to="menuItem.children ? null : menuItem.to"
          :active-class="$q.dark.mode ? 'text-dark-primary' : 'text-secondary'"
          :class="{ 'q-py-sm': menuItem.children, 'q-py-lg': !menuItem.children }"
        >
          <q-item-section avatar>
            <q-icon
              :ref="menuIcon.set"
              class="opacity-0 rotate-90"
              size="lg"
              :color="iconColor(menuItem.to.name)"
              :name="menuItem.icon"
            />
          </q-item-section>
          <q-item-section :ref="menuLabel.set" class="text-h6"> </q-item-section>
        </q-item>
        <div v-if="menuItem.children">
          <q-item
            v-for="(child, childIndex) in menuItem.children"
            :key="childIndex"
            exact
            :to="child.to"
            :active-class="$q.dark.mode ? 'text-dark-primary' : 'text-secondary'"
            class="q-py-lg"
          >
            <q-icon
              :ref="menuIcon.set"
              class="opacity-0 rotate-90 ml-10 mr-5"
              size="sm"
              :color="iconColor(child.to.name)"
              :name="child.icon"
            />
            <q-item-section :ref="menuLabel.set" class="text-h6"></q-item-section>
          </q-item>
        </div>
      </template>
    </q-list>
  </q-drawer>
</template>

<script setup lang="ts">
import {
  mdiAccountDetails,
  mdiCellphone,
  mdiCodeTagsCheck,
  mdiGamepad,
  mdiHandshake,
  mdiMonitor,
  mdiSourceRepository,
} from '@quasar/extras/mdi-v7'
import { computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { gsap } from 'src/boot/gsap'
import { useTemplateRefsList } from '@vueuse/core'
import { useAnimationSettings } from 'src/stores/animationSettings'
import { storeToRefs } from 'pinia'
import { useIsMobile } from 'src/utils/useDeviceInfo'
import { useQuasar } from 'quasar'
import { useRoute } from 'vue-router'

const animationSettings = useAnimationSettings()
const { ANIM_SHORT, drawerMounted } = storeToRefs(animationSettings)

const { t, locale } = useI18n()
const route = useRoute()
const $q = useQuasar()

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const menuLabel = useTemplateRefsList<any>()
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const menuIcon = useTemplateRefsList<any>()

const leftDrawerOpen = defineModel('leftDrawerOpen', { type: Boolean, required: true })

const menuList = computed(() => [
  {
    icon: mdiSourceRepository,
    label: t('navBar.projects'),
    children: [
      {
        icon: mdiCellphone,
        label: 'Mobile First',
        to: { name: 'projects-mobile' },
      },
      {
        icon: mdiMonitor,
        label: 'Web apps',
        to: { name: 'projects-desktop' },
      },
    ],
    to: {
      name: 'project',
    },
  },
  {
    icon: mdiCodeTagsCheck,
    label: t('navBar.stack'),
    to: {
      name: 'stack',
    },
  },
  {
    icon: mdiAccountDetails,
    label: t('navBar.aboutMe'),
    to: {
      name: 'aboutMe',
    },
  },
  {
    icon: mdiHandshake,
    label: t('navBar.aboutWork'),
    to: {
      name: 'aboutWork',
    },
  },
  {
    icon: mdiGamepad,
    label: t('navBar.game'),
    to: {
      name: 'game',
    },
  },
])

const drawerColor = computed(() => {
  if (useIsMobile()) {
    return $q.dark.mode ? 'bg-[rgba(0,0,0,0.8)]' : 'bg-[rgba(250,250,250,0.8)]'
  } else {
    return $q.dark.mode ? 'border_drawer-gradient' : ' border_drawer-gradient--light'
  }
})

function iconColor(currentRoute: string) {
  if ((route.name! as string).includes(currentRoute)) {
    return $q.dark.mode ? 'dark-primary' : 'secondary'
  }
  if (currentRoute === route.name) {
    return $q.dark.mode ? 'dark-primary' : 'secondary'
  } else {
    return $q.dark.mode ? 'white' : 'dark font-bold'
  }
}

function handleShowMenu() {
  handleMenuAnimation(0, true)
}

function handleMenuAnimation(delay: number, isFirstMount: boolean) {
  drawerMounted.value = false
  const tl = gsap.timeline({ delay: delay })

  const flatMenuAndSubMenu = menuList.value.flatMap((item) => {
    if (item.children) {
      return [item.label, ...item.children.map((child) => child.label)]
    } else {
      return item.label
    }
  })

  if (isFirstMount) {
    flatMenuAndSubMenu.forEach((_, index) => {
      const elementTarget = menuIcon.value[index].$el as HTMLDivElement
      tl.to(
        elementTarget,
        {
          duration: ANIM_SHORT.value,
          opacity: 1,
          rotateZ: 0,
          ease: 'none',
        },
        '-=0.2',
      )
    })
  }

  flatMenuAndSubMenu.forEach((label, index) => {
    const elementTarget = menuLabel.value[index].$el as HTMLDivElement
    tl.to(elementTarget, {
      duration: ANIM_SHORT.value,
      text: {
        value: label,
        newClass: `text-h6 ${$q.dark.mode ? 'white' : 'dark bold'}`,
      },
      ease: 'none',
    })
  })
  tl.call(() => {
    drawerMounted.value = true
  })
}

watch(
  () => locale.value,
  () => {
    handleMenuAnimation(0, false)
  },
)
</script>

<style lang="scss">
.q-drawer {
  opacity: 0.9 !important;
}
aside {
  background-color: transparent !important;
}
.border_drawer-gradient {
  border-right: 2px solid !important;
  border-image: linear-gradient(to top, #00000000, $dark-primary) 1 !important;
}
.border_drawer-gradient--light {
  border-right: 2px solid !important;
  border-image: linear-gradient(to top, #ffffff00, $primary) 1 !important;
}
</style>
