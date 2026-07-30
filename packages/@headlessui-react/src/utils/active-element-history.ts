import { onDocumentReady } from './document-ready'
import * as DOM from './dom'
import { focusableSelector } from './focus-management'

export let history: (HTMLOrSVGElement & Element)[] = []
onDocumentReady(() => {
    throw new Error("STUB");
})
