class App {
  activeTabKey = 'active-tab';
  selectedKneeboardKey = 'selected-kneeboard-tab';

  constructor() {
    this.bullseyeMap = new BullseyeMap();

    const kneeboardM2000C_OCA = new KneeboardM2000C_OCA();
    const kneeboardGCI = new KneeboardGCI();
    const kneeboardMIR_F1_FRM = new KneeboardMIR_F1_FRM();

    this.kneeboardTemplates = {};
    this.kneeboardTemplates[kneeboardM2000C_OCA.kneeboardId] = kneeboardM2000C_OCA;
    this.kneeboardTemplates[kneeboardGCI.kneeboardId] = kneeboardGCI;
    this.kneeboardTemplates[kneeboardMIR_F1_FRM.kneeboardId] = kneeboardMIR_F1_FRM;

    this.init()
  }

  init() {
    this.runTabs();

    this.kneeboardSelect();
  }

  runTabs() {
    const activeTab = localStorage.getItem(this.activeTabKey);
    if (activeTab) {
      $(`.tab-button[attr-tab="${activeTab}"], .tab[attr-tab="${activeTab}"]`).addClass('selected');
    } else {
      $(`.tab-button[attr-tab="bullseye-map-tab"], .tab[attr-tab="bullseye-map-tab"]`).addClass('selected');
    }

    $('.tab-button').click((event) => {
      $('.tab-button, .tab').removeClass('selected');

      const tabName = $(event.target).attr('attr-tab');
      $(`.tab-button[attr-tab="${tabName}"], .tab[attr-tab="${tabName}"]`).addClass('selected');

      localStorage.setItem(this.activeTabKey, tabName);
    });
  }

  kneeboardSelect() {
    const kneeboardSelect = $('.kneeboard-select');
    for (const [key, kneeboard] of Object.entries(this.kneeboardTemplates)) {
      $(kneeboardSelect).append(
        $('<option>', {
          value: kneeboard.kneeboardId,
          text: kneeboard.kneeboardName
        })
      );
    }

    const selectedKneeboard = localStorage.getItem(this.selectedKneeboardKey);
    if (selectedKneeboard) {
      this.kneeboardTemplates[selectedKneeboard].init();

      $(kneeboardSelect).val(selectedKneeboard);
    } else {
      const defaultKneeboard = Object.keys(this.kneeboardTemplates)[0]

      this.kneeboardTemplates[defaultKneeboard].init();

      $(kneeboardSelect).val(defaultKneeboard);

      localStorage.setItem(this.selectedKneeboardKey, defaultKneeboard);
    }

    $(kneeboardSelect).on('change', (event) => {
      const newKneeboard = $(event.target).val();

      this.kneeboardTemplates[newKneeboard].init();

      localStorage.setItem(this.selectedKneeboardKey, newKneeboard);
    });
  }
}

$(document).ready(function () {
  const app = new App();
});