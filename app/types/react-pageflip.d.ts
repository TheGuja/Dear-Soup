declare module "react-pageflip" {
  import * as React from "react";

  interface HTMLFlipBookProps {
    width: number;
    height: number;
    size?: string;
    minWidth?: number;
    maxWidth?: number;
    minHeight?: number;
    maxHeight?: number;
    maxShadowOpacity?: number;
    showCover?: boolean;
    mobileScrollSupport?: boolean;
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
  }

  const HTMLFlipBook: React.FC<HTMLFlipBookProps>;
  export default HTMLFlipBook;
}
