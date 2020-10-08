const LiveStreamStyle = document.createElement("style");
LiveStreamStyle.textContent = `
        /* Main Wrapper */
        :host { width: 100%; margin: 0 auto; }
        :host * { box-sizing: unset !important; }

        /* Element Overrides */
        :host * { transition: .3s ease; color: #fff; font-weight: unset; }
        :host h2 { font-size: 1.9em ; }

        /* Section Wrappers */
        :host .gc_ls_section { width: 100%; margin: 0; background-color: #003469; padding: 2.8em 0; }
        :host .gc_ls_section:nth-child(odd) { background-color: #0051a4; }
        :host .gc_ls_container { width: 90%; margin: 0 auto;}


        /* Scroll to Top Anchor */
        :host #main_jump { top: -100px; position: absolute; }

        /* Scroll to Top Button */
        :host #jump_to { height: 40px; width: 40px; position: fixed; bottom: 20px; right: 20px; background: #252525; z-index: 1000; color: #fff; display: none; justify-content: center; align-items: center; padding: 0px; transition: .3s ease; cursor: pointer; }
        :host #jump_to:hover { background-color: #ff6633; }
        :host #jump_to.header_scroll { display: flex; }
        :host #jump_to a { width: 100%; height: 100%; color: #fff; font-size: 30px; text-align: center; text-decoration: none!important; }


        /* Title Section */
        :host .gc_ls_title-sup { margin: 0; color: #ff6633 !important; }
        :host .gc_ls_title { font-size: 2.8em !important; margin-top: 0; }


        /* Date Selector Section */
        :host .gc_ls_dates { margin-top: 1em; }
        :host .gc_ls_dates a { text-decoration: none !important; }
        :host .gc_ls_dates ul { display: flex; flex-flow: row wrap; justify-content: space-between; padding: 0; }
        :host .gc_ls_dates ul > a > li { height: 6.25em; width: 6.25em; list-style: none; border: 1px solid #fff;  padding: 1em; text-align: center; }
        :host .gc_ls_dates  ul > a:hover > li, .gc_ls_dates ul > a > li.gc_ls_current-date { background-color: #0066cc!important; border-color: #0066cc!important; }
        :host .gc_ls_dates ul > a > li.gc_ls_past-date { background-color: rgba(0,0,0,.3); }
        :host .gc_ls_dates ul > a > li > h2 { font-size: 2.8em; margin: 0; color: #ff6633; }
        :host .gc_ls_dates ul > a > li > h3 { font-size: 1.1em; transition: none; }


        /* Video Player Section */
        :host .gc_ls_video_container { padding: 1em 2em; max-width: 80%; }
        :host .gc_ls_video_container > h2 { font-weight: bold; }
        :host .gc_ls_video_container iframe { width: 85vw; height: 50vw; max-width: 100%; display: block; margin: 0 auto; }


        /* Sessions List Section */
        :host div[id^="day_"] { height: 0; position: absolute; margin-top: -6.25em; position: absolute; }
        :host .gc_ls_schedule h1 { font-size: 1.5em; font-weight: bold; }
        :host .gc_ls_schedule h2 { font-size: 2em; font-weight: bold; color: #ff6633; margin-bottom: 0; }
        :host .gc_ls_schedule h3 { font-size: 1.5em; margin-top: 0.3em; }
        :host .gc_ls_schedule_rows { padding: 0.01em; }
        :host .gc_ls_schedule_rows ul { display: flex; justify-content: center; flex-flow: column; align-items: center; text-align: left; border-top: 1px solid #fff; padding: 0; margin: 1em 0; width: 100%; height: 100%; }
        :host .gc_ls_schedule_rows li:first-child { margin-top: 1em; }
        :host .gc_ls_schedule_rows li { padding: 0 1em 0 0; width: 100%; display: flex; justify-content: space-between; }
        :host .gc_ls_schedule_rows li p { color: #FFF !important; width: 100%; max-width: unset !important; line-height: 1.25em !important; cursor: pointer; margin-left: 0; margin-right: 0;}
        :host .gc_ls_schedule_rows li p:hover, .gc_ls_schedule_rows .gc_ls_session_links a:hover path { color: #ff6633 !important; }

        :host .gc_ls_session_time { width: 10em; margin-right: 2em; }
        :host .gc_ls_session_time span { text-align: right; color: #ccc; width: 100%; display: inline-block; margin-right: 0.6em; padding-right: 0.6em; border-right: 2px solid #ff6633; }
        :host .gc_ls_session_title { width: calc( 100% - 17em); padding-right: 1em; }
        :host .gc_ls_session_links { width: 4em; display: flex; flex-flow: row; justify-content: space-between; align-items: center; }
        :host .gc_ls_session_links a { font-size: 1.5em; }


        @media (min-width: 1201px) {
            :host .gc_ls_container { width: 95%; max-width: 1200px; }
            :host .gc_ls_dates ul > a > li { width: 6.25em; margin: 0; }
            :host .gc_ls_video_container iframe { height: 35vw; }
        }
        @media (max-width: 1200px) and (min-width: 993px) {
            :host .gc_ls_container { width: 95%; max-width: 960px; }
            :host .gc_ls_dates ul > a > li { width: 5em; }
            :host .gc_ls_session_time { width: 8em; }
            :host .gc_ls_session_title { width: calc( 100% - 15em); }
        }
        @media (max-width: 992px) {
            :host .gc_ls_dates ul { justify-content: center !important; }
            :host .gc_ls_dates ul > a > li { margin: 10px; }
            :host .gc_ls_session_time { width: 8em; }
            :host .gc_ls_session_title { width: calc( 100% - 15em); }
        }
        @media (max-width: 992px) and (min-width: 768px) {
        }
        @media (max-width: 767px) and (min-width: 521px) {
        }
        @media (max-width: 520px) {
            :host { font-size: 12px; }
            :host .gc_ls_session_time { width: 7em; }
            :host .gc_ls_session_title { width: calc( 100% - 14em); }
        }
`;

