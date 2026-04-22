import styled from "styled-components";
import { Widget } from "../../../../components/CPU/Widget";
import { bitToHex } from "../../../../helpers/strings";
import { useViewStyle } from "../hooks/configuration/useViewStyle";
import { useRetrievePC } from "../hooks/data/useRetrievePC";

const Value = styled.div`
	padding: 8px 12px;
	font-family: var(--font-mono);
	font-size: 1rem;
	font-weight: 600;
	color: var(--color-primary);
	text-align: center;
`;

export const ProgramCounter = () => {
	const { data: viewStyle } = useViewStyle();
	const { data: PC } = useRetrievePC();

	return (
		<Widget header={"Program Counter"}>
			<Value>{viewStyle === "raw" ? PC : bitToHex(PC)}</Value>
		</Widget>
	);
};
