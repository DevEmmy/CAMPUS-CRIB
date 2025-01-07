import React from "react";
import { BiSolidMessageSquareEdit } from "react-icons/bi";
import { Link } from "react-router";
import ConversationOverview from "./ConversationOverview";
import { ArrowLeft2 } from "iconsax-react";

const AllConversationDisplay: React.FC = () => {
  return (
    <section>
        <div className=" bg-primary text-white flex items-center px-3">
<button>
    <ArrowLeft2 size={32} />
</button>
      <h2 className="text-center flex-1 text-2xl font-medium flex items-center justify-center gap-2 p-3 ">
        <BiSolidMessageSquareEdit size={35} /> Messages
      </h2>
        </div>
      <div>
        {[0, 1, 2, 3, 4, 5].map((_, i) => (
          <Link key={i} to={`/messages/${i}`}>
            <ConversationOverview />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default AllConversationDisplay;
