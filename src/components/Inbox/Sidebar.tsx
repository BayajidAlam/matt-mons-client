"use client";

import { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import ModalComponent from "../ui/Modal";
import ChatItems from "./ChatIItems";
import NewConversation from "./NewConversation";
// import Blank from "./Blank";

export default function Sidebar() {
  const [showModel, setShowModel] = useState(false);

  return (
    <div className="w-[100px] border-r border-t-0 border-gray-300 lg:col-span-1 md:w-full">
      <div className="h-[65px] text-center text-grey-500 p-4 border-b border-gray-300  w-full">
        <ModalComponent
          showModel={showModel}
          setShowModel={setShowModel}
          width={550}
          buttonText="Start new conversation"
          icon={<IoMdAdd />}
        >
          <NewConversation setShowModel={setShowModel} />
        </ModalComponent>
      </div>
      <div className="overflow-auto h-[calc(100vh_-_183px)] scrollbar-thin scrollbar-track-transparent scrollbar-thumb-blue-200 scrollbar-track-rounded-full scrollbar-thumb-rounded-full">
        <ChatItems />
      </div>
      {/* <Blank /> */}
      {/* <Modal open={opened} control={controlModal} /> */}
    </div>
  );
}
