import { FocusableMode, isFocusableElement } from '../utils/focus-management'

function assertNever(x: never): never {
  throw new Error('Unexpected object: ' + x)
}

// ---

export function getMenuButton(): HTMLElement | null {
    throw new Error("STUB");
}

export function getMenuButtons(): HTMLElement[] {
    throw new Error("STUB");
}

export function getMenu(): HTMLElement | null {
    throw new Error("STUB");
}

export function getMenus(): HTMLElement[] {
    throw new Error("STUB");
}

export function getMenuItems(): HTMLElement[] {
    throw new Error("STUB");
}

// ---

export enum MenuState {
  /** The menu is visible to the user. */
  Visible,

  /** The menu is **not** visible to the user. It's still in the DOM, but it is hidden. */
  InvisibleHidden,

  /** The menu is **not** visible to the user. It's not in the DOM, it is unmounted. */
  InvisibleUnmounted,
}

export function assertMenuButton(
  options: {
    attributes?: Record<string, string | null>
    textContent?: string
    state: MenuState
  },
  button = getMenuButton()
) {
    throw new Error("STUB");
}

export function assertMenuButtonLinkedWithMenu(button = getMenuButton(), menu = getMenu()) {
    throw new Error("STUB");
}

export function assertMenuLinkedWithMenuItem(item: HTMLElement | null, menu = getMenu()) {
    throw new Error("STUB");
}

export function assertNoActiveMenuItem(menu = getMenu()) {
    throw new Error("STUB");
}

export function assertMenu(
  options: {
    attributes?: Record<string, string | null>
    textContent?: string
    state: MenuState
  },
  menu = getMenu()
) {
    throw new Error("STUB");
}

export function assertMenuItem(
  item: HTMLElement | null,
  options?: { tag?: string; attributes?: Record<string, string | null> }
) {
    throw new Error("STUB");
}

// ---

export function getComboboxLabel(): HTMLElement | null {
    throw new Error("STUB");
}

export function getComboboxButton(): HTMLElement | null {
    throw new Error("STUB");
}

export function getComboboxButtons(): HTMLElement[] {
    throw new Error("STUB");
}

export function getComboboxInput(): HTMLInputElement | null {
    throw new Error("STUB");
}

export function getCombobox(): HTMLElement | null {
    throw new Error("STUB");
}

export function getComboboxInputs(): HTMLElement[] {
    throw new Error("STUB");
}

export function getComboboxes(): HTMLElement[] {
    throw new Error("STUB");
}

export function getComboboxOptions(): HTMLElement[] {
    throw new Error("STUB");
}

// ---

export enum ComboboxState {
  /** The combobox is visible to the user. */
  Visible,

  /** The combobox is **not** visible to the user. It's still in the DOM, but it is hidden. */
  InvisibleHidden,

  /** The combobox is **not** visible to the user. It's not in the DOM, it is unmounted. */
  InvisibleUnmounted,
}

export enum ComboboxMode {
  /** The combobox is in the `single` mode. */
  Single,

  /** The combobox is in the `multiple` mode. */
  Multiple,
}

export function assertCombobox(
  options: {
    attributes?: Record<string, string | null>
    textContent?: string
    state: ComboboxState
    mode?: ComboboxMode
  },
  combobox = getComboboxInput(),
  listbox = getListbox()
) {
    throw new Error("STUB");
}

export function assertComboboxInput(
  options: {
    attributes?: Record<string, string | null>
    state: ComboboxState
  },
  input = getComboboxInput()
) {
    throw new Error("STUB");
}

export function assertComboboxList(
  options: {
    attributes?: Record<string, string | null>
    textContent?: string
    state: ComboboxState
  },
  listbox = getCombobox()
) {
    throw new Error("STUB");
}

export function assertComboboxButton(
  options: {
    attributes?: Record<string, string | null>
    textContent?: string
    state: ComboboxState
  },
  button = getComboboxButton()
) {
    throw new Error("STUB");
}

export function assertComboboxLabel(
  options: {
    attributes?: Record<string, string | null>
    tag?: string
    textContent?: string
  },
  label = getComboboxLabel()
) {
    throw new Error("STUB");
}

export function assertComboboxButtonLinkedWithCombobox(
  button = getComboboxButton(),
  combobox = getCombobox()
) {
    throw new Error("STUB");
}

export function assertComboboxLabelLinkedWithCombobox(
  label = getComboboxLabel(),
  combobox = getComboboxInput()
) {
    throw new Error("STUB");
}

export function assertComboboxButtonLinkedWithComboboxLabel(
  button = getComboboxButton(),
  label = getComboboxLabel()
) {
    throw new Error("STUB");
}

export function assertActiveComboboxOption(
  item: HTMLElement | null,
  combobox = getComboboxInput()
) {
    throw new Error("STUB");
}

export function assertNotActiveComboboxOption(
  item: HTMLElement | null,
  combobox = getComboboxInput()
) {
    throw new Error("STUB");
}

