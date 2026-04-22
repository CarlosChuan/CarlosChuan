import styled from "styled-components";
import { Widget } from "../../../../components/CPU/Widget";
import { useViewStyle } from "../hooks/configuration/useViewStyle";
import { useRetrieveRegisterBank } from "../hooks/data/useRetrieveRegisterBank";

const Row = styled.div<{ $last?: boolean }>`
	padding: 3px 12px;
	font-family: var(--font-mono);
	font-size: 0.8rem;
	color: var(--color-text);
	text-transform: uppercase;
	${(p) => !p.$last && `border-bottom: 1px solid var(--color-border-subtle);`}
`;

export const RegisterBank = () => {
	const { data: viewStyle } = useViewStyle();
	const { data: registers, isLoading } = useRetrieveRegisterBank();

	return (
		<Widget header={"Register Bank"}>
			<>
				{isLoading && <Row $last>loading…</Row>}
				{registers.map((register, idx) => (
					<Row
						key={`rb-${viewStyle}-${idx}`}
						$last={idx === registers.length - 1}
					>
						{register.toString(viewStyle, registers.length)}
					</Row>
				))}
			</>
		</Widget>
	);
};
