import blankImage from "../../assets/blank.svg";

export default function Blank() {
  return (
    <div className="h-[calc(100vh_-_129px)] flex md:flex-col md:space-y-4 items-center justify-center text-gray-700">
      {/* <img
        src={blankImage}
        alt="No messages"
        className="w-10 hidden md:block"
      /> */}
      <div className="text-center px-10">
        <p>
          No conversation selected! Select an user from left sidebar to view all
          messages
        </p>
      </div>
    </div>
  );
}
