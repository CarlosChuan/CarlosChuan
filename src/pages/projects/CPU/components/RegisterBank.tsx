import styled from "styled-components";
import { useRetrieveRegisterBank } from "../hooks/useRetrieveRegisterBank";
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
	max-height: 70vh;
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

const WidgetBody = styled.div`
	overflow-y: auto;
	padding: 4px 0;
`;

const Row = styled.div<{ $last?: boolean }>`
	padding: 3px 12px;
	font-family: "Courier New", Courier, monospace;
	font-size: 0.8rem;
	color: var(--color-text);
	text-transform: uppercase;
	${(p) => !p.$last && `border-bottom: 1px solid var(--color-border-subtle);`}
`;

export const RegisterBank = () => {
	const { data: viewStyle } = useViewStyle();
	const { data: registers, isLoading } = useRetrieveRegisterBank();

	return (
		<Widget>
			<WidgetHeader>Register Bank</WidgetHeader>
			<WidgetBody>
				{isLoading && <Row $last>loading…</Row>}
				{registers.map((register, idx) => (
					<Row
						key={`rb-${viewStyle}-${idx}`}
						$last={idx === registers.length - 1}
					>
						{register.toString(viewStyle, registers.length)}
					</Row>
				))}
			</WidgetBody>
		</Widget>
	);
};
