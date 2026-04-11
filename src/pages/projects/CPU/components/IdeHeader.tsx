import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { routes, ROUTES_DICT } from "../../../../constants/Routes";
import { useRetrieveCurrentInstruction } from "../hooks/useRetrieveInstruction";

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

export const IDEHeader = () => {
	useRetrieveCurrentInstruction();

	const navigate = useNavigate();


	return (
		<Toolbar>
			<ToolbarGroup>
				<ToolbarBtn
					onClick={() => navigate(routes.getRoute(ROUTES_DICT.PROJECTS.CPU_SIM.ROOT))}
				>
					Viewer →
				</ToolbarBtn>
			</ToolbarGroup>
		</Toolbar>
	);
};
