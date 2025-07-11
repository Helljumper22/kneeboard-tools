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
      padding: _textOptions.padding ?? 5,
      textOrientation: _textOptions.textOrientation ?? 'horizontal',
    }

    if (this.checkRowsColumns(rowStart, rowEnd, columnStart, columnEnd)) {

      //[top, right, bottom, left]

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

      if (text) {
        this.ctx.font = `bold ${textOptions.fontSize}px sans-serif`;
        this.ctx.textBaseline = 'middle';
        this.ctx.fillStyle = "black";

        let textX = 0;
        let textY = 0;
        switch (textOptions.textAlign) {
          case 'left':
            this.ctx.textAlign = 'left';
            textX = x + textOptions.padding;
            textY = y + (height / 2);
            break;
          case 'right':
            this.ctx.textAlign = 'right';
            textX = x + width - textOptions.padding;
            textY = y + (height / 2);
            break;
          case 'center':
          default:
            this.ctx.textAlign = 'center';
            textX = x + (width / 2);
            textY = y + (height / 2);
            break;
        }

        if (textOptions.textOrientation == 'vertical') {
          textY -= ((text.length * (textOptions.fontSize * 1.5)) / 2) - (textOptions.fontSize * 0.75);

          for (let i = 0; i < text.length; i++) {
            this.ctx.fillText(text[i], textX, textY + i * (textOptions.fontSize * 1.5));
          }
        } else {

          let metrics = this.ctx.measureText(text);
          let textWidth = metrics.width;

          while (textWidth >= width) {
            text = text.substring(0, text.length - 1);

            metrics = this.ctx.measureText(text);
            textWidth = metrics.width;
          }

          this.ctx.fillText(text, textX, textY);
        }
      }
    }
  }

  drawTextFieldCell(rowStart, rowEnd, columnStart, columnEnd, id, type = 'text', text = null, borderWidths = [1, 1, 1, 1], _textOptions = {}) {
    if (this.checkRowsColumns(rowStart, rowEnd, columnStart, columnEnd)) {
      const textOptions = {
        textAlign: _textOptions.textAlign ?? 'left',
        fontSize: _textOptions.fontSize ?? 12,
        padding: _textOptions.padding ?? 5,
        bold: _textOptions.bold ?? false,
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
          $(`<textarea id="${id}">${text ?? ''}</textarea>`)
            .css({
              'top': `${y}px`,
              'left': `${x}px`,
              'width': `${width}px`,
              'height': `${height}px`,
              'font-size': `${textOptions.fontSize}px`,
              'line-height': `${textOptions.fontSize}px`, // Aligns the text with the canvas text, WTF.
              'padding': `${textOptions.padding}px`,
              'text-align': textOptions.textAlign,
              'font-weight': textOptions.bold ? 'bold' : 'normal'
            })
            .appendTo('.kneeboard-fields-container');
          break;
        case 'text':
        default:
          width -= textOptions.padding * 2
          $(`<input type="text" id="${id}" value="${text ?? ''}">`)
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
    }
  }

  drawSelectFieldCell(rowStart, rowEnd, columnStart, columnEnd, id, type = 'select', selectOptions = [], borderWidths = [1, 1, 1, 1], _textOptions = {}, dropDownSide = 'right') {
    if (this.checkRowsColumns(rowStart, rowEnd, columnStart, columnEnd)) {
      const textOptions = {
        fontSize: _textOptions.fontSize ?? 12,
        padding: _textOptions.padding ?? 5,
        bold: _textOptions.bold ?? false,
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
                <input type="text" class="custom-select-input" id="${id}" style="padding: 0 ${textOptions.padding}px" />
                <span class="custom-select-arrow ${dropDownSide}">▼</span>
              </div>
              <div class="custom-select-dropdown">
                <div class="custom-select-option">&nbsp;</div>
                ${selectOptions.map(option => `<div class="custom-select-option">${option}</div>`).join('')}
              </div>
            </div>`).css({
              'top': `${y}px`,
              'left': `${x}px`,
              'width': `${width}px`,
              'height': `${height}px`,
              'font-size': `${textOptions.fontSize}px`,
              'text-align': dropDownSide == 'left' ? 'right' : 'left',
              'font-weight': textOptions.bold ? 'bold' : 'normal',
            }).appendTo('.kneeboard-fields-container');
          break;
        case 'select':
        default:
          selectContainer =
            $(`<div class="custom-select-container" id="${id}">
              <div class="custom-select-display">
                <input type="text" class="custom-select-input disabled" id="${id}" style="padding: 0 ${textOptions.padding}px"/>
                <span class="custom-select-arrow ${dropDownSide}">▼</span>
              </div>
              <div class="custom-select-dropdown">
                <div class="custom-select-option"></div>
                ${selectOptions.map(option => `<div class="custom-select-option">${option}</div>`).join('')}
              </div>
            </div>`).css({
              'top': `${y}px`,
              'left': `${x}px`,
              'width': `${width}px`,
              'height': `${height}px`,
              'font-size': `${textOptions.fontSize}px`,
              'text-align': dropDownSide == 'left' ? 'right' : 'left',
              'font-weight': textOptions.bold ? 'bold' : 'normal',
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

        $(dropdown).find('.custom-select-option').off('click').on('click', function () {
          let text = $(this).text();
          if (text === '\u00A0') text = '';

          $(input).val(text).change();

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

  drawDynamicCellContent(rowStart, rowEnd, columnStart, columnEnd, text, type = 'text', borderWidths = [1, 1, 1, 1], _textOptions = {}) {
    const textOptions = {
      fontSize: _textOptions.fontSize ?? 12,
      padding: _textOptions.padding ?? 5,
      textAlign: _textOptions.textAlign ?? 'left',
      bold: _textOptions.bold ?? false,
    }

    textOptions.fontSize *= 1 / this.inputFieldHeightScale;
    textOptions.padding *= 1 / this.inputFieldWidthScale;

    if (this.checkRowsColumns(rowStart, rowEnd, columnStart, columnEnd)) {
      const x = (columnStart * this.cellWidth) - (borderWidths[3] % 2 == 0 ? 0.0 : 0.5);
      const y = (rowStart * this.cellHeight) - (borderWidths[0] % 2 == 0 ? 0.0 : 0.5);
      const width = ((columnEnd - columnStart) * this.cellWidth) - (borderWidths[3] % 2 == 0 ? 0.5 : 0.0) + (borderWidths[1] % 2 == 0 ? 0.5 : 0.0);
      const height = ((rowEnd - rowStart) * this.cellHeight) - (borderWidths[0] % 2 == 0 ? 0.5 : 0.0) + (borderWidths[2] % 2 == 0 ? 0.5 : 0.0);

      this.ctx.font = `${textOptions.bold ? 'bold' : ''} ${textOptions.fontSize}px sans-serif`;
      this.ctx.textBaseline = 'middle';
      this.ctx.fillStyle = "black";

      console.log(type);

      if (type == 'text-area') {
        const textX = x + textOptions.padding;
        const textY = y + textOptions.fontSize;

        this.ctx.textAlign = 'left';

        const lines = text.split('\n');
        let cursorY = textY;

        for (const line of lines) {
          let words = line.split(' ');
          let currentLine = '';

          for (let i = 0; i < words.length; i++) {
            let testLine = currentLine + words[i] + ' ';
            let testWidth = this.ctx.measureText(testLine).width;

            if (testWidth > (width * this.inputFieldHeightScale) + (textOptions.padding * 2) && currentLine !== '') {
              this.ctx.fillText(currentLine.trim(), textX, cursorY);
              currentLine = words[i] + ' ';
              cursorY += textOptions.fontSize;
            } else {
              currentLine = testLine;
            }
          }

          // Draw remaining part of the line
          if (currentLine !== '') {
            this.ctx.fillText(currentLine.trim(), textX, cursorY);
            cursorY += textOptions.fontSize;
          }
        }
      } else {
        let textX = 0;
        let textY = 0;
        switch (textOptions.textAlign) {
          case 'left':
            this.ctx.textAlign = 'left';
            textX = x + textOptions.padding;
            textY = y + (height / 2) + 1;
            break;
          case 'right':
            this.ctx.textAlign = 'right';
            textX = x + width - textOptions.padding;
            textY = y + (height / 2) + 1;
            break;
          case 'center':
          default:
            this.ctx.textAlign = 'center';
            textX = x + (width / 2);
            textY = y + (height / 2) + 1;
            break;
        }

        let metrics = this.ctx.measureText(text);
        let textWidth = metrics.width;

        while (textWidth >= width) {
          text = text.substring(0, text.length - 1);

          metrics = this.ctx.measureText(text);
          textWidth = metrics.width;
        }

        this.ctx.fillStyle = "black";
        this.ctx.fillText(text, textX, textY);
      }
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
}