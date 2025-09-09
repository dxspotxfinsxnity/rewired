import { BranchFactory, Switch } from "./Switch.js"

export class If<T = any> extends Switch<T, boolean> {
	else(branchFactory: BranchFactory<T>): this {
		this.branchFactories.set(false, branchFactory)
		return this
	}

	then(branchFactory: BranchFactory<T>): this {
		this.branchFactories.set(true, branchFactory)
		return this
	}
}
