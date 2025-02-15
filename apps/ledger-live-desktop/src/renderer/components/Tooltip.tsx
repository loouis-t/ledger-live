import React from "react";
import Tippy from "@tippyjs/react";
import styled from "styled-components";
import get from "lodash/get";
import { followCursor as followCursorPlugin, roundArrow, Placement } from "tippy.js";
import useTheme from "~/renderer/hooks/useTheme";
const ContentContainer = styled.div.attrs<{ bg: string }>(p => ({
  style: {
    background: p.bg,
    color: p.theme.colors.palette.background.paper,
  },
}))<{ bg: string }>`
  font-family: Inter, sans-serif;
  font-weight: 600;
  font-size: 10px;
  text-align: center;
  padding: 5px 9px;
  border-radius: 4px;
  word-wrap: break-word;
`;

// FIXME this is annoying wrapper!
const ChildrenContainer = styled.div`
  display: inline-flex;
  flex-shrink: 1;
  max-width: 100%;
`;
export const defaultTippyOptions = {
  animation: "shift-toward",
  theme: "ledger",
  plugins: [followCursorPlugin],
};

type Props = {
  tooltipBg?: string;
  children?: React.ReactNode;
  content: React.ReactNode;
  delay?: number | null;
  followCursor?: boolean;
  enabled?: boolean;
  placement?: Placement;
  arrow?: boolean;
  hideOnClick?: boolean;
  disableWrapper?: boolean;
  containerStyle?: React.CSSProperties;
};

const ToolTip = ({
  followCursor,
  tooltipBg,
  children,
  content,
  delay = null,
  enabled = true,
  disableWrapper = false,
  placement = "top",
  arrow = true,
  hideOnClick = true,
  containerStyle,
}: Props) => {
  const colors = useTheme().colors;
  const bg = tooltipBg ? get(colors, tooltipBg, tooltipBg) : colors.palette.text.shade100;
  return (
    <Tippy
      {...defaultTippyOptions}
      content={<ContentContainer bg={bg}>{content}</ContentContainer>}
      delay={[delay, 0]}
      arrow={arrow ? roundArrow : false}
      followCursor={followCursor}
      disabled={!(!!content && enabled)}
      placement={placement}
      hideOnClick={hideOnClick}
      className={`bg-${tooltipBg ? tooltipBg.replace(/\./g, "-") : "default"}`}
    >
      {disableWrapper ? (
        <>{children}</>
      ) : (
        <ChildrenContainer style={containerStyle}>{children}</ChildrenContainer>
      )}
    </Tippy>
  );
};
export default ToolTip;
