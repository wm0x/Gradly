import React from "react";

function Footer() {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/75 shadow-[0_0_25px_10px_rgba(255,255,255,0.3)]"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[400px] bg-gradient-to-b from-white/75 to-transparent opacity-30 -z-10 blur-[120px]"></div>

      <footer className="w-full border-t border-white/30 pt-16 pb-12 text-white relative">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex flex-col items-center md:items-start">
              <div className="flex items-center gap-3 mb-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-10 h-10 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
                  />
                </svg>
                <span className="text-2xl font-bold text-white">
                  Gradly
                </span>
              </div>
              <p className="text-gray-300 max-w-xs text-center md:text-left leading-relaxed">
                The ultimate platform for graduation projects and academic research
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4">
            <h4 className="text-sm font-semibold text-white/80 tracking-wider mb-3 mr-3">EXPLORE</h4>
            <div className="flex flex-col gap-3">
              <a href="#features" className="text-white/70 hover:text-white text-sm transition-colors">
                Features
              </a>
              <a href="#Gradly-ai" className="text-white/70 hover:text-white text-sm transition-colors">
                Gradly Ai
              </a>
              <a href="#why-grads" className="text-white/70 hover:text-white text-sm transition-colors">
                Why Gradly
              </a>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-center gap-5">

            <button className="mt-4 px-8 py-3 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition-all hover:shadow-lg hover:shadow-white/20">
              Join Beta
            </button>
          </div>
        </div>

        <div className="mt-16 pt-8 text-center text-sm text-white/50 border-t border-white/10">
          Gradly © {new Date().getFullYear()} { /* this for get the year from date */} <br/>
          All rights reserved
        </div>
      </footer>
    </div>
  );
}

export default Footer;