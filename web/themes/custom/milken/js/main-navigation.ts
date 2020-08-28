
interface ReturnedData {
  data: Array<MenuItemDataInterface>,
  jsonapi: object;
  links: object;
  meta: object;
};

interface MenuItemDataInterface {
  type: string;
  id: string;
  drupal_internal__id: number;
  drupal_internal__revision_id: number;
  langcode: string;
  revision_created: string;
  revision_log_message?: string;
  enabled: boolean;
  title: string;
  description?: string,
  menu_name: string;
  link: object;
  external: boolean;
  rediscover: boolean;
  weight: number;
  expanded: boolean
  parent?: string
  changed: string;
  default_langcode: boolean;
  revision_translation_affected: boolean;
  view_mode: string;
  metatag?: object
  bundle: object;
  revision_user: object;
};

var templateObject = [
  document.createElement('template'),
  document.createElement('template'),
  document.createElement('template'),
  document.createElement('template'),
];
templateObject[0].innerHTML = `
      <div class="col col-md-3 col-sm-12" id="menucito-About">
        <h5>About</h5>
        <ul class="menu-content">
          <li>
            <h6><a href="/about">About Us</a></h6>
            <p class="hidden-sm hidden-xs"> Learn about our mission</p>
          </li>
          <li>
            <h6><a href="/leadership">Leadership</a></h6>
            <p class="hidden-sm hidden-xs"> Meet the Milken Institute leadership team</p>
          </li>
          <li>
            <h6><a href="/content/support-milken-institute">Support Milken Institute</a></h6>
            <p class="hidden-sm hidden-xs"> Find out more about sponsorship and engagement opportunities</p>
          </li>
        </ul>
      </div>
  `;

templateObject[1].innerHTML = `
    <div class="col col-md-3 col-sm-12" id="menucito-Centers">
      <h5>Centers and Practice Areas</h5>
      <ul class="menu-content">
          <li>
            <h6><a href="/centers/asia-center">Asia Center</a></h6>
            <p class="hidden-sm hidden-xs"> Extends the reach and impact of the Milken Institute to the Asia-Pacific region</p>
          </li>
           <li>
                  <h6><a href="/centers/center-for-financial-markets">Center for Financial Markets</a></h6>
                  <p class="hidden-sm hidden-xs"> Conducts research and constructs programs designed to facilitate smooth and efficient operation of financial markets</p>
           </li>
           <li>
              <h6><a href="/centers/center-for-the-future-of-aging">Center for the Future of Aging</a></h6>
              <p class="hidden-sm hidden-xs"> Promotes healthy, productive, and purposeful aging</p>
           </li>
           <li>
              <h6><a href="/centers/center-for-public-health">Center for Public Health</a></h6>
               <p class="hidden-sm hidden-xs"> Advocates for sustainable solutions that lead to better health for individuals and communities</p>
              </li>
            <li>
              <h6><a href="/centers/center-for-regional-economics">Center for Regional Economics and California Center</a></h6>
              <p class="hidden-sm hidden-xs"> Analyzes the dynamics that drive job creation and promote industry expansion</p>
            </li>
            <li>
              <h6><a href="/centers/center-for-strategic-philanthropy">Center for Strategic Philanthropy</a></h6>
              <p class="hidden-sm hidden-xs"> Empowers philanthropists to effectively address some of the world's most urgent problems</p>
            </li>
            <li>
              <h6><a href="/centers/fastercures">FasterCures</a></h6>
              <p class="hidden-sm hidden-xs"> Clears roadblocks that prevent medical breakthroughs from reaching patients sooner</p>
            </li>
            <li>
              <h6><a href="/financial-innovations-lab">Financial Innovations Labs</a></h6>
              <p class="hidden-sm hidden-xs"> </p>
            </li>
            <li>
              <h6><a href="/programs/global-market-development">Global Market Development</a></h6>
              <p class="hidden-sm hidden-xs"> </p>
            </li>
            <li>
              <h6><a href="/center-for-advancing-the-american-dream">Milken Center for Advancing the American Dream</a></h6>
              <p class="hidden-sm hidden-xs"> Anyone with a dream should have the opportunity to make it come true—through determination and an economic system that works for all</p>
            </li>
            <li>
              <h6><a href="/research-department">Research Department</a></h6>
              <p class="hidden-sm hidden-xs"> </p>
            </li>
         </ul>
  </div>
`;

