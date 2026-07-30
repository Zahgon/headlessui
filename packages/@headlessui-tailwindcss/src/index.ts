import plugin from 'tailwindcss/plugin.js'

interface Options {
  /**
   * The prefix used for the variants. This defaults to `ui`.
   *
   * Usage example:
   * ```html
   *  <div class="ui-open:underline"></div>
   *  ```
   **/
  prefix?: string
}

export default plugin.withOptions<Options>(({ prefix = 'ui' } = {}) => {
    throw new Error("STUB");
})
