import {
	ComputerSimElement,
	ComputerSimElementPropsExtensionClass,
} from "../ComputerSimElement";
import sourceIconTrue from "../../assets/svg/components/source/source_true.svg";
import sourceIconFalse from "../../assets/svg/components/source/source_false.svg";

export class ValueSource extends ComputerSimElement {
	private _value: boolean;

	constructor({
		name,
		inputs,
		outputs,
		position,
	}: ComputerSimElementPropsExtensionClass) {
		super({
			name,
			type: "source",
			inputs,
			outputs,
			iconSrc: sourceIconFalse,
			position,
		});

		this._value = false;
	}

	get value() {
		return this._value;
	}

	set value(newValue: boolean) {
		this._value = newValue;
	}

	override onClick = () => {
		console.log("triggering click function");
		if (!this.value) {
			this.value = true;
			this.iconSrc = sourceIconTrue;
		} else {
			this.value = false;
			this.iconSrc = sourceIconFalse;
		}
		return true;
	};
}
