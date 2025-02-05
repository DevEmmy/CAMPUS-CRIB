import TitleHead from "../../components/Ui/TitleHead";
import CustomInput from "../../components/Reuseables/CustomInput";
import profile from "/icons/profile.png";
import { Camera } from "iconsax-react";
import ControlledButton from "../../components/Reuseables/ControlledButton";
// import { useUserStore } from "../../store/UseUserStore";
import { useUserContext } from "../../contexts/UserContext";

const PersonalDetails = () => {
  // const { user } = useUserStore();
  const {fetchedUser: user} = useUserContext()

  return (
    <main>
      <TitleHead title={"Personal details"} />
      <section className="p-5 pt-20 flex flex-col gap-1">
        <div className="flex flex-col gap-3.5">
          <div className=" size-32 mx-auto rounded-xl relative mb-5">
            <img
              src={profile}
              className="w-full h-full rounded-xl object-cover"
            />
            <span className="bg-[#f5f5f5] absolute rounded-lg right-0 bottom-0 p-1.5">
              <Camera size="16" color="#1B85A6" />
            </span>
          </div>

          <CustomInput
            placeholder="firstname"
            type="text"
            name=""
            borderColor="#000"
            value={user?.firstName as string}
          />

          <CustomInput
            placeholder="lastname"
            type="text"
            name=""
            borderColor="#000"
            value={user?.lastName as string}
          />

          <CustomInput
            placeholder="mail"
            type="text"
            name="email"
            borderColor="#000"
            value={user?.email as string}
          />

          <CustomInput
            placeholder="dateOfBirth"
            type="date"
            name="dob"
            borderColor="#000"
            value={"Clinton Sandra"}
          />

          <CustomInput
            placeholder="number"
            type="number"
            name="phoneNumber"
            borderColor="#000"
            value={+1234567890}
          />
          <CustomInput
            placeholder="Nigeria"
            type="select"
            options={["Nigeria", "Togo"]}
            name="country"
            borderColor="#000"
            value={1}
          />
          <CustomInput
            placeholder="address"
            type="text"
            name="address"
            borderColor="#000"
            value={"45 Maple Drive, NY"}
          />

          <ControlledButton title="Save Changes" />
        </div>
      </section>
    </main>
  );
};

export default PersonalDetails;