templateObject[2].innerHTML = `
  <div class="col col-md-3 col-sm-12" id="menucito-More" >
  <h5>EXPLORE</h5>
    <ul class="menu-content">
      <li>
        <h6><a class="centerlnk1" href="/search?keywords=&f%5B0%5D=content_type%3Avideo&f%5B1%5D=centers%3A">Videos</a></h6>
        <p class="hidden-sm hidden-xs">Watch videos from our past events</p>
      </li>

      <li>
        <h6><a class="centerlnk1" href="/search?keywords=&f%5B0%5D=content_type%3Aarticle&f%5B1%5D=centers%3A">Articles</a></h6>
        <p class="hidden-sm hidden-xs">Read articles from our subject matter experts</p>
      </li>

      <li>
        <h6><a class="centerlnk1" href="/search?keywords=&f%5B0%5D=content_type%3Aprogram_initiative&f%5B1%5D=centers%3A">Programs</a></h6>
        <p class="hidden-sm hidden-xs">Learn about our programs</p>
      </li>

      <li>
        <h6><a class="centerlnk1" href="/search?keywords=&f%5B0%5D=content_type%3Areport&f%5B1%5D=centers%3A">Research & Analysis</a></h6>
        <p class="hidden-sm hidden-xs">Explore content created by our subject matter experts</p>
      </li>

      <li>
        <h6><a class="centerlnk1" href="/search?keywords=&f%5B0%5D=content_type%3Aevent&f%5B1%5D=centers%3A">Events</a></h6>
        <p class="hidden-sm hidden-xs">Learn more about our upcoming events</p>
      </li>

    </ul>
  </div>

  `;


templateObject[3].innerHTML = `
        <div class="col col-md-3 col-sm-12" id="menucito-Last" >
            <ul class="menu-content right-column">
                <li>
                    <h4>
                        <a href="/newsroom">NEWSROOM</a>
                    </h4>
                </li>
                <li>
                    <h4>
                        <a href="https://www.milkeninstitute.org/experts">EXPERTS</a>
                    </h4>
                </li>
                <li>
                    <h4>
                        <a href="/careers">CAREERS</a>
                    </h4>
                </li>
                <li>
                    <h4>
                        <a href="/power-of-ideas">POWER OF IDEAS</a>
                    </h4>
                </li>
                <li>
                    <h4>
                        <a href="http://milkenreview.org">MILKEN INSTITUTE REVIEW</a>
                    </h4>
                </li>
                <li>
                    <h4>
                        <a href="/contact">CONTACT</a>
                    </h4>
                </li>
            </ul>
            <ul class="social-footer" id="social-header-ctc">
                <li style="width: 25px; height: 25px; display: inline-block">
                    <a href="https://www.facebook.com/milkeninstitute/" target="_blank"><svg class="svg-inline--fa fa-facebook-f fa-w-9" aria-hidden="true" data-prefix="fab" data-icon="facebook-f" role="img" xmlns="http://www.w3.org/2000/svg" viewbox="0 0 264 512" data-fa-i2svg="">
                    <path fill="currentColor" d="M76.7 512V283H0v-91h76.7v-71.7C76.7 42.4 124.3 0 193.8 0c33.3 0 61.9 2.5 70.2 3.6V85h-48.2c-37.8 0-45.1 18-45.1 44.3V192H256l-11.7 91h-73.6v229"></path></svg><!-- <span class="fa fa-facebook"> &nbsp;</span> --></a>
                </li>
                <li style="width: 25px; height: 25px; display: inline-block">
                    <a href="https://twitter.com/milkeninstitute?lang=es" target="_blank"><svg class="svg-inline--fa fa-twitter fa-w-16" aria-hidden="true" data-prefix="fab" data-icon="twitter" role="img" xmlns="http://www.w3.org/2000/svg" viewbox="0 0 512 512" data-fa-i2svg="">
                    <path fill="currentColor" d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path></svg><!-- <span class="fa fa-twitter"> &nbsp;</span> --></a>
                </li>
                <li style="width: 25px; height: 25px; display: inline-block">
                    <a href="https://www.linkedin.com/company/milkeninstitute/" target="_blank"><svg class="svg-inline--fa fa-linkedin-in fa-w-14" aria-hidden="true" data-prefix="fab" data-icon="linkedin-in" role="img" xmlns="http://www.w3.org/2000/svg" viewbox="0 0 448 512" data-fa-i2svg="">
                    <path fill="currentColor" d="M100.3 480H7.4V180.9h92.9V480zM53.8 140.1C24.1 140.1 0 115.5 0 85.8 0 56.1 24.1 32 53.8 32c29.7 0 53.8 24.1 53.8 53.8 0 29.7-24.1 54.3-53.8 54.3zM448 480h-92.7V334.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V480h-92.8V180.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V480z"></path></svg><!-- <span class="fa fa-linkedin"> &nbsp;</span> --></a>
                </li>
                <li style="width: 25px; height: 25px; display: inline-block">
                    <a href="https://www.instagram.com/milkeninstitute/" target="_blank"><svg class="svg-inline--fa fa-instagram fa-w-14" aria-hidden="true" data-prefix="fab" data-icon="instagram" role="img" xmlns="http://www.w3.org/2000/svg" viewbox="0 0 448 512" data-fa-i2svg="">
                    <path fill="currentColor" d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path></svg><!-- <span class="fa fa-instagram"> &nbsp;</span> --></a>
                </li>
                <li style="width: 25px; height: 25px; display: inline-block">
                    <a href="https://www.youtube.com/channel/UCIRzxohZ6SbwsPqHFQGMJ7A" target="_blank"><svg class="svg-inline--fa fa-youtube fa-w-18" aria-hidden="true" data-prefix="fab" data-icon="youtube" role="img" xmlns="http://www.w3.org/2000/svg" viewbox="0 0 576 512" data-fa-i2svg="">
                    <path fill="currentColor" d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"></path></svg><!-- <span class="fa fa-youtube"> &nbsp;</span> --></a>
                </li>
            </ul>
            <div class="col-xs-12 newsletter-links only-header-links">
                <form class="webform-submission-form webform-submission-add-form webform-submission-newsletter-form webform-submission-newsletter-add-form webform-submission-newsletter-block_content-7-form webform-submission-newsletter-block_content-7-add-form js-webform-details-toggle webform-details-toggle contextual-region" data-drupal-selector="webform-submission-newsletter-block-content-7-add-form" action="/" method="post" id="webform-submission-newsletter-block-content-7-add-form" accept-charset="UTF-8" data-drupal-form-fields="edit-actions-submit" name="webform-submission-newsletter-block-content-7-add-form">
                    <div class="row">
                        <div class="col-md-9 left">
                            <div class="title-milkenform-newsletter form-item js-form-item form-type-webform-markup js-form-type-webform-markup form-item- js-form-item- form-no-label form-group">
                                Stay up to date on research and events from the Milken Institute
                            </div>
                            <div class="description-milkenform-newsletter form-item js-form-item form-type-webform-markup js-form-type-webform-markup form-item- js-form-item- form-no-label form-group">
                                Our monthly e-newsletter keeps you up to date on everything happening at the Institute including noteworthy events, new blog posts, buzzworthy videos, recent publications, expert insights, and more.
                            </div>
                        </div>
                        <div class="col-md-3 right">
                            <a href="https://www.cvent.com/Pub/eMarketing/Pages/SignUp.aspx?p=5b49cee6-fb01-4e53-bf27-b8aef82941e6&amp;m=" target="_blank" class="webform-button--submit button button--primary js-form-submit form-submit" data-drupal-selector="edit-actions-submit" type="submit" id="edit-actions-submit" name="op" value="Newsletter Sign Up">Join Our Mailing List</a>
                        </div>
                    </div>
                    <div class="clearfix">
                        &nbsp;
                    </div>
                </form>
            </div>
        </div>
  `;
