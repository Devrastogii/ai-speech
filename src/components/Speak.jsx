import React from "react";

const Speak = (props) => {
  return (
    <>
      <section className="mt-10">
        <div className="font-semibold text-xl text-center">Speak PDF</div>

        <div className="px-40 mt-2">
          <i class="bi bi-volume-up-fill text-2xl"></i>{" "}
            <span className="text-white opacity-60">{props?.data != null && props?.data}</span>
        </div>
      </section>
    </>
  );
};

export default Speak;
