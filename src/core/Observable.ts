import { Callback, IObservable } from "../types.js"

/**
 * A predicate applied to each incoming value.
 */
type Predicate<T> = (value: T) => boolean

/**
 * A minimal interface that represents any object that can be unsubscribed.
 *
 * Often used for disposable resources such as timers, subscriptions, or DOM
 * listeners. The method name matches the standard `unsubscribe` pattern.
 */
type Unsubscribable = { unsubscribe: () => void }

/**
 * Combines a value-handling callback with an unsubscribable contract.
 *
 * This is handy when you want to pass around a single object that can both
 * handle events and be disposed of, e.g. `{ unsubscribe, (value) => ... }`.
 */
type UnsubscribableCallback<T> = Callback<T> & Unsubscribable

/**
 * A helper alias that represents an object which is **both** an `Observable<T>`
 * (providing `.value` / `.subscribe`) *and* `Unsubscribable` (providing
 * `.unsubscribe()`).
 *
 * This intersection type is convenient for public APIs that return a derived
 * observable but also expose the ability to tear it down in one go.
 */
type UnsubscribableObservable<T> = Observable<T> & Unsubscribable

/**
 * Type-level helper that extracts the inner type from an `Observable<...>`
 * type.
 *
 * If `T` is not a generic observable, it resolves to `never`. This keeps
 * downstream typings safe: attempting to unwrap a non-observable will produce a
 * compile-time error rather than silently yielding `unknown`.
 */
type Unwrap<T> = T extends Observable<infer U> ? U : never

/**
 * Shallowly maps an object whose values are `Observable<...>` into a new type
 * where each property is the inner value of that observable.
 */
type UnwrapMany<T> = { [K in keyof T]: Unwrap<T[K]> }

/**
 * A minimal, generic observable that stores a value and notifies subscribers
 * whenever the value changes.
 *
 * @template T The type of the stored value.
 */
export class Observable<T = any> implements IObservable<T> {
	/**
	 * Current value of the observable.
	 *
	 * The getter simply returns the private field; no side-effects occur
	 * here.
	 */
	get value() {
		return this.#value
	}