export function assertNoActiveComboboxOption(combobox = getComboboxInput()) {
    throw new Error("STUB");
}

export function assertNoSelectedComboboxOption(items = getComboboxOptions()) {
    throw new Error("STUB");
}

export function assertComboboxOption(
  item: HTMLElement | null,
  options?: {
    tag?: string
    attributes?: Record<string, string | null>
    selected?: boolean
  }
) {
    throw new Error("STUB");
}

// ---

export function getListboxLabel(): HTMLElement | null {
    throw new Error("STUB");
}

export function getListboxButton(): HTMLElement | null {
    throw new Error("STUB");
}

export function getListboxButtons(): HTMLElement[] {
    throw new Error("STUB");
}

export function getListbox(): HTMLElement | null {
    throw new Error("STUB");
}

export function getListboxes(): HTMLElement[] {
    throw new Error("STUB");
}

export function getListboxOptions(): HTMLElement[] {
    throw new Error("STUB");
}

// ---

export enum ListboxState {
  /** The listbox is visible to the user. */
  Visible,

  /** The listbox is **not** visible to the user. It's still in the DOM, but it is hidden. */
  InvisibleHidden,

  /** The listbox is **not** visible to the user. It's not in the DOM, it is unmounted. */
  InvisibleUnmounted,
}

export enum ListboxMode {
  /** The listbox is in the `single` mode. */
  Single,

  /** The listbox is in the `multiple` mode. */
  Multiple,
}

export function assertListbox(
  options: {
    attributes?: Record<string, string | null>
    textContent?: string
    state: ListboxState
    mode?: ListboxMode
    orientation?: 'horizontal' | 'vertical'
  },
  listbox = getListbox()
) {
    throw new Error("STUB");
}

export function assertListboxButton(
  options: {
    attributes?: Record<string, string | null>
    textContent?: string
    state: ListboxState
  },
  button = getListboxButton()
) {
    throw new Error("STUB");
}

export function assertListboxLabel(
  options: {
    attributes?: Record<string, string | null>
    tag?: string
    textContent?: string
  },
  label = getListboxLabel()
) {
    throw new Error("STUB");
}

export function assertListboxButtonLinkedWithListbox(
  button = getListboxButton(),
  listbox = getListbox()
) {
    throw new Error("STUB");
}

export function assertListboxLabelLinkedWithListbox(
  label = getListboxLabel(),
  listbox = getListbox()
) {
    throw new Error("STUB");
}

export function assertListboxButtonLinkedWithListboxLabel(
  button = getListboxButton(),
  label = getListboxLabel()
) {
    throw new Error("STUB");
}

export function assertActiveListboxOption(item: HTMLElement | null, listbox = getListbox()) {
    throw new Error("STUB");
}

export function assertNoActiveListboxOption(listbox = getListbox()) {
    throw new Error("STUB");
}

export function assertNoSelectedListboxOption(items = getListboxOptions()) {
    throw new Error("STUB");
}

export function assertListboxOption(
  item: HTMLElement | null,
  options?: {
    tag?: string
    attributes?: Record<string, string | null>
    selected?: boolean
  }
) {
    throw new Error("STUB");
}

// ---

export function getSwitch(): HTMLElement | null {
    throw new Error("STUB");
}

export function getSwitchLabel(): HTMLElement | null {
    throw new Error("STUB");
}

// ---

export enum SwitchState {
  On,
  Off,
}

export function assertSwitch(
  options: {
    state: SwitchState
    tag?: string
    textContent?: string
    label?: string
    description?: string
    attributes?: Record<string, string | null>
  },
  switchElement = getSwitch()
) {
    throw new Error("STUB");
}

// ---

export function getDisclosureButton(): HTMLElement | null {
    throw new Error("STUB");
}

export function getDisclosurePanel(): HTMLElement | null {
    throw new Error("STUB");
}

// ---

export enum DisclosureState {
  /** The disclosure is visible to the user. */
  Visible,

  /** The disclosure is **not** visible to the user. It's still in the DOM, but it is hidden. */
  InvisibleHidden,

  /** The disclosure is **not** visible to the user. It's not in the DOM, it is unmounted. */
  InvisibleUnmounted,
}

// ---

export function assertDisclosureButton(
  options: {
    attributes?: Record<string, string | null>
    textContent?: string
    state: DisclosureState
  },
  button = getDisclosureButton()
) {
    throw new Error("STUB");
}

export function assertDisclosurePanel(
  options: {
    attributes?: Record<string, string | null>
    textContent?: string
    state: DisclosureState
  },
  panel = getDisclosurePanel()
) {
    throw new Error("STUB");
}

// ---

export function getPopoverButton(): HTMLElement | null {
    throw new Error("STUB");
}

export function getPopoverPanel(): HTMLElement | null {
    throw new Error("STUB");
}

export function getPopoverOverlay(): HTMLElement | null {
    throw new Error("STUB");
}

