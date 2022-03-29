import React from "react";
import styled from "styled-components";
import Flex from "../../components/Box/Flex";
import { Box } from "../../components/Box";
import { ArrowBackIcon, CloseIcon } from "../../components/Svg";
import { IconButton } from "../../components/Button";
import { ModalProps } from "./types";

export const ModalHeader = styled.div<{ background?: string }>`
  align-items: center;
  background: ${({ background }) => background || "transparent"};
  /* border-bottom: 1px solid ${({ theme }) => theme.colors.cardBorder}; */
  display: flex;
  padding: 12px 24px 0;
  ${({ theme }) => theme.mediaQueries.sm} {
    padding: 14px 30px;
  }
`;

export const ModalTitle = styled(Flex)`
  align-items: center;
  flex: 1;
`;

export const ModalBody = styled(Flex)`
  flex-direction: column;
  max-height: 90vh;
  overflow-y: auto;
`;

export const ModalCloseButton: React.FC<{ onDismiss: ModalProps["onDismiss"] }> = ({ onDismiss }) => {
  return (
    <IconButton variant="text" onClick={onDismiss} aria-label="Close the dialog">
      <CloseIcon color="#9DA6A6" height="30px" width="30px" />
    </IconButton>
  );
};

export const ModalBackButton: React.FC<{ onBack: ModalProps["onBack"] }> = ({ onBack }) => {
  return (
    <IconButton variant="text" onClick={onBack} area-label="go back" mr="8px">
      <ArrowBackIcon color="primary" />
    </IconButton>
  );
};

export const ModalContainer = styled(Box)<{ minWidth?: string; maxWidth?: string }>`
  overflow: hidden;
  width: 100%;
  max-height: 100vh;
  z-index: ${({ theme }) => theme.zIndices.modal};
  background: ${({ theme }) => theme.colors.tooltipColors.background};
  border-radius: 12px;
  margin: 0 20px;
  ${({ theme }) => theme.mediaQueries.xs} {
    width: auto;
    min-width: ${({ minWidth }) => minWidth ?? "320px"};
    max-width: ${({ maxWidth }) => maxWidth ?? "100%"};
  }
`;
