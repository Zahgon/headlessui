import { defineComponent, type PropType } from 'vue'
import { render } from '../utils/render'

export enum Features {
  // The default, no features.
  None = 1 << 0,

  // Whether the element should be focusable or not.
  Focusable = 1 << 1,

  // Whether it should be completely hidden, even to assistive technologies.
  Hidden = 1 << 2,
}

export let Hidden = defineComponent({
  name: 'Hidden',
  props: {
    as: { type: [Object, String], default: 'div' },
    features: { type: Number as PropType<Features>, default: Features.None },
  },
  setup(props, { slots, attrs }) {
      throw new Error("STUB");
  },
})
