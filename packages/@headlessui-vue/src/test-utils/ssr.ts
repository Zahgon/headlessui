import { createApp, createSSRApp, nextTick } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { env } from '../utils/env'

export async function renderSSR(component: any, rootProps: any = {}) {
    throw new Error("STUB");
}

export async function renderHydrate(component: any, rootProps: any = {}) {
    throw new Error("STUB");
}
