/**
 * Footer Component
 * Site footer with contact information and navigation links
 */

export const footerHTML = `
    <div class="relative overflow-hidden bg-main font-sans section-padding">
      <!-- Ghost Typography (Dynamic Theme Opacity) -->
      <div class="absolute bottom-[-5%] left-[-2%] z-0 select-none pointer-events-none opacity-[0.06] dark:opacity-[0.02]">
        <h2 class="text-[12rem] md:text-[18rem] font-serif italic tracking-tighter leading-none">tanvir</h2>
      </div>

      <div class="container relative z-10 mx-auto max-w-7xl">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">

          <!-- Brand & Mission (Compact) -->
          <div class="lg:col-span-6 space-y-6">
            <div class="space-y-4">
              <a href="index.html" class="text-5xl font-serif italic tracking-tighter text-primary hover:text-accent-indigo transition-all duration-500">tanvir<span class="text-accent-indigo">.</span></a>
              <p class="text-lg md:text-xl font-light text-primary/90 leading-snug tracking-tight max-w-md">
                Architecting the <span class="italic text-accent-indigo font-serif">invisible systems</span> powering the web.
              </p>
            </div>

            <div class="flex flex-col space-y-4">
               <div class="flex items-center gap-3">
                 <span class="w-1.5 h-1.5 rounded-full bg-accent-emerald"></span>
                 <span class="text-[9px] font-bold uppercase tracking-[0.4em] text-secondary/60">Currently in Dhaka, BD</span>
               </div>
               <a href="mailto:mailtanvirrahman@gmail.com" class="text-[9px] font-black uppercase tracking-[0.4em] text-accent-indigo hover:text-primary transition-colors py-1 group w-fit">
                 Get in Touch <span class="inline-block transition-transform group-hover:translate-x-1">→</span>
               </a>
            </div>
          </div>

          <!-- Quick Access Grid -->
          <div class="lg:col-span-6 grid grid-cols-3 gap-6 lg:gap-8">
            <div class="space-y-4">
              <h4 class="text-[9px] font-bold uppercase tracking-[0.5em] text-secondary/30">Explore</h4>
              <ul class="flex flex-col gap-3 text-[11px] font-bold uppercase tracking-[0.15em] text-secondary/80">
                <li><a href="about.html" class="hover:text-primary transition-all">About</a></li>
                <li><a href="projects.html" class="hover:text-primary transition-all">Projects</a></li>
                <li><a href="notes.html" class="hover:text-primary transition-all">Writing</a></li>
              </ul>
            </div>

            <div class="space-y-4">
              <h4 class="text-[9px] font-bold uppercase tracking-[0.5em] text-secondary/30">Social</h4>
              <ul class="flex flex-col gap-3 text-[11px] font-bold uppercase tracking-[0.15em] text-secondary/80">
                <li>
                  <a href="https://github.com/taanvirrahman" class="group flex items-center gap-2 hover:text-primary transition-all">
                    <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
                    <span>GitHub</span>
                  </a>
                </li>
                <li>
                  <a href="https://x.com/tanvir_tweet" class="group flex items-center gap-2 hover:text-primary transition-all">
                    <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z"/><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"/></svg>
                    <span>Twitter</span>
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/in/muhammud-tanvir-rahman/" class="group flex items-center gap-2 hover:text-primary transition-all">
                    <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                    <span>LinkedIn</span>
                  </a>
                </li>
              </ul>
            </div>

            <div class="space-y-4">
              <h4 class="text-[9px] font-bold uppercase tracking-[0.5em] text-secondary/30">Library</h4>
              <ul class="flex flex-col gap-3 text-[11px] font-bold uppercase tracking-[0.15em] text-secondary/80">
                <li><a href="resources.html" class="hover:text-primary transition-all">Resources</a></li>
              </ul>
            </div>
          </div>

        </div>

        <!-- Meta Strip -->
         <div class="mt-16 pt-8 border-t border-main/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <div class="flex gap-6">
              <span class="text-[9px] font-bold uppercase tracking-[0.4em] text-secondary/20">© ${new Date().getFullYear()} TANVIR</span>
            </div>
         </div>
      </div>
    </div>
  `;
