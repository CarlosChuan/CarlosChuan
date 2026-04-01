import React, { useEffect } from "react";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
	from { opacity: 0; }
	to { opacity: 1; }
`;

const slideUp = keyframes`
	from { opacity: 0; transform: translateY(24px) scale(0.96); }
	to { opacity: 1; transform: translateY(0) scale(1); }
`;

const Overlay = styled.div`
	position: absolute;
	inset: 0;
	background: rgba(0, 0, 0, 0.6);
	backdrop-filter: blur(8px);
	display: flex;
	align-items: center;
	justify-content: center;
	animation: ${fadeIn} 250ms ease-out;
	z-index: 1000;
`;

const Modal = styled.div`
	background: var(--color-surface);
	border: 1px solid var(--color-border);
	border-radius: 12px;
	padding: 40px 52px;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 28px;
	min-width: 300px;
	box-shadow: 0 24px 48px rgba(0, 0, 0, 0.3);
	animation: ${slideUp} 350ms cubic-bezier(0.34, 1.56, 0.64, 1);
`;

const Title = styled.h2`
	margin: 0;
	font-size: 1.6rem;
	font-weight: 800;
	color: var(--color-text);
	text-align: center;
	letter-spacing: -0.02em;
`;

const Subtitle = styled.p`
	margin: 0;
	font-size: 0.95rem;
	color: var(--color-text-muted);
	text-align: center;
	line-height: 1.5;
`;

const BtnRow = styled.div`
	display: flex;
	gap: 10px;
	flex-wrap: wrap;
	justify-content: center;
`;

const PrimaryBtn = styled.button`
	cursor: pointer;
	padding: 11px 24px;
	border-radius: 8px;
	border: none;
	background: var(--color-primary);
	color: #fff;
	font-size: 0.9rem;
	font-weight: 600;
	font-family: inherit;
	transition: opacity 130ms ease, transform 130ms ease;

	&:hover {
		opacity: 0.86;
		transform: translateY(-1px);
	}
	&:active {
		transform: translateY(0);
	}
`;

const GhostBtn = styled.button`
	cursor: pointer;
	padding: 11px 24px;
	border-radius: 8px;
	border: 1px solid var(--color-border);
	background: transparent;
	color: var(--color-text-muted);
	font-size: 0.9rem;
	font-weight: 500;
	font-family: inherit;
	transition: background 130ms ease, border-color 130ms ease, color 130ms ease;

	&:hover {
		background: var(--color-surface-2);
		border-color: var(--color-primary);
		color: var(--color-text);
	}
`;

interface Props {
	isOpen: boolean;
	onPlayAgain: () => void;
	onGoHome: () => void;
	onClose: () => void;
	title?: string;
	subtitle?: string;
}

export const CompletionModal: React.FC<Props> = ({
	isOpen,
	onPlayAgain,
	onGoHome,
	onClose,
	title = "Congratulations!",
	subtitle = "You've successfully completed the puzzle!",
}) => {
	if (!isOpen) return null;

	return (
		<Overlay>
			<Modal>
				<div style={{ textAlign: "center" }}>
					<Title>{title}</Title>
					<Subtitle style={{ marginTop: 10 }}>{subtitle}</Subtitle>
				</div>
				<BtnRow>
					<PrimaryBtn onClick={onPlayAgain}>Play Again</PrimaryBtn>
					<GhostBtn onClick={onGoHome}>Go Home</GhostBtn>
					<GhostBtn onClick={onClose}>Close</GhostBtn>
				</BtnRow>
			</Modal>
		</Overlay>
	);
};
