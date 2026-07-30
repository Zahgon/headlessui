import { render, screen } from '@testing-library/react'
import React from 'react'
import { Description, Field, Fieldset, Label } from '..'
import {
  assertActiveElement,
  assertDisabledish,
  assertLinkedWithDescription,
  assertLinkedWithLabel,
  getControl,
  getDescriptions,
  getLabel,
  getLabels,
} from './accessibility-assertions'
import { click } from './interactions'
import { suppressConsoleLogs } from './suppress-console-logs'

export function commonControlScenarios(Control: React.ComponentType<any>) {
    throw new Error("STUB");
}

export function commonFormScenarios(
  Control: React.ComponentType<any>,
  {
    performUserInteraction,
  }: { performUserInteraction: (control: HTMLElement | null) => PromiseLike<void> }
) {
    throw new Error("STUB");
}

export function commonRenderingScenarios(
  Control: React.ComponentType<any>,
  { getElement }: { getElement: () => HTMLElement | null }
) {
    throw new Error("STUB");
}
