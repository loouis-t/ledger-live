import React from "react";
const Book = ({ size, color = "currentColor" }: { size: number; color?: string }) => (
  <svg viewBox="0 0 24 25" height={size} width={size}>
    <path
      fill={color}
      d="M8.4375 8.51562C8.4375 8.70117 8.54883 8.8125 8.73438 8.8125H16.4531C16.6016 8.8125 16.75 8.70117 16.75 8.51562V7.32812C16.75 7.17969 16.6016 7.03125 16.4531 7.03125H8.73438C8.54883 7.03125 8.4375 7.17969 8.4375 7.32812V8.51562ZM8.73438 11.7812H16.4531C16.6016 11.7812 16.75 11.6699 16.75 11.4844V10.2969C16.75 10.1484 16.6016 10 16.4531 10H8.73438C8.54883 10 8.4375 10.1484 8.4375 10.2969V11.4844C8.4375 11.6699 8.54883 11.7812 8.73438 11.7812ZM19.8301 17.7188C20.0898 17.6816 20.3125 17.4219 20.3125 17.125V3.46875C20.3125 3.17188 20.0156 2.875 19.7188 2.875H6.65625C4.98633 2.875 3.6875 4.21094 3.6875 5.84375V18.9062C3.6875 20.5762 4.98633 21.875 6.65625 21.875H19.7188C20.0156 21.875 20.3125 21.6152 20.3125 21.2812V20.6875C20.3125 20.4277 20.0898 20.168 19.8301 20.1309C19.6445 19.6484 19.6445 18.2012 19.8301 17.7188ZM18.3086 17.7188C18.1973 18.3867 18.1973 19.4629 18.3086 20.0938H6.65625C5.98828 20.0938 5.46875 19.5742 5.46875 18.9062C5.46875 18.2754 5.98828 17.7188 6.65625 17.7188H18.3086ZM18.5312 4.65625V15.9375H6.65625C6.21094 15.9375 5.80273 16.0488 5.46875 16.1973V5.84375C5.46875 5.21289 5.98828 4.65625 6.65625 4.65625H18.5312Z"
    />
  </svg>
);
export default Book;
