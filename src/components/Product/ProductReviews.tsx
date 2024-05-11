import React from "react";
import { FaStar } from "react-icons/fa";
import UserImage from "@/assets/demo1_en.png";
import Image from "next/image";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
const ProductReviews = () => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="flex justify-between items-start ">
          <div className="flex justify-start items-start gap-1">
            <Image
              className="rounded-[50%] h-10 w-10"
              src={UserImage}
              width={50}
              height={50}
              alt="user image"
            />
            <div>
              <h1>Bayajid Alam Joyel</h1>
              <div className="flex justify-start items-center gap-1">
                <FaStar className="text-orange-400" />
                <FaStar className="text-orange-400" />
                <FaStar className="text-orange-400" />
                <FaStar className="text-orange-400" />
                <FaStar className="text-orange-400" />
              </div>
            </div>
          </div>
          <p>2 weeks ago</p>
        </div>

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae cumque
          quisquam nesciunt rem amet laudantium, mollitia aut dolorum,
          consequuntur, officia culpa facere? Magnam alias quos ad nostrum
          repudiandae repellendus est inventore dolore qui dignissimos
          reiciendis illum, enim quidem ex corporis eum maxime quaerat
          architecto ipsum blanditiis temporibus distinctio et provident!
        </p>

        <div className="flex justify-start items-center gap-1">
          <Image
            className="rounded-lg"
            src={UserImage}
            width={100}
            height={100}
            alt="user image"
          />
          <Image
            className="rounded-lg"
            src={UserImage}
            width={100}
            height={100}
            alt="user image"
          />
          <Image
            className="rounded-lg"
            src={UserImage}
            width={100}
            height={100}
            alt="user image"
          />
          <Image
            className="rounded-lg"
            src={UserImage}
            width={100}
            height={100}
            alt="user image"
          />
          <Image
            className="rounded-lg"
            src={UserImage}
            width={100}
            height={100}
            alt="user image"
          />
        </div>
        <div className="flex justify-between items-center gap-2">
          <p>
            Was this review helpfutl? <button>Yes</button> <button>No</button>
          </p>
          <div className="flex justify-between items-center gap-1">
            <div className="flex justify-between items-center gap-1">
              <AiOutlineLike className="text-xl hover:text-[#08c]" />
              (10)
            </div>

            <div className="flex justify-between items-center gap-1">
              <AiOutlineDislike className="text-xl hover:text-[#08c]" />
              (0)
            </div>
          </div>
        </div>

        <hr />
      </div>
      <div className="space-y-2">
        <div className="flex justify-between items-start ">
          <div className="flex justify-start items-start gap-1">
            <Image
              className="rounded-[50%] h-10 w-10"
              src={UserImage}
              width={50}
              height={50}
              alt="user image"
            />
            <div>
              <h1>Bayajid Alam Joyel</h1>
              <div className="flex justify-start items-center gap-1">
                <FaStar className="text-orange-400" />
                <FaStar className="text-orange-400" />
                <FaStar className="text-orange-400" />
                <FaStar className="text-orange-400" />
                <FaStar className="text-orange-400" />
              </div>
            </div>
          </div>
          <p>2 weeks ago</p>
        </div>

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae cumque
          quisquam nesciunt rem amet laudantium, mollitia aut dolorum,
          consequuntur, officia culpa facere? Magnam alias quos ad nostrum
          repudiandae repellendus est inventore dolore qui dignissimos
          reiciendis illum, enim quidem ex corporis eum maxime quaerat
          architecto ipsum blanditiis temporibus distinctio et provident!
        </p>

        <div className="flex justify-start items-center gap-1">
          <Image
            className="rounded-lg"
            src={UserImage}
            width={100}
            height={100}
            alt="user image"
          />
          <Image
            className="rounded-lg"
            src={UserImage}
            width={100}
            height={100}
            alt="user image"
          />
          <Image
            className="rounded-lg"
            src={UserImage}
            width={100}
            height={100}
            alt="user image"
          />
          <Image
            className="rounded-lg"
            src={UserImage}
            width={100}
            height={100}
            alt="user image"
          />
          <Image
            className="rounded-lg"
            src={UserImage}
            width={100}
            height={100}
            alt="user image"
          />
        </div>
        <div className="flex justify-between items-center gap-2">
          <p>
            Was this review helpfutl? <button>Yes</button> <button>No</button>
          </p>
          <div className="flex justify-between items-center gap-1">
            <div className="flex justify-between items-center gap-1">
              <AiOutlineLike className="text-xl hover:text-[#08c]" />
              (10)
            </div>

            <div className="flex justify-between items-center gap-1">
              <AiOutlineDislike className="text-xl hover:text-[#08c]" />
              (0)
            </div>
          </div>
        </div>

        <hr />
      </div>
      <div className="space-y-2">
        <div className="flex justify-between items-start ">
          <div className="flex justify-start items-start gap-1">
            <Image
              className="rounded-[50%] h-10 w-10"
              src={UserImage}
              width={50}
              height={50}
              alt="user image"
            />
            <div>
              <h1>Bayajid Alam Joyel</h1>
              <div className="flex justify-start items-center gap-1">
                <FaStar className="text-orange-400" />
                <FaStar className="text-orange-400" />
                <FaStar className="text-orange-400" />
                <FaStar className="text-orange-400" />
                <FaStar className="text-orange-400" />
              </div>
            </div>
          </div>
          <p>2 weeks ago</p>
        </div>

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae cumque
          quisquam nesciunt rem amet laudantium, mollitia aut dolorum,
          consequuntur, officia culpa facere? Magnam alias quos ad nostrum
          repudiandae repellendus est inventore dolore qui dignissimos
          reiciendis illum, enim quidem ex corporis eum maxime quaerat
          architecto ipsum blanditiis temporibus distinctio et provident!
        </p>

        <div className="flex justify-start items-center gap-1">
          <Image
            className="rounded-lg"
            src={UserImage}
            width={100}
            height={100}
            alt="user image"
          />
          <Image
            className="rounded-lg"
            src={UserImage}
            width={100}
            height={100}
            alt="user image"
          />
          <Image
            className="rounded-lg"
            src={UserImage}
            width={100}
            height={100}
            alt="user image"
          />
          <Image
            className="rounded-lg"
            src={UserImage}
            width={100}
            height={100}
            alt="user image"
          />
          <Image
            className="rounded-lg"
            src={UserImage}
            width={100}
            height={100}
            alt="user image"
          />
        </div>
        <div className="flex justify-between items-center gap-2">
          <p>
            Was this review helpfutl? <button>Yes</button> <button>No</button>
          </p>
          <div className="flex justify-between items-center gap-1">
            <div className="flex justify-between items-center gap-1">
              <AiOutlineLike className="text-xl hover:text-[#08c]" />
              (10)
            </div>

            <div className="flex justify-between items-center gap-1">
              <AiOutlineDislike className="text-xl hover:text-[#08c]" />
              (0)
            </div>
          </div>
        </div>

        <hr />
      </div>
      <div className="text-center">
        <button>See all</button>
      </div>
    </div>
  );
};

export default ProductReviews;
