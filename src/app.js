class App {
  activeTabKey = 'active-tab';

  constructor() {
    this.bullseyeMap = new BullseyeMap();
    this.kneeboard = new Kneeboard();

    this.init()
  }

  init() {
    this.runTabs();

    customElements.define('import-template', class extends HTMLElement {
      connectedCallback() {
        const path = this.getAttribute('path');
        fetch(path).then(r => r.text()).then(html => {
          this.innerHTML = html;
        });
      }
    });
  }

  runTabs() {
    const activeTab = localStorage.getItem(this.activeTabKey);
    if (activeTab) {
      $(`.tab-button[attr-tab="${activeTab}"], .tab[attr-tab="${activeTab}"]`).addClass('selected');
    }

    $('.tab-button').click((event) => {
      $('.tab-button, .tab').removeClass('selected');

      const tabName = $(event.target).attr('attr-tab');
      $(`.tab-button[attr-tab="${tabName}"], .tab[attr-tab="${tabName}"]`).addClass('selected');

      localStorage.setItem(this.activeTabKey, tabName);
    });
  }

}

$(document).ready(function () {
  const app = new App();
});