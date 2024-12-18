import { gsap } from 'gsap'

import { TextPlugin } from 'gsap/TextPlugin'
import { CustomEase } from 'gsap/CustomEase'

gsap.registerPlugin(TextPlugin)
gsap.registerPlugin(CustomEase)

CustomEase.create('hop', '.17,.67,.54,1.42')

export { gsap }
