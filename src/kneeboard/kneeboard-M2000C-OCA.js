class KneeboardM2000C_OCA extends Kneeboard {
  constructor() {
    super();
    this.kneeboardTemplate = M2000C_OCA;
    this.kneeboardName = this.kneeboardTemplate.name;
    this.kneeboardId = this.kneeboardTemplate.id;
  }

  init() {
    super.init();

    this.runContrails();
  }

  runContrails() {
    const slTempField = $('.kneeboard-fields-container').find('#sl-temp');
    const contrailsField = $('.kneeboard-fields-container').find('#contrails-alt');

    $(slTempField).on('change', (event) => {
      const slTempVal = $(event.target).val();

      const match = slTempVal.match(/(-?\d+)\s?(°?[CF])?/i);
      if (match) {
        let slTemp = match[1];
        const unit = (match[2] || 'C').replace('°', '').toUpperCase();

        if (unit == 'F') {
          slTemp = this.utils.fahrenheitToCelsius(slTemp);
        }

        const contrailRange = this.utils.getContrailsRange(slTemp);

        if (contrailRange) {
          $(contrailsField).val(`${Math.round(contrailRange[0] / 1000) * 10} - ${Math.round(contrailRange[1] / 1000) * 10}`)
        } else {
          $(contrailsField).val('N/A');
        }

        this.updateKneeboardData();
      }
    });
  }

  async showImportGroupFromMizModal() {
    const mizImportGroupModal = $('.miz-import-group-modal');
    const mizData = await this.utils.importMiz('.miz');

    if (mizData) {
      $(mizImportGroupModal).find('.modal-loading-container').removeClass('hide');
      $(mizImportGroupModal).find('.modal-inner-content').addClass('hide');
      $(mizImportGroupModal).find('.miz-import-group').before('<div class="field"><label>Start at 11</label><input type="checkbox" class="start-at-11" /></div>');
      $(mizImportGroupModal).addClass('show');

      $(mizImportGroupModal).off('click').on('click', (event) => {
        if (!$(event.target).closest('.modal-content').length || $(event.target).hasClass('close-button')) {
          $(mizImportGroupModal).removeClass('show');
          $(mizImportGroupModal).find('.start-at-11').parent('.field').remove();
        }
      });

      const missionData = this.utils.parseLuaMiz(mizData);

      const theatre = missionData.theatre;
      const theatreOrigin = mapsOrigin[theatre];
      const flights = [];

      for (const keyCountry in missionData.coalition.blue.country) {
        if (Object.hasOwn(missionData.coalition.blue.country, keyCountry)) {
          const country = missionData.coalition.blue.country[keyCountry];

          for (const keyGroup in country.plane.group) {
            if (Object.hasOwn(country.plane.group, keyGroup)) {
              flights.push(country.plane.group[keyGroup]);
            }
          }
        }
      }

      $(mizImportGroupModal).find('.modal-loading-container').addClass('hide');
      $(mizImportGroupModal).find('.modal-inner-content').removeClass('hide');

      $(mizImportGroupModal).find('.selected-group option').remove();

      if (flights.length > 0) {
        for (const keyFlight in flights) {
          if (Object.hasOwn(flights, keyFlight)) {
            const flight = flights[keyFlight];

            $(mizImportGroupModal).find('.selected-group').append(
              `<option value="${flight.groupId}">${flight.name}</option>`
            )
          }
        }
      }

      $(mizImportGroupModal).find('.miz-import-group').off('click').on('click', () => {
        let selectedFlight = {};
        if (flights.length > 0) {
          for (const keyFlight in flights) {
            if (Object.hasOwn(flights, keyFlight)) {
              const flight = flights[keyFlight];

              if (flight.groupId == parseInt($(mizImportGroupModal).find('.selected-group').val())) {
                selectedFlight = flight;
                break;
              }
            }
          }
        }

        this.importGroupData(selectedFlight, theatreOrigin, $(mizImportGroupModal).find('.start-at-11').is(':checked'));

        $(mizImportGroupModal).removeClass('show');
        $(mizImportGroupModal).find('.start-at-11').parent('.field').remove();
      });
    }
  }

  importGroupData(selectedFlight, theatreOrigin, startAt11 = false) {
    const navPointsIds = [];
    for (let i = startAt11 ? 11 : 1; i < 21; i++) {
      navPointsIds.push(`nav-point-${i}-latitude`);
      navPointsIds.push(`nav-point-${i}-longitude`);
      navPointsIds.push(`nav-point-${i}-name`);
    }

    this.kneeboardData['M2000C-OCA-page-1'] = this.kneeboardData['M2000C-OCA-page-1'].filter((kneeboardData) => !navPointsIds.includes(kneeboardData.id));
    this.kneeboardData['M2000C-OCA-page-2'] = this.kneeboardData['M2000C-OCA-page-2'].filter((kneeboardData) => !navPointsIds.includes(kneeboardData.id));

    let pointNumber = startAt11 ? 11 : 1;
    for (const keyPoint in selectedFlight.route.points) {
      if (keyPoint > 1 && Object.hasOwn(selectedFlight.route.points, keyPoint) && pointNumber < 21) {
        const point = selectedFlight.route.points[keyPoint];
        if (point.name != '#BAD' && point.name != '#CONVERT_TO_BAD') {
          const pointCoordinates = this.utils.dcsToGeo(theatreOrigin[0], theatreOrigin[1], point.x, point.y);

          this.kneeboardData['M2000C-OCA-page-1'].push({
            id: `nav-point-${pointNumber}-latitude`,
            value: this.utils.toDegMin(pointCoordinates[0], true),
          });
          this.kneeboardData['M2000C-OCA-page-1'].push({
            id: `nav-point-${pointNumber}-longitude`,
            value: this.utils.toDegMin(pointCoordinates[1], false),
          });
          this.kneeboardData['M2000C-OCA-page-1'].push({
            id: `nav-point-${pointNumber}-name`,
            value: point.name,
          });

          this.kneeboardData['M2000C-OCA-page-2'].push({
            id: `nav-point-${pointNumber}-name`,
            value: point.name,
          });

          pointNumber++;
        }
      }
    }

    this.saveData();
    this.displayKneeboard();
  }
}