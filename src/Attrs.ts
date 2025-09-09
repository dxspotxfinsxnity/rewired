export interface Attrs {
	a: {
		charset: string
		coords: string
		download: string
		hash: string
		host: string
		hostname: string
		href: string
		hreflang: string
		name: string
		password: string
		pathname: string
		ping: string
		port: string
		protocol: string
		referrerPolicy: string
		rel: string
		rev: string
		search: string
		shape: string
		target: string
		text: string
		type: string
		username: string
	} & CommonAttrs

	abbr: CommonAttrs
	address: CommonAttrs

	area: {
		alt: string
		coords: string
		download: string
		hash: string
		host: string
		hostname: string
		href: string
		noHref: boolean
		password: string
		pathname: string
		ping: string
		port: string
		protocol: string
		referrerPolicy: string
		rel: string
		search: string
		shape: string
		target: string
		username: string
	} & CommonAttrs

	article: CommonAttrs
	aside: CommonAttrs

	audio: {
		autoplay: boolean
		controls: boolean
		crossOrigin: string
		currentTime: number
		defaultMuted: boolean
		defaultPlaybackRate: number
		disableRemotePlayback: boolean
		loop: boolean
		muted: boolean
		playbackRate: number
		preload: "" | "auto" | "metadata" | "none"
		preservesPitch: boolean
		src: string
		srcObject: MediaProvider
		volume: number
	} & CommonAttrs

	b: CommonAttrs

	base: {
		href: string
		target: string
	} & CommonAttrs

	bdi: CommonAttrs
	bdo: CommonAttrs

	blockquote: {
		cite: string
	} & CommonAttrs

	body: {
		aLink: string
		background: string
		bgColor: string
		link: string
		text: string
		vLink: string
	} & CommonAttrs

	br: {
		clear: string
	} & CommonAttrs

	button: {
		disabled: boolean
		formAction: string
		formEnctype: string
		formMethod: string
		formNoValidate: boolean
		formTarget: string
		name: string
		popoverTargetAction: string
		popoverTargetElement: Element
		type: "button" | "reset" | "submit"
		value: string
	} & CommonAttrs

	canvas: {
		height: number
		width: number
	} & CommonAttrs

	caption: {
		align: string
	} & CommonAttrs

	cite: CommonAttrs
	code: CommonAttrs

	col: {
		align: string
		ch: string
		chOff: string
		span: number
		vAlign: string
		width: string
	} & CommonAttrs

	colgroup: {
		align: string
		ch: string
		chOff: string
		span: number
		vAlign: string
		width: string
	} & CommonAttrs

	data: {
		value: string
	} & CommonAttrs

	datalist: CommonAttrs
	dd: CommonAttrs

	del: {
		cite: string
		dateTime: string
	} & CommonAttrs

	details: {
		name: string
		open: boolean
	} & CommonAttrs

	dfn: CommonAttrs

	dialog: {
		open: boolean
		returnValue: string
	} & CommonAttrs

	div: {
		align: string
	} & CommonAttrs

	dl: {
		compact: boolean
	} & CommonAttrs

	dt: CommonAttrs
	em: CommonAttrs

	embed: {
		align: string
		height: string
		name: string
		src: string
		type: string
		width: string
	} & CommonAttrs

	fieldset: {
		disabled: boolean
		name: string
	} & CommonAttrs

	figcaption: CommonAttrs
	figure: CommonAttrs
	footer: CommonAttrs

	form: {
		acceptCharset: string
		action: string
		autocomplete: AutoFillBase
		encoding: string
		enctype: string
		method: string
		name: string
		noValidate: boolean
		rel: string
		target: string
	} & CommonAttrs

	h1: {
		align: string
	} & CommonAttrs

	h2: {
		align: string
	} & CommonAttrs

	h3: {
		align: string
	} & CommonAttrs

	h4: {
		align: string
	} & CommonAttrs

	h5: {
		align: string
	} & CommonAttrs

	h6: {
		align: string
	} & CommonAttrs

	head: CommonAttrs
	header: CommonAttrs
	hgroup: CommonAttrs

	hr: {
		align: string
		color: string
		noShade: boolean
		size: string
		width: string
	} & CommonAttrs

	html: {
		version: string
	} & CommonAttrs

	i: CommonAttrs

	iframe: {
		align: string
		allow: string
		allowFullscreen: boolean
		frameBorder: string
		height: string
		loading: "eager" | "lazy"
		longDesc: string
		marginHeight: string
		marginWidth: string
		name: string
		referrerPolicy: ReferrerPolicy
		scrolling: string
		src: string
		srcdoc: string
		width: string
	} & CommonAttrs

	img: {
		align: string
		alt: string
		border: string
		crossOrigin: string
		decoding: "async" | "auto" | "sync"
		fetchPriority: "auto" | "high" | "low"
		height: number
		hspace: number
		isMap: boolean
		loading: "eager" | "lazy"
		longDesc: string
		lowsrc: string
		name: string
		referrerPolicy: string
		sizes: string
		src: string
		srcset: string
		useMap: string
		vspace: number
		width: number
	} & CommonAttrs

	input: {
		accept: string
		align: string
		alt: string
		autocomplete: AutoFill
		capture: string
		checked: boolean
		defaultChecked: boolean
		defaultValue: string
		dirName: string
		disabled: boolean
		files: FileList
		formAction: string
		formEnctype: string
		formMethod: string
		formNoValidate: boolean
		formTarget: string
		height: number
		indeterminate: boolean
		max: string
		maxLength: number
		min: string
		minLength: number
		multiple: boolean
		name: string
		pattern: string
		placeholder: string
		popoverTargetAction: string
		popoverTargetElement: Element
		readOnly: boolean
		required: boolean
		selectionDirection: "backward" | "forward" | "none"
		selectionEnd: number
		selectionStart: number
		size: number
		src: string
		step: string
		type: string
		useMap: string
		value: string
		valueAsDate: Date
		valueAsNumber: number
		webkitdirectory: boolean
		width: number
	} & CommonAttrs

	ins: {
		cite: string
		dateTime: string
	} & CommonAttrs

	kbd: CommonAttrs

	label: {
		htmlFor: string
	} & CommonAttrs

	legend: {
		align: string
	} & CommonAttrs

	li: {
		type: string
		value: number
	} & CommonAttrs

	link: {
		as: string
		charset: string
		crossOrigin: string
		disabled: boolean
		fetchPriority: "auto" | "high" | "low"
		href: string
		hreflang: string
		imageSizes: string
		imageSrcset: string
		integrity: string
		media: string
		referrerPolicy: string
		rel: string
		rev: string
		target: string
		type: string
	} & CommonAttrs

	main: CommonAttrs

	map: {
		name: string
	} & CommonAttrs

	mark: CommonAttrs

	menu: {
		compact: boolean
	} & CommonAttrs

	meta: {
		content: string
		httpEquiv: string
		media: string
		name: string
		scheme: string
	} & CommonAttrs

	meter: {
		high: number
		low: number
		max: number
		min: number
		optimum: number
		value: number
	} & CommonAttrs

	nav: CommonAttrs
	noscript: CommonAttrs

	object: {
		align: string
		archive: string
		border: string
		code: string
		codeBase: string
		codeType: string
		data: string
		declare: boolean
		height: string
		hspace: number
		name: string
		standby: string
		type: string
		useMap: string
		vspace: number
		width: string
	} & CommonAttrs

	ol: {
		compact: boolean
		reversed: boolean
		start: number
		type: string
	} & CommonAttrs

	optgroup: {
		disabled: boolean
		label: string
	} & CommonAttrs

	option: {
		defaultSelected: boolean
		disabled: boolean
		label: string
		selected: boolean
		text: string
		value: string
	} & CommonAttrs

	output: {
		defaultValue: string
		name: string
		value: string
	} & CommonAttrs

	p: {
		align: string
	} & CommonAttrs

	picture: CommonAttrs

	pre: {
		width: number
	} & CommonAttrs

	progress: {
		max: number
		value: number
	} & CommonAttrs

	q: {
		cite: string
	} & CommonAttrs

	rp: CommonAttrs
	rt: CommonAttrs
	ruby: CommonAttrs
	s: CommonAttrs
	samp: CommonAttrs

	script: {
		async: boolean
		charset: string
		crossOrigin: string
		defer: boolean
		event: string
		fetchPriority: "auto" | "high" | "low"
		htmlFor: string
		integrity: string
		noModule: boolean
		referrerPolicy: string
		src: string
		text: string
		type: string
	} & CommonAttrs

	search: CommonAttrs
	section: CommonAttrs

	select: {
		autocomplete: AutoFill
		disabled: boolean
		length: number
		multiple: boolean
		name: string
		required: boolean
		selectedIndex: number
		size: number
		value: string
	} & CommonAttrs

	slot: {
		name: string
	} & CommonAttrs

	small: CommonAttrs

	source: {
		height: number
		media: string
		sizes: string
		src: string
		srcset: string
		type: string
		width: number
	} & CommonAttrs

	span: CommonAttrs
	strong: CommonAttrs

	style: {
		disabled: boolean
		media: string
		type: string
	} & CommonAttrs

	sub: CommonAttrs
	summary: CommonAttrs
	sup: CommonAttrs

	table: {
		align: string
		bgColor: string
		border: string
		caption: HTMLTableCaptionElement
		cellPadding: string
		cellSpacing: string
		frame: string
		rules: string
		summary: string
		tFoot: HTMLTableSectionElement
		tHead: HTMLTableSectionElement
		width: string
	} & CommonAttrs

	tbody: {
		align: string
		ch: string
		chOff: string
		vAlign: string
	} & CommonAttrs

	td: {
		abbr: string
		align: string
		axis: string
		bgColor: string
		ch: string
		chOff: string
		colSpan: number
		headers: string
		height: string
		noWrap: boolean
		rowSpan: number
		scope: string
		vAlign: string
		width: string
	} & CommonAttrs

	template: {
		shadowRootClonable: boolean
		shadowRootDelegatesFocus: boolean
		shadowRootMode: string
		shadowRootSerializable: boolean
	} & CommonAttrs

	textarea: {
		autocomplete: AutoFill
		cols: number
		defaultValue: string
		dirName: string
		disabled: boolean
		maxLength: number
		minLength: number
		name: string
		placeholder: string
		readOnly: boolean
		required: boolean
		rows: number
		selectionDirection: "backward" | "forward" | "none"
		selectionEnd: number
		selectionStart: number
		value: string
		wrap: string
	} & CommonAttrs

	tfoot: {
		align: string
		ch: string
		chOff: string
		vAlign: string
	} & CommonAttrs

	th: {
		abbr: string
		align: string
		axis: string
		bgColor: string
		ch: string
		chOff: string
		colSpan: number
		headers: string
		height: string
		noWrap: boolean
		rowSpan: number
		scope: string
		vAlign: string
		width: string
	} & CommonAttrs

	thead: {
		align: string
		ch: string
		chOff: string
		vAlign: string
	} & CommonAttrs

	time: {
		dateTime: string
	} & CommonAttrs

	title: {
		text: string
	} & CommonAttrs

	tr: {
		align: string
		bgColor: string
		ch: string
		chOff: string
		vAlign: string
	} & CommonAttrs

	track: {
		default: boolean
		kind: string
		label: string
		src: string
		srclang: string
	} & CommonAttrs

	u: CommonAttrs

	ul: {
		compact: boolean
		type: string
	} & CommonAttrs

	var: CommonAttrs

	video: {
		autoplay: boolean
		controls: boolean
		crossOrigin: string
		currentTime: number
		defaultMuted: boolean
		defaultPlaybackRate: number
		disablePictureInPicture: boolean
		disableRemotePlayback: boolean
		height: number
		loop: boolean
		muted: boolean
		playbackRate: number
		playsInline: boolean
		poster: string
		preload: "" | "auto" | "metadata" | "none"
		preservesPitch: boolean
		src: string
		srcObject: MediaProvider
		volume: number
		width: number
	} & CommonAttrs

	wbr: CommonAttrs
}

