import {
  cleanup,
  render,
  screen,
  type RenderOptions,
  type RenderResult,
} from '@testing-library/react'
import React, { type ReactElement } from 'react'
import { renderToString } from 'react-dom/server'
import { env } from '../utils/env'

type ServerRenderOptions = Omit<RenderOptions, 'queries'> & {
  strict?: boolean
}

interface ServerRenderResult {
  type: 'ssr' | 'hydrate'
  contents: string
  result: RenderResult
  hydrate: () => Promise<ServerRenderResult>
}

export async function renderSSR(
  ui: ReactElement,
  options: ServerRenderOptions = {}
): Promise<ServerRenderResult> {
    throw new Error("STUB");
}

export async function renderHydrate(el: ReactElement, options: ServerRenderOptions = {}) {
    throw new Error("STUB");
}

export { screen }
