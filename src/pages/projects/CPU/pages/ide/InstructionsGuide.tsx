import styled from "styled-components";
import { Widget } from "../../../../../components/CPU/Widget";
import { INSTRUCTIONS_OPERATIONS } from "../../domains/instruction/Instruction";

const Row = styled.div<{ $last?: boolean }>`
	padding: 3px 12px;
	font-family: var(--font-mono);
	font-size: 0.8rem;
	color: var(--color-text);
	text-transform: uppercase;
	${(p) =>
    !p.$last && `border-bottom: 1px solid var(--color-border);`}
`;

export const InstructionsGuide = () => {
  return (
    <Widget header={"Instructions guide"} >
      {INSTRUCTIONS_OPERATIONS.map((instruction, idx) => {
        const { type, description, ...paramsObject } = instruction;

        const paramsList = Object.keys(paramsObject);

        return (
          <Row key={`instruction-guide-${type}`} $last={idx === INSTRUCTIONS_OPERATIONS.length - 1}>
            <p>{`${[type, ...paramsList].join(', ')}`}</p>
            <p style={{ color: "var(--color-text-muted)", fontStyle: "italic" }}>{description}</p>
          </Row>)
      })}
    </ Widget>
  );
}