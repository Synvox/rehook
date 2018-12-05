/**
 *
 * @param condition
 * @param left
 * @param right
 * @returns
 */
export function branch(
  condition: Function,
  left: Function,
  right: Function
): Function

/**
 *
 * @param component
 * @returns
 */
export function catchRender(component: Function): Object

/**
 *
 * @param defaultProps
 * @returns
 */
export function defaultProps(defaultProps: Object): Object

/**
 *
 * @param propName
 * @returns
 */
export function flattenProp(propName: string | symbol): Object

/**
 *
 * @param spec
 * @returns
 */
export function lifecycle(spec: Object): Object

/**
 *
 * @param fn
 * @returns
 */
export function mapProps(fn: Function): Object

/**
 *
 * @param propName
 * @param enhance
 * @returns
 */
export function namespace(propName: string | symbol, enhance: Function): Object

/**
 *
 * @param fns
 * @returns
 */
export function pipe(...fns: Function): Object

/**
 *
 * @param a
 * @param b
 * @returns
 */
export function renameProp(a: string | symbol, b: string | symbol): Object

/**
 *
 * @param propMap
 * @returns
 */
export function renameProps(propMap: Object): Object

/**
 *
 * @param comp
 * @returns
 */
export function renderComponent(comp: any): Object

/**
 *
 * @returns
 */
export function renderNothing(): Object

/**
 *
 * @param handlers
 * @returns
 */
export function withHandlers(handlers: Object): Object

/**
 *
 * @param shouldMapOrKeys
 * @param createProps
 * @returns
 */
export function withPropsOnChange(
  shouldMapOrKeys: any,
  createProps: Function
): Object

/**
 *
 * @param fn
 */
export function withProps(fn: object | ((props: object) => object)): (props: object) => { [key: string]: string }

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
  reducer: Function,
  initialValue: any
): void

/**
 *
 * @param initialValue
 * @param handlers
 * @returns
 */
export function withStateHandlers(initialValue: any, handlers: Object): Object

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
