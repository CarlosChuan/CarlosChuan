import { Position } from "./Position";
import { Wire } from "./Wire";

type ComputerSimElementTypes = "source";

interface ComputerSimElementProps {
	name: string;
	type: ComputerSimElementTypes;
	inputs: Wire[];
	outputs: Wire[];
	iconSrc: string;
	position: Position;
}

export type ComputerSimElementPropsExtensionClass = Pick<
	ComputerSimElementProps,
	"name" | "inputs" | "outputs" | "position"
>;

export class ComputerSimElement {
	private props: ComputerSimElementProps;

	constructor({
		name,
		type,
		inputs,
		outputs,
		iconSrc,
		position,
	}: ComputerSimElementProps) {
		this.props = { name, type, inputs, outputs, iconSrc, position };
	}

	get name(): string {
		return this.props.name;
	}

	get type(): ComputerSimElementTypes {
		return this.props.type;
	}

	get inputs(): Wire[] {
		return this.props.inputs;
	}

	get outputs(): Wire[] {
		return this.props.outputs;
	}

	get position(): Position {
		return this.props.position;
	}

	protected set iconSrc(newIconSrc: string) {
		this.props.iconSrc = newIconSrc;
	}

	getCanvaElement = () => {
		return { svgSrc: this.props.iconSrc };
	};

	// OnClick function. Return true if needs re-render.
	declare onClick: () => boolean;
}
