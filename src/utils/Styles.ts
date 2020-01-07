import { CSSProperties } from "react";

export function gridStyle(width: number, height: number): CSSProperties {
  return {
    gridTemplateColumns: `repeat(${width}, 60px)`,
    gridTemplateRows: `repeat(${height}, 60px)`
  };
}
