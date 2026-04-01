import styled from "styled-components";
import { bitToHex } from "../../../../helpers/strings";
import { useRetrievePC } from "../hooks/useRetrievePC";
import { useViewStyle } from "../hooks/useViewStyle";

const Widget = styled.div`
	display: flex;
	flex-direction: column;
	background: var(--color-surface);
	border: 1px solid var(--color-border);
	border-radius: 8px;
	overflow: hidden;
	width: fit-content;
	min-width: 200px;
`;

const WidgetHeader = styled.div`
	background: var(--color-surface-2);
	border-bottom: 1px solid var(--color-border);
	padding: 5px 12px;
	font-family: "Courier New", Courier, monospace;
	font-size: 0.68rem;
	letter-spacing: 1.8px;
	text-transform: uppercase;
	color: var(--color-text-muted);
`;

const Value = styled.div`
	padding: 8px 12px;
	font-family: "Courier New", Courier, monospace;
	font-size: 1rem;
	font-weight: 600;
	color: var(--color-primary);
	text-align: center;
`;

export const ProgramCounter = () => {
	const { data: viewStyle } = useViewStyle();
	const { data: PC } = useRetrievePC();

	return (
		<Widget>
			<WidgetHeader>Program Counter</WidgetHeader>
			<Value>{viewStyle === "raw" ? PC : bitToHex(PC)}</Value>
		</Widget>
	);
};
