type VSpacerProps = {
	small?: boolean;
	medium?: boolean;
	large?: boolean;
	custom?: string;
};

export const VSpacer = ({ small, medium, large, custom }: VSpacerProps) => {
	const height =
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
				height,
				minHeight: height,
			}}
		/>
	);
};
