import { useEffect, useState } from "react";
import styled from "styled-components";
import { Widget } from "../../../../components/CPU/Widget";
import { MemoryBlock } from "../domains/memoryBlock/MemoryBock";
import { useResetHandler } from "../hooks/actions/useResetHandler";
import { useViewStyle } from "../hooks/configuration/useViewStyle";
import { useRetrieveMemoryData } from "../hooks/data/useRetrieveMemoryData";

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
	const [memory, setMemory] = useState<MemoryBlock>();
	const { data: viewStyle } = useViewStyle();
	const { data: memoryStoredData, setData: setStoredMemory, isLoading } = useRetrieveMemoryData();

	useEffect(() => {
		setMemory(memoryStoredData);
	}, [memoryStoredData]);

	const resetStoredMemory = () =>
		new Promise<void>((resolve) => {
			setStoredMemory([])
			resolve();
		});

	useResetHandler(resetStoredMemory)

	return (
		<Widget header={"Memory"}>
			<>
				{memory ? (
					memory.memoryCells.map((cell, idx) => (
						<Row key={`memory-${viewStyle}-${idx}`} $last={idx === memory.memoryCells.length - 1}>
							{cell.toString(viewStyle, memory.memoryCells.length)}
						</Row>
					))

				) : (
					<Row $last>loading…</Row>
				)}
			</>
		</Widget>
	);
};
