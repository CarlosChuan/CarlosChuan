import { PropsWithChildren } from "react";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideIn = keyframes`
  from { opacity: 0; transform: translateY(-12px) scale(0.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.55);
  animation: ${fadeIn} 150ms ease;
`;

const Container = styled.div<{ $size: ModalSize }>`
  display: flex;
  flex-direction: column;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  overflow: hidden;
  animation: ${slideIn} 180ms ease;
  width: ${({ $size }) =>
    $size === "sm" ? "360px" : $size === "lg" ? "720px" : "520px"};
  max-width: calc(100vw - 48px);
  max-height: calc(100vh - 80px);
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--color-surface-2);
  border-bottom: 1px solid var(--color-border);
  padding: 8px 14px;
  font-family: var(--font-mono);
  font-size: 0.68rem;
  letter-spacing: 1.8px;
  text-transform: uppercase;
  color: var(--color-text-muted);
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-text-muted);
  font-size: 1rem;
  line-height: 1;
  padding: 2px 4px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  transition: color 150ms, background 150ms;

  &:hover {
    color: var(--color-text);
    background: var(--color-surface-hover);
  }
`;

const Body = styled.div`
  padding: 16px;
  overflow-y: auto;
  flex: 1;
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding: 10px 16px;
  background: var(--color-surface-2);
  border-top: 1px solid var(--color-border);
`;

type ModalSize = "sm" | "md" | "lg";

interface ModalProps extends PropsWithChildren {
  open?: boolean;
  title?: string;
  size?: ModalSize;
  footer?: React.ReactNode;
  onClose?: () => void;
}

export const Modal = ({
  open,
  title,
  size = "md",
  footer,
  onClose,
  children,
}: ModalProps) => {
  if (!open) return null;

  return (
    <Overlay onClick={onClose}>
      <Container $size={size} onClick={(e) => e.stopPropagation()}>
        {(title || onClose) && (
          <Header>
            <span>{title ?? ""}</span>
            {onClose && (
              <CloseButton onClick={onClose} aria-label="Close modal">
                ✕
              </CloseButton>
            )}
          </Header>
        )}
        <Body>{children}</Body>
        {footer && <Footer>{footer}</Footer>}
      </Container>
    </Overlay>
  );
};
