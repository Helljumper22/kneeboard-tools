class MapFieldsUtils {
    constructor(bullseyeMap, tab) {
        this.bullseyeMap = bullseyeMap;

        this.menuContainer = $(tab).find('.bullseye-map-component-list-container');
        this.componentListButtons = $(this.menuContainer).find('.component-list-buttons')
        this.componentContainer = $(tab).find('.bullseye-map-component-container');
        this.componentHeader = $(tab).find('.bullseye-map-component-header');
        this.componentDescription = $(tab).find('.bullseye-map-component-description');
    }

    displayComponentListButtons() {
        $(this.menuContainer).removeClass('hide');
        $(this.componentContainer).addClass('hide');

        $(this.componentListButtons).empty();
        this.bullseyeMap.mapComponentList.forEach(mapComponent => {
            const componentButton = $(`<button class="show-${mapComponent.id}-component-button">${mapComponent.label}</button>`);
            $(componentButton).off('click').on('click', () => this.displayComponent(mapComponent));

            $(this.componentListButtons).append(componentButton);
        });
    }

    displayComponent(mapComponent) {
        // Toggle visibility
        $(this.menuContainer).addClass('hide');
        $(this.componentContainer).removeClass('hide');

        // Update header and setup back button
        $(this.componentHeader).find('.bullseye-map-component-name').text(mapComponent.label);
        $(this.componentHeader).find('.bullseye-map-component-back-button')
            .off('click')
            .on('click', () => this.displayComponentListButtons());
        $(this.componentDescription).text(mapComponent.description ?? '');

        // Clear previous content
        $(this.componentContainer).find('.bullseye-map-component-fields-container, .bullseye-map-subcomponents-container').remove();


        // Create and append form container
        const formContainer = $('<form class="bullseye-map-component-fields-container"></form>')
            .on('input', 'input, select', (e) => this.handleFieldChange(e, mapComponent))
            .on('change', '.color-picker', (e) => this.handleFieldChange(e, mapComponent))
            .on('click', '.add-button', (e) => this.handleAddField(e, mapComponent))
            .on('click', '.delete-button', (e) => this.handleDeleteField(e, mapComponent));

        $(this.componentContainer).append(formContainer);

        // Render fields with stored data
        const componentData = this.bullseyeMap.getComponentData(mapComponent);
        this.renderFields(formContainer, mapComponent.fields, componentData, mapComponent.id);
    }

    renderFields(container, fields, data, parentId) {
        fields.forEach(field => {
            const fieldId = `${parentId}.${field.id}`;

            if (field.type === 'multiple') {
                this.renderMultipleField(container, field, data, fieldId);
            } else {
                this.renderSingleField(container, field, data, fieldId);
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

    renderMultipleField(container, field, data, fieldId) {
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
                items = [{}];
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
                    let componentData = this.bullseyeMap.getComponentData(componentId);

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

                    this.bullseyeMap.saveComponentData(componentId, componentData);

                    this.bullseyeMap.updateMap();
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

        this.renderFields(itemContainer, field.fields, data, fieldId);

        if (field.options?.repeatable) {
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

        let data = this.bullseyeMap.getComponentData(mapComponent);
        const fieldPath = fieldId.split('.');
        const componentId = fieldPath.shift(); // Remove component id

        // Initialize data structure if needed
        if (!data) {
            data = mapComponent.type === 'multiple' ? [] : {};
        }

        // Get all parent multiple-field-items and their indices
        let parentItems = field.parents('.multiple-field-item').toArray().reverse();
        let parentIndices = parentItems.map(item => $(item).data('index'));

        // Navigate through the data structure
        let currentData = data;
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

        this.bullseyeMap.saveComponentData(mapComponent, data);

        this.bullseyeMap.updateMap();
    }

    handleAddField(event, mapComponent) {
        event.preventDefault();

        const wrapper = $(event.target).closest('.multiple-field-wrapper');
        const fieldId = wrapper.data('field-id');
        const fieldPath = fieldId.split('.').slice(1); // Remove component id
        const field = this.findFieldByPath(mapComponent, fieldId);

        // Get current data
        let data = this.bullseyeMap.getComponentData(mapComponent);
        if (!data) {
            data = mapComponent.type === 'multiple' ? [] : {};
        }

        const index = wrapper.children('.multiple-field-item').length;

        // Traverse to the correct location in the data structure
        let currentData = data;
        for (let i = 0; i < fieldPath.length - 1; i++) {
            const pathPart = fieldPath[i];
            if (!currentData[pathPart]) {
                currentData[pathPart] = Array.isArray(currentData) ? {} : [];
            }
            currentData = currentData[pathPart];
        }

        // Create new item with proper structure
        let newItemData = {};
        if (field.fields) {
            field.fields.forEach(subField => {
                if (subField.type === 'multiple') {
                    // For nested multiple fields, create a single empty child so
                    // there is always at least one child (e.g. points in a line)
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

        // Add the new item
        const lastPath = fieldPath[fieldPath.length - 1];
        if (!currentData[lastPath]) {
            currentData[lastPath] = [];
        }
        currentData[lastPath].push(newItemData);

        const itemContainer = this.createMultipleFieldItem(field, newItemData, fieldId, index);
        wrapper.children('.add-button').before(itemContainer);

        this.bullseyeMap.saveComponentData(mapComponent, data);

        this.bullseyeMap.updateMap();
    }

    handleDeleteField(event, mapComponent) {
        event.preventDefault();

        const item = $(event.target).closest('.multiple-field-item');
        const wrapper = item.closest('.multiple-field-wrapper');
        const fieldId = wrapper.data('field-id');
        const pathParts = fieldId.split('.').slice(1); // Remove component id
        const index = item.data('index');

        let componentData = this.bullseyeMap.getComponentData(mapComponent);

        try {
            // Collect parent indices for nested multiple items
            const parentItems = wrapper.parents('.multiple-field-item').toArray().reverse();
            const parentIndices = parentItems.map(it => $(it).data('index'));

            // Walk to the parent container that holds the target array
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

            // Perform deletion if possible
            if (pathParts.length === 0) {
                // top-level array
                if (Array.isArray(componentData) && index >= 0 && index < componentData.length) {
                    componentData.splice(index, 1);
                }
            } else if (target && Array.isArray(target[lastPart]) && index >= 0 && index < target[lastPart].length) {
                target[lastPart].splice(index, 1);
            }

            // Remove the item from DOM
            item.remove();

            // If this was the last item in the wrapper, create a default child and push to storage
            if (wrapper.find('.multiple-field-item').length === 0) {
                const field = this.findFieldByPath(mapComponent, fieldId);

                // Create new item with proper structure
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

                // Ensure target array exists and push
                if (pathParts.length === 0) {
                    if (!Array.isArray(componentData)) componentData = [];
                    componentData.push(newItemData);
                } else {
                    if (!target[lastPart]) target[lastPart] = [];
                    target[lastPart].push(newItemData);
                }
            } else {
                // Update indices of remaining items
                wrapper.find('.multiple-field-item').each((idx, el) => {
                    $(el).data('index', idx);
                });
            }

            this.bullseyeMap.saveComponentData(mapComponent, componentData);

            this.bullseyeMap.updateMap();
        } catch (err) {
            console.error('Error deleting item:', err);
        }
    }

    findFieldByPath(mapComponent, fieldId) {
        const path = fieldId.split('.').slice(1); // Remove component id
        let current = { fields: mapComponent.fields };

        for (const part of path) {
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