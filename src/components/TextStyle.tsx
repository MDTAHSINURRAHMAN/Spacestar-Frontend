import { Mark } from "@tiptap/core";

function convertAttributesToStyle(attrs: any): string {
  let style = "";

  if (attrs.color) style += `color: ${attrs.color} !important;`;
  if (attrs.fontSize) style += `font-size: ${attrs.fontSize} !important;`;
  if (attrs.fontFamily) style += `font-family: ${attrs.fontFamily} !important;`;

  return style;
}

export const CustomTextStyle = Mark.create({
  name: "textStyle", // ✅ must remain "textStyle" for compatibility

  addAttributes() {
    return {
      color: {
        default: null,
      },
      fontSize: {
        default: null,
      },
      fontFamily: {
        default: null,
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "span",
        getAttrs: (element) => {
          const hasStyle = (element as HTMLElement).hasAttribute("style");
          return hasStyle ? {} : false;
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "span",
      {
        ...HTMLAttributes,
        style: convertAttributesToStyle(HTMLAttributes),
      },
      0,
    ];
  },
});