	/**
	 * Mutator that:
	 *
	 * 1. Checks for equality (to avoid unnecessary notifications).
	 * 2. Updates the internal state.
	 * 3. Logs a message when a name is set.
	 * 4. Notifies every subscriber with the new value.
	 */
	set value(value) {
		// early-out on no-change
		if (this.is(value, this.#value)) {
			return
		}

		this.#value = value

		// optional debug logging
		if (this.name !== "") {
			console.log(
				`${this.name}(${
					this.#subscribers.size
				}) set to ${this.#value}`,
			)
		}

		// notify all subscribers
		for (const callback of this.#subscribers.values()) {
			callback(this.#value, callback.unsubscribe)
		}
	}

	/**
	 * A private set of all active subscriber callbacks.
	 *
	 * Using `Set` ensures: fast O(1) addition & removal; no duplicate
	 * subscriptions (the same callback can only exist once).
	 */
	#subscribers = new Set<UnsubscribableCallback<T>>()

	/** The current value held by the observable. */
	#value: T

	/**
	 * @param value The initial value that will be stored in `#value`.
	 * @param name Optional human-readable identifier used only for debug
	 * logging. Defaults to an empty string which disables the log message.
	 * @param is Equality comparer. By default it delegates to `Object.is`,
	 * which performs a strict identity check (handles `NaN` correctly).
	 */
	constructor(
		value: T,
		public name = "",
		public is = Object.is,
	) {
		this.#value = value
	}

	/**
	 * Creates an observable that applies `callback` to the current values
	 * of all supplied source observables, emitting the result whenever
	 * **any** source changes.
	 *
	 * @param callback Function receiving the latest unwrapped values of
	 * each input observable and returning a new value (`U`).
	 * @param sources The list of observables whose combined state drives
	 * the output.
	 *
	 * @returns An observable of type `U` that updates on any change in the
	 * inputs. It implements `Unsubscribable`; calling `unsubscribe()`
	 * disconnects its internal subscriptions to the sources.
	 */
	static map<T extends Observable[], U>(
		callback: (values: UnwrapMany<T>) => U,
		...sources: T
	): UnsubscribableObservable<U> {
		// Capture the current values so that we can keep them in sync.
		// The cast is safe because `value` always exists on an
		// Observable instance.
		let values = sources.map(value => value.value) as UnwrapMany<T>

		// Initialize the output with the callback applied to the
		// initial values.
		const out = new Observable(callback(values))

		// Subscribe to each source and update the corresponding entry
		// in `values`. After every change we recompute the result via
		// `callback` and push it to the output observable.
		const subscriptions = sources.map((state, index) =>
			state.subscribe(value => {
				values[index] = value
				out.value = callback(values)
			}),
		)

		// Expose a single unsubscribe that detaches all listeners.
		;(out as UnsubscribableObservable<U>).unsubscribe =
			makeUnsubscribe(subscriptions)

		return out as UnsubscribableObservable<U>
	}

	/**
	 * Creates a new observable that emits the latest value from **any** of
	 * the supplied source observables.
	 *
	 * @param sources A list of observables.
	 *
	 * @returns An observable whose type is the union of the unwrapped types
	 * of all inputs. It implements `Unsubscribable`; calling
	 * `unsubscribe()` disconnects its internal subscriptions to the
	 * sources.
	 */
	static merge<T extends Observable[]>(
		...sources: T
	): UnsubscribableObservable<UnwrapMany<T>[number]> {
		// Create an empty output observable. The cast to `any` is a
		// quick hack because the constructor signature isn't fully
		// expressible in the current type definition.
		const out: UnsubscribableObservable<UnwrapMany<T>[number]> =
			new (Observable as any)()

		// Subscribe to every source. Whenever *any* source pushes a
		// value, we forward it directly to `out`. The resulting
		// observable therefore behaves like the "latest" of all inputs,
		// similar to RxJS's `merge`.
		const subscriptions = sources.map(state =>
			state.subscribe(value => {
				out.value = value
			}),
		)

		// Provide a single unsubscribe that tears down all individual
		// subscriptions. This keeps the API ergonomic for callers who
		// only need one cleanup call.
		out.unsubscribe = makeUnsubscribe(subscriptions)

		return out
	}

	/**
	 * Creates a new observable that tracks a single property of this
	 * observable's current value.
	 *
	 * @param key The property name to project from `T`. It is constrained
	 * by the keyof-operator, so only valid keys of `T` can be passed.
	 *
	 * @returns An observable emitting `T[K]` whenever that specific
	 * property changes on this source. It implements `Unsubscribable`;
	 * calling `unsubscribe()` disconnects its internal subscription to this
	 * source.
	 */
	at<K extends keyof T>(key: K): UnsubscribableObservable<T[K]> {
		return this.map(value => value[key])
	}

	/**
	 * Returns a new observable that only emits values satisfying
	 * `callback`.
	 *
	 * @param predicate A predicate applied to each incoming value.
	 *
	 * @returns An observable of the same type (`T`) that forwards only
	 * those values for which the predicate returns `true`. It implements
	 * `Unsubscribable`; calling `unsubscribe()` disconnects its internal
	 * subscription to this source.
	 */
	filter(predicate: Predicate<T>): UnsubscribableObservable<T | void> {
		// Create an empty derived observable. We cast to `any` because
		// the generic constructor signature isn't expressible here.
		const out: UnsubscribableObservable<T | void> =
			new (Observable as any)()

		// Emit the current value immediately if it already satisfies
		// the predicate.
		if (predicate(this.#value)) {
			out.value = this.#value
		}

		// Subscribe to the source and forward only matching values.
		// `this.subscribe` returns an unsubscribe function, which we
		// expose as the derived observable's own `unsubscribe`. Calling
		// that will detach the filter from the original stream.
		out.unsubscribe = this.subscribe(value => {
			if (predicate(value)) {
				out.value = value
			}
		})

		return out
	}

	/**
	 * Transforms each emitted value using `callback`, producing a new
	 * observable.
	 *
	 * @param callback Function applied to every incoming value.
	 *
	 * @returns An observable of the transformed type (`U`). It implements
	 * `Unsubscribable`; calling `unsubscribe()` disconnects its internal
	 * subscription to this source.
	 */
	map<U>(callback: (value: T) => U): UnsubscribableObservable<U> {
		// Initialize with the transformed current value.
		const out = new Observable(callback(this.#value))

		// Forward transformed values whenever the source emits. The
		// subscription returned by `this.subscribe` becomes the derived
		// observable's own `unsubscribe`.
		;(out as UnsubscribableObservable<U>).unsubscribe =
			this.subscribe(value => {
				out.value = callback(value)
			})

		return out as UnsubscribableObservable<U>
	}

	/**
	 * Registers a new subscriber on this observable.
	 *
	 * @param callback A function that receives the current value and an
	 * `unsubscribe()`.
	 *
	 * @returns A plain unsubscribe function that, when invoked, removes the
	 * supplied callback from the internal set of subscribers. It is
	 * identical to calling `callback.unsubscribe()`.
	 */
	subscribe(callback: Callback<T>): () => void {
		const unsubscribe = (): void => {
			this.#subscribers.delete(
				callback as UnsubscribableCallback<T>,
			)
		}

		;(callback as UnsubscribableCallback<T>).unsubscribe =
			unsubscribe

		this.#subscribers.add(callback as UnsubscribableCallback<T>)

		return unsubscribe
	}
}

/**
 * Creates a single-use `unsubscribe` handler that safely tears down multiple
 * inner subscriptions.
 *
 * @param subscriptions An array of cleanup callbacks - typically the functions
 * returned by individual `.subscribe()` calls.
 *
 * @returns A function you can assign to an observable's `.unsubscribe`
 * property. The first call runs every callback in `subscriptions`; subsequent
 * invocations are harmless and simply log a warning.
 */
function makeUnsubscribe(subscriptions: (() => void)[]): () => void {
	// Flag that remembers whether we've already performed the clean-up.
	let unsubscribed = false

	return () => {
		// Guard against double unsubscription.
		if (unsubscribed) {
			console.error("double-unsubscription detected")
			return
		}

		// Mark as cleaned up so the guard above will fire next time.
		unsubscribed = true
		// Execute every inner unsubscribe callback in order.
		for (let unsubscribe of subscriptions) unsubscribe()
	}
}
