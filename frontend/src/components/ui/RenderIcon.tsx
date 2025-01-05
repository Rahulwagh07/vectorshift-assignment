import React from "react";
import { IconType } from "../../configs/icons";

interface RenderIconProps {
  icon: IconType;
  className?: string;
}

export const IconRenderer: React.FC<RenderIconProps> = ({
  icon,
  className,
}) => {
  if ("type" in icon && icon.type === "image") {
    return <img src={icon.src} alt="icon" className={className} />;
  }

  const SvgIcon = icon as React.FC<{ className?: string }>;
  return <SvgIcon className={className} />;
};
