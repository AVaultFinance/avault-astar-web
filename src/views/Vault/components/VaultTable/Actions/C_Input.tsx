import React from 'react';
import styled from 'styled-components';
import { Input, Button, Flex } from '@my/ui';

interface CInputProps {
  onSelectMax?: () => void;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
  value: string;
  autoFocus?: boolean;
  decimals?: number;
}

const StyledInput = styled(Input)`
  box-shadow: none;
  border-width: 0px;
  background: transparent;
  width: 40%;
  text-align: left;
  border-radius: 0;
  height: 24px;
  font-size: 12px;
  padding: 0;
  ${({ theme }) => theme.mediaQueries.sm} {
    width: 60%;
    font-size: 16px;
  }
`;

const MaxButton = styled(Button)`
  text-align: right;
  padding: 0 0 0 12px;
  margin: 0;
  align-items: center;
  justify-content: right;
  line-height: 40px;
  height: 40px;
`;
const InputContainer = styled(Flex)`
  align-items: center;
  justify-content: space-between;
`;

const CInput: React.FC<CInputProps> = ({ onChange, onSelectMax, value, decimals = 18, autoFocus = false }) => {
  return (
    <>
      <InputContainer>
        <StyledInput
          pattern={`^[0-9]*[.,]?[0-9]{0,${decimals}}$`}
          inputMode="decimal"
          step="any"
          min="0"
          onChange={onChange}
          placeholder="0"
          value={value}
          autoFocus={autoFocus}
        />
        <MaxButton variant="text" onClick={onSelectMax}>
          Max
        </MaxButton>
      </InputContainer>
    </>
  );
};

export default CInput;
