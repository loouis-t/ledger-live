import React from "react";
import Svg, { G, Defs, Path, Rect, ClipPath } from "react-native-svg";

interface Props {
  size: number;
}

export function getFTXLogo(isUS = false) {
  return React.memo(function FTX({ size }: Props) {
    return (
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <G clipPath="url(#clip0_1694_20090)">
          <G clipPath="url(#clip1_1694_20090)">
            <Path
              d="M6.78507 2.50132C12.5227 2.49956 18.2607 2.49956 23.999 2.50132C24.0008 4.35594 24.0008 6.21024 23.999 8.06423C18.2612 8.06599 12.5232 8.06599 6.78507 8.06423C6.78323 6.2096 6.78323 4.3553 6.78507 2.50132Z"
              fill="#02A6C2"
            />
            <Path
              d="M0.00768817 10.1571C1.85878 10.1475 3.71019 10.1475 5.56192 10.1571C5.57152 12.0082 5.57152 13.8596 5.56192 15.7113C3.71027 15.7208 1.85886 15.721 0.00768817 15.7118C-0.00191168 13.8604 -0.00191168 12.0088 0.00768817 10.1571Z"
              fill={isUS ? "#c81437" : "#5FCADE"}
            />
            <Path
              d="M6.78968 10.157C10.931 10.1482 15.072 10.1482 19.2128 10.157C19.2216 12.0081 19.2216 13.8595 19.2128 15.7113C15.0716 15.7199 10.9305 15.7199 6.78968 15.7113C6.78104 13.8601 6.78104 12.0087 6.78968 10.157Z"
              fill="#5FCADE"
            />
            <Path
              d="M6.79493 17.8144C8.6429 17.7943 10.4905 17.7943 12.3379 17.8144C12.3571 19.6612 12.3573 21.5089 12.3387 23.3574C10.4907 23.3757 8.64314 23.3753 6.79589 23.3565C6.77669 21.5098 6.77637 19.6625 6.79493 17.8144Z"
              fill="#ABEBF4"
            />
          </G>
        </G>
        <Defs>
          <ClipPath id="clip0_1694_20090">
            <Rect
              width="24"
              height="24"
              fill="white"
              transform="translate(0.000488281)"
            />
          </ClipPath>
          <ClipPath id="clip1_1694_20090">
            <Rect
              width="24"
              height="20.8709"
              fill="white"
              transform="translate(0.000488281 2.5)"
            />
          </ClipPath>
        </Defs>
      </Svg>
    );
  });
}
