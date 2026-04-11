import { useEffect, useState } from "react";
import styled from "styled-components";
import { Widget } from "../../../../components/CPU/Widget";
import { MemoryCell } from "../domains/MemoryCell";
import { useRetrieveMemoryData } from "../hooks/useRetrieveMemoryData";
import { useViewStyle } from "../hooks/useViewStyle";

const Row = styled.div<{ $last?: boolean }>`
	padding: 3px 12px;
	font-family: var(--font-mono);
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
		<Widget header={"Memory"}>
			<>
				{isLoading && (
					<Row $last>loading…</Row>
				)}
				{memory.map((cell, idx) => (
					<Row key={`memory-${viewStyle}-${idx}`} $last={idx === memory.length - 1}>
						{cell.toString(viewStyle, memory.length)}
					</Row>
				))}
			</>
		</Widget>
	);
};
