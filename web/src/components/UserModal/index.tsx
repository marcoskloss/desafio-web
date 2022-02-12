import * as React from "react";
import styled from "styled-components";
import { MdClose } from "react-icons/md";

const ModalOverlay = styled.div`
  backdrop-filter: blur(2px);
  position: fixed;
  z-index: 10;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Modal = styled.div`
  max-width: 800px;
  width: 90%;
  max-height: 600px;
  height: 90%;
  border: 1px solid ${(props) => props.theme.colors.borderColor};
  border-radius: 4px;
  background: ${(props) => props.theme.colors.bg};

  .content {
    padding: 24px;
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid ${(props) => props.theme.colors.borderColor};
    background: ${(props) => props.theme.colors.darkenBg};
    padding: 12px 24px;

    .close-btn {
      cursor: pointer;
      padding: 8px 10px 6px;
      border-radius: 4px;

      &:hover {
        background-color: ${(props) => props.theme.colors.borderColor};
      }
    }
  }
`;

type UserModalProps = { title: string; onClose: () => void };

export const UserModal: React.FC<UserModalProps> = ({
  children,
  title,
  onClose,
}) => {
  return (
    <ModalOverlay>
      <Modal>
        <header>
          <div>{title}</div>
          <div className="close-btn" onClick={onClose}>
            <MdClose />
          </div>
        </header>

        <div className="content">{children}</div>
      </Modal>
    </ModalOverlay>
  );
};
