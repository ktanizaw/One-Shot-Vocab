import React, { useEffect, useState } from 'react';

const BREAKPOINT_SIZE_L = 1370;
const BREAKPOINT_SIZE_M = 750;
const BREAKPOINT_SIZE_S = 500;

export type WindowSize = 's' | 'm' | 'l';
export type WindowSizeBreakpoint = {
  sizeL: number;
  sizeM: number;
  sizeS: number;
};
export const useWindowSizeDetector = (breakpoint: WindowSizeBreakpoint) => {
  const [width, setWidth] = useState<number>(window.innerWidth);
  const [height, setHeight] = useState<number>(window.innerHeight);

  const isWindowSizeS = width > BREAKPOINT_SIZE_S;
  const isWindowSizeM = width > BREAKPOINT_SIZE_M;
  const isWindowSizeL = width > BREAKPOINT_SIZE_L;

  const getWindowSize = (): WindowSize => {
    if (isWindowSizeL) {
      return 'l';
    }

    if (isWindowSizeM) {
      return 'm';
    }

    return 's';
  };

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const WindowSizeOnly: React.FC<{ sizes: WindowSize[]; children: any }> = ({
    sizes,
    children,
  }) => {
    const [shouldRender, setShouldRender] = useState<boolean>(false);

    useEffect(() => {
      setShouldRender(sizes.includes(getWindowSize()));
    }, [width]);

    return shouldRender ? <>{children}</> : null;
  };

  return {
    width,
    height,
    isWindowSizeS,
    isWindowSizeM,
    isWindowSizeL,
    windowSize: getWindowSize(),
    windowSizeL: BREAKPOINT_SIZE_L,
    windowSizeM: BREAKPOINT_SIZE_M,
    windowSizeS: BREAKPOINT_SIZE_S,
    WindowSizeOnly,
  };
};