// ---

export enum PopoverState {
  /** The popover is visible to the user. */
  Visible,

  /** The popover is **not** visible to the user. It's still in the DOM, but it is hidden. */
  InvisibleHidden,

  /** The popover is **not** visible to the user. It's not in the DOM, it is unmounted. */
  InvisibleUnmounted,
}

// ---

export function assertPopoverButton(
  options: {
    attributes?: Record<string, string | null>
    textContent?: string
    state: PopoverState
  },
  button = getPopoverButton()
) {
    throw new Error("STUB");
}

export function assertPopoverPanel(
  options: {
    attributes?: Record<string, string | null>
    textContent?: string
    state: PopoverState
  },
  panel = getPopoverPanel()
) {
    throw new Error("STUB");
}

// ---

export function assertLabelValue(element: HTMLElement | null, value: string) {
    throw new Error("STUB");
}

// ---

export function assertDescriptionValue(element: HTMLElement | null, value: string) {
    throw new Error("STUB");
}

// ---

export function getDialog(): HTMLElement | null {
    throw new Error("STUB");
}

export function getDialogs(): HTMLElement[] {
    throw new Error("STUB");
}

export function getDialogTitle(): HTMLElement | null {
    throw new Error("STUB");
}

export function getDialogDescription(): HTMLElement | null {
    throw new Error("STUB");
}

export function getDialogOverlay(): HTMLElement | null {
    throw new Error("STUB");
}

export function getDialogBackdrop(): HTMLElement | null {
    throw new Error("STUB");
}

export function getDialogOverlays(): HTMLElement[] {
    throw new Error("STUB");
}

// ---

export enum DialogState {
  /** The dialog is visible to the user. */
  Visible,

  /** The dialog is **not** visible to the user. It's still in the DOM, but it is hidden. */
  InvisibleHidden,

  /** The dialog is **not** visible to the user. It's not in the DOM, it is unmounted. */
  InvisibleUnmounted,
}

// ---

export function assertDialog(
  options: {
    attributes?: Record<string, string | null>
    textContent?: string
    state: DialogState
  },
  dialog = getDialog()
) {
    throw new Error("STUB");
}

export function assertDialogTitle(
  options: {
    attributes?: Record<string, string | null>
    textContent?: string
    state: DialogState
  },
  title = getDialogTitle(),
  dialog = getDialog()
) {
    throw new Error("STUB");
}

export function assertDialogDescription(
  options: {
    attributes?: Record<string, string | null>
    textContent?: string
    state: DialogState
  },
  description = getDialogDescription(),
  dialog = getDialog()
) {
    throw new Error("STUB");
}

export function assertDialogOverlay(
  options: {
    attributes?: Record<string, string | null>
    textContent?: string
    state: DialogState
  },
  overlay = getDialogOverlay()
) {
    throw new Error("STUB");
}

// ---

export function getRadioGroup(): HTMLElement | null {
    throw new Error("STUB");
}

export function getRadioGroupLabel(): HTMLElement | null {
    throw new Error("STUB");
}

export function getRadioGroupOptions(): HTMLElement[] {
    throw new Error("STUB");
}

// ---

export function assertRadioGroupLabel(
  options: {
    attributes?: Record<string, string | null>
    textContent?: string
  },
  label = getRadioGroupLabel(),
  radioGroup = getRadioGroup()
) {
    throw new Error("STUB");
}

// ---

export function getTabList(): HTMLElement | null {
    throw new Error("STUB");
}

export function getTabs(): HTMLElement[] {
    throw new Error("STUB");
}

export function getPanels(): HTMLElement[] {
    throw new Error("STUB");
}

// ---

export function assertTabs(
  {
    active,
    orientation = 'horizontal',
    tabContents = null,
    panelContents = null,
  }: {
    active: number
    orientation?: 'vertical' | 'horizontal'
    tabContents?: string | null
    panelContents?: string | null
  },
  list = getTabList(),
  tabs = getTabs(),
  panels = getPanels()
) {
    throw new Error("STUB");
}

// ---

export function assertActiveElement(element: HTMLElement | null) {
    throw new Error("STUB");
}

export function assertContainsActiveElement(element: HTMLElement | null) {
    throw new Error("STUB");
}

// ---

export function assertHidden(element: HTMLElement | null) {
    throw new Error("STUB");
}

export function assertVisible(element: HTMLElement | null) {
    throw new Error("STUB");
}

// ---

export function assertFocusable(element: HTMLElement | null) {
    throw new Error("STUB");
}

export function assertNotFocusable(element: HTMLElement | null) {
    throw new Error("STUB");
}

export function assertInert(element: HTMLElement | null) {
    throw new Error("STUB");
}

export function assertNotInert(element: HTMLElement | null) {
    throw new Error("STUB");
}

// ---

export function getByText(text: string): HTMLElement | null {
    throw new Error("STUB");
}
