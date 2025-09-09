/**
 * Callback invoked when an event is dispatched.
 *
 * The second argument is a removeEventListener function that can be called to
 * detach this listener from the registry.
 */
type EventListener = (event: Event, removeEventListener: () => void) => void
type EventListenerMap = WeakMap<HTMLElement, RemovableEventListener>
type RemovableEventListener = { removeEventListener(): void } & EventListener

const registry = new Map<string, EventListenerMap>()

export function addEventListener(
	element: HTMLElement,
	reference: WeakRef<HTMLElement>,
	type: string,
	listener: EventListener,
): void {
	const listeners = registry.get(type) || emplace(type)

	// Store a removeEventListener function on the listener so that
	// `dispatch` can call it when needed.
	;(listener as RemovableEventListener).removeEventListener =
		removeEventListener

	// Mark the element with a data-attribute so that `dispatch` can find it
	// later. The attribute is purely a lookup key.
	element.dataset[type] = ""

	listeners.set(element, listener as RemovableEventListener)

	function removeEventListener() {
		const element = reference.deref()
		if (element) listeners.delete(element)
	}
}

function dispatch(event: Event): void {
	const listeners = registry.get(event.type)
	if (!listeners) return
	const element: HTMLElement | null = (
		event.target as HTMLElement
	).closest(`[data-${event.type}]`)
	if (!element) return
	const listener = listeners.get(element)
	if (listener) listener(event, listener.removeEventListener)
}

function emplace(type: string): EventListenerMap {
	const listeners = new WeakMap<HTMLElement, RemovableEventListener>()
	document.body.addEventListener(type, dispatch)
	registry.set(type, listeners)
	return listeners
}
