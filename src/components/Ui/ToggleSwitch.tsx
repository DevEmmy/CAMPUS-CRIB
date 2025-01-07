import React from "react";

interface ToggleSwitchProps {
  isOn: boolean;
  onColor?: string;
  offColor?: string;
  onToggle: (newState: boolean) => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  isOn,
  onColor,
  offColor,
  onToggle,
}) => {
  return (
    <div
      className={`w-9 h-5 flex items-center rounded-full p-0.5 cursor-pointer ${
        isOn ? onColor : offColor
      }`}
      onClick={() => onToggle(!isOn)}
    >
      {/* Circle */}
      <div
        className={`bg-white size-4 rounded-full shadow-md transform transition-transform ${
          isOn ? "translate-x-4" : "translate-x-0"
        }`}
      ></div>
    </div>
  );
};

export default ToggleSwitch;
