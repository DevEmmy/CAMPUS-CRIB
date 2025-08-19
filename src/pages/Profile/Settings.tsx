import { useState } from "react";
import { useParams } from "react-router";
import TitleHead from "../../components/Ui/TitleHead";
import ToggleSwitch from "../../components/Ui/ToggleSwitch";

const NotificationSettings = () => {
  const [isToggled, setIsToggled] = useState({
    mail: false,
    push: false,
  });

  const handleToggle = (key: keyof typeof isToggled) => {
    setIsToggled((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="flex flex-col gap-4 font-medium">
      {/* Email Notification */}
      <div className="flex justify-between items-center text-gray-900 dark:text-gray-100">
        <p>Email notification</p>
        <ToggleSwitch
          isOn={isToggled.mail}
          onColor="bg-[#a64e1b]"
          offColor="bg-gray-300 dark:bg-gray-600"
          onToggle={() => handleToggle("mail")}
        />
      </div>

      {/* Push Notification */}
      <div className="flex justify-between items-center text-gray-900 dark:text-gray-100">
        <p>Push notification</p>
        <ToggleSwitch
          isOn={isToggled.push}
          onColor="bg-[#a64e1b]"
          offColor="bg-gray-300 dark:bg-gray-600"
          onToggle={() => handleToggle("push")}
        />
      </div>
    </div>
  );
};

const AppSettings = () => {
  const appMenu = ["nightfall", "eclipse"];
  const [activeMenu, setActiveMenu] = useState<number>(0);

  return (
    <div className="grid grid-cols-2 gap-5">
      {appMenu?.map((item: any, i: number) => (
        <div key={i} onClick={() => setActiveMenu(i)} className="cursor-pointer">
          <div
            className={`rounded-2xl min-w-full overflow-hidden h-36 relative border 
              ${activeMenu == i ? "border-blue-500" : "border-gray-200 dark:border-gray-700"} 
              ${item == "nightfall" ? "bg-gray-800 dark:bg-gray-700" : "bg-gray-100 dark:bg-gray-800/60"}`}
          >
            <div className="h-28 bg-gray-900 absolute bottom-0 right-0 w-[70%] rounded-tl-2xl"></div>
          </div>

          <p
            className={`text-center font-semibold capitalize my-1.5 
              ${activeMenu == i ? "text-gray-900 dark:text-white" : "text-gray-500 dark:text-gray-400"}`}
          >
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
    <main className="bg-gray-50 dark:bg-gray-900 min-h-dvh text-gray-900 dark:text-gray-100">
      <TitleHead title={`${settingsType} Setting`} />
      <section className="p-5 pt-20 flex flex-col gap-6">
        {settingsType == "app" ? <AppSettings /> : <NotificationSettings />}
      </section>
    </main>
  );
};

export default Settings;
