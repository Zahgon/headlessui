import { defineComponent, h, ref } from 'vue'
import { Features, Hidden } from './hidden'

export let FocusSentinel = defineComponent({
  props: {
    onFocus: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
      throw new Error("STUB");
  },
})
