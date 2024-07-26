"use client";
import { Error_model_hook, Success_model } from "@/utils/modalHook";
import emailjs from "@emailjs/browser";
import { useState } from "react";

export default function ContactUs() {

  const [user, setUser] = useState({
    userFastName: "",
    email: "",
    message: "",
    userLastName: "",
  });

  const sendEmail = async (e: any) => {
    e.preventDefault();

    const templateParams = {
      from_name: (user.userFastName + user.userLastName) as string,
      from_email: user.email as string,
      message: user.message as string,
    };

    emailjs
      .send(
        "service_1n66zp3",
        "template_fcbqjpe",
        templateParams,
        "SB0unnfYXIhE2N7rr"
      )
      .then(
        (result) => {
          // console.log(result.text);
          Success_model("Successfully Send email");
        },
        (error) => {
          // console.log(error.text);
          Error_model_hook("Send email failed");
        }
      );
  };

  
  return (
    <section className="bg-white py-24">
      <div className="w-[92%] md:w-[95%] lg:w-[90%] xl:w-[70%] mx-auto px-6 py-12 shadow-xl">
        <div className="flex flex-col items-center">
          <h1 className="mt-2 text-2xl font-semibold text-gray-800 md:text-3xl">
            Chat to our friendly team
          </h1>

          <p className="mt-3 text-gray-500">
            We’d love to hear from you. Please fill out this form or shoot us an
            email.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 mt-10 lg:grid-cols-2">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 p-10">
            <div className="flex flex-col">
              <div className="flex items-center">
                <span className="inline-block p-3 text-gray-500 rounded-full bg-gray-100/80">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      stroke-linecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                    />
                  </svg>
                </span>

                <h2 className="text-lg ml-2 text-gray-800 inline-block">
                  Email
                </h2>
              </div>
              <p className="mt-4 text-sm text-gray-500">
                Our friendly team is here to help.
              </p>
              <p className="mt-2 text-sm text-gray-500">
                support@ecom.com
              </p>
            </div>

            <div>
              <div className="flex items-center">
                <span className="inline-block p-3 text-gray-500 rounded-full bg-gray-100/80">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      stroke-linecap="round"
                      strokeLinejoin="round"
                      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      stroke-linecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                    />
                  </svg>
                </span>

                <h2 className="text-lg ml-2 font-medium text-gray-800 inline-block">
                  Live chat
                </h2>
              </div>
              <p className="mt-4 text-sm text-gray-500">
                Our friendly team is here to help.
              </p>
              <p className="mt-2 text-sm text-gray-500">Start new chat</p>
            </div>

            <div>
              <div className="flex items-center">
                <span className="inline-block p-3 text-gray-500 rounded-full bg-gray-100/80">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      stroke-linecap="round"
                      strokeLinejoin="round"
                      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      stroke-linecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                    />
                  </svg>
                </span>

                <h2 className="text-lg ml-2 font-medium text-gray-800 inline-block">
                  Office
                </h2>
              </div>
              <p className="mt-4 text-sm text-gray-500">Noakhali</p>
              <p className="mt-2 text-sm text-gray-500">
                2501 Charbata, Noakhali
              </p>
            </div>

            <div>
              <div className="flex items-center">
                <span className="inline-block p-3 text-gray-500 rounded-full bg-gray-100/80">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      stroke-linecap="round"
                      strokeLinejoin="round"
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                    />
                  </svg>
                </span>

                <h2 className="text-lg ml-2 font-medium text-gray-800 inline-block">
                  Phone
                </h2>
              </div>
              <p className="mt-4 text-sm text-gray-500">
                Mon-Fri from 8am to 5pm.
              </p>
              <p className="mt-2 text-sm text-gray-500">+8801875114417</p>
            </div>
          </div>

          <div className="p-4 py-6 rounded-lg bg-gray-50 md:p-8">
            <form onSubmit={sendEmail}>
              <div className="-mx-2 md:items-center md:flex">
                <div className="flex-1 px-2">
                  <label className="block mb-2 text-sm text-gray-600">
                    First Name
                  </label>
                  <input
                    onChange={(e) =>
                      setUser({ ...user, userFastName: e.target.value })
                    }
                    type="text"
                    placeholder="John"
                    className="block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-blue-400 focus:ring-blue-400 focus:outline-none"
                  />
                </div>

                <div className="flex-1 px-2 mt-4 md:mt-0">
                  <label className="block mb-2 text-sm text-gray-600">
                    Last Name
                  </label>
                  <input
                    type="text"
                    onChange={(e) =>
                      setUser({ ...user, userLastName: e.target.value })
                    }
                    placeholder="Doe"
                    className="block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-blue-400 focus:ring-blue-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block mb-2 text-sm text-gray-600">
                  Email address
                </label>
                <input
                  type="email"
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  placeholder="johndoe@example.com"
                  className="block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-blue-400 focus:ring-blue-400 focus:outline-none"
                />
              </div>

              <div className="w-full mt-4">
                <label className="block mb-2 text-sm text-gray-600">
                  Message
                </label>
                <textarea
                  className="block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-blue-400 focus:ring-blue-400 focus:outline-none"
                  rows={3}
                  placeholder="Message"
                  onChange={(e) =>
                    setUser({ ...user, message: e.target.value })
                  }
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 mt-4 text-sm font-medium tracking-wide text-white uppercase transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
              >
                Send message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}