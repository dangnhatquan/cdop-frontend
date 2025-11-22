"use client";

export default function DemoPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="relative w-[375px] h-[812px] rounded-[60px] border-[14px] border-black overflow-hidden">
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-36 h-6 bg-black rounded-b-2xl z-10"></div>
        <div className="w-full h-full bg-white">
          <iframe
            src="https://main.d1mfatxtg2783n.amplifyapp.com"
            className="w-full h-full"
            title="Demo App"
            style={{ border: "none" }}
          ></iframe>
        </div>
      </div>
    </div>
  );
}
