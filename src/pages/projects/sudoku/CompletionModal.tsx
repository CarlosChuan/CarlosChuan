import React, { useEffect } from "react";
import { Grid } from "../../../components/shared/Grid";
import { Text } from "../../../components/shared/Text";
import palette from "../../../constants/Colors";

interface CompletionModalProps {
	isOpen: boolean;
	onPlayAgain: () => void;
	onGoHome: () => void;
	onClose: () => void;
	title?: string;
	subtitle?: string;
	emoji?: string;
}

export const CompletionModal: React.FC<CompletionModalProps> = ({
	isOpen,
	onPlayAgain,
	onGoHome,
	onClose,
	title = "Congratulations!",
	subtitle = "You've successfully completed the puzzle!",
}) => {
	// Add styles for animations
	useEffect(() => {
		if (!isOpen) return;

		const style = document.createElement("style");
		style.setAttribute("data-completion-modal", "true");
		style.textContent = `
			@keyframes fadeIn {
				from { opacity: 0; }
				to { opacity: 1; }
			}
			@keyframes slideUp {
				from { 
					opacity: 0;
					transform: translateY(30px) scale(0.95);
				}
				to { 
					opacity: 1;
					transform: translateY(0) scale(1);
				}
			}
		`;
		document.head.appendChild(style);

		return () => {
			const existingStyle = document.querySelector(
				'[data-completion-modal="true"]',
			);
			if (existingStyle) {
				document.head.removeChild(existingStyle);
			}
		};
	}, [isOpen]);

	if (!isOpen) return null;

	return (
		<Grid
			style={{
				position: "absolute",
				inset: 0,
				backgroundColor: "rgba(15, 23, 35, 0.8)",
				backdropFilter: "blur(8px)",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				animation: "fadeIn 0.3s ease-out",
				zIndex: 1000,
			}}
		>
			<Grid
				style={{
					width: "fit-content",
					height: "fit-content",
					padding: "40px 60px",
					zIndex: 2,
					backgroundColor: palette.light.white,
					color: palette.light.secondary00,
					borderRadius: 10,
					boxShadow:
						"0 20px 40px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					gap: 30,
					minWidth: 300,
					transform: "scale(1)",
					animation: "slideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
				}}
			>
				<Grid
					style={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						gap: 15,
					}}
				>
					{/* <div
						style={{
							width: 80,
							height: 80,
							backgroundColor: palette.light.success,
							borderRadius: "50%",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							fontSize: "40px",
							marginBottom: 10,
						}}
					>
						{emoji}
					</div> */}
					<Text
						type="h2"
						style={{
							fontSize: "28px",
							fontWeight: "bold",
							margin: 0,
							textAlign: "center",
							color: palette.light.secondary00,
						}}
					>
						{title}
					</Text>
					<Text
						style={{
							fontSize: "16px",
							color: palette.light.secondary20,
							textAlign: "center",
							margin: 0,
						}}
					>
						{subtitle}
					</Text>
				</Grid>

				<Grid style={{ display: "flex", flexDirection: "row", gap: 15 }}>
					<button
						style={{
							cursor: "pointer",
							padding: "14px 28px",
							borderRadius: 8,
							border: "none",
							backgroundColor: palette.light.primary20,
							color: palette.light.white,
							fontSize: "16px",
							fontWeight: "600",
							transition: "all 0.2s ease",
							boxShadow: "0 4px 12px rgba(58, 139, 213, 0.3)",
						}}
						onMouseEnter={(e) => {
							e.currentTarget.style.backgroundColor = palette.light.primary10;
							e.currentTarget.style.transform = "translateY(-2px)";
							e.currentTarget.style.boxShadow =
								"0 6px 16px rgba(58, 139, 213, 0.4)";
						}}
						onMouseLeave={(e) => {
							e.currentTarget.style.backgroundColor = palette.light.primary20;
							e.currentTarget.style.transform = "translateY(0)";
							e.currentTarget.style.boxShadow =
								"0 4px 12px rgba(58, 139, 213, 0.3)";
						}}
						onClick={onPlayAgain}
					>
						Play Again
					</button>
					<button
						style={{
							cursor: "pointer",
							padding: "14px 28px",
							borderRadius: 8,
							border: `2px solid ${palette.light.secondary20}`,
							backgroundColor: "transparent",
							color: palette.light.secondary00,
							fontSize: "16px",
							fontWeight: "600",
							transition: "all 0.2s ease",
						}}
						onMouseEnter={(e) => {
							e.currentTarget.style.backgroundColor = palette.light.secondary20;
							e.currentTarget.style.color = palette.light.white;
							e.currentTarget.style.transform = "translateY(-2px)";
						}}
						onMouseLeave={(e) => {
							e.currentTarget.style.backgroundColor = "transparent";
							e.currentTarget.style.color = palette.light.secondary00;
							e.currentTarget.style.transform = "translateY(0)";
						}}
						onClick={onGoHome}
					>
						Go Home
					</button>
					<button
						style={{
							cursor: "pointer",
							padding: "14px 28px",
							borderRadius: 8,
							// border: `2px solid ${palette.light.secondary20}`,
							backgroundColor: "transparent",
							color: palette.light.secondary00,
							fontSize: "16px",
							fontWeight: "600",
							transition: "all 0.2s ease",
						}}
						onMouseEnter={(e) => {
							e.currentTarget.style.backgroundColor = palette.light.secondary20;
							e.currentTarget.style.color = palette.light.white;
							e.currentTarget.style.transform = "translateY(-2px)";
						}}
						onMouseLeave={(e) => {
							e.currentTarget.style.backgroundColor = "transparent";
							e.currentTarget.style.color = palette.light.secondary00;
							e.currentTarget.style.transform = "translateY(0)";
						}}
						onClick={onClose}
					>
						Close
					</button>
				</Grid>
			</Grid>
		</Grid>
	);
};
