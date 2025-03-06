import TitleHead from "../../components/Ui/TitleHead";
import profile from "/icons/profile.png";
import { MdOutlineChat } from "react-icons/md";

const BookingsDetails = () => {
  return (
    <main>
      <TitleHead title="booking details" />
      <div className="p-5 mt-14">
        {/* Profile Section */}
        <div className="flex items-center gap-2">
          <img
            src={profile} // Replace with actual image URL
            alt="User"
            className="w-12 h-12 object-contain"
          />
          <div className="flex-1">
            <h2 className="text-lg font-semibold">Clinton Sandra</h2>
            <p className="text-xs text-variant-500 italic">
              Single Room - Check-in Feb 5, 2024
            </p>
          </div>
          <button className="bg-primary text-white p-2 rounded-xl">
            <MdOutlineChat />
          </button>
        </div>

        {/* Details Section */}
        <div className="flex flex-col gap-4 mt-5">
          <DetailItem label="Hostel Name" value="Campus Haven Lodge" />
          <DetailItem
            label="Location"
            value="12 Elm Street, Near City University, Boston, MA"
          />
          <DetailItem label="Check-in Date" value="Feb 5, 2024" />
          <DetailItem label="Room Type" value="Single Room" />
          <DetailItem label="Total Amount" value="$1,600" />
          <DetailItem
            label="Payment Status"
            value={<span className="text-green-500">Paid</span>}
          />
        </div>
      </div>
    </main>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DetailItem = ({ label, value }: any) => (
  <div className="pb-1 border-b flex flex-col gap-1.5">
    <p className="text-xs text-[#636363]">{label}</p>
    <p className="text-sm font-medium text-dark">{value}</p>
  </div>
);

export default BookingsDetails;
