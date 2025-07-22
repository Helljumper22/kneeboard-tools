class KneeboardDrawUtils {
  constructor(rows, columns) {
    this.canvas = $('.kneeboard-canvas')[0];
    this.ctx = this.canvas.getContext('2d');

    this.baseHeight = 1080;
    this.baseWidth = 764;

    this.rows = 0;
    this.columns = 0;

    this.height = 0;
    this.width = 0;
    this.cellHeight = 0;
    this.cellWidth = 0;

    this.inputFieldHeightScale = 0;
    this.inputFieldWidthScale = 0;
  }

  initCanvas(rows, columns) {
    this.rows = rows;
    this.columns = columns;

    this.scaleCanvas();
  }

  scaleCanvas() {
    this.cellHeight = Math.floor(this.baseHeight / this.rows);
    this.cellWidth = Math.floor(this.baseWidth / this.columns);

    this.height = this.cellHeight * this.rows;
    this.width = this.cellWidth * this.columns;

    this.inputFieldHeightScale = $('.kneeboard-fields-container').height() / this.height;
    this.inputFieldWidthScale = $('.kneeboard-fields-container').width() / this.width;

    $('.kneeboard-canvas').attr('height', this.height);
    $('.kneeboard-canvas').attr('width', this.width);
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    this.ctx.fillStyle = "white";
    this.ctx.fillRect(0, 0, this.width, this.height);

    this.ctx.strokeStyle = "black";
    this.ctx.rowWidth = 1;
    this.ctx.strokeRect(0.5, 0.5, this.width - 1.0, this.height - 1.0);
  }

  eraseCell(rowStart, rowEnd, columnStart, columnEnd, padding) {
    const x = (columnStart * this.cellWidth) + padding;
    const y = (rowStart * this.cellHeight) + padding;
    const width = ((columnEnd - columnStart) * this.cellWidth) - (padding * 2);
    const height = ((rowEnd - rowStart) * this.cellHeight) - (padding * 2);

    this.ctx.clearRect(x, y, width, height)
  }

  clearInputFields() {
    $('.kneeboard-fields-container').empty();
  }

  setToBackground() {
    this.ctx.globalCompositeOperation = 'destination-over';
  }

  setToForeground() {
    this.ctx.globalCompositeOperation = 'source-over';
  }

  unclipCanvas() {
    this.ctx.restore();
  }

  drawBackground(color) {
    this.setToBackground();

    this.ctx.fillStyle = color;
    this.ctx.fillRect(0, 0, this.width, this.height);

    this.setToForeground();
  }

  drawTextCell(rowStart, rowEnd, columnStart, columnEnd, text = null, borderWidths = [1, 1, 1, 1], backgroundColor = null, _textOptions = {}) {
    const textOptions = {
      textAlign: _textOptions.textAlign ?? 'center',
      fontSize: _textOptions.fontSize ?? 14,
      minFontSize: _textOptions.minFontSize ?? 12,
      padding: _textOptions.padding ?? 5,
      textOrientation: _textOptions.textOrientation ?? 'horizontal',
      bold: _textOptions.bold ?? true,
    }

    if (this.checkRowsColumns(rowStart, rowEnd, columnStart, columnEnd)) {
      const x = (columnStart * this.cellWidth) - (borderWidths[3] % 2 == 0 ? 0.0 : 0.5);
      const y = (rowStart * this.cellHeight) - (borderWidths[0] % 2 == 0 ? 0.0 : 0.5);
      const width = ((columnEnd - columnStart) * this.cellWidth) - (borderWidths[3] % 2 == 0 ? 0.5 : 0.0) + (borderWidths[1] % 2 == 0 ? 0.5 : 0.0);
      const height = ((rowEnd - rowStart) * this.cellHeight) - (borderWidths[0] % 2 == 0 ? 0.5 : 0.0) + (borderWidths[2] % 2 == 0 ? 0.5 : 0.0);

      if (backgroundColor) {
        const backgroundX = x + borderWidths[3] / 2;
        const backgroundY = y + borderWidths[0] / 2;
        const backgroundWidth = width - (borderWidths[1] / 2) - (borderWidths[3] / 2);
        const backgroundHeight = height - (borderWidths[0] / 2) - (borderWidths[2] / 2);

        this.ctx.fillStyle = backgroundColor;
        this.ctx.fillRect(backgroundX, backgroundY, backgroundWidth, backgroundHeight);
      }

      this.ctx.strokeStyle = "black";

      if (borderWidths[0] > 0) {
        this.ctx.lineWidth = borderWidths[0];
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(x + width, y);
        this.ctx.stroke();
      }

      if (borderWidths[1] > 0) {
        this.ctx.lineWidth = borderWidths[1];
        this.ctx.beginPath();
        this.ctx.moveTo(x + width, y);
        this.ctx.lineTo(x + width, y + height);
        this.ctx.stroke();
      }

      if (borderWidths[2] > 0) {
        this.ctx.lineWidth = borderWidths[2];
        this.ctx.beginPath();
        this.ctx.moveTo(x + width, y + height);
        this.ctx.lineTo(x, y + height);
        this.ctx.stroke();
      }

      if (borderWidths[3] > 0) {
        this.ctx.lineWidth = borderWidths[3];
        this.ctx.beginPath();
        this.ctx.moveTo(x, y + height);
        this.ctx.lineTo(x, y);
        this.ctx.stroke();
      }

      this.ctx.lineWidth = 1;

      if (text && text.length > 0) {
        this.drawText(x, y, width, height, text, 'text', textOptions);
      }
    }
  }

  drawTextField(rowStart, rowEnd, columnStart, columnEnd, id, type = 'text', borderWidths = [1, 1, 1, 1], _textOptions = {}) {
    if (this.checkRowsColumns(rowStart, rowEnd, columnStart, columnEnd)) {
      const textOptions = {
        textAlign: _textOptions.textAlign ?? 'left',
        fontSize: _textOptions.fontSize ?? 12,
        minFontSize: _textOptions.minFontSize ?? 10,
        padding: _textOptions.padding ?? 5,
        bold: _textOptions.bold ?? false,
        textOrientation: _textOptions.textOrientation ?? 'horizontal',
        linkedOptions: _textOptions.linkedOptions ?? [],
      }

      const cellWidth = this.cellWidth * this.inputFieldWidthScale;
      const cellHeight = this.cellHeight * this.inputFieldHeightScale;

      const x = (columnStart * cellWidth) + (borderWidths[3] / 2);
      const y = (rowStart * cellHeight) + (borderWidths[0] / 2);
      let width = ((columnEnd - columnStart) * cellWidth) - (borderWidths[3] / 2) - (borderWidths[1] / 2);
      let height = ((rowEnd - rowStart) * cellHeight) - (borderWidths[0] / 2) - (borderWidths[2] / 2);

      switch (type) {
        case 'text-area':
          width -= textOptions.padding * 2
          height -= textOptions.padding * 2;

          const linkedOptions = JSON.stringify(textOptions.linkedOptions);

          $(`<textarea id="${id}" ${textOptions.linkedOptions.length > 0 ? "data-linked-options='" + linkedOptions + "'" : ""}></textarea>`)
            .css({
              'top': `${y}px`,
              'left': `${x}px`,
              'width': `${width}px`,
              'height': `${height}px`,
              'font-size': `${textOptions.fontSize}px`,
              'line-height': `${textOptions.fontSize}px`, // Aligns the text with the canvas text, WTF.
              'margin': `${textOptions.padding}px`,
              'text-align': textOptions.textAlign,
              'font-weight': textOptions.bold ? 'bold' : 'normal'
            })
            .appendTo('.kneeboard-fields-container');
          break;
        case 'text':
        default:
          switch (textOptions.textOrientation) {
            case 'slanted':
              $(`<input type="text" id="${id}" class="special-field-format">`)
                .css({
                  'top': `${y}px`,
                  'left': `${x}px`,
                  'width': `${width}px`,
                  'height': `${height}px`,
                  'font-size': `${textOptions.fontSize}px`,
                  'line-height': `${textOptions.fontSize * 2}px`, // Aligns the text with the canvas text, WTF.
                  'padding': `0`,
                  'text-align': textOptions.textAlign,
                  'font-weight': textOptions.bold ? 'bold' : 'normal'
                })
                .appendTo('.kneeboard-fields-container');
              break;
            default:
              width -= textOptions.padding * 2

              const linkedOptions = JSON.stringify(textOptions.linkedOptions);

              $(`<input type="text" id="${id}" ${textOptions.linkedOptions.length > 0 ? "data-linked-options='" + linkedOptions + "'" : ""}>`)
                .css({
                  'top': `${y}px`,
                  'left': `${x}px`,
                  'width': `${width}px`,
                  'height': `${height}px`,
                  'font-size': `${textOptions.fontSize}px`,
                  'line-height': `${textOptions.fontSize * 2}px`, // Aligns the text with the canvas text, WTF.
                  'padding': `0 ${textOptions.padding}px`,
                  'text-align': textOptions.textAlign,
                  'font-weight': textOptions.bold ? 'bold' : 'normal'
                })
                .appendTo('.kneeboard-fields-container');
              break;
          }
          break;
      }
    }
  }

  drawSelectField(rowStart, rowEnd, columnStart, columnEnd, id, type = 'select', options = [], borderWidths = [1, 1, 1, 1], _selectOptions = {}, dropDownSide = 'right') {
    if (this.checkRowsColumns(rowStart, rowEnd, columnStart, columnEnd)) {
      const selectOptions = {
        fontSize: _selectOptions.fontSize ?? 12,
        minFontSize: _selectOptions.minFontSize ?? 10,
        padding: _selectOptions.padding ?? 5,
        bold: _selectOptions.bold ?? false,
        textAlign: _selectOptions.textAlign ?? (dropDownSide == 'left' ? 'right' : 'left'),
        linkedFields: _selectOptions.linkedFields ?? []
      }

      const cellWidth = this.cellWidth * this.inputFieldWidthScale;
      const cellHeight = this.cellHeight * this.inputFieldHeightScale;

      const x = (columnStart * cellWidth) + (borderWidths[3] / 2);
      const y = (rowStart * cellHeight) + (borderWidths[0] / 2);
      let width = ((columnEnd - columnStart) * cellWidth) - (borderWidths[3] / 2) - (borderWidths[1] / 2);
      let height = ((rowEnd - rowStart) * cellHeight) - (borderWidths[0] / 2) - (borderWidths[2] / 2);
      /* */

      let selectContainer;
      switch (type) {
        case 'input-select':
          selectContainer =
            $(`<div class="custom-select-container">
              <div class="custom-select-display">
                <input type="text" class="custom-select-input" id="${id}" style="padding: 0 ${selectOptions.padding}px" />
                <span class="custom-select-arrow ${dropDownSide}">▼</span>
              </div>
              <div class="custom-select-dropdown">
                <div class="custom-select-option">&nbsp;</div>
                ${options.map(option => `<div class="custom-select-option">${option}</div>`).join('')}
              </div>
            </div>`).css({
              'top': `${y}px`,
              'left': `${x}px`,
              'width': `${width}px`,
              'height': `${height}px`,
              'font-size': `${selectOptions.fontSize}px`,
              'text-align': selectOptions.textAlign,
              'font-weight': selectOptions.bold ? 'bold' : 'normal',
            }).appendTo('.kneeboard-fields-container');
          break;
        case 'select':
        case 'linked-select':
        default:
          selectContainer =
            $(`<div class="custom-select-container" id="${id}">
              <div class="custom-select-display">
                <input type="text" class="custom-select-input disabled" id="${id}" style="padding: 0 ${selectOptions.padding}px"/>
                <span class="custom-select-arrow ${dropDownSide}">▼</span>
              </div>
              <div class="custom-select-dropdown">
                <div class="custom-select-option">&nbsp;</div>
                ${options.map(option => `<div class="custom-select-option">${option}</div>`).join('')}
              </div>
            </div>`).css({
              'top': `${y}px`,
              'left': `${x}px`,
              'width': `${width}px`,
              'height': `${height}px`,
              'font-size': `${selectOptions.fontSize}px`,
              'text-align': selectOptions.textAlign,
              'font-weight': selectOptions.bold ? 'bold' : 'normal',
            }).appendTo('.kneeboard-fields-container');
          break;
      }

      const dropdown = $(selectContainer).find('.custom-select-dropdown');
      const arrow = $(selectContainer).find('.custom-select-arrow');
      const input = $(selectContainer).find('.custom-select-input');

      $(arrow).on('click', () => {
        $(dropdown).toggle();

        // Delay binding the outside click to avoid immediate close
        setTimeout(() => {
          $(document).on('click.custom-select-outside', outsideClickHandler);
        }, 0);

        $(dropdown).find('.custom-select-option').off('click').on('click', function (event) {
          let text = $(this).text();
          if (text === '\u00A0') text = '';

          if ($(input).val() != text) {

            $(input).val(text).change();

            if (type == 'linked-select' && selectOptions.linkedFields.length > 0) {
              const optionIndex = $(event.currentTarget).index();
              selectOptions.linkedFields.forEach((linkedFieldId) => {
                const linkedField = $(`#${linkedFieldId}`);

                const linkedOptions = JSON.parse($(linkedField).attr('data-linked-options'));

                $(linkedField).val(linkedOptions[optionIndex]).change();
              })
            }
          }

          $(dropdown).hide();
          $(document).off('click.custom-select-outside');
        });
      });

      const outsideClickHandler = (event) => {
        if (!$(event.target).closest(selectContainer).length) {
          $(dropdown).hide();

          $(document).off('click.custom-select-outside');
        }
      };
    }
  }

  drawTextFieldPath(rowStart, rowEnd, columnStart, columnEnd, cellPositionX, cellPositionY, cellPositionWith, cellPositionHeight, id, type = 'text', borderWidths = [1, 1, 1, 1], _textOptions = {},) {
    if (this.checkRowsColumns(rowStart, rowEnd, columnStart, columnEnd)) {
      const textOptions = {
        textAlign: _textOptions.textAlign ?? 'left',
        fontSize: _textOptions.fontSize ?? 12,
        minFontSize: _textOptions.minFontSize ?? 10,
        padding: _textOptions.padding ?? 5,
        bold: _textOptions.bold ?? false,
        textOrientation: _textOptions.textOrientation ?? 'horizontal',
      }

      const cellWidth = this.cellWidth * this.inputFieldWidthScale;
      const cellHeight = this.cellHeight * this.inputFieldHeightScale;

      const x = (columnStart * cellWidth) + (borderWidths[3] / 2);
      const y = (rowStart * cellHeight) + (borderWidths[0] / 2);
      const width = ((columnEnd - columnStart) * cellWidth) - (borderWidths[3] / 2) - (borderWidths[1] / 2);
      const height = ((rowEnd - rowStart) * cellHeight) - (borderWidths[0] / 2) - (borderWidths[2] / 2);

      const fieldX = x + (width * cellPositionX);
      const fieldY = y + (height * cellPositionY);
      const fieldWidth = (width * cellPositionWith);
      const fieldHeight = (height * cellPositionHeight);

      $(`<input type="text" id="${id}">`)
        .css({
          'top': `${fieldY}px`,
          'left': `${fieldX}px`,
          'width': `${fieldWidth}px`,
          'height': `${fieldHeight}px`,
          'font-size': `${textOptions.fontSize}px`,
          'line-height': `${textOptions.fontSize * 2}px`, // Aligns the text with the canvas text, WTF.
          'padding': `0 ${textOptions.padding}px`,
          'text-align': textOptions.textAlign,
          'font-weight': textOptions.bold ? 'bold' : 'normal',
        })
        .appendTo('.kneeboard-fields-container');

      /*switch (type) {
        case 'text-area':
          width -= textOptions.padding * 2
          height -= textOptions.padding * 2;
          $(`<textarea id="${id}"></textarea>`)
            .css({
              'top': `${y}px`,
              'left': `${x}px`,
              'width': `${width}px`,
              'height': `${height}px`,
              'font-size': `${textOptions.fontSize}px`,
              'line-height': `${textOptions.fontSize}px`, // Aligns the text with the canvas text, WTF.
              'margin': `${textOptions.padding}px`,
              'text-align': textOptions.textAlign,
              'font-weight': textOptions.bold ? 'bold' : 'normal'
            })
            .appendTo('.kneeboard-fields-container');
          break;
        case 'text':
        default:
          switch (textOptions.textOrientation) {
            case 'slanted':
              $(`<input type="text" id="${id}" class="special-field-format">`)
                .css({
                  'top': `${y}px`,
                  'left': `${x}px`,
                  'width': `${width}px`,
                  'height': `${height}px`,
                  'font-size': `${textOptions.fontSize}px`,
                  'line-height': `${textOptions.fontSize * 2}px`, // Aligns the text with the canvas text, WTF.
                  'padding': `0`,
                  'text-align': textOptions.textAlign,
                  'font-weight': textOptions.bold ? 'bold' : 'normal'
                })
                .appendTo('.kneeboard-fields-container');
              break;
            default:
              width -= textOptions.padding * 2
              $(`<input type="text" id="${id}">`)
                .css({
                  'top': `${y}px`,
                  'left': `${x}px`,
                  'width': `${width}px`,
                  'height': `${height}px`,
                  'font-size': `${textOptions.fontSize}px`,
                  'line-height': `${textOptions.fontSize * 2}px`, // Aligns the text with the canvas text, WTF.
                  'padding': `0 ${textOptions.padding}px`,
                  'text-align': textOptions.textAlign,
                  'font-weight': textOptions.bold ? 'bold' : 'normal'
                })
                .appendTo('.kneeboard-fields-container');
              break;
          }
          break;
      }*/
    }
  }

  drawPathSelectField(rowStart, rowEnd, columnStart, columnEnd, id, options = [], borderWidths = [1, 1, 1, 1], _selectOptions = {}, dropDownSide = 'right') {
    if (this.checkRowsColumns(rowStart, rowEnd, columnStart, columnEnd)) {
      const selectOptions = {
        columns: Math.round(_selectOptions.columns ?? 3),
        padding: _selectOptions.padding ?? 5,
      }

      const cellWidth = this.cellWidth * this.inputFieldWidthScale;
      const cellHeight = this.cellHeight * this.inputFieldHeightScale;

      const x = (columnStart * cellWidth) + (borderWidths[3] / 2);
      const y = (rowStart * cellHeight) + (borderWidths[0] / 2);
      let width = ((columnEnd - columnStart) * cellWidth) - (borderWidths[3] / 2) - (borderWidths[1] / 2);
      let height = ((rowEnd - rowStart) * cellHeight) - (borderWidths[0] / 2) - (borderWidths[2] / 2);

      const customPathOptions = options.map((path, index) => {
        const svgBounds = this.getSvgWidthAndHeight(path);

        const svgX = svgBounds.x - selectOptions.padding;
        const svgY = svgBounds.y - selectOptions.padding;
        const svgWidth = svgBounds.width + (selectOptions.padding * 2);
        const svgHeight = svgBounds.height + (selectOptions.padding * 2);

        return `<div class="custom-path-select-option" data-path="${path}" id="${index}" style="height: ${height}px; width: ${width}px">
          <svg viewBox="${svgX} ${svgY} ${svgWidth} ${svgHeight}" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
            <path d="${path}" stroke="black" fill="none" stroke-width="1"/>
          </svg>
        </div>`;
      })

      const selectContainer =
        $(`<div class="custom-select-container" id="${id}">
              <div class="custom-select-display">
                <input type="text" class="custom-path-select-input" id="${id}"/>
                <span class="custom-path-select-arrow ${dropDownSide}">▼</span>
              </div>
              <div class="custom-path-select-dropdown" style="width:${selectOptions.columns * 100}%">
              ${customPathOptions.map((customPathOption) => customPathOption).join('')}
              </div>
            </div>`).css({
          'top': `${y}px`,
          'left': `${x}px`,
          'width': `${width}px`,
          'height': `${height}px`,
          'text-align': dropDownSide == 'left' ? 'right' : 'left',
        }).appendTo('.kneeboard-fields-container');

      const dropdown = $(selectContainer).find('.custom-path-select-dropdown');
      const arrow = $(selectContainer).find('.custom-select-arrow, .custom-path-select-arrow');
      const input = $(selectContainer).find('.custom-path-select-input');

      $(arrow).on('click', () => {
        $(dropdown).toggleClass('show');

        // Delay binding the outside click to avoid immediate close
        setTimeout(() => {
          $(document).on('click.custom-select-outside', outsideClickHandler);
        }, 0);

        $(dropdown).find('.custom-path-select-option').off('click').on('click', (event) => {
          const id = $(event.currentTarget).attr('id');

          $(input).val(id).change();

          const path = $(event.currentTarget).attr('data-path');

          this.eraseCell(rowStart, rowEnd, columnStart, columnEnd, selectOptions.padding);
          this.drawSvgShape(rowStart, rowEnd, columnStart, columnEnd, path, [0, 0, 0, 0], selectOptions);

          $(dropdown).removeClass('show');
          $(document).off('click.custom-select-outside');
        });
      });

      const outsideClickHandler = (event) => {
        if (!$(event.target).closest(selectContainer).length) {
          $(dropdown).removeClass('show');

          $(document).off('click.custom-select-outside');
        }
      };
    }
  }

  drawCellContent(rowStart, rowEnd, columnStart, columnEnd, text, type = 'text', borderWidths = [1, 1, 1, 1], _textOptions = {}) {
    const textOptions = {
      fontSize: _textOptions.fontSize ?? 12,
      minFontSize: _textOptions.minFontSize ?? 10,
      padding: _textOptions.padding ?? 5,
      textAlign: _textOptions.textAlign ?? 'left',
      bold: _textOptions.bold ?? false,
      textOrientation: _textOptions.textOrientation ?? 'horizontal',
    }

    textOptions.fontSize *= 1 / this.inputFieldHeightScale;
    textOptions.padding *= 1 / this.inputFieldWidthScale;


    if (this.checkRowsColumns(rowStart, rowEnd, columnStart, columnEnd)) {
      const leftBorderOffset = (borderWidths[3] / 2) - (borderWidths[3] % 2 == 0 ? 0.0 : 0.5);
      const topBorderOffset = (borderWidths[0] / 2) - (borderWidths[0] % 2 == 0 ? 0.0 : 0.5);
      const rightBorderOffset = (borderWidths[3] / 2) - (borderWidths[3] % 2 == 0 ? 0.5 : 0.0) + (borderWidths[1] / 2) - (borderWidths[1] % 2 == 0 ? 0.0 : 0.5);
      const bottomBorderOffset = (borderWidths[0] / 2) - (borderWidths[0] % 2 == 0 ? 0.0 : 0.5) + (borderWidths[2] / 2) - (borderWidths[2] % 2 == 0 ? 0.0 : 0.5);

      const x = (columnStart * this.cellWidth) + leftBorderOffset;
      const y = (rowStart * this.cellHeight) + topBorderOffset;
      const width = ((columnEnd - columnStart) * this.cellWidth) - rightBorderOffset;
      const height = ((rowEnd - rowStart) * this.cellHeight) - bottomBorderOffset;

      if (text && text.length > 0) {
        this.drawText(x, y, width, height, text, type, textOptions)
      }
    }
  }

  drawPathContent(rowStart, rowEnd, columnStart, columnEnd, internalPositionX, internalPositionY, internalPositionWith, internalPositionHeight, text, type = 'text', borderWidths = [1, 1, 1, 1], _textOptions = {}) {
    const textOptions = {
      fontSize: _textOptions.fontSize ?? 12,
      minFontSize: _textOptions.minFontSize ?? 10,
      padding: _textOptions.padding ?? 5,
      textAlign: _textOptions.textAlign ?? 'left',
      bold: _textOptions.bold ?? false,
      textOrientation: _textOptions.textOrientation ?? 'horizontal',
    }

    textOptions.fontSize *= 1 / this.inputFieldHeightScale;
    textOptions.padding *= 1 / this.inputFieldWidthScale;

    if (this.checkRowsColumns(rowStart, rowEnd, columnStart, columnEnd)) {
      const leftBorderOffset = (borderWidths[3] / 2) - (borderWidths[3] % 2 == 0 ? 0.0 : 0.5);
      const topBorderOffset = (borderWidths[0] / 2) - (borderWidths[0] % 2 == 0 ? 0.0 : 0.5);
      const rightBorderOffset = (borderWidths[3] / 2) - (borderWidths[3] % 2 == 0 ? 0.5 : 0.0) + (borderWidths[1] / 2) - (borderWidths[1] % 2 == 0 ? 0.0 : 0.5);
      const bottomBorderOffset = (borderWidths[0] / 2) - (borderWidths[0] % 2 == 0 ? 0.0 : 0.5) + (borderWidths[2] / 2) - (borderWidths[2] % 2 == 0 ? 0.0 : 0.5);

      const x = (columnStart * this.cellWidth) + leftBorderOffset;
      const y = (rowStart * this.cellHeight) + topBorderOffset;
      const width = ((columnEnd - columnStart) * this.cellWidth) - rightBorderOffset;
      const height = ((rowEnd - rowStart) * this.cellHeight) - bottomBorderOffset;

      const fieldX = x + (width * internalPositionX);
      const fieldY = y + (height * internalPositionY);
      const fieldWidth = (width * internalPositionWith);
      const fieldHeight = (height * internalPositionHeight);

      if (text && text.length > 0) {
        this.drawText(fieldX, fieldY, fieldWidth, fieldHeight, text, type, textOptions)
      }
    }
  }

  drawText(cellX, cellY, cellWidth, cellHeight, text, type, textOptions) {
    this.ctx.font = `${textOptions.bold ? 'bold' : ''} ${textOptions.fontSize}px sans-serif`;
    this.ctx.textBaseline = 'middle';
    this.ctx.fillStyle = "black";

    let textX = 0;
    let textY = 0;
    switch (type) {
      case 'text-area':
        textX = cellX + textOptions.padding;
        textY = cellY + textOptions.fontSize;

        this.ctx.textAlign = 'left';

        const lines = text.split('\n');
        let cursorY = textY;

        for (const line of lines) {
          let words = line.split(' ');
          let currentLine = '';

          for (let i = 0; i < words.length; i++) {
            let testLine = currentLine + words[i] + ' ';
            let testWidth = this.ctx.measureText(testLine).width;

            if (testWidth > cellWidth - (textOptions.padding * 2) && currentLine !== '') {
              this.ctx.fillText(currentLine.trim(), textX, cursorY);
              currentLine = words[i] + ' ';
              cursorY += textOptions.fontSize;
            } else {
              currentLine = testLine;
            }
          }

          // Draw remaining part of the line
          if (currentLine !== '' && cursorY < (textY + cellHeight - textOptions.padding - textOptions.fontSize)) {
            this.ctx.fillText(currentLine.trim(), textX, cursorY);
            cursorY += textOptions.fontSize;
          }
        }
        break;
      case 'text':
      default:
        switch (textOptions.textAlign) {
          case 'left':
            this.ctx.textAlign = 'left';
            textX = cellX + textOptions.padding;
            textY = cellY + (cellHeight / 2);
            break;
          case 'right':
            this.ctx.textAlign = 'right';
            textX = cellX + cellWidth - textOptions.padding;
            textY = cellY + (cellHeight / 2);
            break;
          case 'center':
          default:
            this.ctx.textAlign = 'center';
            textX = cellX + (cellWidth / 2);
            textY = cellY + (cellHeight / 2);
            break;
        }

        switch (textOptions.textOrientation) {
          case 'slanted':
            const lineHeight = textOptions.fontSize * 1.2;

            const letterWidths = [...text].map(char => this.ctx.measureText(char).width);
            const defaultHorizontalSpacing = letterWidths.reduce((a, b) => a + b, 0) / text.length;
            const defaultVerticalSpacing = lineHeight;

            const maxHorizontal = (cellWidth - (textOptions.padding * 2) - defaultHorizontalSpacing) / Math.max(1, text.length);
            const maxVertical = (cellHeight - (textOptions.padding * 2) - defaultVerticalSpacing) / Math.max(1, text.length);

            // Safety thresholds to avoid overlaps
            const minVerticalSpacing = textOptions.fontSize * 0.7;
            const minHorizontalSpacing = defaultHorizontalSpacing * 0.7;

            const verticalSpacing = Math.min(defaultVerticalSpacing, maxVertical);
            let horizontalSpacing = defaultHorizontalSpacing;

            if (verticalSpacing < defaultVerticalSpacing) {
              const totalHorizontal = defaultHorizontalSpacing * text.length;
              if (totalHorizontal > cellWidth - (textOptions.padding * 2)) {
                horizontalSpacing = Math.min(defaultHorizontalSpacing, maxHorizontal);
              }
            }

            // Fallback to horizontal if spacing too small
            if (verticalSpacing < minVerticalSpacing || horizontalSpacing < minHorizontalSpacing) {
              let metrics = this.ctx.measureText(text);
              let textWidth = metrics.width;

              while (textWidth >= (cellWidth - textOptions.padding * 2)) {
                text = text.substring(0, text.length - 1);

                metrics = this.ctx.measureText(text);
                textWidth = metrics.width;
              }

              this.ctx.fillText(text, textX, textY);
              break;
            }

            // Proceed with slanted rendering
            const totalTextHeight = verticalSpacing * (text.length - 1);
            const totalTextWidth = horizontalSpacing * (text.length);

            const startX = cellX + textOptions.padding + (cellWidth - totalTextWidth) / 2;
            const startY = cellY + (cellHeight - totalTextHeight) / 2;

            this.ctx.textAlign = 'center';

            for (let i = 0; i < text.length; i++) {
              const x = startX + i * horizontalSpacing;
              const y = startY + i * verticalSpacing;
              this.ctx.fillText(text[i], x, y);
            }
            break;
          case 'vertical':
            textY -= ((text.length * (textOptions.fontSize * 1.5)) / 2) - (textOptions.fontSize * 0.75);

            for (let i = 0; i < text.length; i++) {
              this.ctx.fillText(text[i], textX, textY + i * (textOptions.fontSize * 1.5));
            }
            break;
          case 'horizontal':
          default:
            const maxLines = Math.round(cellHeight / this.cellHeight);
            const inputLines = text.split('\n').slice(0, maxLines);

            textY -= ((inputLines.length * (textOptions.fontSize * 1.5)) / 2) - (textOptions.fontSize * 0.75);

            inputLines.forEach((inputLine, index) => {
              let metrics = this.ctx.measureText(inputLine);
              let textWidth = metrics.width;

              let textFont = Math.round(textOptions.fontSize);
              while (textWidth >= (cellWidth - textOptions.padding * 2)) {
                if (textFont > textOptions.minFontSize) {
                  textFont--;
                  this.ctx.font = `${textOptions.bold ? 'bold' : ''} ${textFont}px sans-serif`;
                } else {
                  this.ctx.font = `${textOptions.bold ? 'bold' : ''} ${textOptions.fontSize}px sans-serif`;
                  inputLine = inputLine.substring(0, inputLine.length - 1);
                }
                metrics = this.ctx.measureText(inputLine);
                textWidth = metrics.width;
              }

              this.ctx.fillText(inputLine, textX, textY + index * (textOptions.fontSize * 1.5));
            });
            break;
        }
        break;
    }
  }

  drawSvgShape(rowStart, rowEnd, columnStart, columnEnd, path, borderWidths = [1, 1, 1, 1], _shapeOptions = {}) {
    const shapeOptions = {
      padding: _shapeOptions.padding ?? 5,
    }

    // In order to get the scaled path to fit.
    shapeOptions.padding += 10;

    if (this.checkRowsColumns(rowStart, rowEnd, columnStart, columnEnd)) {
      const x = (columnStart * this.cellWidth) - (borderWidths[3] % 2 == 0 ? 0.0 : 0.5);
      const y = (rowStart * this.cellHeight) - (borderWidths[0] % 2 == 0 ? 0.0 : 0.5);
      const width = ((columnEnd - columnStart) * this.cellWidth) - (borderWidths[3] % 2 == 0 ? 0.5 : 0.0) + (borderWidths[1] % 2 == 0 ? 0.5 : 0.0);
      const height = ((rowEnd - rowStart) * this.cellHeight) - (borderWidths[0] % 2 == 0 ? 0.5 : 0.0) + (borderWidths[2] % 2 == 0 ? 0.5 : 0.0);

      this.ctx.strokeStyle = "black";

      if (borderWidths[0] > 0) {
        this.ctx.lineWidth = borderWidths[0];
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(x + width, y);
        this.ctx.stroke();
      }

      if (borderWidths[1] > 0) {
        this.ctx.lineWidth = borderWidths[1];
        this.ctx.beginPath();
        this.ctx.moveTo(x + width, y);
        this.ctx.lineTo(x + width, y + height);
        this.ctx.stroke();
      }

      if (borderWidths[2] > 0) {
        this.ctx.lineWidth = borderWidths[2];
        this.ctx.beginPath();
        this.ctx.moveTo(x + width, y + height);
        this.ctx.lineTo(x, y + height);
        this.ctx.stroke();
      }

      if (borderWidths[3] > 0) {
        this.ctx.lineWidth = borderWidths[3];
        this.ctx.beginPath();
        this.ctx.moveTo(x, y + height);
        this.ctx.lineTo(x, y);
        this.ctx.stroke();
      }

      const svgBounds = this.getSvgWidthAndHeight(path);

      const scale = Math.min(
        (width - shapeOptions.padding * 2) / svgBounds.width,
        (height - shapeOptions.padding * 2) / svgBounds.height
      );

      const scaledWidth = svgBounds.width * scale;
      const scaledHeight = svgBounds.height * scale;

      // Centering offsets
      const offsetX = x + (width - scaledWidth) / 2;
      const offsetY = y + (height - scaledHeight) / 2;

      this.ctx.fillStyle = 'black';
      this.ctx.strokeStyle = 'black';
      this.ctx.lineWidth = 1;

      this.ctx.save();
      this.ctx.translate(offsetX, offsetY);
      this.ctx.scale(scale, scale);
      this.ctx.translate(-svgBounds.x, -svgBounds.y);
      this.ctx.stroke(new Path2D(path));
      this.ctx.restore();
    }
  }

  checkRowsColumns(rowStart, rowEnd, columnStart, columnEnd) {
    if (rowStart < 0 || columnStart < 0) {
      console.log("rowStart or columnStart < 0");
      return false;
    }

    if (rowStart > rowEnd || columnStart > columnEnd) {
      console.log("rowStart <= rowEnd or columnStart <= columnEnd");
      return false;
    }

    if (rowEnd > this.rows || columnEnd > this.columns) {
      console.log("rowEnd > total rows or columnEnd > total columns");
      return false;
    }

    return true;
  }

  getSvgWidthAndHeight(svgPath) {
    const svgNS = "http://www.w3.org/2000/svg";

    // Create an off-screen SVG and path
    const tempSvg = document.createElementNS(svgNS, "svg");
    const tempPath = document.createElementNS(svgNS, "path");
    tempPath.setAttribute("d", svgPath);
    tempSvg.appendChild(tempPath);

    // Required for getBBox to work in all browsers
    tempSvg.setAttribute("xmlns", svgNS);
    tempSvg.setAttribute("width", "0");
    tempSvg.setAttribute("height", "0");
    tempSvg.style.position = "absolute";
    tempSvg.style.opacity = "0";
    tempSvg.style.pointerEvents = "none";
    document.body.appendChild(tempSvg);

    // Get bounding box
    const bbox = tempPath.getBBox();

    // Cleanup
    document.body.removeChild(tempSvg);

    return {
      width: bbox.width,
      height: bbox.height,
      x: bbox.x,
      y: bbox.y
    };
  }
}