/**
 *
 * @param condition
 * @param left
 * @param right
 * @returns
 */
export function branch(
  condition: () => void,
  left: () => void,
  right: () => void
): () => void

/**
 *
 * @param component
 * @returns
 */
export function catchRender(component: () => void): object

/**
 *
 * @param defaultProps
 * @returns
 */
export function defaultProps(defaultProps: object): object

/**
 *
 * @param propName
 * @returns
 */
export function flattenProp(propName: string | symbol): object

/**
 *
 * @param spec
 * @returns
 */
export function lifecycle(spec: object): object

/**
 *
 * @param fn
 * @returns
 */
export function mapProps(fn: () => void): object

/**
 *
 * @param propName
 * @param enhance
 * @returns
 */
export function namespace(
  propName: string | symbol,
  enhance: () => void
): object

/**
 *
 * @param fns
 * @returns
 */
export function pipe(...fns: () => void[]): object

/**
 *
 * @param a
 * @param b
 * @returns
 */
export function renameProp(a: string | symbol, b: string | symbol): object

/**
 *
 * @param propMap
 * @returns
 */
export function renameProps(propMap: object): object

/**
 *
 * @param comp
 * @returns
 */
export function renderComponent(comp: any): object

/**
 *
 * @returns
 */
export function renderNothing(): object

/**
 *
 * @param handlers
 * @returns
 */
export function withHandlers(handlers: object): object

/**
 *
 * @param shouldMapOrKeys
 * @param createProps
 * @returns
 */
export function withPropsOnChange(
  shouldMapOrKeys: any,
  createProps: () => void
): object

/**
 *
 * @param fn
 */
export function withProps(fn: () => void | object): void

/**
 *
 * @param stateName
 * @param dispatchName
 * @param reducer
 * @param initialValue
 */
export function withReducer(
  stateName: string | symbol,
  dispatchName: string | symbol,
  reducer: () => void,
  initialValue: any
): void

/**
 *
 * @param initialValue
 * @param handlers
 * @returns
 */
export function withStateHandlers(initialValue: any, handlers: object): object

/**
 *
 * @param stateName
 * @param stateUpdaterName
 * @param initialState
 */
export function withState(
  stateName: string | symbol,
  stateUpdaterName: string | symbol,
  initialState: any
): void
