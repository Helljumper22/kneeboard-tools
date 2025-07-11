const darkBackground = '#D9D9D9'
const lineupOptions = ['ECHL L', 'ECHL R', 'BAN L', 'BAN R', 'STAG L', 'STAG R'];
const takeoffOptions = ['VFR 1', 'VFR 2', 'IFR 1', 'IFR 2'];
const formationOptions = ['ECHL L', 'ECHL R', 'F4 L', 'F4 R', 'FW l', 'FW R', 'WEDGE L', 'WEDGE R', 'BTL L', 'BTL R', 'BTL 4 L', 'BTL 4 R', 'FL 4 L', 'FL 4 R'];

const M2000C_1 = {
    id: 'M2000C-page-1',
    _name: 'Mirage 2000C kneeboard page 1',
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
            backgroundColor: darkBackground
        },
        {
            _name: 'Mission name',
            _description: 'Mission name text',
            text: 'MSN ',
            position: [0, 1, 5, 7],
            borderWidths: [2, 0, 2, 2]
        },
        {
            _name: 'Package ID',
            _description: 'Package ID text',
            text: 'PKG',
            position: [0, 1, 12, 14],
            borderWidths: [2, 0, 2, 2]
        },
        {
            _name: 'Kneeboard version',
            _description: 'Kneeboard version text',
            text: 'VER',
            position: [0, 1, 16, 17],
            borderWidths: [2, 0, 2, 2]
        },
        // Row 2
        {
            _name: 'Pilots',
            _description: 'Pilots text',
            text: 'PILOTS',
            position: [1, 2, 0, 2],
            borderWidths: [2, 2, 2, 1]
        },
        {
            _name: 'Callsign',
            _description: 'Callsign text',
            text: 'CALLSIGN',
            position: [1, 2, 2, 6],
            borderWidths: [2, 1, 2, 2]
        },
        {
            _name: 'Pilot number',
            _description: 'Pilot number text',
            text: 'No',
            position: [1, 2, 6, 7],
            borderWidths: [2, 1, 2, 1]
        },
        {
            _name: 'A/C number',
            _description: 'A/C number text',
            text: 'A/C',
            position: [1, 2, 7, 9],
            borderWidths: [2, 1, 2, 1]
        },
        {
            _name: 'RADAR channel',
            _description: 'RADAR channel text',
            text: 'RDR',
            position: [1, 2, 9, 10],
            borderWidths: [2, 1, 2, 1]
        },
        {
            _name: 'Yardstick 1 channel',
            _description: 'Yardstick 1 channel text',
            text: 'AA1',
            position: [1, 2, 10, 12],
            borderWidths: [2, 1, 2, 1]
        },
        {
            _name: 'Yardstick 2 channel',
            _description: 'Yardstick 2 channel text',
            text: 'AA2',
            position: [1, 2, 12, 14],
            borderWidths: [2, 1, 2, 1]
        },
        {
            _name: 'IFF mode 3',
            _description: 'IFF mode 3 text',
            text: 'IFF3',
            position: [1, 2, 14, 16],
            borderWidths: [2, 1, 2, 1]
        },
        {
            _name: 'IFF mode 1',
            _description: 'IFF mode 1 text',
            text: 'IFF1',
            position: [1, 2, 16, 17],
            borderWidths: [2, 1, 2, 1]
        },
        {
            _name: 'Altitude block',
            _description: 'Altitude block text',
            text: 'ALT',
            position: [1, 2, 17, 19],
            borderWidths: [2, 1, 2, 1]
        },
        // Row 9
        {
            _name: 'Step time',
            _description: 'Step time text',
            text: 'STEP',
            position: [8, 9, 0, 2],
            borderWidths: [2, 0, 1, 2]
        },
        {
            _name: 'Check time',
            _description: 'Check time text',
            text: 'CHECK/SUP',
            position: [8, 9, 4, 7],
            borderWidths: [2, 0, 1, 1]
        },
        {
            _name: 'Taxi time',
            _description: 'Taxi time text',
            text: 'TAXI',
            position: [8, 9, 9, 11],
            borderWidths: [2, 0, 1, 1]
        },
        {
            _name: 'Take-off time',
            _description: 'Take-off time text',
            text: 'T/OFF',
            position: [8, 9, 14, 16],
            borderWidths: [2, 0, 1, 1]
        },
        // Row 11
        {
            _name: 'SLOT/VUL time',
            _description: 'SLOT/VUL time text',
            text: 'SLOT/VUL',
            position: [10, 11, 0, 3],
            borderWidths: [1, 0, 2, 2]
        },
        {
            _name: 'Push time',
            _description: 'Push time text',
            text: 'PUSH',
            position: [10, 11, 9, 11],
            borderWidths: [1, 0, 2, 1]
        },
        // Row 12-14
        {
            _name: 'BAS',
            _description: 'BAS text',
            text: 'BAS',
            position: [11, 14, 0, 1],
            borderWidths: [2, 1, 2, 2],
            textOrientation: 'vertical',
            backgroundColor: darkBackground
        },
        {
            _name: 'RAM',
            _description: 'RAM text',
            text: 'RAM',
            position: [11, 14, 4, 5],
            borderWidths: [2, 1, 2, 2],
            textOrientation: 'vertical',
            backgroundColor: darkBackground
        },
        // Row 12
        {
            _name: 'BAS altitude',
            _description: 'BAS altitude text',
            text: 'ALT',
            position: [11, 12, 1, 2],
            borderWidths: [2, 1, 1, 1],
        },
        {
            _name: 'BAS heading',
            _description: 'BAS heading text',
            text: 'HDG',
            position: [11, 12, 2, 3],
            borderWidths: [2, 1, 1, 1],
        },
        {
            _name: 'BAS number',
            _description: 'BAS number text',
            text: 'NBR',
            position: [11, 12, 3, 4],
            borderWidths: [2, 2, 1, 1],
        },
        {
            _name: 'Ramrod 0',
            _description: 'Ramrod 0 text',
            text: '0',
            position: [11, 12, 5, 6],
            borderWidths: [2, 1, 1, 1],
        },
        {
            _name: 'Ramrod 1',
            _description: 'Ramrod 1 text',
            text: '1',
            position: [11, 12, 6, 7],
            borderWidths: [2, 1, 1, 1],
        },
        {
            _name: 'Ramrod 2',
            _description: 'Ramrod 2 text',
            text: '2',
            position: [11, 12, 7, 8],
            borderWidths: [2, 1, 1, 1],
        },
        {
            _name: 'Ramrod 3',
            _description: 'Ramrod 3 text',
            text: '3',
            position: [11, 12, 8, 9],
            borderWidths: [2, 1, 1, 1],
        },
        {
            _name: 'Ramrod 4',
            _description: 'Ramrod 4 text',
            text: '4',
            position: [11, 12, 9, 10],
            borderWidths: [2, 1, 1, 1],
        },
        {
            _name: 'Ramrod 5',
            _description: 'Ramrod 5 text',
            text: '5',
            position: [11, 12, 10, 11],
            borderWidths: [2, 1, 1, 1],
        },
        {
            _name: 'Ramrod 6',
            _description: 'Ramrod 6 text',
            text: '6',
            position: [11, 12, 11, 12],
            borderWidths: [2, 1, 1, 1],
        },
        {
            _name: 'Ramrod 7',
            _description: 'Ramrod 7 text',
            text: '7',
            position: [11, 12, 12, 13],
            borderWidths: [2, 1, 1, 1],
        },
        {
            _name: 'Ramrod 8',
            _description: 'Ramrod 8 text',
            text: '8',
            position: [11, 12, 13, 14],
            borderWidths: [2, 1, 1, 1],
        },
        {
            _name: 'Ramrod 9',
            _description: 'Ramrod 9 text',
            text: '9',
            position: [11, 12, 14, 15],
            borderWidths: [2, 2, 1, 1],
        },
        {
            _name: 'Authenticate',
            _description: 'Authenticate text',
            text: 'AUTHENTICATE',
            position: [11, 12, 15, 19],
            borderWidths: [2, 2, 1, 2],
            backgroundColor: darkBackground
        },
        // Row 15
        {
            _name: 'Inter freq 1',
            _description: 'Inter freq 1 text',
            text: 'INTER 1',
            position: [14, 15, 0, 3],
            borderWidths: [2, 0, 1, 2],
        },
        {
            _name: 'Domestics',
            _description: 'Domestics text',
            text: 'DOMS',
            position: [14, 15, 7, 9],
            borderWidths: [2, 2, 1, 2],
            backgroundColor: darkBackground
        },
        {
            _name: 'Package',
            _description: 'Package text',
            text: 'PACKAGE',
            position: [14, 15, 9, 19],
            borderWidths: [2, 2, 1, 2],
            backgroundColor: darkBackground
        },
        // Row 16
        {
            _name: 'Inter freq 2',
            _description: 'Inter freq 2 text',
            text: 'INTER 2',
            position: [15, 16, 0, 3],
            borderWidths: [1, 0, 1, 2],
            backgroundColor: darkBackground
        },
        {
            _name: 'Line-up formation',
            _description: 'Line-up formation text',
            text: 'L/UP',
            position: [15, 16, 7, 9],
            borderWidths: [1, 2, 0, 2],
            textAlign: 'left',
        },
        {
            _name: 'Package callsign',
            _description: 'Package callsign text',
            text: 'C/S',
            position: [15, 16, 9, 12],
            borderWidths: [1, 1, 1, 2],
        },
        {
            _name: 'Package task',
            _description: 'Package task text',
            text: 'TASK',
            position: [15, 16, 12, 14],
            borderWidths: [1, 1, 1, 1],
        },
        {
            _name: 'Package aircraft',
            _description: 'Package aircraft text',
            text: 'A/C',
            position: [15, 16, 14, 16],
            borderWidths: [1, 1, 1, 1],
        },
        {
            _name: 'Package tacan',
            _description: 'Package tacan text',
            text: 'AA',
            position: [15, 16, 16, 17],
            borderWidths: [1, 1, 1, 1],
        },
        {
            _name: 'Package altitude',
            _description: 'Package altitude text',
            text: 'ALT',
            position: [15, 16, 17, 19],
            borderWidths: [1, 2, 1, 1],
        },
        // Row 17
        {
            _name: 'CLCC freq',
            _description: 'CMCC freq text',
            text: 'CMCC',
            position: [16, 17, 0, 3],
            borderWidths: [1, 0, 1, 2]
        },
        // Row 18
        {
            _name: 'GCI 1 freq',
            _description: 'GCI 1 freq text',
            text: 'GCI 1',
            position: [17, 18, 0, 3],
            borderWidths: [1, 0, 1, 2],
            backgroundColor: darkBackground
        },
        {
            _name: 'Take-off type',
            _description: 'Take-off type text',
            text: 'T/OFF',
            position: [17, 18, 7, 9],
            borderWidths: [0, 2, 0, 2],
            textAlign: 'left',
        },
        // Row 19
        {
            _name: 'GCI 2 freq',
            _description: 'GCI 2 freq text',
            text: 'GCI 2',
            position: [18, 19, 0, 3],
            borderWidths: [1, 0, 1, 2]
        },
        // Row 20
        {
            _name: 'Safety freq',
            _description: 'Safety freq text',
            text: 'SAFETY',
            position: [19, 20, 0, 3],
            borderWidths: [1, 0, 1, 2],
            backgroundColor: darkBackground
        },
        {
            _name: 'Climb type',
            _description: 'Climb type text',
            text: 'CLIMB',
            position: [19, 20, 7, 9],
            borderWidths: [0, 2, 0, 2],
            textAlign: 'left',
        },
        // Row 21
        {
            _name: 'JTAC freq',
            _description: 'JTAC freq text',
            text: 'JTAC',
            position: [20, 21, 0, 3],
            borderWidths: [1, 0, 1, 2]
        },
        // Row 22
        {
            _name: 'Strike common freq',
            _description: 'Strike common freq text',
            text: 'STK COMMON',
            position: [21, 22, 0, 3],
            borderWidths: [1, 0, 1, 2],
            backgroundColor: darkBackground
        },
        {
            _name: 'Join up type',
            _description: 'Join up type text',
            text: 'JOIN UP',
            position: [21, 22, 7, 9],
            borderWidths: [0, 2, 0, 2],
            textAlign: 'left',
        },
        // Row 24
        {
            _name: 'Transit formation',
            _description: 'Transit formation text',
            text: 'TRANSIT',
            position: [23, 24, 7, 9],
            borderWidths: [0, 2, 0, 2],
            textAlign: 'left',
        },
        // Row 26
        {
            _name: 'Descent type',
            _description: 'Descent type text',
            text: 'DESCENT',
            position: [25, 26, 7, 9],
            borderWidths: [0, 2, 0, 2],
            textAlign: 'left',
        },
        // Row 27
        {
            _name: 'Mission commander',
            _description: 'Mission commander text',
            text: 'MC',
            position: [26, 27, 9, 11],
            borderWidths: [2, 1, 1, 2],
        },
        {
            _name: 'Package notes',
            _description: 'Package notes text',
            text: 'PACKAGE NOTES',
            position: [26, 27, 13, 19],
            borderWidths: [2, 2, 1, 2],
            backgroundColor: darkBackground
        },
        // Row 28
        {
            _name: 'Recovery type',
            _description: 'Recovery type text',
            text: 'RCVR',
            position: [27, 28, 7, 9],
            borderWidths: [0, 2, 0, 2],
            textAlign: 'left',
        },
        {
            _name: 'Deputy mission commander',
            _description: 'Deputy mission commander text',
            text: 'DMC',
            position: [27, 28, 9, 11],
            borderWidths: [1, 1, 1, 2],
            backgroundColor: darkBackground
        },
        // Row 29
        {
            _name: 'Civilian guard freq',
            _description: 'Civilian guard freq text',
            text: 'CIV GUARD',
            position: [28, 29, 0, 3],
            borderWidths: [1, 0, 1, 2]
        },
        {
            _name: 'Air defense package lead',
            _description: 'Air defense package lead text',
            text: 'ADPL',
            position: [28, 29, 9, 11],
            borderWidths: [1, 1, 1, 2]
        },
        // Row 30
        {
            _name: 'Military guard freq',
            _description: 'Military guard freq text',
            text: 'MIL GUARD',
            position: [29, 30, 0, 3],
            borderWidths: [1, 0, 2, 2],
            backgroundColor: darkBackground
        },
        {
            _name: 'Landing type',
            _description: 'Landing type text',
            text: 'LDG',
            position: [29, 30, 7, 9],
            borderWidths: [0, 2, 0, 2],
            textAlign: 'left',
        },
        {
            _name: 'Strike package lead',
            _description: 'Strike package lead text',
            text: 'STKPL',
            position: [29, 30, 9, 11],
            borderWidths: [1, 1, 1, 2],
            backgroundColor: darkBackground
        },
        // Row 31
        {
            _name: 'JOKER quantity',
            _description: 'JOKER quantity text',
            text: 'JOKER',
            position: [30, 31, 0, 4],
            borderWidths: [2, 1, 1, 2]
        },
        // Row 32-34
        {
            _name: 'Air-to-air refueling',
            _description: 'Air-to-air refueling text',
            text: 'AAR',
            position: [31, 34, 7, 8],
            borderWidths: [2, 1, 2, 2],
            textOrientation: 'vertical',
            backgroundColor: darkBackground
        },
        // Row 32
        {
            _name: 'BINGO quantity',
            _description: 'BINGO quantity text',
            text: 'BINGO',
            position: [31, 32, 0, 4],
            borderWidths: [1, 1, 1, 2],
            backgroundColor: darkBackground
        },
        {
            _name: 'Tanker callsign',
            _description: 'Tanker callsign text',
            text: 'C/S',
            position: [31, 32, 8, 10],
            borderWidths: [2, 0, 1, 1]
        },
        {
            _name: 'Tanker nav point',
            _description: 'Tanker nav point text',
            text: 'INS',
            position: [31, 32, 13, 15],
            borderWidths: [2, 0, 1, 1]
        },
        {
            _name: 'Tanker off load',
            _description: 'Tanker off load text',
            text: 'OFF LOAD',
            position: [31, 32, 17, 19],
            borderWidths: [2, 2, 1, 1],
            backgroundColor: darkBackground
        },
        // Row 33
        {
            _name: 'LOTO quantity',
            _description: 'LOTO quantity text',
            text: 'LOTO',
            position: [32, 33, 0, 4],
            borderWidths: [1, 1, 1, 2]
        },
        {
            _name: 'Tanker freq',
            _description: 'Tanker freq text',
            text: 'FREQ',
            position: [32, 33, 8, 10],
            borderWidths: [1, 0, 1, 1]
        },
        {
            _name: 'Tanker altitude',
            _description: 'Tanker altitude text',
            text: 'ALT',
            position: [32, 33, 13, 15],
            borderWidths: [1, 0, 1, 1]
        },
        // Row 34
        {
            _name: 'YOYO quantity',
            _description: 'YOYO quantity text',
            text: 'YOYO',
            position: [33, 34, 0, 4],
            borderWidths: [1, 1, 2, 2],
            backgroundColor: darkBackground
        },
        {
            _name: 'Tanker tacan',
            _description: 'Tanker tacan text',
            text: 'AA',
            position: [33, 34, 8, 10],
            borderWidths: [1, 0, 2, 1]
        },
        {
            _name: 'Tanker IFF mode 3',
            _description: 'Tanker IFF mode 3 text',
            text: 'IFF3',
            position: [33, 34, 13, 15],
            borderWidths: [1, 0, 2, 1]
        },
        // Row 35
        {
            _name: 'Nav point 1',
            _description: 'Nav point 1 text',
            text: '01',
            position: [34, 35, 0, 1],
            borderWidths: [2, 1, 1, 2]
        },
        {
            _name: 'Nav point 11',
            _description: 'Nav point 11 text',
            text: '11',
            position: [34, 35, 9, 10],
            borderWidths: [2, 1, 1, 2]
        },
        // Row 36
        {
            _name: 'Nav point 2',
            _description: 'Nav point 2 text',
            text: '02',
            position: [35, 36, 0, 1],
            borderWidths: [1, 1, 1, 2]
        },
        {
            _name: 'Nav point 12',
            _description: 'Nav point 12 text',
            text: '12',
            position: [35, 36, 9, 10],
            borderWidths: [1, 1, 1, 2]
        },
        // Row 37
        {
            _name: 'Nav point 3',
            _description: 'Nav point 3 text',
            text: '03',
            position: [36, 37, 0, 1],
            borderWidths: [1, 1, 1, 2]
        },
        {
            _name: 'Nav point 13',
            _description: 'Nav point 13 text',
            text: '13',
            position: [36, 37, 9, 10],
            borderWidths: [1, 1, 1, 2]
        },
        // Row 38
        {
            _name: 'Nav point 4',
            _description: 'Nav point 4 text',
            text: '04',
            position: [37, 38, 0, 1],
            borderWidths: [1, 1, 1, 2]
        },
        {
            _name: 'Nav point 14',
            _description: 'Nav point 14 text',
            text: '14',
            position: [37, 38, 9, 10],
            borderWidths: [1, 1, 1, 2]
        },
        // Row 39
        {
            _name: 'Nav point 5',
            _description: 'Nav point 5 text',
            text: '05',
            position: [38, 39, 0, 1],
            borderWidths: [1, 1, 1, 2]
        },
        {
            _name: 'Nav point 15',
            _description: 'Nav point 15 text',
            text: '15',
            position: [38, 39, 9, 10],
            borderWidths: [1, 1, 1, 2]
        },
        // Row 40
        {
            _name: 'Nav point 6',
            _description: 'Nav point 6 text',
            text: '06',
            position: [39, 40, 0, 1],
            borderWidths: [1, 1, 1, 2]
        },
        {
            _name: 'Nav point 16',
            _description: 'Nav point 16 text',
            text: '16',
            position: [39, 40, 9, 10],
            borderWidths: [1, 1, 1, 2]
        },
        // Row 41
        {
            _name: 'Nav point 7',
            _description: 'Nav point 7 text',
            text: '07',
            position: [40, 41, 0, 1],
            borderWidths: [1, 1, 1, 2]
        },
        {
            _name: 'Nav point 17',
            _description: 'Nav point 17 text',
            text: '17',
            position: [40, 41, 9, 10],
            borderWidths: [1, 1, 1, 2]
        },
        // Row 42
        {
            _name: 'Nav point 8',
            _description: 'Nav point 8 text',
            text: '08',
            position: [41, 42, 0, 1],
            borderWidths: [1, 1, 1, 2]
        },
        {
            _name: 'Nav point 18',
            _description: 'Nav point 18 text',
            text: '18',
            position: [41, 42, 9, 10],
            borderWidths: [1, 1, 1, 2]
        },
        // Row 43
        {
            _name: 'Nav point 9',
            _description: 'Nav point 9 text',
            text: '09',
            position: [42, 43, 0, 1],
            borderWidths: [1, 1, 1, 2]
        },
        {
            _name: 'Nav point 19',
            _description: 'Nav point 19 text',
            text: '19',
            position: [42, 43, 9, 10],
            borderWidths: [1, 1, 1, 2]
        },
        // Row 44
        {
            _name: 'Nav point 10',
            _description: 'Nav point 10 text',
            text: '10',
            position: [43, 44, 0, 1],
            borderWidths: [1, 1, 2, 2]
        },
        {
            _name: 'Nav point 20',
            _description: 'Nav point 20 text',
            text: '20',
            position: [43, 44, 9, 10],
            borderWidths: [1, 1, 2, 2]
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
            backgroundColor: darkBackground
        },
        {
            id: 'mission-name',
            _description: 'Mission name field',
            position: [0, 1, 7, 12],
            borderWidths: [2, 2, 2, 0]
        },
        {
            id: 'package-id',
            _description: 'Package ID field',
            position: [0, 1, 14, 16],
            borderWidths: [2, 2, 2, 0]
        },
        {
            id: 'kneeboard-version',
            _description: 'Kneeboard version field',
            position: [0, 1, 17, 19],
            borderWidths: [2, 2, 2, 0]
        },
        // Row 3-8
        {
            id: 'flight-callsign',
            _description: 'Flight callsign field',
            position: [2, 8, 2, 4],
            borderWidths: [2, 2, 2, 2]
        },
        // Row 3
        {
            id: 'pilot-1',
            _description: 'Pilot 1 field',
            position: [2, 3, 0, 2],
            borderWidths: [2, 2, 1, 2],
            textAlign: 'center',
            backgroundColor: darkBackground
        },
        {
            id: 'pilot-1-callsign',
            _description: 'Pilot 1 callsign field',
            position: [2, 3, 4, 6],
            borderWidths: [2, 1, 1, 2],
            textAlign: 'center',
            backgroundColor: darkBackground
        },
        {
            id: 'pilot-1-number',
            _description: 'Pilot 1 number field',
            position: [2, 3, 6, 7],
            borderWidths: [2, 1, 1, 1],
            textAlign: 'center',
            backgroundColor: darkBackground
        },
        {
            id: 'pilot-1-aircraft',
            _description: 'Pilot 1 aircraft field',
            position: [2, 3, 7, 9],
            borderWidths: [2, 1, 1, 1],
            textAlign: 'center',
            backgroundColor: darkBackground
        },
        {
            id: 'pilot-1-radar-channel',
            _description: 'Pilot 1 RADAR channel field',
            position: [2, 3, 9, 10],
            borderWidths: [2, 1, 1, 1],
            textAlign: 'center',
            backgroundColor: darkBackground
        },
        {
            id: 'pilot-1-radar-channel',
            _description: 'Pilot 1 radar field',
            position: [2, 3, 9, 10],
            borderWidths: [2, 1, 1, 1],
            textAlign: 'center',
            backgroundColor: darkBackground
        },
        {
            id: 'pilot-1-yardstick-1',
            _description: 'Pilot 1 yardstick 1 field',
            position: [2, 3, 10, 12],
            borderWidths: [2, 1, 1, 1],
            textAlign: 'center',
            backgroundColor: darkBackground
        },
        {
            id: 'pilot-1-yardstick-2',
            _description: 'Pilot 1 yardstick 2 field',
            position: [2, 3, 12, 14],
            borderWidths: [2, 1, 1, 1],
            textAlign: 'center',
            backgroundColor: darkBackground
        },
        {
            id: 'pilot-1-iff-mode-3',
            _description: 'Pilot 1 IFF mode 3 field',
            position: [2, 3, 14, 16],
            borderWidths: [2, 1, 1, 1],
            textAlign: 'center',
            backgroundColor: darkBackground
        },
        {
            id: 'pilot-1-iff-mode-1',
            _description: 'Pilot 1 IFF mode 1 field',
            position: [2, 3, 16, 17],
            borderWidths: [2, 1, 1, 1],
            textAlign: 'center',
            backgroundColor: darkBackground
        },
        {
            id: 'pilot-1-altitude-block',
            _description: 'Pilot 1 altitude block field',
            position: [2, 3, 17, 19],
            borderWidths: [2, 2, 1, 1],
            textAlign: 'center',
            backgroundColor: darkBackground
        },
        // Row 4
        {
            id: 'pilot-2',
            _description: 'Pilot 2 field',
            position: [3, 4, 0, 2],
            borderWidths: [1, 2, 1, 2],
            textAlign: 'center'
        },
        {
            id: 'pilot-2-callsign',
            _description: 'Pilot 2 callsign field',
            position: [3, 4, 4, 6],
            borderWidths: [1, 1, 1, 2],
            textAlign: 'center'
        },
        {
            id: 'pilot-2-number',
            _description: 'Pilot 2 number field',
            position: [3, 4, 6, 7],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center'
        },
        {
            id: 'pilot-2-aircraft',
            _description: 'Pilot 2 aircraft field',
            position: [3, 4, 7, 9],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center'
        },
        {
            id: 'pilot-2-radar-channel',
            _description: 'Pilot 2 RADAR channel field',
            position: [3, 4, 9, 10],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center'
        },
        {
            id: 'pilot-2-yardstick-1',
            _description: 'Pilot 2 yardstick 1 field',
            position: [3, 4, 10, 12],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center'
        },
        {
            id: 'pilot-2-yardstick-2',
            _description: 'Pilot 2 yardstick 2 field',
            position: [3, 4, 12, 14],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center'
        },
        {
            id: 'pilot-2-iff-mode-3',
            _description: 'Pilot 2 IFF mode 3 field',
            position: [3, 4, 14, 16],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center'
        },
        {
            id: 'pilot-2-iff-mode-1',
            _description: 'Pilot 2 IFF mode 1 field',
            position: [3, 4, 16, 17],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center'
        },
        {
            id: 'pilot-2-altitude-block',
            _description: 'Pilot 2 altitude block field',
            position: [3, 4, 17, 19],
            borderWidths: [1, 2, 1, 1],
            textAlign: 'center'
        },
        // Row 5
        {
            id: 'pilot-3',
            _description: 'Pilot 3 field',
            position: [4, 5, 0, 2],
            borderWidths: [1, 2, 1, 2],
            textAlign: 'center',
            backgroundColor: darkBackground
        },
        {
            id: 'pilot-3-callsign',
            _description: 'Pilot 3 callsign field',
            position: [4, 5, 4, 6],
            borderWidths: [1, 1, 1, 2],
            textAlign: 'center',
            backgroundColor: darkBackground
        },
        {
            id: 'pilot-3-number',
            _description: 'Pilot 3 number field',
            position: [4, 5, 6, 7],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center',
            backgroundColor: darkBackground
        },
        {
            id: 'pilot-3-aircraft',
            _description: 'Pilot 3 aircraft field',
            position: [4, 5, 7, 9],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center',
            backgroundColor: darkBackground
        },
        {
            id: 'pilot-3-radar-channel',
            _description: 'Pilot 3 radar field',
            position: [4, 5, 9, 10],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center',
            backgroundColor: darkBackground
        },
        {
            id: 'pilot-3-yardstick-1',
            _description: 'Pilot 3 yardstick 1 field',
            position: [4, 5, 10, 12],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center',
            backgroundColor: darkBackground
        },
        {
            id: 'pilot-3-yardstick-2',
            _description: 'Pilot 3 yardstick 2 field',
            position: [4, 5, 12, 14],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center',
            backgroundColor: darkBackground
        },
        {
            id: 'pilot-3-iff-mode-3',
            _description: 'Pilot 3 IFF mode 3 field',
            position: [4, 5, 14, 16],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center',
            backgroundColor: darkBackground
        },
        {
            id: 'pilot-3-iff-mode-1',
            _description: 'Pilot 3 IFF mode 1 field',
            position: [4, 5, 16, 17],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center',
            backgroundColor: darkBackground
        },
        {
            id: 'pilot-3-altitude-block',
            _description: 'Pilot 3 altitude block field',
            position: [4, 5, 17, 19],
            borderWidths: [1, 2, 1, 1],
            textAlign: 'center',
            backgroundColor: darkBackground
        },
        // Row 6
        {
            id: 'pilot-4',
            _description: 'Pilot 4 field',
            position: [5, 6, 0, 2],
            borderWidths: [1, 2, 1, 2],
            textAlign: 'center'
        },
        {
            id: 'pilot-4-callsign',
            _description: 'Pilot 4 callsign field',
            position: [5, 6, 4, 6],
            borderWidths: [1, 1, 1, 2],
            textAlign: 'center'
        },
        {
            id: 'pilot-4-number',
            _description: 'Pilot 4 number field',
            position: [5, 6, 6, 7],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center'
        },
        {
            id: 'pilot-4-aircraft',
            _description: 'Pilot 4 aircraft field',
            position: [5, 6, 7, 9],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center'
        },
        {
            id: 'pilot-4-radar-channel',
            _description: 'Pilot 4 RADAR channel field',
            position: [5, 6, 9, 10],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center'
        },
        {
            id: 'pilot-4-yardstick-1',
            _description: 'Pilot 4 yardstick 1 field',
            position: [5, 6, 10, 12],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center'
        },
        {
            id: 'pilot-4-yardstick-2',
            _description: 'Pilot 4 yardstick 2 field',
            position: [5, 6, 12, 14],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center'
        },
        {
            id: 'pilot-4-iff-mode-3',
            _description: 'Pilot 4 IFF mode 3 field',
            position: [5, 6, 14, 16],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center'
        },
        {
            id: 'pilot-4-iff-mode-1',
            _description: 'Pilot 4 IFF mode 1 field',
            position: [5, 6, 16, 17],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center'
        },
        {
            id: 'pilot-4-altitude-block',
            _description: 'Pilot 4 altitude block field',
            position: [5, 6, 17, 19],
            borderWidths: [1, 2, 1, 1],
            textAlign: 'center'
        },
        // Row 7
        {
            id: 'pilot-5',
            _description: 'Pilot 5 field',
            position: [6, 7, 0, 2],
            borderWidths: [1, 2, 1, 2],
            textAlign: 'center',
            backgroundColor: darkBackground
        },
        {
            id: 'pilot-5-callsign',
            _description: 'Pilot 5 callsign field',
            position: [6, 7, 4, 6],
            borderWidths: [1, 1, 1, 2],
            textAlign: 'center',
            backgroundColor: darkBackground
        },
        {
            id: 'pilot-5-number',
            _description: 'Pilot 5 number field',
            position: [6, 7, 6, 7],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center',
            backgroundColor: darkBackground
        },
        {
            id: 'pilot-5-aircraft',
            _description: 'Pilot 5 aircraft field',
            position: [6, 7, 7, 9],
            borderWidths: [1, 1, 1, 1],
            backgroundColor: darkBackground
        },
        {
            id: 'pilot-5-radar-channel',
            _description: 'Pilot 5 RADAR channel field',
            position: [6, 7, 9, 10],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center',
            backgroundColor: darkBackground
        },
        {
            id: 'pilot-5-yardstick-1',
            _description: 'Pilot 5 yardstick 1 field',
            position: [6, 7, 10, 12],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center',
            backgroundColor: darkBackground
        },
        {
            id: 'pilot-5-yardstick-2',
            _description: 'Pilot 5 yardstick 2 field',
            position: [6, 7, 12, 14],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center',
            backgroundColor: darkBackground
        },
        {
            id: 'pilot-5-iff-mode-3',
            _description: 'Pilot 5 IFF mode 3 field',
            position: [6, 7, 14, 16],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center',
            backgroundColor: darkBackground
        },
        {
            id: 'pilot-5-iff-mode-1',
            _description: 'Pilot 5 IFF mode 1 field',
            position: [6, 7, 16, 17],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center',
            backgroundColor: darkBackground
        },
        {
            id: 'pilot-5-altitude-block',
            _description: 'Pilot 5 altitude block field',
            position: [6, 7, 17, 19],
            borderWidths: [1, 2, 1, 1],
            textAlign: 'center',
            backgroundColor: darkBackground
        },
        // Row 8
        {
            id: 'pilot-6',
            _description: 'Pilot 6 field',
            position: [7, 8, 0, 2],
            borderWidths: [1, 2, 2, 2],
            textAlign: 'center'
        },
        {
            id: 'pilot-6-callsign',
            _description: 'Pilot 6 callsign field',
            position: [7, 8, 4, 6],
            borderWidths: [1, 1, 2, 2]
        },
        {
            id: 'pilot-6-number',
            _description: 'Pilot 6 number field',
            position: [7, 8, 6, 7],
            borderWidths: [1, 1, 2, 1],
            textAlign: 'center'
        },
        {
            id: 'pilot-6-aircraft',
            _description: 'Pilot 6 aircraft field',
            position: [7, 8, 7, 9],
            borderWidths: [1, 1, 2, 1],
            textAlign: 'center'
        },
        {
            id: 'pilot-6-radar-channel',
            _description: 'Pilot 6 RADAR channel field',
            position: [7, 8, 9, 10],
            borderWidths: [1, 1, 2, 1],
            textAlign: 'center'
        },
        {
            id: 'pilot-6-yardstick-1',
            _description: 'Pilot 6 yardstick 1 field',
            position: [7, 8, 10, 12],
            borderWidths: [1, 1, 2, 1],
            textAlign: 'center'
        },
        {
            id: 'pilot-6-yardstick-2',
            _description: 'Pilot 6 yardstick 2 field',
            position: [7, 8, 12, 14],
            borderWidths: [1, 1, 2, 1],
            textAlign: 'center'
        },
        {
            id: 'pilot-6-iff-mode-3',
            _description: 'Pilot 6 IFF mode 3 field',
            position: [7, 8, 14, 16],
            borderWidths: [1, 1, 2, 1],
            textAlign: 'center'
        },
        {
            id: 'pilot-6-iff-mode-1',
            _description: 'Pilot 6 IFF mode 1 field',
            position: [7, 8, 16, 17],
            borderWidths: [1, 1, 2, 1],
            textAlign: 'center'
        },
        {
            id: 'pilot-6-altitude-block',
            _description: 'Pilot 6 altitude block field',
            position: [7, 8, 17, 19],
            borderWidths: [1, 2, 2, 1],
            textAlign: 'center'
        },
        // Row 9
        {
            id: 'step-time',
            _description: 'Step time field',
            position: [8, 9, 2, 4],
            borderWidths: [2, 1, 1, 0],
            textAlign: 'left'
        },
        {
            id: 'check-time',
            _description: 'Check time field',
            position: [8, 9, 7, 9],
            borderWidths: [2, 1, 1, 0],
            textAlign: 'left'
        },
        {
            id: 'taxi-time',
            _description: 'Taxi time field',
            position: [8, 9, 11, 14],
            borderWidths: [2, 1, 1, 0],
            textAlign: 'left'
        },
        {
            id: 'take-off-time',
            _description: 'Take-off time field',
            position: [8, 9, 16, 19],
            borderWidths: [2, 2, 1, 0],
            textAlign: 'left'
        },
        // Row 10
        {
            id: 'additional-time-slot-1-name',
            _description: 'Additional time slot 1 name field',
            position: [9, 10, 0, 2],
            borderWidths: [1, 0, 1, 2],
            textAlign: 'center',
            bold: true
        },
        {
            id: 'additional-time-slot-1',
            _description: 'Additional time slot 1 field',
            position: [9, 10, 2, 4],
            borderWidths: [1, 1, 1, 0],
            textAlign: 'left',
        },
        {
            id: 'additional-time-slot-2-name',
            _description: 'Additional time slot 2 name field',
            position: [9, 10, 4, 7],
            borderWidths: [1, 0, 1, 1],
            textAlign: 'center',
            bold: true
        },
        {
            id: 'additional-time-slot-2',
            _description: 'Additional time slot 2 field',
            position: [9, 10, 7, 9],
            borderWidths: [1, 1, 1, 0],
            textAlign: 'left',
        },
        {
            id: 'additional-time-slot-3-name',
            _description: 'Additional time slot 3 name field',
            position: [9, 10, 9, 11],
            borderWidths: [1, 0, 1, 1],
            textAlign: 'center',
            bold: true
        },
        {
            id: 'additional-time-slot-3',
            _description: 'Additional time slot 3 field',
            position: [9, 10, 11, 14],
            borderWidths: [1, 1, 1, 0],
            textAlign: 'left',
        },
        {
            id: 'additional-time-slot-4-name',
            _description: 'Additional time slot 4 name field',
            position: [9, 10, 14, 16],
            borderWidths: [1, 0, 1, 1],
            textAlign: 'center',
            bold: true
        },
        {
            id: 'additional-time-slot-4',
            _description: 'Additional time slot 4 field',
            position: [9, 10, 16, 19],
            borderWidths: [1, 2, 1, 0],
            textAlign: 'left',
        },
        // Row 11
        {
            id: 'slot-vul-time',
            _description: 'SLOT/VUL time field',
            position: [10, 11, 3, 9],
            borderWidths: [1, 1, 2, 0],
            textAlign: 'left'
        },
        {
            id: 'push-time',
            _description: 'Push time field',
            position: [10, 11, 11, 14],
            borderWidths: [1, 1, 2, 0],
            textAlign: 'left'
        },
        {
            id: 'additional-time-slot-5-name',
            _description: 'Additional time slot 5 name field',
            position: [10, 11, 14, 16],
            borderWidths: [1, 0, 2, 1],
            textAlign: 'center',
            bold: true
        },
        {
            id: 'additional-time-slot-5',
            _description: 'Additional time slot 5 field',
            position: [10, 11, 16, 19],
            borderWidths: [1, 2, 2, 0],
            textAlign: 'left',
        },
        // Row 13-14
        {
            id: 'bas-altitude',
            _description: 'BAS altitude field',
            position: [12, 14, 1, 2],
            borderWidths: [1, 1, 2, 1],
            textAlign: 'center',
            padding: 0,
        },
        {
            id: 'bas-heading',
            _description: 'BAS heading field',
            position: [12, 14, 2, 3],
            borderWidths: [1, 1, 2, 1],
            textAlign: 'center',
            padding: 0,
        },
        {
            id: 'bas-number',
            _description: 'BAS heading field',
            position: [12, 14, 3, 4],
            borderWidths: [1, 2, 2, 1],
            textAlign: 'center',
            padding: 0,
        },
        {
            id: 'ramrod-0',
            _description: 'Ramrod 0 field',
            position: [12, 14, 5, 6],
            borderWidths: [1, 1, 2, 1],
            textAlign: 'center',
        },
        {
            id: 'ramrod-1',
            _description: 'Ramrod 1 field',
            position: [12, 14, 6, 7],
            borderWidths: [1, 1, 2, 1],
            textAlign: 'center',
        },
        {
            id: 'ramrod-2',
            _description: 'Ramrod 2 field',
            position: [12, 14, 7, 8],
            borderWidths: [1, 1, 2, 1],
            textAlign: 'center',
        },
        {
            id: 'ramrod-3',
            _description: 'Ramrod 3 field',
            position: [12, 14, 8, 9],
            borderWidths: [1, 1, 2, 1],
            textAlign: 'center',
        },
        {
            id: 'ramrod-4',
            _description: 'Ramrod 4 field',
            position: [12, 14, 9, 10],
            borderWidths: [1, 1, 2, 1],
            textAlign: 'center',
        },
        {
            id: 'ramrod-5',
            _description: 'Ramrod 5 field',
            position: [12, 14, 10, 11],
            borderWidths: [1, 1, 2, 1],
            textAlign: 'center',
        },
        {
            id: 'ramrod-6',
            _description: 'Ramrod 6 field',
            position: [12, 14, 11, 12],
            borderWidths: [1, 1, 2, 1],
            textAlign: 'center',
        },
        {
            id: 'ramrod-7',
            _description: 'Ramrod 7 field',
            position: [12, 14, 12, 13],
            borderWidths: [1, 1, 2, 1],
            textAlign: 'center',
        },
        {
            id: 'ramrod-8',
            _description: 'Ramrod 8 field',
            position: [12, 14, 13, 14],
            borderWidths: [1, 1, 2, 1],
            textAlign: 'center',
        },
        {
            id: 'ramrod-9',
            _description: 'Ramrod 9 field',
            position: [12, 14, 14, 15],
            borderWidths: [1, 2, 2, 1],
            textAlign: 'center',
        },
        // Row 13
        {
            id: 'authenticate-1-top',
            _description: 'Authenticate 1 top field',
            position: [12, 13, 15, 16],
            borderWidths: [1, 1, 0, 2],
            textAlign: 'center',
            padding: 0,
        },
        {
            id: 'authenticate-2-top',
            _description: 'Authenticate 2 top field',
            position: [12, 13, 16, 17],
            borderWidths: [1, 1, 0, 1],
            textAlign: 'center',
            padding: 0,
        },
        {
            id: 'authenticate-3-top',
            _description: 'Authenticate 3 top field',
            position: [12, 13, 17, 18],
            borderWidths: [1, 1, 0, 1],
            textAlign: 'center',
            padding: 0,
        },
        {
            id: 'authenticate-4-top',
            _description: 'Authenticate 4 top field',
            position: [12, 13, 18, 19],
            borderWidths: [1, 2, 0, 1],
            textAlign: 'center',
            padding: 0,
        },
        // Row 14
        {
            id: 'authenticate-1-bottom',
            _description: 'Authenticate 1 bottom field',
            position: [13, 14, 15, 16],
            borderWidths: [0, 1, 2, 2],
            textAlign: 'center',
        },
        {
            id: 'authenticate-2-bottom',
            _description: 'Authenticate 2 bottom field',
            position: [13, 14, 16, 17],
            borderWidths: [0, 1, 2, 1],
            textAlign: 'center',
        },
        {
            id: 'authenticate-3-bottom',
            _description: 'Authenticate 3 bottom field',
            position: [13, 14, 17, 18],
            borderWidths: [0, 1, 2, 1],
            textAlign: 'center',
        },
        {
            id: 'authenticate-4-bottom',
            _description: 'Authenticate 4 bottom field',
            position: [13, 14, 18, 19],
            borderWidths: [0, 2, 2, 1],
            textAlign: 'center',
        },
        // Row 15
        {
            id: 'inter-1-freq-channel',
            _description: 'Inter 1 freq channel field',
            position: [14, 15, 3, 4],
            borderWidths: [2, 1, 1, 0],
            textAlign: 'center',
            padding: 0
        },
        {
            id: 'inter-1-callsign',
            _description: 'Inter 1 callsign field',
            position: [14, 15, 4, 7],
            borderWidths: [2, 2, 1, 1],
            textAlign: 'center',
        },
        // Row 16
        {
            id: 'inter-2-freq-channel',
            _description: 'Inter 2 freq channel field',
            position: [15, 16, 3, 4],
            borderWidths: [1, 1, 1, 0],
            textAlign: 'center',
            padding: 0,
            backgroundColor: darkBackground
        },
        {
            id: 'inter-2-callsign',
            _description: 'Inter 2 callsign field',
            position: [15, 16, 4, 7],
            borderWidths: [1, 2, 1, 1],
            textAlign: 'center',
            backgroundColor: darkBackground
        },
        // Row 17
        {
            id: 'CMCC-freq-channel',
            _description: 'CMCC freq channel field',
            position: [16, 17, 3, 4],
            borderWidths: [1, 1, 1, 0],
            textAlign: 'center',
            padding: 0,
        },
        {
            id: 'CMCC-callsign',
            _description: 'CMCC callsign field',
            position: [16, 17, 4, 7],
            borderWidths: [1, 2, 1, 1],
            textAlign: 'center',
        },
        {
            id: 'line-up-formation',
            type: 'input-select',
            _description: 'Line-up formation field',
            options: lineupOptions,
            dropdownSide: 'left',
            position: [16, 17, 7, 9],
            borderWidths: [0, 2, 0, 2],
            padding: 2
        },
        {
            id: 'package-1-callsign',
            _description: 'Package 1 callsign field',
            position: [16, 17, 9, 12],
            borderWidths: [1, 1, 1, 2],
            textAlign: 'center',
            bold: true
        },
        {
            id: 'package-1-task',
            _description: 'Package 1 task field',
            position: [16, 17, 12, 14],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center',
        },
        {
            id: 'package-1-aircraft',
            _description: 'Package 1 aircraft field',
            position: [16, 17, 14, 16],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center',
        },
        {
            id: 'package-1-tacan',
            _description: 'Package 1 tacan field',
            position: [16, 17, 16, 17],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center',
            padding: 0
        },
        {
            id: 'package-1-altitude',
            _description: 'Package 1 altitude field',
            position: [16, 17, 17, 19],
            borderWidths: [1, 2, 1, 1],
            textAlign: 'center'
        },
        // Row 18
        {
            id: 'gci-1-freq-channel',
            _description: 'GCI 1 freq channel field',
            position: [17, 18, 3, 4],
            borderWidths: [1, 1, 1, 0],
            textAlign: 'center',
            padding: 0,
            backgroundColor: darkBackground
        },
        {
            id: 'gci-1-callsign',
            _description: 'GCI 1 callsign field',
            position: [17, 18, 4, 7],
            borderWidths: [1, 2, 1, 1],
            textAlign: 'center',
            backgroundColor: darkBackground
        },
        {
            id: 'package-2-callsign',
            _description: 'Package 2 callsign field',
            position: [17, 18, 9, 12],
            borderWidths: [1, 1, 1, 2],
            textAlign: 'center',
            bold: true
        },
        {
            id: 'package-2-task',
            _description: 'Package 2 task field',
            position: [17, 18, 12, 14],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center',
        },
        {
            id: 'package-2-aircraft',
            _description: 'Package 2 aircraft field',
            position: [17, 18, 14, 16],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center',
        },
        {
            id: 'package-2-tacan',
            _description: 'Package 2 tacan field',
            position: [17, 18, 16, 17],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center',
            padding: 0
        },
        {
            id: 'package-2-altitude',
            _description: 'Package 2 altitude field',
            position: [17, 18, 17, 19],
            borderWidths: [1, 2, 1, 1],
            textAlign: 'center'
        },
        // Row 19
        {
            id: 'gci-2-freq-channel',
            _description: 'GCI 2 freq channel field',
            position: [18, 19, 3, 4],
            borderWidths: [1, 1, 1, 0],
            textAlign: 'center',
            padding: 0,
        },
        {
            id: 'gci-2-callsign',
            _description: 'GCI 2 callsign field',
            position: [18, 19, 4, 7],
            borderWidths: [1, 2, 1, 1],
            textAlign: 'center',
        },
        {
            id: 'take-off-formation',
            type: 'input-select',
            _description: 'Take-off formation field',
            options: takeoffOptions,
            dropdownSide: 'left',
            position: [18, 19, 7, 9],
            borderWidths: [0, 2, 0, 2],
            padding: 2
        },
        {
            id: 'package-3-callsign',
            _description: 'Package 3 callsign field',
            position: [18, 19, 9, 12],
            borderWidths: [1, 1, 1, 2],
            textAlign: 'center',
            bold: true
        },
        {
            id: 'package-3-task',
            _description: 'Package 3 task field',
            position: [18, 19, 12, 14],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center',
        },
        {
            id: 'package-3-aircraft',
            _description: 'Package 3 aircraft field',
            position: [18, 19, 14, 16],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center',
        },
        {
            id: 'package-3-tacan',
            _description: 'Package 3 tacan field',
            position: [18, 19, 16, 17],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center',
            padding: 0
        },
        {
            id: 'package-3-altitude',
            _description: 'Package 3 altitude field',
            position: [18, 19, 17, 19],
            borderWidths: [1, 2, 1, 1],
            textAlign: 'center'
        },
        // Row 20
        {
            id: 'safety-freq-channel',
            _description: 'Safety freq channel field',
            position: [19, 20, 3, 4],
            borderWidths: [1, 1, 1, 0],
            textAlign: 'center',
            padding: 0,
            backgroundColor: darkBackground
        },
        {
            id: 'safety-callsign',
            _description: 'Safety callsign field',
            position: [19, 20, 4, 7],
            borderWidths: [1, 2, 1, 1],
            textAlign: 'center',
            backgroundColor: darkBackground
        },
        {
            id: 'package-4-callsign',
            _description: 'Package 4 callsign field',
            position: [19, 20, 9, 12],
            borderWidths: [1, 1, 1, 2],
            textAlign: 'center',
            bold: true
        },
        {
            id: 'package-4-task',
            _description: 'Package 4 task field',
            position: [19, 20, 12, 14],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center',
        },
        {
            id: 'package-4-aircraft',
            _description: 'Package 4 aircraft field',
            position: [19, 20, 14, 16],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center',
        },
        {
            id: 'package-4-tacan',
            _description: 'Package 4 tacan field',
            position: [19, 20, 16, 17],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center',
            padding: 0
        },
        {
            id: 'package-4-altitude',
            _description: 'Package 4 altitude field',
            position: [19, 20, 17, 19],
            borderWidths: [1, 2, 1, 1],
            textAlign: 'center'
        },
        // Row 21
        {
            id: 'jtac-freq-channel',
            _description: 'JTAC freq channel field',
            position: [20, 21, 3, 4],
            borderWidths: [1, 1, 1, 0],
            textAlign: 'center',
            padding: 0,
        },
        {
            id: 'jtac-callsign',
            _description: 'JTAC callsign field',
            position: [20, 21, 4, 7],
            borderWidths: [1, 2, 1, 1],
            textAlign: 'center',
        },
        {
            id: 'climb-type',
            _description: 'Climb type field',
            position: [20, 21, 7, 9],
            borderWidths: [0, 2, 0, 2],
            textAlign: 'right',
            padding: 2
        },
        {
            id: 'package-5-callsign',
            _description: 'Package 5 callsign field',
            position: [20, 21, 9, 12],
            borderWidths: [1, 1, 1, 2],
            textAlign: 'center',
            bold: true
        },
        {
            id: 'package-5-task',
            _description: 'Package 5 task field',
            position: [20, 21, 12, 14],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center',
        },
        {
            id: 'package-5-aircraft',
            _description: 'Package 5 aircraft field',
            position: [20, 21, 14, 16],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center',
        },
        {
            id: 'package-5-tacan',
            _description: 'Package 5 tacan field',
            position: [20, 21, 16, 17],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center',
            padding: 0
        },
        {
            id: 'package-5-altitude',
            _description: 'Package 5 altitude field',
            position: [20, 21, 17, 19],
            borderWidths: [1, 2, 1, 1],
            textAlign: 'center'
        },
        // Row 22
        {
            id: 'strike-common-freq-channel',
            _description: 'Strike common freq channel field',
            position: [21, 22, 3, 4],
            borderWidths: [1, 1, 1, 0],
            textAlign: 'center',
            padding: 0,
            backgroundColor: darkBackground
        },
        {
            id: 'strike-common-callsign',
            _description: 'Strike common callsign field',
            position: [21, 22, 4, 7],
            borderWidths: [1, 2, 1, 1],
            textAlign: 'center',
            backgroundColor: darkBackground
        },
        {
            id: 'package-6-callsign',
            _description: 'Package 6 callsign field',
            position: [21, 22, 9, 12],
            borderWidths: [1, 1, 1, 2],
            textAlign: 'center',
            bold: true
        },
        {
            id: 'package-6-task',
            _description: 'Package 6 task field',
            position: [21, 22, 12, 14],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center',
        },
        {
            id: 'package-6-aircraft',
            _description: 'Package 6 aircraft field',
            position: [21, 22, 14, 16],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center',
        },
        {
            id: 'package-6-tacan',
            _description: 'Package 6 tacan field',
            position: [21, 22, 16, 17],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center',
            padding: 0
        },
        {
            id: 'package-6-altitude',
            _description: 'Package 6 altitude field',
            position: [21, 22, 17, 19],
            borderWidths: [1, 2, 1, 1],
            textAlign: 'center'
        },
        // Row 23
        {
            id: 'additional-freq-1-name',
            _description: 'Additional freq 1 name field',
            position: [22, 23, 0, 3],
            borderWidths: [1, 0, 1, 2],
            textAlign: 'center',
            bold: true,
        },
        {
            id: 'additional-freq-1-channel',
            _description: 'Additional freq 1 channel field',
            position: [22, 23, 3, 4],
            borderWidths: [1, 1, 1, 0],
            textAlign: 'center',
            padding: 0,
        },
        {
            id: 'additional-freq-1-callsign',
            _description: 'Additional freq 1 callsign field',
            position: [22, 23, 4, 7],
            borderWidths: [1, 2, 1, 1],
            textAlign: 'center',
        },
        {
            id: 'join-up-type',
            _description: 'Join up type field',
            position: [22, 23, 7, 9],
            borderWidths: [0, 2, 0, 2],
            textAlign: 'right',
            padding: 2
        },
        {
            id: 'package-7-callsign',
            _description: 'Package 7 callsign field',
            position: [22, 23, 9, 12],
            borderWidths: [1, 1, 1, 2],
            textAlign: 'center',
            bold: true
        },
        {
            id: 'package-7-task',
            _description: 'Package 7 task field',
            position: [22, 23, 12, 14],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center',
        },
        {
            id: 'package-7-aircraft',
            _description: 'Package 7 aircraft field',
            position: [22, 23, 14, 16],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center',
        },
        {
            id: 'package-7-tacan',
            _description: 'Package 7 tacan field',
            position: [22, 23, 16, 17],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center',
            padding: 0
        },
        {
            id: 'package-7-altitude',
            _description: 'Package 7 altitude field',
            position: [22, 23, 17, 19],
            borderWidths: [1, 2, 1, 1],
            textAlign: 'center'
        },
        // Row 24
        {
            id: 'additional-freq-2-name',
            _description: 'Additional freq 2 name field',
            position: [23, 24, 0, 3],
            borderWidths: [1, 0, 1, 2],
            textAlign: 'center',
            bold: true,
            backgroundColor: darkBackground
        },
        {
            id: 'additional-freq-2-channel',
            _description: 'Additional freq 2 channel field',
            position: [23, 24, 3, 4],
            borderWidths: [1, 1, 1, 0],
            textAlign: 'center',
            padding: 0,
            backgroundColor: darkBackground
        },
        {
            id: 'additional-freq-2-callsign',
            _description: 'Additional freq 2 callsign field',
            position: [23, 24, 4, 7],
            borderWidths: [1, 2, 1, 1],
            textAlign: 'center',
            backgroundColor: darkBackground
        },
        {
            id: 'package-8-callsign',
            _description: 'Package 8 callsign field',
            position: [23, 24, 9, 12],
            borderWidths: [1, 1, 1, 2],
            textAlign: 'center',
            bold: true
        },
        {
            id: 'package-8-task',
            _description: 'Package 8 task field',
            position: [23, 24, 12, 14],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center',
        },
        {
            id: 'package-8-aircraft',
            _description: 'Package 8 aircraft field',
            position: [23, 24, 14, 16],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center',
        },
        {
            id: 'package-8-tacan',
            _description: 'Package 8 tacan field',
            position: [23, 24, 16, 17],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center',
            padding: 0
        },
        {
            id: 'package-8-altitude',
            _description: 'Package 8 altitude field',
            position: [23, 24, 17, 19],
            borderWidths: [1, 2, 1, 1],
            textAlign: 'center'
        },
        // Row 25
        {
            id: 'additional-freq-3-name',
            _description: 'Additional freq 3 name field',
            position: [24, 25, 0, 3],
            borderWidths: [1, 0, 1, 2],
            textAlign: 'center',
            bold: true,
        },
        {
            id: 'additional-freq-3-channel',
            _description: 'Additional freq 3 channel field',
            position: [24, 25, 3, 4],
            borderWidths: [1, 1, 1, 0],
            textAlign: 'center',
            padding: 0,
        },
        {
            id: 'additional-freq-3-callsign',
            _description: 'Additional freq 3 callsign field',
            position: [24, 25, 4, 7],
            borderWidths: [1, 2, 1, 1],
            textAlign: 'center',
        },
        {
            id: 'transit-formation',
            type: 'input-select',
            _description: 'Transirt formation field',
            options: formationOptions,
            dropdownSide: 'left',
            position: [24, 25, 7, 9],
            borderWidths: [0, 2, 0, 2],
            padding: 2
        },
        {
            id: 'package-9-callsign',
            _description: 'Package 9 callsign field',
            position: [24, 25, 9, 12],
            borderWidths: [1, 1, 1, 2],
            textAlign: 'center',
            bold: true
        },
        {
            id: 'package-9-task',
            _description: 'Package 9 task field',
            position: [24, 25, 12, 14],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center',
        },
        {
            id: 'package-9-aircraft',
            _description: 'Package 9 aircraft field',
            position: [24, 25, 14, 16],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center',
        },
        {
            id: 'package-9-tacan',
            _description: 'Package 9 tacan field',
            position: [24, 25, 16, 17],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center',
            padding: 0
        },
        {
            id: 'package-9-altitude',
            _description: 'Package 9 altitude field',
            position: [24, 25, 17, 19],
            borderWidths: [1, 2, 1, 1],
            textAlign: 'center'
        },
        // Row 26
        {
            id: 'additional-freq-4-name',
            _description: 'Additional freq 4 name field',
            position: [25, 26, 0, 3],
            borderWidths: [1, 0, 1, 2],
            textAlign: 'center',
            bold: true,
            backgroundColor: darkBackground
        },
        {
            id: 'additional-freq-4-channel',
            _description: 'Additional freq 4 channel field',
            position: [25, 26, 3, 4],
            borderWidths: [1, 1, 1, 0],
            textAlign: 'center',
            padding: 0,
            backgroundColor: darkBackground
        },
        {
            id: 'additional-freq-4-callsign',
            _description: 'Additional freq 4 callsign field',
            position: [25, 26, 4, 7],
            borderWidths: [1, 2, 1, 1],
            textAlign: 'center',
            backgroundColor: darkBackground
        },
        {
            id: 'package-10-callsign',
            _description: 'Package 10 callsign field',
            position: [25, 26, 9, 12],
            borderWidths: [1, 1, 2, 2],
            textAlign: 'center',
            bold: true
        },
        {
            id: 'package-10-task',
            _description: 'Package 10 task field',
            position: [25, 26, 12, 14],
            borderWidths: [1, 1, 2, 1],
            textAlign: 'center',
        },
        {
            id: 'package-10-aircraft',
            _description: 'Package 10 aircraft field',
            position: [25, 26, 14, 16],
            borderWidths: [1, 1, 2, 1],
            textAlign: 'center',
        },
        {
            id: 'package-10-tacan',
            _description: 'Package 10 tacan field',
            position: [25, 26, 16, 17],
            borderWidths: [1, 1, 2, 1],
            textAlign: 'center',
            padding: 0
        },
        {
            id: 'package-10-altitude',
            _description: 'Package 10 altitude field',
            position: [25, 26, 17, 19],
            borderWidths: [1, 2, 2, 1],
            textAlign: 'center'
        },
        // Row 27
        {
            id: 'additional-freq-5-name',
            _description: 'Additional freq 5 name field',
            position: [26, 27, 0, 3],
            borderWidths: [1, 0, 1, 2],
            textAlign: 'center',
            bold: true,
        },
        {
            id: 'additional-freq-5-channel',
            _description: 'Additional freq 5 channel field',
            position: [26, 27, 3, 4],
            borderWidths: [1, 1, 1, 0],
            textAlign: 'center',
            padding: 0,
        },
        {
            id: 'additional-freq-5-callsign',
            _description: 'Additional freq 5 callsign field',
            position: [26, 27, 4, 7],
            borderWidths: [1, 2, 1, 1],
            textAlign: 'center',
        },
        {
            id: 'descent-type',
            _description: 'Descent type field',
            position: [26, 27, 7, 9],
            borderWidths: [0, 2, 0, 2],
            textAlign: 'right',
            padding: 2
        },
        {
            id: 'mission-commader-callsign',
            _description: 'Mission commander callsign field',
            position: [26, 27, 11, 13],
            borderWidths: [2, 2, 1, 1],
            textAlign: 'center',
        },
        // Rows 28-31
        {
            id: 'Package-notes',
            type: 'text-area',
            _description: 'Pacakge notes field',
            position: [27, 31, 13, 19],
            borderWidths: [1, 2, 2, 2],
        },
        // Row 28
        {
            id: 'additional-freq-6-name',
            _description: 'Additional freq 6 name field',
            position: [27, 28, 0, 3],
            borderWidths: [1, 0, 1, 2],
            textAlign: 'center',
            bold: true,
            backgroundColor: darkBackground
        },
        {
            id: 'additional-freq-6-channel',
            _description: 'Additional freq 6 channel field',
            position: [27, 28, 3, 4],
            borderWidths: [1, 1, 1, 0],
            textAlign: 'center',
            padding: 0,
            backgroundColor: darkBackground
        },
        {
            id: 'additional-freq-6-callsign',
            _description: 'Additional freq 6 callsign field',
            position: [27, 28, 4, 7],
            borderWidths: [1, 2, 1, 1],
            textAlign: 'center',
            backgroundColor: darkBackground
        },
        {
            id: 'deputy-mission-commander-callsign',
            _description: 'Deputy mission commander callsign field',
            position: [27, 28, 11, 13],
            borderWidths: [1, 2, 1, 1],
            textAlign: 'center',
            backgroundColor: darkBackground
        },
        // Row 29
        {
            id: 'civ-guard-freq-channel',
            _description: 'Civilian guard freq channel field',
            position: [28, 29, 3, 4],
            borderWidths: [1, 1, 1, 0],
            textAlign: 'center',
            padding: 0,
        },
        {
            id: 'civ-guard-freq-callsign',
            _description: 'Civilian guard freq callsign field',
            position: [28, 29, 4, 7],
            borderWidths: [1, 2, 1, 1],
            textAlign: 'center',
        },
        {
            id: 'recovery-type',
            _description: 'Recovery type field',
            position: [28, 29, 7, 9],
            borderWidths: [0, 2, 0, 2],
            textAlign: 'right',
            padding: 2
        },
        {
            id: 'air-defense-package-lead-callsign',
            _description: 'Air defense package lead callsign field',
            position: [28, 29, 11, 13],
            borderWidths: [1, 2, 1, 1],
            textAlign: 'center',
        },
        // Row 30
        {
            id: 'mil-guard-freq-name',
            _description: 'Military guard freq channel field',
            position: [29, 30, 3, 4],
            borderWidths: [1, 1, 2, 0],
            textAlign: 'center',
            padding: 0,
            backgroundColor: darkBackground
        },
        {
            id: 'mil-guard-freq-channel',
            _description: 'Military guard freq callsign field',
            position: [29, 30, 4, 7],
            borderWidths: [1, 2, 2, 1],
            textAlign: 'center',
            backgroundColor: darkBackground
        },
        {
            id: 'strike-package-lead-callsign',
            _description: 'Strike package lead callsign field',
            position: [29, 30, 11, 13],
            borderWidths: [1, 2, 1, 1],
            textAlign: 'center',
            backgroundColor: darkBackground
        },
        // Row 31
        {
            id: 'joker-quantity',
            _description: 'JOKER quantity field',
            position: [30, 31, 4, 7],
            borderWidths: [2, 2, 1, 1],
            textAlign: 'center',
        },
        {
            id: 'landing-type',
            _description: 'Landing type field',
            position: [30, 31, 7, 9],
            borderWidths: [0, 2, 2, 2],
            textAlign: 'right',
            padding: 2
        },
        {
            id: 'additional-lead-type',
            _description: 'Additional lead type field',
            position: [30, 31, 9, 11],
            borderWidths: [1, 1, 2, 1],
            textAlign: 'center',
            bold: true,
        },
        {
            id: 'additional-lead-callsign',
            _description: 'Additional lead callsign field',
            position: [30, 31, 11, 13],
            borderWidths: [1, 2, 2, 1],
            textAlign: 'center',
        },
        // Row 32-34
        {
            id: 'tanker-off-load',
            _description: 'Tanker off-load quantity field',
            position: [32, 34, 17, 19],
            borderWidths: [1, 2, 2, 1],
            textAlign: 'center',
            padding: 0,
        },
        // Row 32
        {
            id: 'bingo-quantity',
            _description: 'BINGO quantity field',
            position: [31, 32, 4, 7],
            borderWidths: [1, 2, 1, 1],
            textAlign: 'center',
            backgroundColor: darkBackground
        },
        {
            id: 'tanker-callsign',
            _description: 'Tanker callsign field',
            position: [31, 32, 10, 13],
            borderWidths: [2, 1, 1, 0],
            textAlign: 'center',
        },
        {
            id: 'tanker-nav-point',
            _description: 'Tanker nav point field',
            position: [31, 32, 15, 17],
            borderWidths: [2, 1, 1, 0],
            textAlign: 'center',
        },
        // Row 33
        {
            id: 'loto-quantity',
            _description: 'LOTO quantity field',
            position: [32, 33, 4, 7],
            borderWidths: [1, 2, 1, 1],
            textAlign: 'center',
        },
        {
            id: 'tanker-freq',
            _description: 'Tanker freq field',
            position: [32, 33, 10, 13],
            borderWidths: [1, 1, 1, 0],
            textAlign: 'center',
        },
        {
            id: 'tanker-altitude',
            _description: 'Tanker altitude field',
            position: [32, 33, 15, 17],
            borderWidths: [1, 1, 1, 0],
            textAlign: 'center',
        },
        // Row 34
        {
            id: 'yoyo-quantity',
            _description: 'YOYO quantity field',
            position: [33, 34, 4, 7],
            borderWidths: [1, 2, 2, 1],
            textAlign: 'center',
            backgroundColor: darkBackground
        },
        {
            id: 'tanker-tacan',
            _description: 'Tanker tacan field',
            position: [33, 34, 10, 13],
            borderWidths: [1, 1, 2, 0],
            textAlign: 'center',
        },
        {
            id: 'tanker-iff3',
            _description: 'Tanker IFF mode 3 field',
            position: [33, 34, 15, 17],
            borderWidths: [1, 1, 2, 0],
            textAlign: 'center',
        },
        // Row 35
        {
            id: 'nav-point-1-latitude',
            _description: 'Nav point 1 latitude field',
            position: [34, 35, 1, 3],
            borderWidths: [2, 1, 1, 1],
            textAlign: 'center',
            padding: 0,
            fontSize: 9,
        },
        {
            id: 'nav-point-1-longitude',
            _description: 'Nav point 1 longitude field',
            position: [34, 35, 3, 5],
            borderWidths: [2, 1, 1, 1],
            textAlign: 'center',
            padding: 0,
            fontSize: 9,
        },
        {
            id: 'nav-point-1-name',
            _description: 'Nav point 1 name field',
            position: [34, 35, 5, 9],
            borderWidths: [2, 2, 1, 1],
            textAlign: 'center',
            padding: 0,
            fontSize: 11,
        },
        {
            id: 'nav-point-11-latitude',
            _description: 'Nav point 11 latitude field',
            position: [34, 35, 10, 12],
            borderWidths: [2, 1, 1, 1],
            textAlign: 'center',
            padding: 0,
            fontSize: 9,
        },
        {
            id: 'nav-point-11-longitude',
            _description: 'Nav point 11 longitude field',
            position: [34, 35, 12, 14],
            borderWidths: [2, 1, 1, 1],
            textAlign: 'center',
            padding: 0,
            fontSize: 9,
        },
        {
            id: 'nav-point-11-name',
            _description: 'Nav point 11 name field',
            position: [34, 35, 14, 18],
            borderWidths: [2, 2, 1, 1],
            textAlign: 'center',
            padding: 0,
            fontSize: 11,
        },
        // Row 36
        {
            id: 'nav-point-2-latitude',
            _description: 'Nav point 2 latitude field',
            position: [35, 36, 1, 3],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center',
            padding: 0,
            fontSize: 9,
        },
        {
            id: 'nav-point-2-longitude',
            _description: 'Nav point 2 longitude field',
            position: [35, 36, 3, 5],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center',
            padding: 0,
            fontSize: 9,
        },
        {
            id: 'nav-point-2-name',
            _description: 'Nav point 2 name field',
            position: [35, 36, 5, 9],
            borderWidths: [1, 2, 1, 1],
            textAlign: 'center',
            padding: 0,
            fontSize: 11,
        },
        {
            id: 'nav-point-12-latitude',
            _description: 'Nav point 12 latitude field',
            position: [35, 36, 10, 12],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center',
            padding: 0,
            fontSize: 9,
        },
        {
            id: 'nav-point-12-longitude',
            _description: 'Nav point 12 longitude field',
            position: [35, 36, 12, 14],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center',
            padding: 0,
            fontSize: 9,
        },
        {
            id: 'nav-point-12-name',
            _description: 'Nav point 12 name field',
            position: [35, 36, 14, 18],
            borderWidths: [1, 2, 1, 1],
            textAlign: 'center',
            padding: 0,
            fontSize: 11,
        },
        // Row 37
        {
            id: 'nav-point-3-latitude',
            _description: 'Nav point 3 latitude field',
            position: [36, 37, 1, 3],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center',
            padding: 0,
            fontSize: 9,
        },
        {
            id: 'nav-point-3-longitude',
            _description: 'Nav point 3 longitude field',
            position: [36, 37, 3, 5],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center',
            padding: 0,
            fontSize: 9,
        },
        {
            id: 'nav-point-3-name',
            _description: 'Nav point 3 name field',
            position: [36, 37, 5, 9],
            borderWidths: [1, 2, 1, 1],
            textAlign: 'center',
            padding: 0,
            fontSize: 11,
        },
        {
            id: 'nav-point-13-latitude',
            _description: 'Nav point 13 latitude field',
            position: [36, 37, 10, 12],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center',
            padding: 0,
            fontSize: 9,
        },
        {
            id: 'nav-point-13-longitude',
            _description: 'Nav point 13 longitude field',
            position: [36, 37, 12, 14],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center',
            padding: 0,
            fontSize: 9,
        },
        {
            id: 'nav-point-13-name',
            _description: 'Nav point 13 name field',
            position: [36, 37, 14, 18],
            borderWidths: [1, 2, 1, 1],
            textAlign: 'center',
            padding: 0,
            fontSize: 11,
        },
        // Row 38
        {
            id: 'nav-point-4-latitude',
            _description: 'Nav point 4 latitude field',
            position: [37, 38, 1, 3],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center',
            padding: 0,
            fontSize: 9,
        },
        {
            id: 'nav-point-4-longitude',
            _description: 'Nav point 4 longitude field',
            position: [37, 38, 3, 5],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center',
            padding: 0,
            fontSize: 9,
        },
        {
            id: 'nav-point-4-name',
            _description: 'Nav point 4 name field',
            position: [37, 38, 5, 9],
            borderWidths: [1, 2, 1, 1],
            textAlign: 'center',
            padding: 0,
            fontSize: 11,
        },
        {
            id: 'nav-point-14-latitude',
            _description: 'Nav point 14 latitude field',
            position: [37, 38, 10, 12],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center',
            padding: 0,
            fontSize: 9,
        },
        {
            id: 'nav-point-14-longitude',
            _description: 'Nav point 14 longitude field',
            position: [37, 38, 12, 14],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center',
            padding: 0,
            fontSize: 9,
        },
        {
            id: 'nav-point-14-name',
            _description: 'Nav point 14 name field',
            position: [37, 38, 14, 18],
            borderWidths: [1, 2, 1, 1],
            textAlign: 'center',
            padding: 0,
            fontSize: 11,
        },
        // Row 39
        {
            id: 'nav-point-5-latitude',
            _description: 'Nav point 5 latitude field',
            position: [38, 39, 1, 3],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center',
            padding: 0,
            fontSize: 9,
        },
        {
            id: 'nav-point-5-longitude',
            _description: 'Nav point 5 longitude field',
            position: [38, 39, 3, 5],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center',
            padding: 0,
            fontSize: 9,
        },
        {
            id: 'nav-point-5-name',
            _description: 'Nav point 5 name field',
            position: [38, 39, 5, 9],
            borderWidths: [1, 2, 1, 1],
            textAlign: 'center',
            padding: 0,
            fontSize: 11,
        },
        {
            id: 'nav-point-15-latitude',
            _description: 'Nav point 15 latitude field',
            position: [38, 39, 10, 12],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center',
            padding: 0,
            fontSize: 9,
        },
        {
            id: 'nav-point-15-longitude',
            _description: 'Nav point 15 longitude field',
            position: [38, 39, 12, 14],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center',
            padding: 0,
            fontSize: 9,
        },
        {
            id: 'nav-point-15-name',
            _description: 'Nav point 15 name field',
            position: [38, 39, 14, 18],
            borderWidths: [1, 2, 1, 1],
            textAlign: 'center',
            padding: 0,
            fontSize: 11,
        },
        // Row 40
        {
            id: 'nav-point-6-latitude',
            _description: 'Nav point 6 latitude field',
            position: [39, 40, 1, 3],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center',
            padding: 0,
            fontSize: 9,
        },
        {
            id: 'nav-point-6-longitude',
            _description: 'Nav point 6 longitude field',
            position: [39, 40, 3, 5],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center',
            padding: 0,
            fontSize: 9,
        },
        {
            id: 'nav-point-6-name',
            _description: 'Nav point 6 name field',
            position: [39, 40, 5, 9],
            borderWidths: [1, 2, 1, 1],
            textAlign: 'center',
            padding: 0,
            fontSize: 11,
        },
        {
            id: 'nav-point-16-latitude',
            _description: 'Nav point 16 latitude field',
            position: [39, 40, 10, 12],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center',
            padding: 0,
            fontSize: 9,
        },
        {
            id: 'nav-point-16-longitude',
            _description: 'Nav point 16 longitude field',
            position: [39, 40, 12, 14],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center',
            padding: 0,
            fontSize: 9,
        },
        {
            id: 'nav-point-16-name',
            _description: 'Nav point 16 name field',
            position: [39, 40, 14, 18],
            borderWidths: [1, 2, 1, 1],
            textAlign: 'center',
            padding: 0,
            fontSize: 11,
        },
        // Row 41
        {
            id: 'nav-point-7-latitude',
            _description: 'Nav point 7 latitude field',
            position: [40, 41, 1, 3],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center',
            padding: 0,
            fontSize: 9,
        },
        {
            id: 'nav-point-7-longitude',
            _description: 'Nav point 7 longitude field',
            position: [40, 41, 3, 5],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center',
            padding: 0,
            fontSize: 9,
        },
        {
            id: 'nav-point-7-name',
            _description: 'Nav point 7 name field',
            position: [40, 41, 5, 9],
            borderWidths: [1, 2, 1, 1],
            textAlign: 'center',
            padding: 0,
            fontSize: 11,
        },
        {
            id: 'nav-point-17-latitude',
            _description: 'Nav point 17 latitude field',
            position: [40, 41, 10, 12],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center',
            padding: 0,
            fontSize: 9,
        },
        {
            id: 'nav-point-17-longitude',
            _description: 'Nav point 17 longitude field',
            position: [40, 41, 12, 14],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center',
            padding: 0,
            fontSize: 9,
        },
        {
            id: 'nav-point-17-name',
            _description: 'Nav point 17 name field',
            position: [40, 41, 14, 18],
            borderWidths: [1, 2, 1, 1],
            textAlign: 'center',
            padding: 0,
            fontSize: 11,
        },
        // Row 42
        {
            id: 'nav-point-8-latitude',
            _description: 'Nav point 8 latitude field',
            position: [41, 42, 1, 3],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center',
            padding: 0,
            fontSize: 9,
        },
        {
            id: 'nav-point-8-longitude',
            _description: 'Nav point 8 longitude field',
            position: [41, 42, 3, 5],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center',
            padding: 0,
            fontSize: 9,
        },
        {
            id: 'nav-point-8-name',
            _description: 'Nav point 8 name field',
            position: [41, 42, 5, 9],
            borderWidths: [1, 2, 1, 1],
            textAlign: 'center',
            padding: 0,
            fontSize: 11,
        },
        {
            id: 'nav-point-18-latitude',
            _description: 'Nav point 18 latitude field',
            position: [41, 42, 10, 12],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center',
            padding: 0,
            fontSize: 9,
        },
        {
            id: 'nav-point-18-longitude',
            _description: 'Nav point 18 longitude field',
            position: [41, 42, 12, 14],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center',
            padding: 0,
            fontSize: 9,
        },
        {
            id: 'nav-point-18-name',
            _description: 'Nav point 18 name field',
            position: [41, 42, 14, 18],
            borderWidths: [1, 2, 1, 1],
            textAlign: 'center',
            padding: 0,
            fontSize: 11,
        },
        // Row 43
        {
            id: 'nav-point-9-latitude',
            _description: 'Nav point 9 latitude field',
            position: [42, 43, 1, 3],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center',
            padding: 0,
            fontSize: 9,
        },
        {
            id: 'nav-point-9-longitude',
            _description: 'Nav point 9 longitude field',
            position: [42, 43, 3, 5],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center',
            padding: 0,
            fontSize: 9,
        },
        {
            id: 'nav-point-9-name',
            _description: 'Nav point 9 name field',
            position: [42, 43, 5, 9],
            borderWidths: [1, 2, 1, 1],
            textAlign: 'center',
            padding: 0,
            fontSize: 11,
        },
        {
            id: 'nav-point-19-latitude',
            _description: 'Nav point 19 latitude field',
            position: [42, 43, 10, 12],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center',
            padding: 0,
            fontSize: 9,
        },
        {
            id: 'nav-point-19-longitude',
            _description: 'Nav point 19 longitude field',
            position: [42, 43, 12, 14],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center',
            padding: 0,
            fontSize: 9,
        },
        {
            id: 'nav-point-19-name',
            _description: 'Nav point 19 name field',
            position: [42, 43, 14, 18],
            borderWidths: [1, 2, 1, 1],
            textAlign: 'center',
            padding: 0,
            fontSize: 11,
        },
        // Row 44
        {
            id: 'nav-point-10-latitude',
            _description: 'Nav point 10 latitude field',
            position: [43, 44, 1, 3],
            borderWidths: [1, 1, 2, 1],
            textAlign: 'center',
            padding: 0,
            fontSize: 9,
        },
        {
            id: 'nav-point-10-longitude',
            _description: 'Nav point 10 longitude field',
            position: [43, 44, 3, 5],
            borderWidths: [1, 1, 2, 1],
            textAlign: 'center',
            padding: 0,
            fontSize: 9,
        },
        {
            id: 'nav-point-10-name',
            _description: 'Nav point 10 name field',
            position: [43, 44, 5, 9],
            borderWidths: [1, 2, 2, 1],
            textAlign: 'center',
            padding: 0,
            fontSize: 11,
        },
        {
            id: 'nav-point-20-latitude',
            _description: 'Nav point 20 latitude field',
            position: [43, 44, 10, 12],
            borderWidths: [1, 1, 2, 1],
            textAlign: 'center',
            padding: 0,
            fontSize: 9,
        },
        {
            id: 'nav-point-20-longitude',
            _description: 'Nav point 20 longitude field',
            position: [44, 44, 12, 14],
            borderWidths: [1, 1, 2, 1],
            textAlign: 'center',
            padding: 0,
            fontSize: 9,
        },
        {
            id: 'nav-point-20-name',
            _description: 'Nav point 20 name field',
            position: [43, 44, 14, 18],
            borderWidths: [1, 2, 2, 1],
            textAlign: 'center',
            padding: 0,
            fontSize: 11,
        },
    ]
}

const M2000C_2 = {
    id: 'M2000C-page-2',
    _name: 'Mirage 2000C kneeboard page 2',
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
            backgroundColor: darkBackground
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
            backgroundColor: darkBackground
        },
    ]
}

const M2000C = [M2000C_1, M2000C_2]