// CSS is not injected in tests, so a real <Transition> never receives
// transitionend and leave animations never complete. Stub it so DOM
// assertions stay deterministic.
import { config } from '@vue/test-utils'

config.global.stubs = {
  ...config.global.stubs,
  transition: true,
  Transition: true,
}
