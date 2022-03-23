import React, { useRef, useState } from 'react';
import lottie, { AnimationItem } from 'lottie-web';
import { useEffect } from 'react';
import styled from 'styled-components';

const Loading = ({ isLoading, success }: { isLoading: boolean; success: boolean }) => {
  const ref01 = useRef<HTMLDivElement>(null);
  const ref02 = useRef<HTMLDivElement>(null);
  const [showRef02, setShowRef02] = useState(false);
  const animation01 = useRef<AnimationItem>(null);
  const animation02 = useRef<AnimationItem>(null);
  useEffect(() => {
    if (isLoading) {
      if (animation01.current) {
        animation01.current.destroy();
      }
      animation01.current = lottie.loadAnimation({
        container: ref01.current,
        renderer: 'svg' as any,
        loop: true,
        autoplay: true,
        path: '/media/loading01.json',
      });
      if (animation02.current) {
        animation02.current.destroy();
      }
      animation02.current = lottie.loadAnimation({
        container: ref02.current,
        renderer: 'svg' as any,
        loop: false,
        autoplay: false,
        path: '/media/loading02.json',
      });
      animation02.current.stop();
      setShowRef02(false);
      if (!success) {
        animation02.current.destroy();
        animation01.current.destroy();
        setShowRef02(false);
      }
      return () => {
        if (animation01.current) {
          animation01.current.destroy();
        }
        if (animation02.current && success) {
          setShowRef02(true);
          animation02.current.play();
          setTimeout(() => {
            animation02.current.destroy();
            setShowRef02(false);
          }, 1500);
        }
      };
    }
  }, [isLoading, success]);
  return (
    <>
      <Wrap ref={ref01} show={isLoading}></Wrap>
      <Wrap ref={ref02} show={showRef02}></Wrap>
    </>
  );
};
const Wrap = styled.div<{ show: boolean }>`
  width: 40px;
  display: ${({ show }) => (show ? 'block' : 'none')};
`;
export default Loading;
