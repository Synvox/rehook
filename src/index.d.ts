/**
 *
 * @param condition
 * @param left
 * @param right
 * @returns
 */
declare function branch(
  condition: () => void,
  left: () => void,
  right: () => void
): () => void

/**
 *
 * @param component
 * @returns
 */
declare function catchRender(component: () => void): object

/**
 *
 * @param defaultProps
 * @returns
 */
declare function defaultProps(defaultProps: object): object

/**
 *
 * @param propName
 * @returns
 */
declare function flattenProp(propName: string | symbol): object

/**
 *
 * @param spec
 * @returns
 */
declare function lifecycle(spec: object): object

/**
 *
 * @param fn
 * @returns
 */
declare function mapProps(fn: () => void): object

/**
 *
 * @param propName
 * @param enhance
 * @returns
 */
declare function namespace(
  propName: string | symbol,
  enhance: () => void
): object

/**
 *
 * @param fns
 * @returns
 */
declare function pipe(...fns: any[]): object

/**
 *
 * @param a
 * @param b
 * @returns
 */
declare function renameProp(a: string | symbol, b: string | symbol): object

/**
 *
 * @param propMap
 * @returns
 */
declare function renameProps(propMap: object): object

/**
 *
 * @param comp
 * @returns
 */
declare function renderComponent(comp: any): object

/**
 *
 * @returns
 */
declare function renderNothing(): object

/**
 *
 * @param handlers
 * @returns
 */
declare function withHandlers(handlers: object): object

/**
 *
 * @param shouldMapOrKeys
 * @param createProps
 * @returns
 */
declare function withPropsOnChange(
  shouldMapOrKeys: any,
  createProps: () => void
): object

/**
 *
 * @param fn
 */
declare function withProps(fn: () => void | object): void

/**
 *
 * @param stateName
 * @param dispatchName
 * @param reducer
 * @param initialValue
 */
declare function withReducer(
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
declare function withStateHandlers(initialValue: any, handlers: object): object

/**
 *
 * @param stateName
 * @param stateUpdaterName
 * @param initialState
 */
declare function withState(
  stateName: string | symbol,
  stateUpdaterName: string | symbol,
  initialState: any
): void
