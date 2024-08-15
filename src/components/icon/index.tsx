import { Icon, IconProps } from "@iconify/react";

const IconifyIcon = ({ icon, ...rest }: IconProps) => {
  return <Icon icon={icon} {...rest} />;
};

export default IconifyIcon;
