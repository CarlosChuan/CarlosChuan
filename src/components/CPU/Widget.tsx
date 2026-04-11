import { ReactNode } from "react";
import styled from "styled-components";

const WidgetContainer = styled.div`
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
	font-family: var(--font-mono);
	font-size: 0.68rem;
	letter-spacing: 1.8px;
	text-transform: uppercase;
	color: var(--color-text-muted);
`;

const WidgetBody = styled.div`
	overflow-y: auto;
	padding: 4px 0;
`;

interface WidgetProps extends React.PropsWithChildren {
	header: string | ReactNode;

	fullHeight?: boolean;
}

export const Widget = ({ header, children, ...styles }: WidgetProps) => {

	return (
		<WidgetContainer style={{ height: styles?.fullHeight ? "70vh" : "none" }}>
			<WidgetHeader>{header}</WidgetHeader>
			<WidgetBody style={{ height: styles?.fullHeight ? "100%" : "none" }}>
				{children}
			</WidgetBody>
		</WidgetContainer>
	)
}