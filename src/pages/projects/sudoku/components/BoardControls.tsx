import React from "react";
import { Grid } from "../../../../components/shared/Grid";
import palette from "../../../../constants/Colors";

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

const rootStyle: React.CSSProperties = {
	display: "flex",
	flexDirection: "column",
	gap: 16,
	width: "100%",
};

const sectionStyle: React.CSSProperties = {
	backgroundColor: "rgba(255, 255, 255, 0.08)",
	padding: 14,
	borderRadius: 12,
	display: "flex",
	flexDirection: "column",
	gap: 10,
	boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
};

const baseButtonStyle: React.CSSProperties = {
	padding: "12px 16px",
	borderRadius: 10,
	border: "none",
	cursor: "pointer",
	fontWeight: 600,
	fontSize: "0.95rem",
	transition: "all 0.15s ease",
	boxShadow: "0 3px 8px rgba(0, 0, 0, 0.2)",
};

const rowStyle: React.CSSProperties = {
	display: "flex",
	gap: 10,
	alignItems: "center",
};

const labelStyle: React.CSSProperties = {
	color: `${palette.light.white}DD`,
	fontWeight: 600,
	fontSize: "0.9rem",
	minWidth: 65,
};

const inputStyle: React.CSSProperties = {
	padding: "8px 10px",
	borderRadius: 8,
	border: `1px solid rgba(255, 255, 255, 0.12)`,
	background: "rgba(255, 255, 255, 0.05)",
	color: palette.light.white,
	width: 90,
	fontSize: "0.9rem",
};

const stackStyle: React.CSSProperties = {
	display: "flex",
	flexDirection: "column",
	gap: 8,
};

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
		<Grid style={rootStyle}>
			<Grid style={sectionStyle}>
				<button
					onClick={onSolveClick}
					disabled={disabled}
					style={{
						...baseButtonStyle,
						background: `linear-gradient(135deg, ${palette.light.primary20}, ${palette.light.primary00})`,
						color: palette.light.white,
						opacity: disabled ? 0.5 : 1,
						cursor: disabled ? "not-allowed" : "pointer",
					}}
				>
					Solve
				</button>

				<Grid style={rowStyle}>
					<Grid style={labelStyle}>Step ms</Grid>
					<input
						style={inputStyle}
						type="number"
						value={solveStepTime}
						onChange={(e) => setSolveStepTime(Number(e.target.value))}
					/>
				</Grid>
			</Grid>

			<Grid style={sectionStyle}>
				<button
					onClick={onGenerateRandom}
					style={{
						...baseButtonStyle,
						background: `${palette.light.secondary00}CC`,
						color: palette.light.primary00,
					}}
				>
					Generate random
				</button>

				<Grid style={stackStyle}>
					<button
						onClick={onGenerateEasy}
						style={{
							...baseButtonStyle,
							background: "rgba(255, 255, 255, 0.1)",
							color: palette.light.white,
							border: `1px solid rgba(255, 255, 255, 0.15)`,
						}}
					>
						Generate easy
					</button>
					<button
						onClick={onGenerateMedium}
						style={{
							...baseButtonStyle,
							background: "rgba(255, 255, 255, 0.1)",
							color: palette.light.white,
							border: `1px solid rgba(255, 255, 255, 0.15)`,
						}}
					>
						Generate medium
					</button>
					<button
						onClick={onGenerateExtreme}
						style={{
							...baseButtonStyle,
							background: `${palette.light.error}DD`,
							color: palette.light.white,
						}}
					>
						Generate difficult
					</button>
				</Grid>
			</Grid>

			<Grid style={sectionStyle}>
				<button
					onClick={onClear}
					style={{
						...baseButtonStyle,
						background: "rgba(255, 255, 255, 0.08)",
						color: palette.light.white,
						border: `1px solid rgba(255, 255, 255, 0.12)`,
					}}
				>
					Clear
				</button>
			</Grid>
		</Grid>
	);
};

export default BoardControls;