interface CommonAttrs {
	accessKey: string
	ariaActiveDescendantElement: Element
	ariaAtomic: string
	ariaAutoComplete: string
	ariaBrailleLabel: string
	ariaBrailleRoleDescription: string
	ariaBusy: string
	ariaChecked: string
	ariaColCount: string
	ariaColIndex: string
	ariaColIndexText: string
	ariaColSpan: string
	ariaControlsElements: readonly Element[]
	ariaCurrent: string
	ariaDescribedByElements: readonly Element[]
	ariaDescription: string
	ariaDetailsElements: readonly Element[]
	ariaDisabled: string
	ariaErrorMessageElements: readonly Element[]
	ariaExpanded: string
	ariaFlowToElements: readonly Element[]
	ariaHasPopup: string
	ariaHidden: string
	ariaInvalid: string
	ariaKeyShortcuts: string
	ariaLabel: string
	ariaLabelledByElements: readonly Element[]
	ariaLevel: string
	ariaLive: string
	ariaModal: string
	ariaMultiLine: string
	ariaMultiSelectable: string
	ariaOrientation: string
	ariaOwnsElements: readonly Element[]
	ariaPlaceholder: string
	ariaPosInSet: string
	ariaPressed: string
	ariaReadOnly: string
	ariaRelevant: string
	ariaRequired: string
	ariaRoleDescription: string
	ariaRowCount: string
	ariaRowIndex: string
	ariaRowIndexText: string
	ariaRowSpan: string
	ariaSelected: string
	ariaSetSize: string
	ariaSort: string
	ariaValueMax: string
	ariaValueMin: string
	ariaValueNow: string
	ariaValueText: string
	autocapitalize: string
	autocorrect: boolean
	autofocus: boolean
	className: string
	contentEditable: string
	dir: string
	draggable: boolean
	enterKeyHint: string
	hidden: boolean
	id: string
	inert: boolean
	innerHTML: string
	innerText: string
	inputMode: string
	lang: string
	nodeValue: string
	nonce: string
	outerHTML: string
	outerText: string
	popover: string
	role: string
	scrollLeft: number
	scrollTop: number
	slot: string
	spellcheck: boolean
	tabIndex: number
	title: string
	translate: boolean
	writingSuggestions: string
}
