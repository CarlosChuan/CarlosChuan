import { useEffect, useState } from "react";
import styled from "styled-components";
import { MemoryCell } from "../domains/MemoryCell";
import { useRetrieveMemoryData } from "../hooks/useRetrieveMemoryData";
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
	${(p) =>
		!p.$last && `border-bottom: 1px solid var(--color-border-subtle);`}
`;

export const Memory = () => {
	const [memory, setMemory] = useState<MemoryCell[]>([]);
	const { data: viewStyle } = useViewStyle();
	const { data: memoryStoredData, isLoading } = useRetrieveMemoryData();

	useEffect(() => {
		setMemory(memoryStoredData);
	}, [memoryStoredData]);

	return (
		<Widget>
			<WidgetHeader>Memory</WidgetHeader>
			<WidgetBody>
				{isLoading && (
					<Row $last>loading…</Row>
				)}
				{memory.map((cell, idx) => (
					<Row key={`memory-${viewStyle}-${idx}`} $last={idx === memory.length - 1}>
						{cell.toString(viewStyle, memory.length)}
					</Row>
				))}
			</WidgetBody>
		</Widget>
	);
};
