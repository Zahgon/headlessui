import React, { createContext, useContext, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useDisposables } from '../hooks/use-disposables'
import { objectToFormEntries } from '../utils/form'
import { compact } from '../utils/render'
import { Hidden, HiddenFeatures } from './hidden'

let FormFieldsContext = createContext<{ target: HTMLElement | null } | null>(null)

export function FormFieldsProvider(props: React.PropsWithChildren<{}>) {
    throw new Error("STUB");
}

export function HoistFormFields({ children }: React.PropsWithChildren<{}>) {
    throw new Error("STUB");
}

export function FormFields({
  data,
  form: formId,
  disabled,
  onReset,
  overrides,
}: {
  data: Record<string, any>
  overrides?: Record<string, any>
  form?: string
  disabled?: boolean
  onReset?: (e: Event) => void
}) {
    throw new Error("STUB");
}

function FormResolver({
  setForm,
  formId,
}: {
  setForm: (form: HTMLFormElement) => void
  formId?: string
}) {
    throw new Error("STUB");
}
