import { useState } from "react";
import styled from "styled-components";
import { Grid } from "../../../../../components/shared/Grid";
import { Modal } from "../../../../../components/shared/Modal";
import { bitsToNum } from "../../../../../helpers/strings";
import { useRetrievePC } from "../../hooks/data/useRetrievePC";

const Toolbar = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	padding: 0 20px;
	height: 48px;
	background: var(--color-surface);
	border-bottom: 1px solid var(--color-border);
	gap: 12px;
	flex-shrink: 0;
`;

const ToolbarGroup = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 8px;
`;

const ToolbarBtn = styled.button`
	cursor: pointer;
	padding: 5px 12px;
	border-radius: 6px;
	border: 1px solid var(--color-border);
	background: transparent;
	color: var(--color-text-muted);
	font-size: 0.8rem;
	font-family: var(--font-mono);
	letter-spacing: 0.3px;
	transition: background 120ms ease, border-color 120ms ease, color 120ms ease;

	&:hover {
		background: var(--color-primary-dim);
		border-color: var(--color-primary);
		color: var(--color-primary);
	}
`;

interface IDEHeaderProps {
	onUploadInstructions: () => void;
	onNavigateToSimulator: () => void;
}

export const IDEHeader = ({ onUploadInstructions, onNavigateToSimulator }: IDEHeaderProps) => {
	const [confirmModalOpen, setConfirmModalOpen] = useState(false);
	const { data: pc } = useRetrievePC();

	const onInnerUploadInstructions = () => {
		if (bitsToNum(pc) > 0) {
			setConfirmModalOpen(true);
		} else {
			onUploadInstructions();
		}
	}

	const onModalAction = (action: "proceed" | "cancel") => {
		if (action === "proceed") {
			onUploadInstructions();
		}
		setConfirmModalOpen(false)
	}


	return (
		<Toolbar>
			<ToolbarGroup>
				<ToolbarBtn
					onClick={onNavigateToSimulator}
				>
					Viewer →
				</ToolbarBtn>
			</ToolbarGroup>
			<ToolbarGroup>
				<ToolbarBtn
					onClick={onInnerUploadInstructions}
				>
					Upload
				</ToolbarBtn>
			</ToolbarGroup>
			<Modal
				open={confirmModalOpen}
				onClose={() => onModalAction("cancel")}
				children={"It looks like the simulation is running (PC is not 0) and uploading the instructions will reset all the components."}
				footer={
					<Grid style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", flex: '1' }}>
						{"Are you sure you want to upload the instructions?"}
						<ToolbarBtn onClick={() => onModalAction("proceed")}>Proceed</ToolbarBtn>
					</Grid>
				}
			/>
		</Toolbar>
	);
};