const LiveStreamTemplate = document.createElement("template");
LiveStreamTemplate.innerHTML = `
  <div class="gc_ls_section">
    <div class="gc_ls_container">
    <h2 class="gc_ls_title-sup">Global Conference 2020</h2>
    <h2 class="gc_ls_title">Livestream Schedule</h2>
    <div class="gc_ls_dates"><ul></ul></div>
    </div>
  </div>
  <div class="gc_ls_section">
    <div class="gc_ls_container gc_ls_video_container">
      <h2>Current Livestream</h2>
      <iframe
          src="https://player.vimeo.com/video/355210534"
          frameborder="0"
          allow="autoplay; fullscreen"
          allowfullscreen>
      </iframe>
    </div>
    <div class="gc_ls_schedule_container"></div>
    <slot id="JSONDATA"></slot>
  </div>`;

class LiveStreamPrototypeDynamic extends HTMLElement {
  sessionData = {};

  addSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute("href")).scrollIntoView({
          behavior: "smooth",
        });
      });
    });
  }

  mapSingleSession(session) {
    return `
      <li>
        <div class="gc_ls_session_time">
            <p><span>${session.time}</span></p>
        </div>
        <div class="gc_ls_session_title">
            <p>${session.title}</p>
        </div>
        <div class="gc_ls_session_links">
            <a class="gc_ls_watch_video" href="${session.url}"><i class="far fa-play-circle"></i></a>
        </div>
      </li>
      `;
  }

  mapSingleDay(singleDay, iDay) {
    let dateDiff =
      (Date.parse(singleDay.date_string) - Date.parse(Date())) /
      (1000 * 60 * 60);
    let lblSection =
      dateDiff > 0
        ? "Upcoming Sessions"
        : dateDiff > -24
        ? "Current Sessions"
        : "Past Sessions";

    let dateLinkClass =
      lblSection === "Past Sessions"
        ? "gc_ls_past-date"
        : lblSection === "Current Sessions"
        ? "gc_ls_current-date"
        : "";
    let dateLinkDateArray = singleDay.date_string.split(", ");
    let dateLinkLetter =
      dateLinkDateArray[0] === "Thursday"
        ? "TH"
        : dateLinkDateArray[0].substring(0, 1);
    var link = document.createElement("a");
    link.href = `#${singleDay.day_anchor}`;
    link.innerHTML = `
      <li class="${dateLinkClass}">
        <h2>${dateLinkLetter}</h2>
        <h3>${dateLinkDateArray[1]}</h3>
      </li>
    `;
    console.debug(
      "what do we have here?",
      this.shadowRoot,
      this.shadowRoot.querySelectorAll(".gc_ls_dates ul")
    );
    this.shadowRoot.querySelector(".gc_ls_dates ul").appendChild(link);
    const sessionMapping = singleDay.data.map(this.mapSingleSession).join("\n");
    return `
      <div class="gc_ls_section">
          <div id="${singleDay.day_anchor}"></div>
          <div class="gc_ls_container gc_ls_schedule">
              <h1>${lblSection}</h1>
              <h2>Day ${iDay + 1}</h2>
              <h3>${singleDay.date_string}</h3>
              <div class="gc_ls_schedule_rows">
                  <ul>${sessionMapping}</ul>
              </div>
          </div>
      </div>
      `;
  }

  connectedCallback() {
    console.debug("Connected Callback!", this);
    this.shadowRoot.querySelector(
      ".gc_ls_schedule_container"
    ).innerHTML = this.sessionData
      .map((singleDay, iDay) => {
        return this.mapSingleDay(singleDay, iDay);
      })
      .join("\n");
    console.debug("Connected Callback2", this);
    window.addEventListener("scroll", function () {
      if (window.scrollY > 1) {
        document.querySelector("#jump_to").classList.add("header_scroll");
      } else {
        document.querySelector("#jump_to").classList.remove("header_scroll");
      }
    });
    this.addSmoothScroll();
  }

  constructor() {
    super();
    this.sessionData = JSON.parse(
      document.getElementById("gc_JSONDATA").textContent
    );
    console.log("constructor", this);
    const shadow = this.attachShadow({ mode: "open" });
    const template = LiveStreamTemplate.content.cloneNode(true);
    shadow.appendChild(LiveStreamStyle);
    shadow.appendChild(template);
    console.debug("constructor:", this);
  }
}

customElements.define("global-conference-schedule", LiveStreamPrototypeDynamic);
