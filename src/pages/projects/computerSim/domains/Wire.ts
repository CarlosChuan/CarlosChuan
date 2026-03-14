import { ComputerSimElement } from "./ComputerSimElement";

interface WireProps {
	value: boolean;
	from: ComputerSimElement;
	to: ComputerSimElement;
}

export class Wire {
	private props: WireProps;

	constructor({ value, from, to }: WireProps) {
		this.props = { value, from, to };
	}

	get value(): boolean {
		return this.props.value;
	}

	get from(): ComputerSimElement {
		return this.props.from;
	}

	get to(): ComputerSimElement {
		return this.props.to;
	}
}
