import { FC } from 'react';
import { getSettings } from '@/utils/app/settings';
interface Props {
  text: string;
  icon: JSX.Element;
  onClick: () => void;
}

export const SidebarButton: FC<Props> = ({ text, icon, onClick }) => {
  const theme = getSettings().theme
  let className = "flex w-full cursor-pointer select-none items-center gap-3 rounded-md py-3 px-3 text-[14px] leading-3 transition-colors duration-200 hover:bg-gray-500/10";
  if (theme === 'dark') {
    className += " text-white";
  }
  else {
    className += " text-black";
  }
  return (
    <button
      className= {className}
      onClick={onClick}
    >
      <div>{icon}</div>
      <span>{text}</span>
    </button>
  );
};
