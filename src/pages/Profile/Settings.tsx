/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useParams } from "react-router";
import TitleHead from "../../components/Ui/TitleHead";
// import CustomInput from "../../components/Reuseables/CustomInput";
import ToggleSwitch from "../../components/Ui/ToggleSwitch";
// import theme from "/icons/theme-preview.png";

const NotificationSettings = () => {
  const [isToggled, setIsToggled] = useState({
    mail: false,
    push: false,
  });

  const handleToggle = (key: keyof typeof isToggled) => {
    setIsToggled((prev) => ({
      ...prev,
      [key]: !prev[key], // Toggle the specific key
    }));
  };

  return (
    <div className="flex flex-col gap-2 font-medium">
      <div className="flex justify-between items-center text-dark">
        <p>Email notification</p>
        <ToggleSwitch
          isOn={isToggled.mail}
          onColor="bg-[#a64e1b]"
          offColor="bg-gray-300"
          onToggle={() => handleToggle("mail")}
        />
      </div>

      <div className="flex justify-between items-center">
        <p>Push notification</p>
        <ToggleSwitch
          isOn={isToggled.push}
          onColor="bg-[#a64e1b]"
          offColor="bg-gray-300"
          onToggle={() => handleToggle("push")}
        />
      </div>
    </div>
  );
};

const AppSettings = () => {
  const appMenu = ['nightfall','eclipse'];
  const [activeMenu,setActiveMenu] = useState<number>(0);
  return (
    <div>

      {appMenu?.map((item: any, i: number) => (
        <div key={i} onClick={() => setActiveMenu(i)}>
          <div className={`  ${activeMenu == i && 'border border-[#2D5EFF]'} border-[0.5px] rounded-2xl min-w-full overflow-hidden h-36  relative ${ item == 'nightfall' ? 'bg-dark/50' : 'bg-[#f2f3f5]' } `}>
            <div className=" h-28 bg-dark absolute bottom-0 right-0 w-[70%] rounded-tl-2xl"></div>
          </div>
          <p className={`text-center font-semibold capitalize my-1.5 ${activeMenu == i ? 'text-dark' : 'text-variant-500'}`}>
            {item}
          </p>
        </div>
      ))}
    </div>
  );
};

const Settings = () => {
  const { settingsType } = useParams();
  return (
    <main>
      <TitleHead title={`${settingsType} Setting`} />
      <section className="p-5 pt-20 text-pri flex flex-col gap-1">
        {settingsType == "app" ? <AppSettings /> : <NotificationSettings />}
      </section>
    </main>
  );
};

export default Settings;
