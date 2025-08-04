const GCI_darkBackground = '#D9D9D9'

const GCI_1 = {
    id: 'GCI-page-1',
    _name: 'GCI kneeboard page 1',
    rows: 44,
    columns: 19,
    // ----------------================ textCells ================----------------
    textCells: [
        // Row 1
        {
            _name: 'Date',
            _description: 'Date text',
            text: 'DATE',
            position: [0, 1, 0, 2],
            borderWidths: [2, 0, 2, 2],
            backgroundColor: GCI_darkBackground
        },
    ],
    // ----------------================ textFieldCells ================----------------
    textFieldCells: [
        // Row 1
        {
            id: 'date',
            _description: 'Date text field',
            position: [0, 1, 2, 5],
            borderWidths: [2, 2, 2, 0],
            backgroundColor: GCI_darkBackground
        },
    ]
}

const GCI = {
    id: 'GCI',
    name: 'GCI',
    pages: [GCI_1]
};