import styled from "styled-components";
import { variant as StyledSystemVariant } from "styled-system";
import { ImageProps, Variant, variants } from "./types";
import TokenImage from "./TokenImage";

interface StyledImageProps extends ImageProps {
  variant: Variant;
}

export const StyledPrimaryImage = styled(TokenImage)<StyledImageProps>`
  position: absolute;
  width: ${({ variant }) =>
    variant === variants.DEFAULT ? "92%" : "62%"}; // 92, 72 are arbitrary numbers to fit the variant

  height: ${({ variant }) =>
    variant === variants.DEFAULT ? "92%" : "62%"}; // 92, 72 are arbitrary numbers to fit the variant

  ${StyledSystemVariant({
    variants: {
      [variants.DEFAULT]: {
        bottom: 0,
        left: 0,
        right: "auto",
        top: "19%",
        zIndex: 5,
      },
      [variants.INVERTED]: {
        bottom: 0,
        left: "auto",
        right: 0,
        top: "19%",
        zIndex: 6,
      },
    },
  })}
`;

export const StyledSecondaryImage = styled(TokenImage)<StyledImageProps>`
  position: absolute;
  width: ${({ variant }) =>
    variant === variants.DEFAULT ? "92%" : "62%"}; // 92, 72 are arbitrary numbers to fit the variant
  height: ${({ variant }) =>
    variant === variants.DEFAULT ? "92%" : "62%"}; // 92, 72 are arbitrary numbers to fit the variant

  ${StyledSystemVariant({
    variants: {
      [variants.DEFAULT]: {
        bottom: 0,
        left: "auto",
        right: 0,
        top: "auto",
        zIndex: 6,
      },
      [variants.INVERTED]: {
        bottom: 0,
        left: 0,
        right: "auto",
        top: "19%",
        zIndex: 5,
      },
    },
  })}
`;