templateObject[3].innerHTML = `
      <div class="text-right" style="z-index: 9999;position:absolute;top:20px;right:20px;">
        <a id="menu-close" href="#" class="fas fa-window-close fa-lg">&nbsp;</a>
      </div>
  `;
const containerStyle = {
  backgroundColor: "#E2E7EA",
  padding: "20px",
  zIndex: "8000",
  position: "absolute",
  top: "0px",
  left: "0px",
};

const menuRevealStyle = {
  zIndex: "9999",
  position: "absolute"

}

customElements.define('milken-main-navigation',

  class extends HTMLElement {

    container: HTMLElement;
    menuReveal: HTMLElement;
    menuClose: HTMLElement;

    hide(evt = null) {
      console.debug("hide", this.container);
      this.container.style.display = "none";
    }

    show() {
      console.debug("show", this.container);
      this.container.style.display = "block";
      this.menuClose = document.getElementById('menu-close');
      this.menuClose.addEventListener("click", this.hide);
    }

    connectedCallback() {
      console.debug("CONNECTED CALLBACK");
      this.hide();
    }

    constructor() {
      super();
      this.show = this.show.bind(this);
      this.hide = this.hide.bind(this);
      const shadowRoot = this.attachShadow({mode: 'open'});
      this.container = document.createElement('div');
      this.container.className = "container-fluid";
      this.container.id = 'menu-root';
      Object.assign(this.container.style, containerStyle);
      var row = document.createElement('div')
      row.className = "row";
      row.style.display = "flex";
      templateObject.map((item) => {
        row.appendChild(item.content);
      });
      this.container.appendChild(row);
      shadowRoot.appendChild(this.container);
      this.menuClose = document.createElement('div');
      this.menuReveal = document.getElementById('menu-reveal');
      this.menuReveal.addEventListener('click', this.show);
      Object.assign(this.menuReveal.style, menuRevealStyle);
    }
  }
);
