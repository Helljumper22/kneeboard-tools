class Kneeboard {

  constructor() {
    this.kneeboardDrawUtils = new KneeboardDrawUtils();
    this.utils = new Utils();

    this.defaultbackgroundColor = ['#ffffff', '#000000']
    this.defaultBorderColor = ['#000000', '#e9e9e9']
    this.defaultPathColor = ['#000000', '#e9e9e9']
    this.defaultTextColor = ['#000000', '#e9e9e9']

    this.kneeboardDataKey = 'kneeboard-data';
    this.kneeboardPageKey = 'kneeboard-page';
    this.kneeboardDarkModeKey = 'kneeboard-dark-mode';

    this.kneeboardTemplate = null;
    this.kneeboardName = '';
    this.kneeboardId = '';
    this.currentPage = 0;
    this.currentPageId = '';
    this.darkMode = false;
    this.focusFieldId = null;

    this.kneeboardData = {};
  }

  init() {
    this.getCurrentPage();

    this.getDarkMode();

    // Update kneeboard data when dark mode is changed.
    $('.kneeboard-dark-mode').on('change', () => this.updateDarkMode());

    this.runPagination();

    this.runArrowNavigation();

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

  getDarkMode() {
    this.darkMode = localStorage.getItem(this.kneeboardDarkModeKey) === 'true';
    $('.kneeboard-dark-mode').prop('checked', this.darkMode);
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

  runArrowNavigation() {
    $(document).on('keydown', (event) => {
      if (!event.altKey) return;

      const arrowKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
      if (!arrowKeys.includes(event.key)) return;

      event.preventDefault();

      const currentId = $(':focus').attr('id');

      // Build the effective flat list of navigable fields:
      // start with the page's top-level textFieldCells, then for each
      // fields-select, find the currently selected option index and
      // splice in its nested textFieldCells.
      const baseFields = this.kneeboardTemplate.pages[this.currentPage].textFieldCells;

      const effectiveFields = baseFields.flatMap((cell) => {
        if (cell.type === 'fields-select') {
          const selectedValue = $(`#${cell.id}`).find('.custom-fields-select-input').val();
          const selectedIndex = cell.options.indexOf(selectedValue);
          if (selectedIndex >= 0 && cell.fields[selectedIndex]?.textFieldCells) {
            return cell.fields[selectedIndex].textFieldCells;
          }
          return [];
        }
        return [cell];
      });

      const currentCell = effectiveFields.find((c) => c.id === currentId);
      if (!currentCell) return;

      // Types that are not keyboard-navigable targets
      const NON_NAVIGABLE_TYPES = ['path-select'];

      const midRow = (p) => (p[0] + p[1]) / 2;
      const midCol = (p) => (p[2] + p[3]) / 2;

      const cur = this.utils.getAbsoluteCellPosition(currentCell);
      const curMidCol = midCol(cur);
      const curMidRow = midRow(cur);

      const isNavigable = (c) =>
        c.id !== currentCell.id && !NON_NAVIGABLE_TYPES.includes(c.type);

      // Prefer center-containment, fall back to any edge overlap
      const colOverlap = (p) =>
        (p[2] < curMidCol && p[3] > curMidCol) || (p[2] < cur[3] && p[3] > cur[2]);
      const rowOverlap = (p) =>
        (p[0] < curMidRow && p[1] > curMidRow) || (p[0] < cur[1] && p[1] > cur[0]);

      let nextCellCandidates = [];

      switch (event.key) {
        case 'ArrowLeft':
          nextCellCandidates = effectiveFields.filter((c) => {
            if (!isNavigable(c)) return false;
            const p = this.utils.getAbsoluteCellPosition(c);
            return p[3] <= cur[2] && rowOverlap(p);
          });
          nextCellCandidates.sort((a, b) => {
            const pa = this.utils.getAbsoluteCellPosition(a), pb = this.utils.getAbsoluteCellPosition(b);
            const dxA = Math.abs(pa[3] - cur[2]);
            const dxB = Math.abs(pb[3] - cur[2]);
            if (dxA !== dxB) return dxA - dxB;
            return Math.abs(midRow(pa) - curMidRow) - Math.abs(midRow(pb) - curMidRow);
          });
          break;

        case 'ArrowRight':
          nextCellCandidates = effectiveFields.filter((c) => {
            if (!isNavigable(c)) return false;
            const p = this.utils.getAbsoluteCellPosition(c);
            return p[2] >= cur[3] && rowOverlap(p);
          });
          nextCellCandidates.sort((a, b) => {
            const pa = this.utils.getAbsoluteCellPosition(a), pb = this.utils.getAbsoluteCellPosition(b);
            const dxA = Math.abs(pa[2] - cur[3]);
            const dxB = Math.abs(pb[2] - cur[3]);
            if (dxA !== dxB) return dxA - dxB;
            return Math.abs(midRow(pa) - curMidRow) - Math.abs(midRow(pb) - curMidRow);
          });
          break;

        case 'ArrowUp':
          nextCellCandidates = effectiveFields.filter((c) => {
            if (!isNavigable(c)) return false;
            const p = this.utils.getAbsoluteCellPosition(c);
            return p[1] <= cur[0] && colOverlap(p);
          });
          nextCellCandidates.sort((a, b) => {
            const pa = this.utils.getAbsoluteCellPosition(a), pb = this.utils.getAbsoluteCellPosition(b);
            const dyA = Math.abs(pa[1] - cur[0]);
            const dyB = Math.abs(pb[1] - cur[0]);
            if (dyA !== dyB) return dyA - dyB;
            return Math.abs(midCol(pa) - curMidCol) - Math.abs(midCol(pb) - curMidCol);
          });
          break;

        case 'ArrowDown':
          nextCellCandidates = effectiveFields.filter((c) => {
            if (!isNavigable(c)) return false;
            const p = this.utils.getAbsoluteCellPosition(c);
            return p[0] >= cur[1] && colOverlap(p);
          });
          nextCellCandidates.sort((a, b) => {
            const pa = this.utils.getAbsoluteCellPosition(a), pb = this.utils.getAbsoluteCellPosition(b);
            const dyA = Math.abs(pa[0] - cur[1]);
            const dyB = Math.abs(pb[0] - cur[1]);
            if (dyA !== dyB) return dyA - dyB;
            return Math.abs(midCol(pa) - curMidCol) - Math.abs(midCol(pb) - curMidCol);
          });
          break;
      }

      console.log(currentId, nextCellCandidates)

      if (nextCellCandidates.length > 0) {
        this.focusFieldId = nextCellCandidates[0].id;
        $(`#${this.focusFieldId}`).focus().select();
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

      for (const keyCoalition in missionData.coalition) {
        if (Object.hasOwn(missionData.coalition, keyCoalition)) {
          const coalition = missionData.coalition[keyCoalition];

          for (const keyCountry in coalition.country) {
            if (Object.hasOwn(coalition.country, keyCountry)) {
              const country = coalition.country[keyCountry];

              for (const keyGroup in country?.plane?.group) {
                if (Object.hasOwn(country.plane.group, keyGroup)) {
                  flights.push({ ...country.plane.group[keyGroup], coalition: keyCoalition });
                }
              }
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
              `<option value="${flight.groupId}">${flight.name} (${flight.coalition})</option>`
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
      this.utils.exportData(JSON.stringify(this.kneeboardData, null, 2), fileName != '' ? fileName : 'kneeboard');

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
        this.kneeboardDrawUtils.initCanvas(this.kneeboardTemplate.pages[index].rows, this.kneeboardTemplate.pages[index].columns, this.darkMode ? "black" : "white", this.darkMode ? "white" : "black");
        this.kneeboardDrawUtils.clearCanvas();
        this.kneeboardDrawUtils.clearInputFields();

        // Draw the kneeboard background.
        this.displayStaticContent(this.kneeboardTemplate.pages[index]);

        // Draw the data into the canvas.
        this.displayKneeboardData(this.kneeboardTemplate.pages[index], this.kneeboardData[template.id]);
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
    this.kneeboardDrawUtils.initCanvas(this.kneeboardTemplate.pages[this.currentPage].rows, this.kneeboardTemplate.pages[this.currentPage].columns, this.darkMode ? "black" : "white", this.darkMode ? "white" : "black");
    this.kneeboardDrawUtils.clearCanvas();
    this.kneeboardDrawUtils.clearInputFields();

    // Get saved data from local storage.
    this.getStorageData();

    // Draw the kneeboard background.
    this.displayStaticContent(this.kneeboardTemplate.pages[this.currentPage]);

    // Display the data fields
    this.displayFields(this.kneeboardTemplate.pages[this.currentPage], this.kneeboardData[this.currentPageId]);

    // Display the saved data into the data fields.
    this.displayData(this.kneeboardTemplate.pages[this.currentPage], this.kneeboardData[this.currentPageId]);

    // Update kneeboard data when a field is changed.
    $('.kneeboard-fields-container').find('input[type=text], textarea').on('change', () => this.updateKneeboardData());

    // Handle fields behavior
    this.runFields(this.kneeboardTemplate.pages[this.currentPage]);

    // Handle fields select fields
    this.runFieldsSelectFields(this.kneeboardTemplate.pages[this.currentPage]);

    // Handle special field display
    this.runSpecialFields(this.kneeboardTemplate.pages[this.currentPage]);

    // Handle linked fields
    this.runLinkedFields(this.kneeboardTemplate.pages[this.currentPage]);

    // Handle chained fields
    this.runChainedFields(this.kneeboardTemplate.pages[this.currentPage]);

    // Restore focus if set by arrow navigation
    if (this.focusFieldId) {
      $(`#${this.focusFieldId}`).focus().select();
      this.focusFieldId = null;
    }

    this.saveData();
  }

  displayStaticContent(template) {
    template.textCells?.forEach((textCell) => {
      if (textCell.type == 'path') {
        let backgroundColor = this.utils.getCellColor(textCell.backgroundColor, this.darkMode, this.defaultbackgroundColor);
        let borderColor = this.utils.getCellColor(textCell.borderColor, this.darkMode, this.defaultBorderColor);
        let pathColor = this.utils.getCellColor(textCell.pathColor, this.darkMode, this.defaultPathColor);

        this.kneeboardDrawUtils.drawSvgShape(
          textCell.position[0],
          textCell.position[1],
          textCell.position[2],
          textCell.position[3],
          textCell.path,
          textCell.borderWidths,
          backgroundColor,
          borderColor,
          {
            padding: textCell.padding ?? 5,
            color: pathColor
          }
        );
      } else {
        let backgroundColor = this.utils.getCellColor(textCell.backgroundColor, this.darkMode, this.defaultbackgroundColor);
        let borderColor = this.utils.getCellColor(textCell.borderColor, this.darkMode, this.defaultBorderColor);
        let textColor = this.utils.getCellColor(textCell.textColor, this.darkMode, this.defaultTextColor);

        this.kneeboardDrawUtils.drawTextCell(
          textCell.position[0],
          textCell.position[1],
          textCell.position[2],
          textCell.position[3],
          textCell.text,
          textCell.borderWidths ?? [1, 1, 1, 1],
          backgroundColor,
          borderColor,
          {
            fontSize: textCell.fontSize ?? 14,
            minFontSize: textCell.minFontSize ?? 12,
            textAlign: textCell.textAlign ?? 'center',
            textOrientation: textCell.textOrientation ?? 'horizontal',
            padding: textCell.padding ?? 5,
            color: textColor
          }
        );
      }
    });

    template.textFieldCells?.forEach((textFieldCell) => {
      if (!template.textCells ||
        template.textCells.findIndex(textCell =>
          textCell.position[0] === textFieldCell.position[0] &&
          textCell.position[1] === textFieldCell.position[1] &&
          textCell.position[2] === textFieldCell.position[2] &&
          textCell.position[3] === textFieldCell.position[3]
        ) === -1) {
        let backgroundColor = this.utils.getCellColor(textFieldCell.backgroundColor, this.darkMode, this.defaultbackgroundColor);
        let borderColor = this.utils.getCellColor(textFieldCell.borderColor, this.darkMode, this.defaultBorderColor);

        this.kneeboardDrawUtils.drawTextCell(
          textFieldCell.position[0],
          textFieldCell.position[1],
          textFieldCell.position[2],
          textFieldCell.position[3],
          null,
          textFieldCell.borderWidths ?? [1, 1, 1, 1],
          backgroundColor,
          borderColor
        );
      }
    });
  }

  displayFields(template, kneeboardData) {
    template.textFieldCells.forEach((textFieldCell) => {
      let textColor = this.utils.getCellColor(textFieldCell.textColor, this.darkMode, this.defaultTextColor);

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
              color: textColor
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
              selectColumns: textFieldCell.selectColumns ?? 3,
              padding: textFieldCell.padding ?? 5,
              color: textColor
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
              selectColumns: textFieldCell.selectColumns ?? 1,
              color: textColor
            },
            textFieldCell.dropdownSide ?? 'right'
          );
          break;
        case 'fields-select':
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
              color: textColor
            },
            textFieldCell.dropdownSide ?? 'right'
          );

          let selectedFieldsIndex = 0;
          if (kneeboardData && kneeboardData.length > 0) {
            const fieldsSelectData = kneeboardData.find((kneeboardField) => kneeboardField.id == textFieldCell.id);

            if (fieldsSelectData) {
              selectedFieldsIndex = textFieldCell.options.indexOf(fieldsSelectData.value);
              selectedFieldsIndex = selectedFieldsIndex == -1 ? 0 : selectedFieldsIndex;
            }
          }

          if (textFieldCell.fields[selectedFieldsIndex]) {
            this.displayStaticContent(textFieldCell.fields[selectedFieldsIndex]);
            this.displayFields(textFieldCell.fields[selectedFieldsIndex], kneeboardData);
          }
          break;
        case 'textarea':
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
              textareaCenter: textFieldCell.textareaCenter ?? false,
              minFontSize: textFieldCell.minFontSize ?? 10,
              textAlign: textFieldCell.textAlign ?? 'left',
              padding: textFieldCell.padding ?? 5,
              bold: textFieldCell.bold ?? false,
              textOrientation: textFieldCell.textOrientation ?? null,
              characterLimit: textFieldCell.characterLimit ?? 0,
              color: textColor
            },
          );
          break;
      }
    });
  }

  displayKneeboardData(template, kneeboardData) {
    if (kneeboardData && kneeboardData.length > 0) {
      kneeboardData.forEach((kneeboardField) => {
        let textFieldCell = null;
        for (const cell of template.textFieldCells) {
          if (cell.id === kneeboardField.id) {
            textFieldCell = cell;
            break;
          }

          if (cell.type === 'fields-select') {
            for (const field of cell.fields || []) {
              for (const nestedCell of field.textFieldCells || []) {
                if (nestedCell.id === kneeboardField.id) {
                  textFieldCell = nestedCell;
                  break;
                }
              }
              if (textFieldCell) break;
            }
          }

          if (textFieldCell) break;
        }

        if (textFieldCell) {
          let backgroundColor = this.utils.getCellColor(textFieldCell.backgroundColor, this.darkMode, this.defaultbackgroundColor);
          let borderColor = this.utils.getCellColor(textFieldCell.borderColor, this.darkMode, this.defaultBorderColor);
          let pathColor = this.utils.getCellColor(textFieldCell.pathColor, this.darkMode, this.defaultPathColor);
          let textColor = this.utils.getCellColor(textFieldCell.textColor, this.darkMode, this.defaultTextColor);

          switch (textFieldCell.type) {
            case 'path-select':
              this.kneeboardDrawUtils.drawSvgShape(
                textFieldCell.position[0],
                textFieldCell.position[1],
                textFieldCell.position[2],
                textFieldCell.position[3],
                textFieldCell.options[kneeboardField.value],
                textFieldCell.borderWidths,
                backgroundColor,
                borderColor,
                {
                  padding: textFieldCell.padding ?? 5,
                  color: pathColor
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
                  color: textColor
                },
              );
              break;
            case 'fields-select':
              const selectedFieldsIndex = textFieldCell.options.indexOf(kneeboardField.value);
              if (textFieldCell.fields[selectedFieldsIndex]) {
                this.displayStaticContent(textFieldCell.fields[selectedFieldsIndex]);
              }
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
                  textareaCenter: textFieldCell.textareaCenter ?? false,
                  bold: textFieldCell.bold ?? false,
                  textOrientation: textFieldCell.textOrientation ?? 'horizontal',
                  padding: textFieldCell.padding,
                  color: textColor
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
      console.error(error);
    }
  }

  displayData(template, kneeboardData) {
    if (kneeboardData && kneeboardData.length > 0) {
      kneeboardData.forEach((kneeboardField) => {
        let textFieldCell = null;
        for (const cell of template.textFieldCells) {
          if (cell.id === kneeboardField.id) {
            textFieldCell = cell;
            break;
          }

          if (cell.type === 'fields-select') {
            for (const field of cell.fields || []) {
              for (const nestedCell of field.textFieldCells || []) {
                if (nestedCell.id === kneeboardField.id) {
                  textFieldCell = nestedCell;
                  break;
                }
              }
              if (textFieldCell) break;
            }
          }

          if (textFieldCell) break;
        }

        if (textFieldCell) {
          switch (textFieldCell.type) {
            case 'path-select':
              let backgroundColor = this.utils.getCellColor(textFieldCell.backgroundColor, this.darkMode, this.defaultbackgroundColor);
              let borderColor = this.utils.getCellColor(textFieldCell.borderColor, this.darkMode, this.defaultBorderColor);
              let pathColor = this.utils.getCellColor(textFieldCell.pathColor, this.darkMode, this.defaultPathColor);

              this.kneeboardDrawUtils.drawSvgShape(
                textFieldCell.position[0],
                textFieldCell.position[1],
                textFieldCell.position[2],
                textFieldCell.position[3],
                textFieldCell.options[kneeboardField.value],
                textFieldCell.borderWidths,
                backgroundColor,
                borderColor,
                {
                  padding: textFieldCell.padding ?? 5,
                  color: pathColor
                }
              );
              break;
            default:
              let textColor = this.utils.getCellColor(textFieldCell.textColor, this.darkMode, this.defaultTextColor);

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
                    color: textColor
                  }
                );
              }
              break;
          }

          const field = $('.kneeboard-fields-container').find(`input#${kneeboardField.id}, textarea#${kneeboardField.id} `);
          $(field).val(kneeboardField.value).change();

          if (!textFieldCell.type || textFieldCell.type == 'chained-text') {
            let fontSize = textFieldCell.fontSize ?? 12;
            const minFontSize = textFieldCell.minFontSize ?? 10;

            let textWidth = this.utils.getTextWidth($(field).val(), fontSize);
            const fieldWidth = $(field).width();

            while (textWidth > fieldWidth && fontSize > minFontSize) {
              fontSize--;
              $(field).css('font-size', fontSize + 'px');

              textWidth = this.utils.getTextWidth($(field).val(), fontSize);
            }
          }
        }
      });
    }
  }

  runFields(template) {
    const defaultFontSize = 12;
    const defaultMinFontSize = 10;

    let currentFontSize = 0, fontSize = 0, minFontSize = 0;
    template.textFieldCells.forEach((textFieldCell) => {
      if (!textFieldCell.type || textFieldCell.type == 'chained-text') {
        $('.kneeboard-fields-container').find(`#${textFieldCell.id}`).on('input', (event) => {
          currentFontSize = parseInt($(event.target).css('font-size'));
          fontSize = textFieldCell.fontSize ?? defaultFontSize;
          minFontSize = textFieldCell.minFontSize ?? defaultMinFontSize;

          // Ensure the font size is within limits.
          currentFontSize = Math.min(minFontSize, fontSize);
          $(event.target).css('font-size', `${currentFontSize}px`);

          let textWidth = this.utils.getTextWidth($(event.target).val(), currentFontSize);
          const fieldWidth = $(event.target).width();

          while (textWidth < fieldWidth && currentFontSize < fontSize) {
            currentFontSize++;

            textWidth = this.utils.getTextWidth($(event.target).val(), currentFontSize);
            if (textWidth < fieldWidth) {
              $(event.target).css('font-size', currentFontSize + 'px');
            }
          }

          while (textWidth > fieldWidth && currentFontSize > minFontSize) {
            currentFontSize--;
            $(event.target).css('font-size', currentFontSize + 'px');

            textWidth = this.utils.getTextWidth($(event.target).val(), currentFontSize);
          }
        });
      }
    });
  }

  runFieldsSelectFields(template, kneeboardData) {
    template.textFieldCells.forEach((textFieldCell) => {
      if (textFieldCell.type == 'fields-select') {
        $('.kneeboard-fields-container').find(`#${textFieldCell.id}`).on('change', (event) => {
          textFieldCell.fields.forEach((fields) => {
            fields.textFieldCells.forEach((textFieldCell) => {
              this.kneeboardData[this.currentPageId] = this.kneeboardData[this.currentPageId].filter((kneeboardField) => kneeboardField.id != textFieldCell.id);
            });
          });

          this.saveData();
          this.displayKneeboard();
        });
      }
    });
  }

  runSpecialFields(template) {
    $('.special-field-format').on('focusin', (event) => {
      const textFieldCell = template.textFieldCells.find((textFieldCell) => textFieldCell.id == $(event.target).attr('id'));

      $(event.target).on('focusout', (event) => {
        $(event.target).off('focusout');

        let textColor = this.utils.getCellColor(textFieldCell.textColor, this.darkMode, this.defaultTextColor);

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
            color: textColor,
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

  runLinkedFields(template) {
    template.textFieldCells.forEach((textFieldCell) => {
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
            textFieldCell.linkedFields.forEach((linkedField) => {
              if (Array.isArray(linkedField)) {
                const linkedTextFieldCell = template.textFieldCells.find((textFieldCell) => textFieldCell.id == linkedField);

                this.kneeboardData[linkedField[0]] = this.kneeboardData[linkedField[0]].filter((field) => field.id != linkedField[1]);
                this.kneeboardData[linkedField[0]].push({
                  id: linkedField[1],
                  value: linkedTextFieldCell.linkedOptions[textFieldCell.options.indexOf($(event.target).val()) + 1],
                });
              } else {
                const linkedTextFieldCell = template.textFieldCells.find((textFieldCell) => textFieldCell.id == linkedField);

                this.kneeboardData[this.currentPageId] = this.kneeboardData[this.currentPageId].filter((field) => field.id != linkedField);
                this.kneeboardData[this.currentPageId].push({
                  id: linkedField,
                  value: linkedTextFieldCell.linkedOptions[textFieldCell.options.indexOf($(event.target).val()) + 1],
                });
              }
            });

            this.saveData();
            this.displayKneeboard();
          });
          break;
      }

    });
  }

  runChainedFields(template) {
    template.textFieldCells.forEach((textFieldCell) => {
      switch (textFieldCell.type) {
        case 'chained-text':
          $('.kneeboard-fields-container').find(`#${textFieldCell.id}`).on('input', (event) => {
            const fieldMaxLength = $(event.target).attr('maxlength');
            if (fieldMaxLength && fieldMaxLength > 0 && $(event.target).val().length >= fieldMaxLength) {
              if (textFieldCell.chainedField) {
                $('.kneeboard-fields-container').find(`#${textFieldCell.chainedField}`).focus().select();
              }
            }
          });

          $('.kneeboard-fields-container').find(`#${textFieldCell.id}`).on('paste', (event) => {
            event.preventDefault();
            let pastedText = (event.originalEvent || event).clipboardData.getData('text');

            if (pastedText) {
              let field = $(event.target);
              let fieldMaxLength = $(field).attr('maxlength');

              $(field).val(pastedText.slice(0, fieldMaxLength));
              pastedText = pastedText.slice(fieldMaxLength)

              let nextTextFieldCell = template.textFieldCells.find((cell) => cell.id == textFieldCell.chainedField);
              while (pastedText.length > 0 && nextTextFieldCell) {
                field = $('.kneeboard-fields-container').find(`#${nextTextFieldCell.id}`);
                fieldMaxLength = $(field).attr('maxlength');

                $(field).val(pastedText.slice(0, fieldMaxLength)).focus().change();
                pastedText = pastedText.slice(fieldMaxLength);

                nextTextFieldCell = template.textFieldCells.find((cell) => cell.id == nextTextFieldCell.chainedField);
              }
            }
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

  updateDarkMode() {
    this.darkMode = $('.kneeboard-dark-mode').is(':checked');

    this.displayKneeboard();
  }

  saveData() {
    const kneeboardData = JSON.parse(localStorage.getItem(this.kneeboardDataKey));
    localStorage.setItem(this.kneeboardDataKey, JSON.stringify({ ...kneeboardData, ...this.kneeboardData }));

    localStorage.setItem(this.kneeboardPageKey, this.currentPageId);
    localStorage.setItem(this.kneeboardDarkModeKey, this.darkMode);
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