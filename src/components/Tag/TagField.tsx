import type { SelectProps } from "antd";
import { Tag } from "antd";
import React from "react";

type TagField = SelectProps["tagRender"];

const TagField: TagField = (props) => {
  const { label, value, closable, onClose } = props;
  const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const colorMap: Record<string, string> = {
    Online: "green",
    Offline: "gold",
    Rebuild: "blue",
    Failed: "red",
    Missing: "red",
    default: "blue",
  };

  const tagColor = colorMap[value] || colorMap.default;
  return (
    <Tag
      color={tagColor}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{ marginInlineEnd: 4 }}
    >
      {label}
    </Tag>
  );
};

export default TagField;
