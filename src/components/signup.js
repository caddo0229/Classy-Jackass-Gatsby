import React from "react";
import addToMailchimp from "gatsby-plugin-mailchimp";
import { useForm } from "react-hook-form";

const Signup = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    let { fname, lname, email, message } = data;
    let listFields = {
      FNAME: fname,
      LNAME: lname,
      EMAIL: email,
      MESSAGE: message,
    };
    const result = await addToMailchimp(email, listFields);
    console.log(result);
    if (result && result.result === "success") {
      alert(result.msg);
      reset();
    } else {
      alert(result.msg);
    }
  };

  return (
    <div id="signup">
      <div className="container mx-auto">
        <div className="flex lg:flex-row flex-col gap-10 lg:py-32 py-12">
          <div className="basis-1/2">
            <p className="font-bold text-[72px] lg:text-left text-center leading-[72px] text-white">
              JOIN THE MISSION
            </p>
          </div>
          <div className="basis-1/2">
            <form className="" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <div className="flex lg:flex-row flex-col gap-8">
                  <div className="basis-1/2">
                    <input
                      className="rounded-[18px] w-full py-[18px] px-[24px] leading-[32px] border-2 text-[24px] placeholder-white
                       border-white bg-transparent text-white"
                      type="text"
                      {...register("fname", { required: true })}
                      placeholder="first name"
                    />
                    {errors.fname && (
                      <p className="text-[red] pl-[1rem]">
                        First Name is required.
                      </p>
                    )}
                  </div>
                  <div className="basis-1/2">
                    <input
                      className="rounded-[18px] w-full py-[18px] px-[24px] leading-[32px] border-2 text-[24px] 
                      placeholder-white border-white bg-transparent text-white"
                      type="text"
                      placeholder="last name"
                      {...register("lname", { required: true })}
                    />
                    {errors.lname && (
                      <p className="text-[red]  pl-[1rem]">
                        Last Name is required.
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="py-[40px]">
                <input
                  className="rounded-[18px] w-full py-[18px] px-[24px] leading-[32px] border-2 text-[24px] placeholder-white
                       border-white bg-transparent text-white"
                  type="email"
                  placeholder="email"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <p className="text-[red] pl-[1rem]">Email is required.</p>
                )}
              </div>
              <div className="pb-[40px]">
                <textarea
                  className="rounded-[18px] w-full py-[18px] px-[24px] leading-[32px] border-2 text-[24px] placeholder-white
                       border-white bg-transparent text-white"
                       rows={5}
                  placeholder="Message"
                  {...register("message")}
                ></textarea>
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-white rounded-[18px] hover:bg-[#cbd5e1] text-[24px] leading-[32px] font-normal text-black py-[18px] px-[24px]"
                  type="submit"
                >
                  submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Signup;
