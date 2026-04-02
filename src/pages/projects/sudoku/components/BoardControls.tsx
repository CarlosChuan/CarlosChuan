import React from "react";
import { Grid } from "../../../../components/shared/Grid";
import styled from "styled-components";

type Props = {
	onSolveClick: () => void;
	solveStepTime: number;
	setSolveStepTime: (n: number) => void;
	onGenerateRandom: () => void;
	onGenerateEasy: () => void;
	onGenerateMedium: () => void;
	onGenerateExtreme: () => void;
	onClear: () => void;
	disabled?: boolean;
};

const Section = styled.div`
	background: var(--color-surface);
	border: 1px solid var(--color-border);
	border-radius: 10px;
	padding: 14px;
	display: flex;
	flex-direction: column;
	gap: 8px;
`;

const SectionLabel = styled.p`
	margin: 0 0 4px;
	font-family: var(--font-mono);
	font-size: 0.68rem;
	letter-spacing: 1.8px;
	text-transform: uppercase;
	color: var(--color-text-muted);
`;

const Btn = styled.button<{
	$variant?: "primary" | "danger" | "ghost" | "muted";
	$disabled?: boolean;
}>`
	padding: 10px 14px;
	border-radius: 8px;
	border: none;
	cursor: ${(p) => (p.$disabled ? "not-allowed" : "pointer")};
	font-weight: 600;
	font-size: 0.85rem;
	font-family: inherit;
	transition: opacity 130ms ease, transform 130ms ease;
	opacity: ${(p) => (p.$disabled ? 0.45 : 1)};
	width: 100%;
	text-align: left;

	${(p) => {
		switch (p.$variant) {
			case "primary":
				return `background: var(--color-primary); color: #fff;`;
			case "danger":
				return `background: rgba(220,38,38,0.15); color: #ef4444; border: 1px solid rgba(220,38,38,0.25);`;
			case "muted":
				return `background: var(--color-surface-2); color: var(--color-text-muted); border: 1px solid var(--color-border);`;
			default:
				return `background: var(--color-primary-dim); color: var(--color-primary); border: 1px solid var(--color-border);`;
		}
	}}

	&:hover:not(:disabled) {
		opacity: 0.82;
		transform: translateY(-1px);
	}
	&:active:not(:disabled) {
		transform: translateY(0);
	}
`;

const Row = styled.div`
	display: flex;
	align-items: center;
	gap: 10px;
`;

const Label = styled.span`
	color: var(--color-text-muted);
	font-size: 0.82rem;
	min-width: 60px;
	font-family: var(--font-mono);
`;

const NumberInput = styled.input`
	padding: 7px 10px;
	border-radius: 7px;
	border: 1px solid var(--color-border);
	background: var(--color-surface-2);
	color: var(--color-text);
	width: 80px;
	font-size: 0.85rem;
	font-family: inherit;

	&:focus {
		outline: 2px solid var(--color-primary);
		outline-offset: 1px;
	}
`;

export const BoardControls: React.FC<Props> = ({
	onSolveClick,
	solveStepTime,
	setSolveStepTime,
	onGenerateRandom,
	onGenerateEasy,
	onGenerateMedium,
	onGenerateExtreme,
	onClear,
	disabled,
}) => {
	return (
		<Grid style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%" }}>
			<Section>
				<SectionLabel>solver</SectionLabel>
				<Btn
					$variant="primary"
					$disabled={disabled}
					onClick={onSolveClick}
					disabled={disabled}
				>
					▶ Solve
				</Btn>
				<Row>
					<Label>step ms</Label>
					<NumberInput
						type="number"
						value={solveStepTime}
						onChange={(e) => setSolveStepTime(Number(e.target.value))}
					/>
				</Row>
			</Section>

			<Section>
				<SectionLabel>generate</SectionLabel>
				<Btn $variant="ghost" onClick={onGenerateRandom}>
					Random
				</Btn>
				<Btn $variant="muted" onClick={onGenerateEasy}>
					Easy
				</Btn>
				<Btn $variant="muted" onClick={onGenerateMedium}>
					Medium
				</Btn>
				<Btn $variant="danger" onClick={onGenerateExtreme}>
					Difficult
				</Btn>
			</Section>

			<Section>
				<Btn $variant="muted" onClick={onClear}>
					Clear board
				</Btn>
			</Section>
		</Grid>
	);
};

export default BoardControls;
