import { HTMLAttributes, ReactNode, useState, useEffect, useRef } from "react";
import { FaCaretDown } from "react-icons/fa";
import { Box, Spacer } from ".";
import classNames from "classnames";

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  topHead: JSX.Element;
  className?: string;
  w?: string;
  h?: string;
  nobg?: boolean;
  p?: string;
  pdrop?: string;
  noborder?: boolean;
  distance?: number;
  wdrop?: string;
}

export function DropdownMenu({ wdrop, distance = 2, pdrop, topHead, p, noborder = false, nobg = true, w = 'w-auto', h = 'h-auto', className = '', children, ...props }: Props) {
  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleOpenDrop = () => {
    setOpenDropdown(!openDropdown);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setOpenDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      {...props}
      ref={dropdownRef}
      className={classNames(
        `${w ? w : 'w-auto'}  ${h ? h : 'h-auto'} relative border-primary ${!nobg && 'bg-gradient-to-bl from-gradientbuttonend to-gradientbuttonstart'}  ${p}  rounded-lg ${!noborder ? 'border-none' : 'border-[0.8px]'}  select-none  ${className} `
      )}
    >
      <div
        className="flex gap-2 justify-between items-center"
        onClick={handleOpenDrop}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleOpenDrop();
          }
        }}
        role="button"
        tabIndex={0}
      >
        {topHead}
        <FaCaretDown className={`text-white transition-all ${openDropdown ? '-rotate-180': 'rotate-0'}`} />
      </div>
     
      {openDropdown && (
        <div className={`z-50 absolute ${wdrop ?? 'w-auto'} fadein-fast right-0`}>
          <Spacer y={distance} />
          <Box className="shadow-xl" p={`${pdrop ?? 'p-2'}`}>
            {children}
          </Box>
        </div>
      )}
    </div>
  );
}
