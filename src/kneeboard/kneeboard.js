class Kneeboard {
  constructor() {
    this.kneeboardDrawUtils = new KneeboardDrawUtils();
    this.utils = new Utils();

    this.kneeboardDataKey = 'kneeboard-data';
    this.kneeboardPageKey = 'kneeboard-page';

    this.kneeboardTemplate = M2000C;

    this.currentPageId = localStorage.getItem(this.kneeboardPageKey);

    if (this.currentPageId) {
      this.currentPage = this.kneeboardTemplate.findIndex((templatePage) => templatePage.id == this.currentPageId)
    } else {
      this.currentPage = 0;
      this.currentPageId = this.kneeboardTemplate[0].id
    }

    console.log(this.currentPage, this.currentPageId);

    this.kneeboardData = {};

    if (this.currentPage == 0) {
      $('.kneeboard-container').find('.previous-arrow').addClass('hide');
    }
    if (this.currentPage == this.kneeboardTemplate.length - 1) {
      $('.kneeboard-container').find('.next-arrow').addClass('hide');
    }

    this.drawKneeboard();

    // Switch to previous kneeboard page.
    $('.kneeboard-container').find('.previous-arrow').on('click', (event) => {
      if (this.currentPage > 0) {
        this.currentPage--;
        this.currentPageId = this.kneeboardTemplate[this.currentPage].id;
        this.drawKneeboard();

        if (this.currentPage == 0) {
          $(event.target).addClass('hide');
        }

        if (this.currentPage < this.kneeboardTemplate.length) {
          $('.kneeboard-container').find('.next-arrow').removeClass('hide');
        }
      }
    });

    // Switch to next kneeboard page.
    $('.kneeboard-container').find('.next-arrow').on('click', (event) => {
      if (this.currentPage < this.kneeboardTemplate.length) {
        this.currentPage++;
        this.currentPageId = this.kneeboardTemplate[this.currentPage].id;
        this.drawKneeboard();

        if (this.currentPage == this.kneeboardTemplate.length - 1) {
          $(event.target).addClass('hide');
        }

        if (this.currentPage > 0) {
          $('.kneeboard-container').find('.previous-arrow').removeClass('hide');
        }
      }
    });

    // Import data from JSON file
    $('.import-kneeboard-button').on('click', async () => {
      const kneeboardData = await this.utils.importData('.json');

      if (kneeboardData) {
        localStorage.setItem(this.kneeboardDataKey, JSON.stringify(kneeboardData));

        this.drawKneeboard();
      }
    });

    // Import data from MIZ file
    $('.import-miz-button').on('click', () => this.showImportGroupFromMizModal());

    // Export data to JSON file.
    $('.show-export-kneeboard-modal-button').on('click', () => this.showExportModal());

    // Reset all fields.
    $('.reset-kneeboard-fields-button').on('click', () => {
      if (window.confirm('Are you sure ? All data will be lost.')) {
        this.kneeboardData = {};
        this.saveData();

        this.drawKneeboard();
      }
    });

    // Show download modal
    $('.show-download-kneeboard-modal-button').on('click', () => this.showDownloadModal());
  }

  async showImportGroupFromMizModal() {
    const mizImportGroupModal = $('.miz-import-group-modal');
    const mizData = await this.utils.importMiz('.miz');

    if (mizData) {
      $(mizImportGroupModal).find('.modal-loading-container').removeClass('hide');
      $(mizImportGroupModal).find('.modal-inner-content').addClass('hide');
      $(mizImportGroupModal).addClass('show');

      $(mizImportGroupModal).on('click', (event) => {
        if (!$(event.target).closest('.modal-content').length || $(event.target).hasClass('close-button')) {
          $(mizImportGroupModal).find('.miz-import-group').off('click')
          $(mizImportGroupModal).off('click');

          $(mizImportGroupModal).removeClass('show');
        }
      });

      const missionData = this.utils.parseLuaMiz(mizData);

      const theatre = missionData.theatre;
      const theatreOrigin = mapsOrigin[theatre];
      const flights = [];

      console.log(missionData.coalition.blue);

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

      $(mizImportGroupModal).find('.miz-import-group').on('click', () => {
        $(mizImportGroupModal).find('.miz-import-group').off('click')
        $(mizImportGroupModal).off('click');

        console.log($(mizImportGroupModal).find('.selected-group').val());

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
      });
    }
  }

  showExportModal() {
    const exportModal = $('.export-options-modal');

    $(exportModal).find('.file-name').val('');
    $(exportModal).addClass('show');

    $(exportModal).on('click', (event) => {
      if (!$(event.target).closest('.modal-content').length || $(event.target).hasClass('close-button')) {
        $(exportModal).find('.export-data-button').off('click')
        $(exportModal).find('.close-button').off('click');

        $(exportModal).removeClass('show');
      }
    });

    $(exportModal).find('.export-data-button').on('click', () => {
      $(exportModal).find('.download-button').off('click')
      $(exportModal).find('.close-button').off('click');

      const fileName = $(exportModal).find('.file-name').val();
      this.utils.exportMap(this.kneeboardData, fileName != '' ? fileName : 'kneeboard');

      $(exportModal).removeClass('show');
    });
  }

  showDownloadModal() {
    const downloadModal = $('.download-kneeboard-modal');

    $(downloadModal).find('.file-name').val('');
    $(downloadModal).addClass('show');

    $(downloadModal).on('click', (event) => {
      if (!$(event.target).closest('.modal-content').length || $(event.target).hasClass('close-button')) {
        $(downloadModal).find('.download-kneeboard-button').off('click')
        $(downloadModal).off('click');

        $(downloadModal).removeClass('show');
      }
    });

    $(downloadModal).find('.download-kneeboard-button').on('click', () => {
      console.log('ici');
      $(downloadModal).find('.download-kneeboard-modal').off('click')
      $(downloadModal).off('click');

      const kneeboardImages = {};
      this.kneeboardTemplate.forEach((template, index) => {
        this.kneeboardDrawUtils.initCanvas(this.kneeboardTemplate[index].rows, this.kneeboardTemplate[index].columns);
        this.kneeboardDrawUtils.clearCanvas();
        this.kneeboardDrawUtils.clearInputFields();

        // Draw the kneeboard background.
        this.drawStaticKneeboard(this.kneeboardTemplate[index]);

        // Draw the data into the canvas.
        this.drawKneeboardData(this.kneeboardTemplate[index], this.kneeboardData[template.id]);

        kneeboardImages[template.id] = $('.kneeboard-canvas')[0].toDataURL('image/png');
      });

      console.log(kneeboardImages);

      const archive = new JSZip();
      for (const imageName in kneeboardImages) {
        if (Object.hasOwn(kneeboardImages, imageName)) {

          archive.file(`${imageName}.png`, kneeboardImages[imageName].split(',')[1], { base64: true });
        }
      }

      console.log(archive);


      const fileName = $(downloadModal).find('.file-name').val();
      archive.generateAsync({ type: 'blob' }).then((content) => {
        console.log(content);
        const link = document.createElement('a');
        link.href = URL.createObjectURL(content);
        link.download = `${fileName != '' ? fileName : 'kneeboards'}.zip`;
        link.click();
        URL.revokeObjectURL(a.href);
      });

      $(downloadModal).removeClass('show');

      this.drawKneeboard();
    });
  }

  drawKneeboard() {
    this.kneeboardDrawUtils.initCanvas(this.kneeboardTemplate[this.currentPage].rows, this.kneeboardTemplate[this.currentPage].columns);
    this.kneeboardDrawUtils.clearCanvas();
    this.kneeboardDrawUtils.clearInputFields();

    // Draw the kneeboard background.
    this.drawStaticKneeboard(this.kneeboardTemplate[this.currentPage]);

    // Create the input fields.
    this.createKneeboardFields(this.kneeboardTemplate[this.currentPage]);

    // Get saved data from local storage.
    this.getData();

    this.displayData(this.kneeboardData[this.currentPageId]);

    // Update kneeboard data when a field is changed.
    $('.kneeboard-fields-container').find('input[type=text], textarea').on('change', () => this.updateKneeboardData());

    this.saveData();
  }


  drawStaticKneeboard(template) {
    template.textCells?.forEach((textCell) => {
      this.kneeboardDrawUtils.drawTextCell(
        textCell.position[0],
        textCell.position[1],
        textCell.position[2],
        textCell.position[3],
        textCell.text,
        textCell.borderWidths ?? [1, 1, 1, 1],
        textCell.backgroundColor ?? null,
        {
          fontSize: textCell.fontSize ?? 14,
          textAlign: textCell.textAlign ?? 'center',
          textOrientation: textCell.textOrientation ?? 'horizontal'
        }
      );
    });

    template.textFieldCells?.forEach((textCell) => {
      this.kneeboardDrawUtils.drawTextCell(
        textCell.position[0],
        textCell.position[1],
        textCell.position[2],
        textCell.position[3],
        null,
        textCell.borderWidths ?? [1, 1, 1, 1],
        textCell.backgroundColor ?? null
      );
    });
  }

  createKneeboardFields(template) {
    template.textFieldCells.forEach((textFieldCell) => {
      switch (textFieldCell.type) {
        case 'select':
        case 'input-select':
          this.kneeboardDrawUtils.drawSelectFieldCell(
            textFieldCell.position[0],
            textFieldCell.position[1],
            textFieldCell.position[2],
            textFieldCell.position[3],
            textFieldCell.id,
            textFieldCell.type,
            textFieldCell.options ?? [],
            textFieldCell.borderWidths ?? [1, 1, 1, 1],
            {
              fontSize: textFieldCell.fontSize ?? 12,
              textAlign: textFieldCell.textAlign ?? 'left',
              padding: textFieldCell.padding ?? 5,
              bold: textFieldCell.bold ?? false
            },
            textFieldCell.dropdownSide ?? 'right'
          );
          break;
        case 'text-area':
        default:
          this.kneeboardDrawUtils.drawTextFieldCell(
            textFieldCell.position[0],
            textFieldCell.position[1],
            textFieldCell.position[2],
            textFieldCell.position[3],
            textFieldCell.id,
            textFieldCell.type ?? 'text',
            textFieldCell.defaultText ?? null,
            textFieldCell.borderWidths ?? [1, 1, 1, 1],
            {
              fontSize: textFieldCell.fontSize ?? 12,
              textAlign: textFieldCell.textAlign ?? 'left',
              padding: textFieldCell.padding ?? 5,
              bold: textFieldCell.bold ?? false
            },
            textFieldCell.type == 'select' ? textFieldCell.options : [],
          );
          break;
      }
    });
  }

  drawKneeboardData(template, kneeboardData) {
    if (kneeboardData && kneeboardData.length > 0) {
      kneeboardData.forEach((kneeboardField) => {
        const textFieldCell = template.textFieldCells.find((textFieldCell) => textFieldCell.id == kneeboardField.id);

        let textAlign = 'left';
        if (textFieldCell.type == 'input-select' || textFieldCell.type == 'select') {
          if (textFieldCell.dropdownSide == 'left') {
            textAlign = 'right';
          } else {
            textAlign = 'left';
          }
        } else {
          textAlign = textFieldCell.textAlign
        }

        this.kneeboardDrawUtils.drawDynamicCellContent(
          textFieldCell.position[0],
          textFieldCell.position[1],
          textFieldCell.position[2],
          textFieldCell.position[3],
          kneeboardField.value,
          textFieldCell.type ?? 'text',
          textFieldCell.borderWidths ?? [1, 1, 1, 1],
          {
            fontSize: textFieldCell.fontSize ?? 12,
            textAlign,
            bold: textFieldCell.bold ?? false
          }
        )
      });
    }
  }

  getData() {
    try {
      const kneeboardData = JSON.parse(localStorage.getItem(this.kneeboardDataKey));
      if (kneeboardData) {
        this.kneeboardData = kneeboardData;
      }
    } catch (error) {
      console.log(error);
    }
  }

  displayData(kneeboardData) {
    if (kneeboardData && kneeboardData.length > 0) {
      kneeboardData.forEach((kneeboardField) => {
        $('.kneeboard-fields-container').find(`input#${kneeboardField.id}, textarea#${kneeboardField.id}`).val(kneeboardField.value);
      });
    }
  }

  updateKneeboardData() {
    this.kneeboardData[this.currentPageId] = [];
    $('.kneeboard-fields-container').find('input[type="text"], textarea, span.custom-select-text').each((index, element) => {
      if ($(element).is('span')) {
        console.log('ici', element);
      } else {
        if ($(element).val() != '') {
          this.kneeboardData[this.currentPageId].push({
            id: $(element).attr('id'),
            value: $(element).val()
          });
        }
      }
    })

    this.saveData();
  }

  saveData() {
    localStorage.setItem(this.kneeboardDataKey, JSON.stringify(this.kneeboardData));
    localStorage.setItem(this.kneeboardPageKey, this.currentPageId);
  }

  importGroupData(selectedFlight, theatreOrigin, startAt11 = false) {
    for (let i = 1; i < 21; i++) {
      $('.kneeboard-fields-container').find(`#nav-point-${i}-latitude`).val('');
      $('.kneeboard-fields-container').find(`#nav-point-${i}-longitude`).val('');
      $('.kneeboard-fields-container').find(`#nav-point-${i}-name`).val('');
    }

    let pointNumber = startAt11 ? 11 : 1;
    for (const keyPoint in selectedFlight.route.points) {
      if (keyPoint > 1 && Object.hasOwn(selectedFlight.route.points, keyPoint) && pointNumber < 21) {
        const point = selectedFlight.route.points[keyPoint];
        if (point.name != '#BAD' && point.name != '#CONVERT_TO_BAD') {
          const pointCoordinates = this.utils.dcsToGeo(theatreOrigin[0], theatreOrigin[1], point.x, point.y);

          $('.kneeboard-fields-container').find(`#nav-point-${pointNumber}-latitude`).val(this.utils.toDegMin(pointCoordinates[0], true));
          $('.kneeboard-fields-container').find(`#nav-point-${pointNumber}-longitude`).val(this.utils.toDegMin(pointCoordinates[1], false));
          $('.kneeboard-fields-container').find(`#nav-point-${pointNumber}-name`).val(point.name);

          pointNumber++;
        }
      }
    }

    this.updateKneeboardData();
  }

}