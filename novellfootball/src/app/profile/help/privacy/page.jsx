import BackButton from "@/app/components/BackButton";
import React from "react";

function privacy() {
  return (
    <main>
      <div className="p-1 " ><BackButton pageName="Privacy" /></div>
      <div className="w-[90%] mr-auto ml-auto pb-[10rem] overflow-y-scroll ">
        <div className="my-3 ">
          <h1 className="font-bold mb-3 " >privacy Policy (Customers)</h1>
          <p>
            This Privacy Policy describes the way in which Norvell Football deal
            with the information and data you provide to us to enable us to
            manage your relationship with Norvell Football. 
          </p>

          <p className="mt-3 ">
            We will process any personal information provided to us or otherwise
            held by us relating to you in the manner set out in this Privacy
            Policy. Information may be provided via the Norvell Football website
            (the "Website"), telephone calls or any other means. 
          </p>

          <p className="mt-3">
            By accepting the privacy policy you agree that you understand and
            accept the use of your personal information as set out in this
            Privacy Policy. If you do not agree with the terms of this Privacy
            Policy please do not use the Website or otherwise provide us with
            your personal information.  
          </p>
        </div>

        <div className="mb-3 ">
          <h1 className="font-bold ">Who we are</h1>
          <p>
            References in this Privacy Policy to “Norvell Football”, “we”, “us”
            or “our” relate to Hillside (Norvell Football) Plc, a company
            incorporated in Colorado, with registrations number 20231352910 and
            having its registered office at 148 Remington St Ste 100Fort Collins
            CO 80524US (''Company'') (trading as ''Norvell Football'').We
            control the ways your Personal Data is collected and the purposes
            for which your Personal Data is used by Norvell Football, acting as
            the “data controller” for the purposes of applicable European data
            protection legislation. 
          </p>
        </div>

        <div className="mb-3 ">
          <h1 className="font-bold ">Contacting us  </h1>
          <p>
            If you have any concerns, or would like more detail about how we
            process your personal data, you can contact us on Telegram. 
          </p>
        </div>

        <div className="mb-3 ">
          <h1 className="font-bold ">Protecting Your Personal Data </h1>
          <div className="border-2 border-black p-3 ">
            <p>
               Your Personal Data isn’t just protected by the quality,
              commitment and high standards of Norvell Football, it’s also
              protected by law. The law means that we can only process your
              Personal Data when there is a genuine reason to do so, and those
              reasons must be one of the following
            </p>
            <div>
              • To fulfil any contract that we have with you  <br />
              • We have a legal obligation  <br />
              • Where you have consented to the processing  <br />
              • When it is in our legitimate interest <br />
              • When it is in the public interest <br />
              • When it is in your vital interests <br />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default privacy;
