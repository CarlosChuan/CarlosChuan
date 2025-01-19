type HSpacerProps = {
	small?: boolean;
	medium?: boolean;
	large?: boolean;
	custom?: string;
};

export const HSpacer = ({ small, medium, large, custom }: HSpacerProps) => {
	const width =
		custom !== undefined
			? custom
			: small
				? "8px"
				: medium
					? "16px"
					: large
						? "24px"
						: undefined;

	return (
		<div
			style={{
				width,
			}}
		/>
	);
};
