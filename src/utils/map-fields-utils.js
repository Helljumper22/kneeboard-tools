class MapFieldsUtils {
    constructor(tabConstructor, tab, emptyComponents = true) {
        this.tabConstructor = tabConstructor;
        this.emptyComponents = emptyComponents;

        this.menuContainer = $(tab).find('.sidebar-component-list-container');
        this.componentListButtons = $(this.menuContainer).find('.component-list-buttons')
        this.componentContainer = $(tab).find('.sidebar-component-container');
        this.componentHeader = $(tab).find('.sidebar-component-header');
        this.componentDescription = $(tab).find('.sidebar-component-description');
    }

    displayComponentListButtons() {
        $(this.menuContainer).removeClass('hide');
        $(this.componentContainer).addClass('hide');

        $('.sidebar-component-button').remove();

        $(this.componentListButtons).empty();
        this.tabConstructor.mapComponentList.forEach(mapComponent => {
            const componentButton = $(`<button class="show-${mapComponent.id}-component-button">${mapComponent.label}</button>`);
            $(componentButton).off('click').on('click', () => this.displayComponent(mapComponent));

            $(this.componentListButtons).append(componentButton);
        });
    }

    displayComponent(mapComponent) {
        const componentData = this.tabConstructor.getComponentData(mapComponent);

        // Toggle visibility
        $(this.menuContainer).addClass('hide');
        $(this.componentContainer).removeClass('hide');

        // Update header and setup back button
        $(this.componentHeader).find('.sidebar-component-name').text(mapComponent.label);
        $(this.componentHeader).find('.sidebar-component-back-button')
            .off('click')
            .on('click', () => this.displayComponentListButtons());
        $(this.componentDescription).text(mapComponent.description ?? '');

        // Clear previous content
        $(this.componentContainer).find('.sidebar-component-fields-container, .sidebar-sub-components-container').remove();

        // Create and append form container
        const formContainer = $('<form class="sidebar-component-fields-container"></form>')
            .on('input', 'input, select', (e) => this.handleFieldChange(e, mapComponent))
            .on('change', '.color-picker', (e) => this.handleFieldChange(e, mapComponent))
            .on('click', '.add-button', (e) => this.handleAddField(e, mapComponent))
            .on('click', '.delete-button', (e) => this.handleDeleteField(e, mapComponent));

        $(this.componentContainer).append(formContainer);

        // Render fields with stored data
        this.renderFields(formContainer, mapComponent, componentData, mapComponent.id);
    }

    displaySubComponent(subComponent, data, parentComponent, fieldId) {
        // Toggle visibility
        $(this.menuContainer).addClass('hide');
        $(this.componentContainer).removeClass('hide');

        // Update header and setup back button
        $(this.componentHeader).find('.sidebar-component-name').text(subComponent.label);
        $(this.componentHeader).find('.sidebar-component-back-button')
            .off('click')
            .on('click', () => {
                this.displayComponent(parentComponent)
            });
        $(this.componentDescription).text(subComponent.description ?? '');

        // Clear previous content
        $(this.componentContainer).find('.sidebar-component-fields-container, .sidebar-sub-components-container').remove();

        /// TODO: Handle sub-component field change

        // Create and append form container
        const formContainer = $('<form class="sidebar-component-fields-container"></form>')
            .on('input', 'input, select', (e) => this.handleFieldChange(e, subComponent))
            .on('change', '.color-picker', (e) => this.handleFieldChange(e, subComponent))
            .on('click', '.add-button', (e) => this.handleAddField(e, subComponent))
            .on('click', '.delete-button', (e) => this.handleDeleteField(e, subComponent));

        $(this.componentContainer).append(formContainer);

        // Render fields with stored dataz
        this.renderFields(formContainer, subComponent, data, fieldId);
    }

    renderFields(container, component, data, componentId) {
        component.fields.forEach(field => {
            const fieldId = `${componentId}.${field.id}`;

            if (field.options) {
                if (field.options.addSubComponentButton) {
                    const headerButton = $(`<button class="sidebar-component-button" id="${fieldId}">${field.options.addSubComponentButton}</button>`);
                    $(headerButton).off('click').on('click', (e) => {
                        e.preventDefault();

                        const wrapper = $(event.target).parent('.sidebar-component-header').siblings('.sidebar-component-fields-container').children('.multiple-field-wrapper');
                        const fieldPath = [fieldId.split('.')[0]];

                        const newItemData = this.addField(component, field, fieldPath);

                        const index = wrapper.children('.multiple-field-item').length;
                        const itemContainer = this.createMultipleFieldItem(field, newItemData, fieldId, index);
                        wrapper.append(itemContainer);
                    });

                    $(container).siblings('.sidebar-component-header').append(headerButton);
                }
            }

            switch (field.type) {
                case 'button':
                    this.renderButton(container, field, data, component, fieldId);
                    break;
                case 'sub-component':
                    this.renderSubComponentButton(container, field, data, component, fieldId);
                    break;
                case 'multiple':
                    this.renderMultipleField(container, field, data, component, fieldId);
                    break;
                case 'hidden':
                    // Nothing !
                    break;
                default:
                    this.renderSingleField(container, field, data, fieldId);
                    break;
            }
        });
    }

    renderSingleField(container, field, data, fieldId) {
        // Handle both direct values and nested object values
        let value;
        if (typeof data === 'object' && data !== null) {
            value = data[field.id];
        } else {
            value = data;
        }
        value = value ?? field.default ?? '';

        const fieldHtml = this.createFieldHtml(field, fieldId, value);
        $(container).append(fieldHtml);
    }

    renderButton(container, field, data, parentComponent, fieldId) {
        const subComponentButton = $(`<button class="component-button" id="${fieldId}">${field.label}</button>`);
        $(subComponentButton).off('click').on('click', (e) => {
            e.preventDefault();
            field.clickFunction(field, data, parentComponent, fieldId)
        });

        $(container).append(subComponentButton);
    }

    renderSubComponentButton(container, field, data, parentComponent, fieldId) {
        const subComponentButton = $(`<button class="show-sub-component-button" id="${fieldId}">${field.label}</button>`);
        $(subComponentButton).off('click').on('click', (e) => {
            e.preventDefault();
            this.displaySubComponent(field, data, parentComponent, fieldId);
        });

        $(container).append(subComponentButton);
    }

    renderMultipleField(container, field, data, component, fieldId) {
        const wrapper = $(`<div class="multiple-field-wrapper" data-field-id="${fieldId}"></div>`);

        // Handle different data structures based on field nesting
        let items = [];
        if (Array.isArray(data)) {
            // Direct array (like mob data)
            items = data;
        } else {
            // Get the field-specific data
            const fieldData = data?.[field.id];
            if (Array.isArray(fieldData)) {
                // Nested array field (like lines.line)
                items = fieldData;
            } else if (fieldData) {
                // Single item
                items = [fieldData];
            } else {
                // No data, create default item
                items = this.emptyComponents ? [{}] : [];
            }
        }

        items.forEach((itemData, index) => {
            const itemContainer = this.createMultipleFieldItem(field, itemData, fieldId, index);
            wrapper.append(itemContainer);
        });

        if (field.options?.repeatable) {
            const addButton = $('<button class="add-button">＋</button>');
            wrapper.append(addButton);
        }

        if (field.options?.sortable) {
            // Capture references for the callbacks
            const self = this;
            const componentId = fieldId.split('.')[0];

            wrapper.sortable({
                items: '> .multiple-field-item',
                handle: '.drag-handle',
                axis: 'y',
                start: (e, ui) => {
                    ui.item.addClass('dragging');
                    // Store the original index on each item so we can rebuild the array on stop
                    wrapper.find('.multiple-field-item').each((idx, el) => {
                        $(el).data('old-index', $(el).data('index'));
                    });
                },
                stop: (e, ui) => {
                    ui.item.removeClass('dragging');

                    // Build new ordered array from the DOM order using old-index markers
                    const itemsInOrder = wrapper.find('> .multiple-field-item').toArray();

                    // Persist reordered data into the top-level component storage
                    let componentData = this.tabConstructor.getComponentData(componentId);

                    const pathParts = fieldId.split('.').slice(1); // e.g. ['line','points']

                    // Collect parent indices (closest multiple-field-item ancestors), used to pick elements from array parents
                    const parentItems = wrapper.parents('.multiple-field-item').toArray().reverse();
                    const parentIndices = parentItems.map(it => $(it).data('index'));

                    // Locate the target array inside the authoritative componentData
                    let target = componentData;
                    let parentCursor = 0;

                    for (let i = 0; i < pathParts.length - 1; i++) {
                        const part = pathParts[i];
                        if (!target[part]) target[part] = [];

                        if (Array.isArray(target[part])) {
                            const idx = parentIndices[parentCursor++] ?? 0;
                            if (!target[part][idx]) target[part][idx] = {};
                            target = target[part][idx];
                        } else {
                            target = target[part];
                        }
                    }

                    const lastPart = pathParts[pathParts.length - 1];
                    let sourceArray = null;

                    if (pathParts.length === 0) {
                        // Nothing to do
                        sourceArray = Array.isArray(componentData) ? componentData : null;
                    } else if (lastPart) {
                        sourceArray = target[lastPart];
                    }

                    if (!Array.isArray(sourceArray)) {
                        // Fallback: try to derive from closure 'data' or existing structure
                        sourceArray = Array.isArray(data) ? data : (data?.[field.id] ? data[field.id] : []);
                    }

                    const newOrdered = [];
                    itemsInOrder.forEach((el) => {
                        const oldIndex = $(el).data('old-index');
                        if (oldIndex === undefined || oldIndex === null) return;
                        if (oldIndex >= 0 && oldIndex < sourceArray.length) {
                            newOrdered.push(sourceArray[oldIndex]);
                        }
                    });

                    // Replace the array in the authoritative componentData
                    if (pathParts.length === 0) {
                        if (Array.isArray(componentData)) {
                            componentData.length = 0;
                            newOrdered.forEach(it => componentData.push(it));
                        }
                    } else {
                        target[lastPart] = newOrdered;
                    }

                    // Update DOM indices to match new order
                    wrapper.find('.multiple-field-item').each((idx, el) => {
                        $(el).data('index', idx);
                    });

                    this.tabConstructor.saveComponentData(componentId, componentData);

                    this.tabConstructor.update();
                }
            });
        }

        $(container).append(wrapper);
    }

    createMultipleFieldItem(field, data, fieldId, index) {
        const itemContainer = $(`<div class="multiple-field-item" data-index="${index}"></div>`);

        // Add drag handle if sortable
        if (field.options?.sortable) {
            const dragHandle = $('<div class="drag-handle">:::</div>');
            itemContainer.append(dragHandle);
        }

        this.renderFields(itemContainer, field, data, fieldId);

        if (field.options?.repeatable || field.options?.deletable) {
            const deleteButton = $('<button class="delete-button">−</button>');
            itemContainer.append(deleteButton);
        }

        return itemContainer;
    }

    createFieldHtml(field, fieldId, value) {
        const wrapper = $(`<div class="field"></div>`);
        wrapper.append(`<label>${field.label}</label>`);

        let input;
        switch (field.type) {
            case 'text':
                input = $(`<input type="text" id="${fieldId}" class="field-input" value="${value}">`);
                break;
            case 'number':
                input = $(`<input type="number" id="${fieldId}" class="field-input" value="${value}">`);
                break;
            case 'checkbox':
                input = $(`<input type="checkbox" id="${fieldId}" class="field-input" ${value ? 'checked' : ''}>`);
                break;
            case 'range':
                input = $(`<input type="range" id="${fieldId}" class="field-input" 
                    ${field.options?.min ? `min="${field.options.min}"` : ''} 
                    ${field.options?.max ? `max="${field.options.max}"` : ''} 
                    value="${value}">`);
                break;
            case 'select':
                input = $(`<select id="${fieldId}" class="field-input"></select>`);
                Object.entries(field.options).forEach(([optionId, optionLabel]) => {
                    input.append(`<option value="${optionId}" ${value === optionId ? 'selected' : ''}>${optionLabel}</option>`);
                });
                break;
            case 'color':
                input = $(`<button id="${fieldId}" class="color-picker"></button>`);
                this.initColorPicker(input[0], field.options?.transparency ?? false);
                input[0].jscolor.fromString(value);
                break;
        }

        wrapper.append(input);
        return wrapper;
    }

    handleFieldChange(event, mapComponent) {
        event.preventDefault();

        const field = $(event.target);
        const fieldId = field.attr('id');
        const value = field.attr('type') === 'checkbox' ? field.is(':checked') : field.val();

        let componentData = this.tabConstructor.getComponentData(mapComponent);
        const fieldPath = fieldId.split('.');
        const componentId = fieldPath.shift(); // Remove component id

        // Initialize data structure if needed
        if (!componentData) {
            componentData = mapComponent.type === 'multiple' ? [] : {};
        }

        // Get all parent multiple-field-items and their indices
        let parentItems = field.parents('.multiple-field-item').toArray().reverse();
        let parentIndices = parentItems.map(item => $(item).data('index'));

        // Navigate through the data structure
        let currentData = componentData;
        let currentFieldDef = { fields: mapComponent.fields };
        let pathParts = fieldPath.slice(0, -1); // All parts except the last one
        let currentIndex = 0;

        for (let i = 0; i < pathParts.length; i++) {
            const pathPart = pathParts[i];
            currentFieldDef = currentFieldDef.fields.find(f => f.id === pathPart);

            if (currentFieldDef?.type === 'multiple') {
                if (!currentData[pathPart]) {
                    currentData[pathPart] = [];
                }

                const index = parentIndices[currentIndex++];
                if (!currentData[pathPart][index]) {
                    currentData[pathPart][index] = {};
                }
                currentData = currentData[pathPart][index];
            } else {
                if (!currentData[pathPart]) {
                    currentData[pathPart] = {};
                }
                currentData = currentData[pathPart];
            }
        }

        // Set the final value
        const fieldName = fieldPath[fieldPath.length - 1];
        if (field.attr('type') === 'number' || field.attr('type') === 'range') {
            currentData[fieldName] = value === '' ? '' : parseFloat(value);
        } else {
            currentData[fieldName] = value;
        }

        if (this.tabConstructor.onFieldChange) {
            this.tabConstructor.onFieldChange(fieldId, fieldName, currentData);
        }

        const fieldDef = this.findFieldByPath(mapComponent, fieldId);
        if (fieldDef?.onChangeFunction) {
            fieldDef.onChangeFunction(value, currentData, fieldId);
        }

        this.tabConstructor.saveComponentData(mapComponent, componentData);

        this.tabConstructor.update();
    }

    handleAddField(event, mapComponent) {
        event.preventDefault();

        const wrapper = $(event.target).closest('.multiple-field-wrapper');
        const fieldId = wrapper.data('field-id');
        const fieldPath = fieldId.split('.').slice(1); // Remove component id
        const field = this.findFieldByPath(mapComponent, fieldId);

        const newItemData = this.addField(mapComponent, field, fieldPath);

        const index = wrapper.children('.multiple-field-item').length;
        const itemContainer = this.createMultipleFieldItem(field, newItemData, fieldId, index);
        wrapper.children('.add-button').before(itemContainer);
    }

    handleDeleteField(event, mapComponent) {
        event.preventDefault();

        const item = $(event.target).closest('.multiple-field-item');
        const wrapper = item.closest('.multiple-field-wrapper');
        const fieldId = wrapper.data('field-id');
        const pathParts = fieldId.split('.').slice(1); // Remove component id
        const index = item.data('index');

        let componentData = this.tabConstructor.getComponentData(mapComponent);

        try {
            // Collect parent indices from outermost to innermost (.multiple-field-item ancestors of the wrapper, not the item itself)
            const parentItems = wrapper.parents('.multiple-field-item').toArray().reverse();
            const parentIndices = parentItems.map(it => $(it).data('index'));

            // Walk to the parent container that holds the target array
            let target = componentData;
            let parentCursor = 0;

            for (let i = 0; i < pathParts.length - 1; i++) {
                const part = pathParts[i];

                if (Array.isArray(target)) {
                    // target is already an array, index into it
                    const idx = parentIndices[parentCursor++] ?? 0;
                    if (!target[idx]) target[idx] = {};
                    target = target[idx];
                    i--; // re-process this pathPart against the now-dereferenced object
                    continue;
                }

                if (!target[part]) target[part] = [];

                if (Array.isArray(target[part])) {
                    const idx = parentIndices[parentCursor++] ?? 0;
                    if (!target[part][idx]) target[part][idx] = {};
                    target = target[part][idx];
                } else {
                    target = target[part];
                }
            }

            const lastPart = pathParts[pathParts.length - 1];

            // Perform deletion
            if (pathParts.length === 0) {
                if (Array.isArray(componentData) && index >= 0 && index < componentData.length) {
                    componentData.splice(index, 1);
                }
            } else if (target && Array.isArray(target[lastPart]) && index >= 0 && index < target[lastPart].length) {
                target[lastPart].splice(index, 1);
            }

            // Remove the item from DOM
            item.remove();

            // Rebuild indices on remaining DOM items
            wrapper.find('> .multiple-field-item').each((idx, el) => {
                $(el).data('index', idx);
            });

            // If wrapper is now empty, insert a default item
            if (wrapper.find('> .multiple-field-item').length === 0) {
                const field = this.findFieldByPath(mapComponent, fieldId);

                let newItemData = {};
                if (field && field.fields) {
                    field.fields.forEach(subField => {
                        if (subField.type === 'multiple') {
                            const childDefault = {};
                            if (subField.fields) {
                                subField.fields.forEach(grandChild => {
                                    childDefault[grandChild.id] = grandChild.default ?? '';
                                });
                            }
                            newItemData[subField.id] = [childDefault];
                        } else {
                            newItemData[subField.id] = subField.default ?? '';
                        }
                    });
                }

                const itemContainer = this.createMultipleFieldItem(field, newItemData, fieldId, 0);
                wrapper.children('.add-button').before(itemContainer);

                if (pathParts.length === 0) {
                    if (!Array.isArray(componentData)) componentData = [];
                    componentData.push(newItemData);
                } else {
                    if (!target[lastPart]) target[lastPart] = [];
                    target[lastPart].push(newItemData);
                }
            }

            this.tabConstructor.saveComponentData(mapComponent, componentData);
            this.tabConstructor.update();

        } catch (err) {
            console.error('Error deleting item:', err);
        }
    }

    selectField(fieldPath) {
        const [fieldIdFirst, ...remainingPath] = fieldPath;
        let fieldId = fieldIdFirst;

        let component = $(this.componentContainer).find('.sidebar-component-fields-container');
        remainingPath.forEach(field => {
            if (typeof field == 'string') {
                fieldId += '.' + field;
                component = component.find(`.multiple-field-wrapper[data-field-id='${fieldId}']`)
            } else if (typeof field == 'number') {
                component = component.find(`.multiple-field-item[data-index='${field}']`)
            }
        });

        $(component).addClass('selected');
        component[0]?.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    }

    addField(mapComponent, field, fieldPath, data = null) {
        let componentData = this.tabConstructor.getComponentData(mapComponent);
        if (!componentData) {
            componentData = mapComponent.type === 'multiple' ? [] : {};
        }

        // Build new item with defaults
        let newItemData = {};
        if (field.fields) {
            field.fields.forEach(subField => {
                if (subField.type === 'button' || subField.type === 'hidden') return;
                if (subField.type === 'multiple') {
                    newItemData[subField.id] = this.emptyComponents ? [{}] : [];
                } else {
                    newItemData[subField.id] = subField.default ?? '';
                }
            });
        }

        // Merge provided data over defaults
        if (data) {
            if (typeof data === 'object') {
                Object.keys(data).forEach(k => {
                    newItemData[k] = data[k];
                });
            } else {
                newItemData = data
            }
        }

        // Traverse to the correct location and push
        let currentData = componentData;
        for (let i = 0; i < fieldPath.length - 1; i++) {
            const pathPart = fieldPath[i];
            if (!isNaN(pathPart)) {
                // numeric index — traverse into the array
                currentData = currentData[parseInt(pathPart)];
            } else {
                if (!currentData[pathPart]) currentData[pathPart] = [];
                currentData = currentData[pathPart];
            }
        }

        const lastPath = fieldPath[fieldPath.length - 1];
        if (!currentData[lastPath]) currentData[lastPath] = [];
        if (field.type == 'multiple') {
            currentData[lastPath].push(newItemData);
        } else {
            currentData[lastPath] = newItemData;
        }

        this.tabConstructor.saveComponentData(mapComponent, componentData);
        this.tabConstructor.update();

        return newItemData;
    }

    findFieldByPath(mapComponent, fieldId) {
        const path = fieldId.split('.').slice(1); // Remove component id
        let current = { fields: mapComponent.fields };

        for (const part of path) {
            if (!isNaN(part)) continue; // skip array indices
            if (!current.fields) return null;
            current = current.fields.find(f => f.id === part);
            if (!current) return null;
        }

        return current;
    }

    findParentFieldByPath(mapComponent, fieldId) {
        const path = fieldId.split('.').slice(1); // Remove component id
        if (path.length <= 1) return null;

        let current = { fields: mapComponent.fields };
        // Go up to the parent
        for (let i = 0; i < path.length - 1; i++) {
            current = current.fields.find(f => f.id === path[i]);
            if (!current) return null;
        }

        return current;
    }

    initColorPicker(element, transparency = false) {
        new JSColor(element, {
            value: '#000000',
            backgroundColor: '#1e1e1e',
            borderColor: '#444',
            borderRadius: 4,
            format: transparency ? 'hexa' : 'hex',
            onInput: function () {
                if (transparency) {
                    element.value = this.toHEXAString();
                } else {
                    element.value = this.toHEXString();
                }
                element.dispatchEvent(new Event('change', { bubbles: true }));
            },
            palette: [
                '#0044ff',
                '#00a7ff',
                '#d10000',
                '#ff4444',
                '#0c6f00',
                '#119f00',
                '#ae6500',
                '#ab9b00',
                '#931568',
                '#ff5cbd',
                '#5d0281',
                '#8c0ac2',
                '#532c00',
                '#8a4900',
                '#545454',
                '#000000'
            ],
            paletteCols: 8,
        });
    }
}