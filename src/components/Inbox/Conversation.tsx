"use client";

import Blank from "./Blank";
import Sidebar from "./Sidebar";

const Conversation = () => {
  return (
    <div className="mx-auto -mt-1">
      <div className="bg-white border border-blue-200 rounded-lg shadow-md shadow-blue-200 min-w-full flex lg:grid lg:grid-cols-3">
        <Sidebar />
        <div className="w-full lg:col-span-2 lg:block">
          <div className="w-full grid conversation-row-grid">
            <Blank />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Conversation;
