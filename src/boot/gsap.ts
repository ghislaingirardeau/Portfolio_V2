import { gsap } from 'gsap'

import { TextPlugin } from 'gsap/TextPlugin'
import { CustomEase } from 'gsap/CustomEase'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'

gsap.registerPlugin(TextPlugin)
gsap.registerPlugin(CustomEase)
gsap.registerPlugin(MotionPathPlugin)

CustomEase.create('hop', '.17,.67,.54,1.42')
CustomEase.create('fall-in', '.11,1.03,.44,1.21')

export { gsap }
