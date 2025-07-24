class Kneeboard {
  constructor() {
    this.kneeboardDrawUtils = new KneeboardDrawUtils();
    this.utils = new Utils();

    this.kneeboardDataKey = 'kneeboard-data';
    this.kneeboardPageKey = 'kneeboard-page';

    this.kneeboardTemplate = null;
    this.kneeboardName = '';
    this.kneeboardId = '';
    this.currentPage = 0;
    this.currentPageId = '';

    this.kneeboardData = {};
  }

  init() {
    this.getCurrentPage();

    this.runPagination();

    this.displayKneeboard();

    // Import data from JSON file
    this.runDataImport();

    // Import data from MIZ file
    $('.import-miz-button').off('click').on('click', () => this.showImportGroupFromMizModal());

    // Export data to JSON file.
    $('.show-export-kneeboard-modal-button').off('click').on('click', () => this.showExportModal());

    // Reset all fields.
    $('.reset-kneeboard-fields-button').off('click').on('click', () => {
      if (window.confirm('Are you sure ? All data will be lost.')) {
        this.resetFields();
      }
    });

    // Show download modal
    $('.show-download-kneeboard-modal-button').off('click').on('click', () => this.showDownloadModal());
  }

  getCurrentPage() {
    this.currentPageId = localStorage.getItem(this.kneeboardPageKey);

    if (this.currentPageId) {
      const currentPageIndex = this.kneeboardTemplate.pages.findIndex((templatePage) => templatePage.id == this.currentPageId);
      if (currentPageIndex != -1) {
        this.currentPage = currentPageIndex;
      } else {
        this.currentPage = 0;
        this.currentPageId = this.kneeboardTemplate.pages[0].id
      }
    } else {
      this.currentPage = 0;
      this.currentPageId = this.kneeboardTemplate.pages[0].id
    }
  }

  runPagination() {
    $('.kneeboard-container').find('.previous-arrow').toggleClass('hide', this.currentPage == 0);

    $('.kneeboard-container').find('.next-arrow').toggleClass('hide', this.currentPage == this.kneeboardTemplate.pages.length - 1);

    // Switch to previous kneeboard page.
    $('.kneeboard-container').find('.previous-arrow').off('click').on('click', (event) => {
      if (this.currentPage > 0) {
        this.currentPage--;
        this.currentPageId = this.kneeboardTemplate.pages[this.currentPage].id;
        this.displayKneeboard();

        if (this.currentPage == 0) {
          $(event.target).addClass('hide');
        }

        if (this.currentPage < this.kneeboardTemplate.pages.length) {
          $('.kneeboard-container').find('.next-arrow').removeClass('hide');
        }
      }
    });

    // Switch to next kneeboard page.
    $('.kneeboard-container').find('.next-arrow').off('click').on('click', (event) => {
      if (this.currentPage < this.kneeboardTemplate.pages.length) {
        this.currentPage++;
        this.currentPageId = this.kneeboardTemplate.pages[this.currentPage].id;
        this.displayKneeboard();

        if (this.currentPage == this.kneeboardTemplate.pages.length - 1) {
          $(event.target).addClass('hide');
        }

        if (this.currentPage > 0) {
          $('.kneeboard-container').find('.previous-arrow').removeClass('hide');
        }
      }
    });
  }

  runDataImport() {
    $('.import-kneeboard-button').off('click').on('click', async () => {
      const importKneeboardData = await this.utils.importData('.json');

      if (importKneeboardData) {
        const kneeboardData = JSON.parse(localStorage.getItem(this.kneeboardDataKey));
        localStorage.setItem(this.kneeboardDataKey, JSON.stringify({ ...kneeboardData, ...importKneeboardData }));

        this.displayKneeboard();
      }
    });
  }

  async showImportGroupFromMizModal() {
    const mizImportGroupModal = $('.miz-import-group-modal');
    const mizData = await this.utils.importMiz('.miz');

    if (mizData) {
      $(mizImportGroupModal).find('.modal-loading-container').removeClass('hide');
      $(mizImportGroupModal).find('.modal-inner-content').addClass('hide');
      $(mizImportGroupModal).addClass('show');

      $(mizImportGroupModal).off('click').on('click', (event) => {
        if (!$(event.target).closest('.modal-content').length || $(event.target).hasClass('close-button')) {
          $(mizImportGroupModal).removeClass('show');
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
            );
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

        this.importGroupData(selectedFlight, theatreOrigin);

        $(mizImportGroupModal).removeClass('show');
      });
    }
  }

  showExportModal() {
    const exportModal = $('.export-options-modal');

    $(exportModal).find('.file-name').val('');
    $(exportModal).addClass('show');

    $(exportModal).off('click').on('click', (event) => {
      if (!$(event.target).closest('.modal-content').length || $(event.target).hasClass('close-button')) {

        $(exportModal).removeClass('show');
      }
    });

    $(exportModal).find('.export-data-button').off('click').on('click', () => {
      const fileName = $(exportModal).find('.file-name').val();
      this.utils.exportMap(this.kneeboardData, fileName != '' ? fileName : 'kneeboard');

      $(exportModal).removeClass('show');
    });
  }

  showDownloadModal() {
    const downloadModal = $('.download-kneeboard-modal');

    $(downloadModal).find('.file-name').val('');
    $(downloadModal).addClass('show');

    $(downloadModal).off('click').on('click', (event) => {
      if (!$(event.target).closest('.modal-content').length || $(event.target).hasClass('close-button')) {
        ;
        $(downloadModal).removeClass('show');
      }
    });

    $(downloadModal).find('.download-kneeboard-button').off('click').on('click', () => {
      const kneeboardImages = {};
      this.kneeboardTemplate.pages.forEach((template, index) => {
        this.kneeboardDrawUtils.initCanvas(this.kneeboardTemplate.pages[index].rows, this.kneeboardTemplate.pages[index].columns);
        this.kneeboardDrawUtils.clearInputFields();

        // Draw the kneeboard background.
        this.displayStaticContent(this.kneeboardTemplate.pages[index]);

        // Draw the data into the canvas.
        this.runKneeboardData(this.kneeboardTemplate.pages[index], this.kneeboardData[template.id]);
        $(downloadModal).removeClass('show');

        kneeboardImages[template.id] = $('.kneeboard-canvas')[0].toDataURL('image/png');
      });

      const archive = new JSZip();
      for (const imageName in kneeboardImages) {
        if (Object.hasOwn(kneeboardImages, imageName)) {

          archive.file(`${imageName}.png`, kneeboardImages[imageName].split(',')[1], { base64: true });
        }
      }


      const fileName = $(downloadModal).find('.file-name').val();
      archive.generateAsync({ type: 'blob' }).then((content) => {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(content);
        link.download = `${fileName != '' ? fileName : 'kneeboards'}.zip`;
        link.click();
        URL.revokeObjectURL(link.href);
      });

      $(downloadModal).removeClass('show');

      this.displayKneeboard();
    });
  }

  resetFields() {
    this.kneeboardTemplate.pages.forEach((template) => {
      this.kneeboardData[template.id] = [];
      template.textFieldCells.forEach((textFieldCell) => {
        if (textFieldCell.default != undefined && textFieldCell.default != null) {
          this.kneeboardData[template.id].push({
            id: textFieldCell.id,
            value: textFieldCell.default,
          });
        }
      });
    });

    this.saveData();
    this.displayKneeboard();
  }

  displayKneeboard() {
    this.kneeboardDrawUtils.initCanvas(this.kneeboardTemplate.pages[this.currentPage].rows, this.kneeboardTemplate.pages[this.currentPage].columns);

    // Draw the kneeboard background.
    this.displayStaticContent(this.kneeboardTemplate.pages[this.currentPage]);

    this.displayFields(this.kneeboardTemplate.pages[this.currentPage]);

    // Get saved data from local storage.
    this.getStorageData();

    this.displayData(this.kneeboardTemplate.pages[this.currentPage], this.kneeboardData[this.currentPageId]);

    // Update kneeboard data when a field is changed.
    $('.kneeboard-fields-container').find('input[type=text], textarea').on('change', () => this.updateKneeboardData());

    // Handle special field display
    this.runSpecialFields();

    // Handle linked fields
    this.runLinkedFields();

    this.saveData();
  }

  displayStaticContent(template) {
    this.kneeboardDrawUtils.clearCanvas();

    template.textCells?.forEach((textCell) => {
      if (textCell.type == 'path') {
        this.kneeboardDrawUtils.drawSvgShape(
          textCell.position[0],
          textCell.position[1],
          textCell.position[2],
          textCell.position[3],
          textCell.path,
          textCell.borderWidths,
          {
            padding: textCell.padding ?? 5,
          }
        );
      } else {
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
            minFontSize: textCell.minFontSize ?? 12,
            textAlign: textCell.textAlign ?? 'center',
            textOrientation: textCell.textOrientation ?? 'horizontal',
            padding: textCell.padding ?? 5,
          }
        );
      }
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

  displayFields(template) {
    this.kneeboardDrawUtils.clearInputFields();

    template.textFieldCells.forEach((textFieldCell) => {
      switch (textFieldCell.type) {
        case 'path-field':
          this.kneeboardDrawUtils.drawTextFieldPath(
            textFieldCell.position[0],
            textFieldCell.position[1],
            textFieldCell.position[2],
            textFieldCell.position[3],
            textFieldCell.internalPosition[0],
            textFieldCell.internalPosition[1],
            textFieldCell.internalPosition[2],
            textFieldCell.internalPosition[3],
            textFieldCell.id,
            textFieldCell.type ?? 'text',
            textFieldCell.borderWidths ?? [1, 1, 1, 1],
            {
              fontSize: textFieldCell.fontSize ?? 12,
              minFontSize: textFieldCell.minFontSize ?? 10,
              textAlign: textFieldCell.textAlign ?? 'left',
              padding: textFieldCell.padding ?? 5,
              bold: textFieldCell.bold ?? false,
              textOrientation: textFieldCell.textOrientation ?? null,
            },
          );
          break;
        case 'path-select':
          this.kneeboardDrawUtils.drawPathSelectField(
            textFieldCell.position[0],
            textFieldCell.position[1],
            textFieldCell.position[2],
            textFieldCell.position[3],
            textFieldCell.id,
            textFieldCell.options ?? [],
            textFieldCell.borderWidths ?? [1, 1, 1, 1],
            {
              columns: textFieldCell.columns ?? 3,
              padding: textFieldCell.padding ?? 5,
            },
            textFieldCell.dropdownSide ?? 'right'
          );
          break;
        case 'select':
        case 'input-select':
        case 'linked-select':
          this.kneeboardDrawUtils.drawSelectField(
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
              minFontSize: textFieldCell.minFontSize ?? 10,
              textAlign: textFieldCell.textAlign ?? null,
              padding: textFieldCell.padding ?? 5,
              bold: textFieldCell.bold ?? false,
            },
            textFieldCell.dropdownSide ?? 'right'
          );
          break;
        case 'text-area':
        default:
          this.kneeboardDrawUtils.drawTextField(
            textFieldCell.position[0],
            textFieldCell.position[1],
            textFieldCell.position[2],
            textFieldCell.position[3],
            textFieldCell.id,
            textFieldCell.type ?? 'text',
            textFieldCell.borderWidths ?? [1, 1, 1, 1],
            {
              fontSize: textFieldCell.fontSize ?? 12,
              minFontSize: textFieldCell.minFontSize ?? 10,
              textAlign: textFieldCell.textAlign ?? 'left',
              padding: textFieldCell.padding ?? 5,
              bold: textFieldCell.bold ?? false,
              textOrientation: textFieldCell.textOrientation ?? null,
            },
          );
          break;
      }
    });
  }

  runKneeboardData(template, kneeboardData) {
    if (kneeboardData && kneeboardData.length > 0) {
      kneeboardData.forEach((kneeboardField) => {
        const textFieldCell = template.textFieldCells.find((textFieldCell) => textFieldCell.id == kneeboardField.id);

        if (textFieldCell) {
          switch (textFieldCell.type) {
            case 'path-select':
              this.kneeboardDrawUtils.drawSvgShape(
                textFieldCell.position[0],
                textFieldCell.position[1],
                textFieldCell.position[2],
                textFieldCell.position[3],
                textFieldCell.options[kneeboardField.value],
                textFieldCell.borderWidths,
                {
                  padding: textFieldCell.padding ?? 5,
                }
              );
              break;
            case 'path-field':
              this.kneeboardDrawUtils.drawPathContent(
                textFieldCell.position[0],
                textFieldCell.position[1],
                textFieldCell.position[2],
                textFieldCell.position[3],
                textFieldCell.internalPosition[0],
                textFieldCell.internalPosition[1],
                textFieldCell.internalPosition[2],
                textFieldCell.internalPosition[3],
                kneeboardField.value,
                textFieldCell.type ?? 'text',
                textFieldCell.borderWidths ?? [1, 1, 1, 1],
                {
                  fontSize: textFieldCell.fontSize ?? 12,
                  minFontSize: textFieldCell.minFontSize ?? 10,
                  textAlign: textFieldCell.textAlign ?? 'left',
                  padding: textFieldCell.padding ?? 5,
                  bold: textFieldCell.bold ?? false,
                  textOrientation: textFieldCell.textOrientation ?? null,
                },
              );
              break;
            default:
              let textAlign = 'left';
              if (!textFieldCell.textAlign && (textFieldCell.type == 'input-select' || textFieldCell.type == 'select')) {
                if (textFieldCell.dropdownSide == 'left') {
                  textAlign = 'right';
                } else {
                  textAlign = 'left';
                }
              } else {
                textAlign = textFieldCell.textAlign
              }

              this.kneeboardDrawUtils.drawCellContent(
                textFieldCell.position[0],
                textFieldCell.position[1],
                textFieldCell.position[2],
                textFieldCell.position[3],
                kneeboardField.value,
                textFieldCell.type ?? 'text',
                textFieldCell.borderWidths ?? [1, 1, 1, 1],
                {
                  fontSize: textFieldCell.fontSize ?? 12,
                  minFontSize: textFieldCell.minFontSize ?? 10,
                  textAlign,
                  bold: textFieldCell.bold ?? false,
                  textOrientation: textFieldCell.textOrientation ?? 'horizontal',
                  padding: textFieldCell.padding
                }
              )
              break;
          }
        }
      });
    }
  }

  getStorageData() {
    try {
      const kneeboardData = JSON.parse(localStorage.getItem(this.kneeboardDataKey));
      if (kneeboardData) {
        this.kneeboardTemplate.pages.forEach((page) => {
          this.kneeboardData[page.id] = kneeboardData[page.id];
        });
      } else {
        this.resetFields();
      }
    } catch (error) {
      console.log(error);
    }
  }

  displayData(template, kneeboardData) {
    if (kneeboardData && kneeboardData.length > 0) {
      kneeboardData.forEach((kneeboardField) => {
        const textFieldCell = template.textFieldCells.find((textFieldCell) => textFieldCell.id == kneeboardField.id);

        if (textFieldCell) {
          switch (textFieldCell.type) {
            case 'path-select':
              this.kneeboardDrawUtils.drawSvgShape(
                textFieldCell.position[0],
                textFieldCell.position[1],
                textFieldCell.position[2],
                textFieldCell.position[3],
                textFieldCell.options[kneeboardField.value],
                textFieldCell.borderWidths,
                {
                  padding: textFieldCell.padding ?? 5,
                }
              );
              break;
            default:
              if (textFieldCell.textOrientation == 'slanted') {
                this.kneeboardDrawUtils.drawCellContent(
                  textFieldCell.position[0],
                  textFieldCell.position[1],
                  textFieldCell.position[2],
                  textFieldCell.position[3],
                  kneeboardField.value,
                  'text',
                  textFieldCell.borderWidths ?? [1, 1, 1, 1],
                  {
                    textOrientation: textFieldCell.textOrientation,
                    bold: textFieldCell.bold ?? false,
                  }
                );
              }
              break;
          }

          $('.kneeboard-fields-container').find(`input#${kneeboardField.id}, textarea#${kneeboardField.id} `).val(kneeboardField.value);
        }
      });
    }
  }

  runSpecialFields() {
    $('.special-field-format').on('focusin', (event) => {
      const textFieldCell = this.kneeboardTemplate.pages[this.currentPage].textFieldCells.find((textFieldCell) => textFieldCell.id == $(event.target).attr('id'));

      $(event.target).on('focusout', (event) => {
        $(event.target).off('focusout');

        this.kneeboardDrawUtils.drawCellContent(
          textFieldCell.position[0],
          textFieldCell.position[1],
          textFieldCell.position[2],
          textFieldCell.position[3],
          $(event.target).val(),
          'text',
          textFieldCell.borderWidths ?? [1, 1, 1, 1],
          {
            textOrientation: textFieldCell.textOrientation,
            bold: textFieldCell.bold ?? false,
          }
        );
      });

      this.kneeboardDrawUtils.eraseCell(
        textFieldCell.position[0],
        textFieldCell.position[1],
        textFieldCell.position[2],
        textFieldCell.position[3],
        textFieldCell.padding ?? 5,
      )
    });
  }

  runLinkedFields() {
    this.kneeboardTemplate.pages[this.currentPage].textFieldCells.forEach((textFieldCell) => {
      switch (textFieldCell.type) {
        case 'linked-text':
          $('.kneeboard-fields-container').find(`#${textFieldCell.id}`).on('change', (event) => {
            textFieldCell.linkedFields.forEach((linkedField) => {
              if (Array.isArray(linkedField)) {
                this.kneeboardData[linkedField[0]] = this.kneeboardData[linkedField[0]].filter((field) => field.id != linkedField[1]);
                this.kneeboardData[linkedField[0]].push({
                  id: linkedField[1],
                  value: $(event.target).val(),
                });
              } else {
                this.kneeboardData[this.currentPageId] = this.kneeboardData[this.currentPageId].filter((field) => field.id != linkedField);
                this.kneeboardData[this.currentPageId].push({
                  id: linkedField,
                  value: $(event.target).val(),
                });
              }

              this.saveData();
              this.displayKneeboard();
            });
          });
          break;
        case 'linked-select':
          $('.kneeboard-fields-container').find(`#${textFieldCell.id}`).on('change', (event) => {
            console.log($(event.target), textFieldCell);

            textFieldCell.linkedFields.forEach((linkedField) => {
              if (Array.isArray(linkedField)) {
                const linkedTextFieldCell = this.kneeboardTemplate.pages[this.currentPage].textFieldCells.find((textFieldCell) => textFieldCell.id == linkedField);

                this.kneeboardData[linkedField[0]] = this.kneeboardData[linkedField[0]].filter((field) => field.id != linkedField[1]);
                this.kneeboardData[linkedField[0]].push({
                  id: linkedField[1],
                  value: linkedTextFieldCell.linkedOptions[textFieldCell.options.indexOf($(event.target).val()) + 1],
                });
              } else {
                const linkedTextFieldCell = this.kneeboardTemplate.pages[this.currentPage].textFieldCells.find((textFieldCell) => textFieldCell.id == linkedField);

                this.kneeboardData[this.currentPageId] = this.kneeboardData[this.currentPageId].filter((field) => field.id != linkedField);
                this.kneeboardData[this.currentPageId].push({
                  id: linkedField,
                  value: linkedTextFieldCell.linkedOptions[textFieldCell.options.indexOf($(event.target).val()) + 1],
                });
              }

              this.saveData();
              this.displayKneeboard();
            });
          });
          break;
      }

    });
  }

  updateKneeboardData() {
    this.kneeboardData[this.currentPageId] = [];
    $('.kneeboard-fields-container').find('input[type="text"], textarea').each((index, element) => {
      if ($(element).val() != '') {
        this.kneeboardData[this.currentPageId].push({
          id: $(element).attr('id'),
          value: $(element).val()
        });
      }
    })

    this.saveData();
  }

  saveData() {
    const kneeboardData = JSON.parse(localStorage.getItem(this.kneeboardDataKey));
    localStorage.setItem(this.kneeboardDataKey, JSON.stringify({ ...kneeboardData, ...this.kneeboardData }));

    localStorage.setItem(this.kneeboardPageKey, this.currentPageId);
  }

  importGroupData(selectedFlight, theatreOrigin) {
    const navPointsIds = [];
    for (let i = 1; i < 100; i++) {
      navPointsIds.push(`nav-point-${i}-latitude`);
      navPointsIds.push(`nav-point-${i}-longitude`);
      navPointsIds.push(`nav-point-${i}-name`);
    }

    for (const [key, kneeboard] of Object.entries(this.kneeboardData)) {
      this.kneeboardData[key] = kneeboard.filter((kneeboardData) => !navPointsIds.includes(kneeboardData.id));
    }

    let pointNumber = 1;
    for (const keyPoint in selectedFlight.route.points) {
      if (keyPoint > 1 && Object.hasOwn(selectedFlight.route.points, keyPoint) && pointNumber < 100) {
        const point = selectedFlight.route.points[keyPoint];
        const pointCoordinates = this.utils.dcsToGeo(theatreOrigin[0], theatreOrigin[1], point.x, point.y);

        for (const [key, kneeboard] of Object.entries(this.kneeboardData)) {
          this.kneeboardData[key].push({
            id: `nav-point-${pointNumber}-latitude`,
            value: this.utils.toDegMin(pointCoordinates[0], true),
          });
          this.kneeboardData[key].push({
            id: `nav-point-${pointNumber}-longitude`,
            value: this.utils.toDegMin(pointCoordinates[1], false),
          });
          this.kneeboardData[key].push({
            id: `nav-point-${pointNumber}-name`,
            value: point.name,
          });
        }

        pointNumber++;
      }
    }

    this.saveData();
    this.displayKneeboard();
  }
}