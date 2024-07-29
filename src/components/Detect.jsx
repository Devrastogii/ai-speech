import React, { useEffect } from "react";

const Detect = (props) => {

  useEffect(() => {
    console.log(props.data.emotions);
  },[])

  return (
    <>
      <section>
        <div className="flex justify-center my-20 gap-x-10">
          <div className="flex flex-col">
            <div className="font-semibold text-xl text-center">
                DETECTED EMOTIONS
              </div>
              <div className="border-4 w-[12rem] mt-3 rounded-lg border-[#5F7D96] p-4">
              {props?.data?.emotions != null && props?.data?.emotions.map((v, i) => {
                return (
                  <>
                    <div className="capitalize">{v?.emotion}</div>
                  </>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col">
            <div className="font-semibold text-xl text-center">
              DETECTED PEOPLE
            </div>
            <div className="border-4 w-[12rem] mt-3 rounded-lg border-[#5F7D96] p-4">
              {props?.data?.persons != null && props?.data?.persons.map((v, i) => {
                return (
                  <>
                    <div className="capitalize">{v}</div>
                  </>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col">
            <div className="font-semibold text-xl text-center">
              DETECTED PRONOUNS
            </div>
            <div className="border-4 w-[12rem] mt-3 rounded-lg border-[#5F7D96] p-4">
              {props?.data?.pronouns != null && props?.data?.pronouns.map((v, i) => {
                return (
                  <>
                    <div className="capitalize">{v}</div>
                  </>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col">
            <div className="font-semibold text-xl text-center">
              DETECTED PLACES
            </div>
            <div className="border-4 w-[12rem] mt-3 rounded-lg border-[#5F7D96] p-4">
              {props?.data?.places != null && props?.data?.places.map((v, i) => {
                return (
                  <>
                    <div>{v}</div>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Detect;
