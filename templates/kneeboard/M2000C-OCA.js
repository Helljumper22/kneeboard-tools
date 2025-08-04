const M2000C_OCA_darkBackground = '#D9D9D9'

const M2000C_OCA_lineupOptions = ['ECHL L', 'ECHL R', 'BAN L', 'BAN R', 'STAG L', 'STAG R', 'INDIV'];
const M2000C_OCA_takeoffOptions = ['VFR 1', 'VFR 2', 'IFR 1', 'IFR 2', 'IFR 3'];
const M2000C_OCA_formationOptions = ['ECHL L', 'ECHL R', 'F4 L', 'F4 R', 'FW L', 'FW R', 'WEDGE L', 'WEDGE R', 'BTL L', 'BTL R', 'BTL 4 L', 'BTL 4 R', 'CARD L', 'CARD R', 'FL 4 L', 'FL 4 R'];
const M2000C_OCA_recoveryOptions = ['SKY CLR', 'CLD BRK', 'IFR 1', 'IFR 2', 'IFR 3'];
const M2000C_OCA_landingOptions = ['INDIV', 'FORM'];
const M2000C_OCA_confOptions = ['6A', '6F', '6B', '6K', '6+8A', '6+8F', '6+8B', '6+8K', '6+8+8F', '6+8+14A', '6+8+14F', '6+8B+4x250 kg'];
const M2000C_OCA_targetingOptions = ['L/S/H', 'T/S/L', 'L/X/H', 'T/X/L'];
const M2000C_OCA_sortingOptions = ['L/S/H', 'T/S/L', 'T/S/H', 'L/S/L'];
const M2000C_OCA_riskLevelOptions = ['LOW', 'MEDIUM', 'HIGH'];
const M2000C_OCA_yesNoOptions = ['Y', 'N'];
const M2000C_OCA_wcsOptions = ['HOLD', 'TIGHT', 'FREE'];

const M2000C_OCA_reactionCanvasPath = "M2 0 2 25 27 25 27 0ZM62 45A1 1 0 0032 45 1 1 0 0062 45M30 70A1 1 0 000 70 1 1 0 0030 70M27 25 36 35M-7 31C-9 31-10 32-10 34L-10 48C-10 51-9 51-7 51M2 31C4 31 5 32 5 34L5 48C5 50 4 51 2 51M8 43 8 45 14 45 14 43ZM10 42 12 42 12 40 14 40 14 38 12 38 12 36 10 36 10 38 8 38 8 40 10 40Z";
const M2000C_OCA_racetrackPath = "M5 20A1 1 0 0135 20L35 65A1 1 0 015 65ZM35 18 33 20 35 22 37 20 35 18ZM35 19 34 20 35 21 36 20 35 19Z";
const M2000C_OCA_racetrackRightHandPath = "M5 20A1 1 0 0135 20L35 65A1 1 0 015 65ZM5 18 3 20 5 22 7 20 5 18ZM5 19 4 20 5 21 6 20 5 19Z";
const M2000C_OCA_racetrack1ShipPath = "M5 20A1 1 0 0135 20L35 65A1 1 0 015 65ZM35 18 33 20 35 22 37 20 35 18M35 25 33 29 37 29ZM35 19 34 20 35 21 36 20 35 19Z";
const M2000C_OCA_racetrack1ShipRightHandPath = "M5 20A1 1 0 0135 20L35 65A1 1 0 015 65ZM5 18 3 20 5 22 7 20 5 18M5 25 3 29 7 29ZM5 19 4 20 5 21 6 20 5 19Z";
const M2000C_OCA_racetrack11ShipPath = "M5 20A1 1 0 0135 20L35 65A1 1 0 015 65ZM35 18 33 20 35 22 37 20 35 18M35 25 33 29 37 29ZM35 19 34 20 35 21 36 20 35 19M5 60 3 56 7 56Z";
const M2000C_OCA_racetrack11ShipRightHandPath = "M5 20A1 1 0 0135 20L35 65A1 1 0 015 65ZM5 18 3 20 5 22 7 20 5 18M5 25 3 29 7 29ZM5 19 4 20 5 21 6 20 5 19M35 60 33 56 37 56Z";
const M2000C_OCA_racetrack2ShipPath = "M5 20A1 1 0 0135 20L35 65A1 1 0 015 65ZM35 18 33 20 35 22 37 20 35 18M32 25 30 29 34 29ZM38 25 36 29 40 29ZM35 19 34 20 35 21 36 20 35 19";
const M2000C_OCA_racetrack2ShipRightHandPath = "M5 20A1 1 0 0135 20L35 65A1 1 0 015 65ZM5 18 3 20 5 22 7 20 5 18M2 25 0 29 4 29ZM8 25 6 29 10 29ZM5 19 4 20 5 21 6 20 5 19";
const M2000C_OCA_racetrack22ShipPath = "M5 20A1 1 0 0135 20L35 65A1 1 0 015 65ZM35 18 33 20 35 22 37 20 35 18M32 25 30 29 34 29ZM38 25 36 29 40 29ZM35 19 34 20 35 21 36 20 35 19M8 60 6 56 10 56ZM2 60 0 56 4 56Z";
const M2000C_OCA_racetrack22ShipRightHandPath = "M5 20A1 1 0 0135 20L35 65A1 1 0 015 65ZM5 18 3 20 5 22 7 20 5 18M2 25 0 29 4 29ZM8 25 6 29 10 29ZM5 19 4 20 5 21 6 20 5 19M38 60 36 56 40 56ZM32 60 30 56 34 56Z";
const M2000C_OCA_racetrack4ShipPath = "M5 20A1 1 0 0135 20L35 65A1 1 0 015 65ZM35 18 33 20 35 22 37 20 35 18M32 25 30 29 34 29ZM28 29 30 33 26 33ZM38 25 36 29 40 29ZM42 29 40 33 44 33ZM35 19 34 20 35 21 36 20 35 19";
const M2000C_OCA_racetrack4ShipRightHandPath = "M5 20A1 1 0 0135 20L35 65A1 1 0 015 65ZM5 18 3 20 5 22 7 20 5 18M2 25 0 29 4 29ZM-2 29 0 33-4 33ZM9 25 7 29 11 29ZM13 29 11 33 15 33ZM5 19 4 20 5 21 6 20 5 19";
const M2000C_OCA_racetrack4ShipBoxPath = "M5 20A1 1 0 0135 20L35 65A1 1 0 015 65ZM35 18 33 20 35 22 37 20 35 18M32 25 30 29 34 29ZM32 31 34 35 30 35ZM38 25 36 29 40 29ZM38 31 36 35 40 35ZM35 19 34 20 35 21 36 20 35 19";
const M2000C_OCA_racetrack4ShipBoxRightHandPath = "M5 20A1 1 0 0135 20L35 65A1 1 0 015 65ZM5 18 3 20 5 22 7 20 5 18M2 25 0 29 4 29ZM2 31 4 35 0 35ZM9 25 7 29 11 29ZM9 31 7 35 11 35ZM5 19 4 20 5 21 6 20 5 19";

const M2000C_OCA_racetrackPathList = [
    M2000C_OCA_racetrackPath, M2000C_OCA_racetrack1ShipPath, M2000C_OCA_racetrack11ShipPath, M2000C_OCA_racetrack2ShipPath, M2000C_OCA_racetrack22ShipPath, M2000C_OCA_racetrack4ShipPath, M2000C_OCA_racetrack4ShipBoxPath,
    M2000C_OCA_racetrackRightHandPath, M2000C_OCA_racetrack1ShipRightHandPath, M2000C_OCA_racetrack11ShipRightHandPath, M2000C_OCA_racetrack2ShipRightHandPath, M2000C_OCA_racetrack22ShipRightHandPath, M2000C_OCA_racetrack4ShipRightHandPath, M2000C_OCA_racetrack4ShipBoxRightHandPath
];

const M2000C_OCA_1 = {
    id: 'M2000C-OCA-page-1',
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
            backgroundColor: M2000C_OCA_darkBackground
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
            position: [1, 2, 0, 3],
            borderWidths: [2, 2, 1, 1]
        },
        {
            _name: 'Callsign',
            _description: 'Callsign text',
            text: 'CALLSIGN',
            position: [1, 2, 3, 7],
            borderWidths: [2, 1, 1, 2]
        },
        {
            _name: 'Pilot number',
            _description: 'Pilot number text',
            text: 'No',
            position: [1, 2, 7, 8],
            borderWidths: [2, 1, 1, 1]
        },
        {
            _name: 'A/C number',
            _description: 'A/C number text',
            text: 'A/C',
            position: [1, 2, 8, 10],
            borderWidths: [2, 1, 1, 1]
        },
        {
            _name: 'RADAR channel',
            _description: 'RADAR channel text',
            text: 'RDR',
            position: [1, 2, 10, 11],
            borderWidths: [2, 1, 1, 1]
        },
        {
            _name: 'Yardstick 1 channel',
            _description: 'Yardstick 1 channel text',
            text: 'AA1',
            position: [1, 2, 11, 13],
            borderWidths: [2, 1, 1, 1]
        },
        {
            _name: 'Yardstick 2 channel',
            _description: 'Yardstick 2 channel text',
            text: 'AA2',
            position: [1, 2, 13, 15],
            borderWidths: [2, 1, 1, 1]
        },
        {
            _name: 'IFF mode 3',
            _description: 'IFF mode 3 text',
            text: 'IFF3',
            position: [1, 2, 15, 17],
            borderWidths: [2, 1, 1, 1]
        },
        {
            _name: 'IFF mode 1',
            _description: 'IFF mode 1 text',
            text: 'IFF1',
            position: [1, 2, 17, 18],
            borderWidths: [2, 1, 1, 1]
        },
        {
            _name: 'Altitude bloc',
            _description: 'Altitude bloc text',
            text: 'ALT',
            position: [1, 2, 18, 19],
            borderWidths: [2, 1, 1, 1]
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
            backgroundColor: M2000C_OCA_darkBackground
        },
        {
            _name: 'RAM',
            _description: 'RAM text',
            text: 'RAM',
            position: [11, 14, 4, 5],
            borderWidths: [2, 1, 2, 2],
            textOrientation: 'vertical',
            backgroundColor: M2000C_OCA_darkBackground
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
            padding: 0,
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
            backgroundColor: M2000C_OCA_darkBackground
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
            backgroundColor: M2000C_OCA_darkBackground
        },
        {
            _name: 'Package',
            _description: 'Package text',
            text: 'PACKAGE',
            position: [14, 15, 9, 19],
            borderWidths: [2, 2, 1, 2],
            backgroundColor: M2000C_OCA_darkBackground
        },
        // Row 16
        {
            _name: 'Inter freq 2',
            _description: 'Inter freq 2 text',
            text: 'INTER 2',
            position: [15, 16, 0, 3],
            borderWidths: [1, 0, 1, 2],
            backgroundColor: M2000C_OCA_darkBackground
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
            backgroundColor: M2000C_OCA_darkBackground
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
            backgroundColor: M2000C_OCA_darkBackground
        },
        {
            _name: 'Transit formation',
            _description: 'Transit formation text',
            text: 'TRANSIT',
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
            backgroundColor: M2000C_OCA_darkBackground
        },
        {
            _name: 'Recovery type',
            _description: 'Recovery type text',
            text: 'RCVR',
            position: [21, 22, 7, 9],
            borderWidths: [0, 2, 0, 2],
            textAlign: 'left',
        },
        // Row 24
        {
            _name: 'Landing type',
            _description: 'Landing type text',
            text: 'LDG',
            position: [23, 24, 7, 9],
            borderWidths: [0, 2, 0, 2],
            textAlign: 'left',
        },
        // Row 26-27
        {
            _name: 'Performance data',
            _description: 'Performance data text',
            text: 'PERF DATA',
            position: [25, 27, 0, 6],
            borderWidths: [2, 1, 1, 2],
            backgroundColor: M2000C_OCA_darkBackground
        },
        // Row 26
        {
            _name: 'Performance data configuration',
            _description: 'Performance data configuration text',
            text: 'CONF',
            position: [25, 26, 6, 9],
            borderWidths: [2, 2, 0, 1],
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
            backgroundColor: M2000C_OCA_darkBackground
        },
        // Row 28
        {
            _name: 'Performance data Jx',
            _description: 'Performance data Jx text',
            text: 'Jx',
            position: [27, 28, 0, 1],
            borderWidths: [1, 0, 0, 2],
            textAlign: 'center',
        },
        {
            _name: 'Performance data VOM PG',
            _description: 'Performance data VOM PG text',
            text: 'VOM PG',
            position: [27, 28, 2, 4],
            borderWidths: [1, 0, 0, 1],
            textAlign: 'center',
        },
        {
            _name: 'Performance data MLW FULL',
            _description: 'Performance data MLW FULL text',
            text: 'MLW FULL',
            position: [27, 28, 6, 9],
            borderWidths: [1, 2, 0, 1],
            textAlign: 'left',
        },
        {
            _name: 'Deputy mission commander',
            _description: 'Deputy mission commander text',
            text: 'DMC',
            position: [27, 28, 9, 11],
            borderWidths: [1, 1, 1, 2],
            backgroundColor: M2000C_OCA_darkBackground
        },
        // Row 29
        {
            _name: 'Performance data Rto',
            _description: 'Performance data Rto text',
            text: 'Rto',
            position: [28, 29, 0, 1],
            borderWidths: [0, 0, 0, 2],
            textAlign: 'center',
            backgroundColor: M2000C_OCA_darkBackground
        },
        {
            _name: 'Performance data VOM PC',
            _description: 'Performance data VOM PC text',
            text: 'VOM PC',
            position: [28, 29, 2, 4],
            borderWidths: [0, 0, 0, 1],
            textAlign: 'center',
            backgroundColor: M2000C_OCA_darkBackground
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
            _name: 'Performance data VR',
            _description: 'Performance data VR text',
            text: 'VR',
            position: [29, 30, 0, 1],
            borderWidths: [0, 0, 0, 2],
            textAlign: 'center',
        },
        {
            _name: 'Performance data DMF HA',
            _description: 'Performance data DMF HA text',
            text: 'DMF HA',
            position: [29, 30, 2, 4],
            borderWidths: [0, 0, 0, 1],
            textAlign: 'center',
        },
        {
            _name: 'Performance data MLW CLEAN',
            _description: 'Performance data MLW CLEAN text',
            text: 'MLW CLEAN',
            position: [29, 30, 6, 9],
            borderWidths: [0, 2, 0, 1],
            textAlign: 'left',
        },
        {
            _name: 'Strike package lead',
            _description: 'Strike package lead text',
            text: 'STKPL',
            position: [29, 30, 9, 11],
            borderWidths: [1, 1, 1, 2],
            backgroundColor: M2000C_OCA_darkBackground
        },
        // Row 31
        {
            _name: 'Performance data Vlof',
            _description: 'Performance data Vlof text',
            text: 'Vlof',
            position: [30, 31, 0, 1],
            borderWidths: [0, 0, 2, 2],
            textAlign: 'center',
            backgroundColor: M2000C_OCA_darkBackground
        },
        {
            _name: 'Performance data DMF LA',
            _description: 'Performance data DMF LA text',
            text: 'DMF LA',
            position: [30, 31, 2, 4],
            borderWidths: [0, 0, 2, 1],
            textAlign: 'center',
            backgroundColor: M2000C_OCA_darkBackground
        },
        // Row 32-34
        {
            _name: 'Air-to-air refueling',
            _description: 'Air-to-air refueling text',
            text: 'AAR',
            position: [31, 34, 7, 8],
            borderWidths: [2, 1, 2, 2],
            textOrientation: 'vertical',
            backgroundColor: M2000C_OCA_darkBackground
        },
        // Row 32
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
            backgroundColor: M2000C_OCA_darkBackground,
            padding: 0,
        },
        // Row 33
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
            backgroundColor: M2000C_OCA_darkBackground
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
            position: [2, 8, 3, 5],
            borderWidths: [1, 1, 2, 2],
            textAlign: 'center',
            textOrientation: 'slanted',
            bold: true
        },
        // Row 3
        {
            id: 'pilot-1',
            _description: 'Pilot 1 field',
            position: [2, 3, 0, 3],
            borderWidths: [1, 2, 1, 2],
            textAlign: 'center',
            backgroundColor: M2000C_OCA_darkBackground
        },
        {
            id: 'pilot-1-callsign',
            _description: 'Pilot 1 callsign field',
            position: [2, 3, 5, 7],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center',
            backgroundColor: M2000C_OCA_darkBackground
        },
        {
            id: 'pilot-1-number',
            _description: 'Pilot 1 number field',
            position: [2, 3, 7, 8],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center',
            backgroundColor: M2000C_OCA_darkBackground
        },
        {
            id: 'pilot-1-aircraft',
            _description: 'Pilot 1 aircraft field',
            position: [2, 3, 8, 10],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center',
            backgroundColor: M2000C_OCA_darkBackground
        },
        {
            id: 'pilot-1-radar-channel',
            _description: 'Pilot 1 RADAR channel field',
            position: [2, 3, 10, 11],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center',
            backgroundColor: M2000C_OCA_darkBackground
        },
        {
            id: 'pilot-1-yardstick-1',
            _description: 'Pilot 1 yardstick 1 field',
            position: [2, 3, 11, 13],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center',
            backgroundColor: M2000C_OCA_darkBackground
        },
        {
            id: 'pilot-1-yardstick-2',
            _description: 'Pilot 1 yardstick 2 field',
            position: [2, 3, 13, 15],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center',
            backgroundColor: M2000C_OCA_darkBackground
        },
        {
            id: 'pilot-1-iff-mode-3',
            _description: 'Pilot 1 IFF mode 3 field',
            position: [2, 3, 15, 17],
            borderWidths: [0, 1, 1, 1],
            textAlign: 'center',
            backgroundColor: M2000C_OCA_darkBackground
        },
        {
            id: 'pilot-1-iff-mode-1',
            _description: 'Pilot 1 IFF mode 1 field',
            position: [2, 3, 17, 18],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center',
            backgroundColor: M2000C_OCA_darkBackground
        },
        {
            id: 'pilot-1-altitude-bloc',
            _description: 'Pilot 1 altitude bloc field',
            position: [2, 3, 18, 19],
            borderWidths: [1, 2, 1, 1],
            textAlign: 'center',
            padding: 0,
            backgroundColor: M2000C_OCA_darkBackground
        },
        // Row 4
        {
            id: 'pilot-2',
            _description: 'Pilot 2 field',
            position: [3, 4, 0, 3],
            borderWidths: [1, 2, 1, 2],
            textAlign: 'center'
        },
        {
            id: 'pilot-2-callsign',
            _description: 'Pilot 2 callsign field',
            position: [3, 4, 5, 7],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center'
        },
        {
            id: 'pilot-2-number',
            _description: 'Pilot 2 number field',
            position: [3, 4, 7, 8],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center'
        },
        {
            id: 'pilot-2-aircraft',
            _description: 'Pilot 2 aircraft field',
            position: [3, 4, 8, 10],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center'
        },
        {
            id: 'pilot-2-radar-channel',
            _description: 'Pilot 2 RADAR channel field',
            position: [3, 4, 10, 11],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center'
        },
        {
            id: 'pilot-2-yardstick-1',
            _description: 'Pilot 2 yardstick 1 field',
            position: [3, 4, 11, 13],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center'
        },
        {
            id: 'pilot-2-yardstick-2',
            _description: 'Pilot 2 yardstick 2 field',
            position: [3, 4, 13, 15],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center'
        },
        {
            id: 'pilot-2-iff-mode-3',
            _description: 'Pilot 2 IFF mode 3 field',
            position: [3, 4, 15, 17],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center'
        },
        {
            id: 'pilot-2-iff-mode-1',
            _description: 'Pilot 2 IFF mode 1 field',
            position: [3, 4, 17, 18],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center'
        },
        {
            id: 'pilot-2-altitude-bloc',
            _description: 'Pilot 2 altitude bloc field',
            position: [3, 4, 18, 19],
            borderWidths: [1, 2, 1, 1],
            textAlign: 'center',
            padding: 0,
        },
        // Row 5
        {
            id: 'pilot-3',
            _description: 'Pilot 3 field',
            position: [4, 5, 0, 3],
            borderWidths: [1, 2, 1, 2],
            textAlign: 'center',
            backgroundColor: M2000C_OCA_darkBackground
        },
        {
            id: 'pilot-3-callsign',
            _description: 'Pilot 3 callsign field',
            position: [4, 5, 5, 7],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center',
            backgroundColor: M2000C_OCA_darkBackground
        },
        {
            id: 'pilot-3-number',
            _description: 'Pilot 3 number field',
            position: [4, 5, 7, 8],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center',
            backgroundColor: M2000C_OCA_darkBackground
        },
        {
            id: 'pilot-3-aircraft',
            _description: 'Pilot 3 aircraft field',
            position: [4, 5, 8, 10],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center',
            backgroundColor: M2000C_OCA_darkBackground
        },
        {
            id: 'pilot-3-radar-channel',
            _description: 'Pilot 3 radar field',
            position: [4, 5, 10, 11],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center',
            backgroundColor: M2000C_OCA_darkBackground
        },
        {
            id: 'pilot-3-yardstick-1',
            _description: 'Pilot 3 yardstick 1 field',
            position: [4, 5, 11, 13],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center',
            backgroundColor: M2000C_OCA_darkBackground
        },
        {
            id: 'pilot-3-yardstick-2',
            _description: 'Pilot 3 yardstick 2 field',
            position: [4, 5, 13, 15],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center',
            backgroundColor: M2000C_OCA_darkBackground
        },
        {
            id: 'pilot-3-iff-mode-3',
            _description: 'Pilot 3 IFF mode 3 field',
            position: [4, 5, 15, 17],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center',
            backgroundColor: M2000C_OCA_darkBackground
        },
        {
            id: 'pilot-3-iff-mode-1',
            _description: 'Pilot 3 IFF mode 1 field',
            position: [4, 5, 17, 18],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center',
            backgroundColor: M2000C_OCA_darkBackground
        },
        {
            id: 'pilot-3-altitude-bloc',
            _description: 'Pilot 3 altitude bloc field',
            position: [4, 5, 18, 19],
            borderWidths: [1, 2, 1, 1],
            textAlign: 'center',
            padding: 0,
            backgroundColor: M2000C_OCA_darkBackground
        },
        // Row 6
        {
            id: 'pilot-4',
            _description: 'Pilot 4 field',
            position: [5, 6, 0, 3],
            borderWidths: [1, 2, 1, 2],
            textAlign: 'center'
        },
        {
            id: 'pilot-4-callsign',
            _description: 'Pilot 4 callsign field',
            position: [5, 6, 5, 7],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center'
        },
        {
            id: 'pilot-4-number',
            _description: 'Pilot 4 number field',
            position: [5, 6, 7, 8],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center'
        },
        {
            id: 'pilot-4-aircraft',
            _description: 'Pilot 4 aircraft field',
            position: [5, 6, 8, 10],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center'
        },
        {
            id: 'pilot-4-radar-channel',
            _description: 'Pilot 4 RADAR channel field',
            position: [5, 6, 10, 11],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center'
        },
        {
            id: 'pilot-4-yardstick-1',
            _description: 'Pilot 4 yardstick 1 field',
            position: [5, 6, 11, 13],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center'
        },
        {
            id: 'pilot-4-yardstick-2',
            _description: 'Pilot 4 yardstick 2 field',
            position: [5, 6, 13, 15],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center'
        },
        {
            id: 'pilot-4-iff-mode-3',
            _description: 'Pilot 4 IFF mode 3 field',
            position: [5, 6, 15, 17],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center'
        },
        {
            id: 'pilot-4-iff-mode-1',
            _description: 'Pilot 4 IFF mode 1 field',
            position: [5, 6, 17, 18],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center'
        },
        {
            id: 'pilot-4-altitude-bloc',
            _description: 'Pilot 4 altitude bloc field',
            position: [5, 6, 18, 19],
            borderWidths: [1, 2, 1, 1],
            textAlign: 'center',
            padding: 0,
        },
        // Row 7
        {
            id: 'pilot-5',
            _description: 'Pilot 5 field',
            position: [6, 7, 0, 3],
            borderWidths: [1, 2, 1, 2],
            textAlign: 'center',
            backgroundColor: M2000C_OCA_darkBackground
        },
        {
            id: 'pilot-5-callsign',
            _description: 'Pilot 5 callsign field',
            position: [6, 7, 5, 7],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center',
            backgroundColor: M2000C_OCA_darkBackground
        },
        {
            id: 'pilot-5-number',
            _description: 'Pilot 5 number field',
            position: [6, 7, 7, 8],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center',
            backgroundColor: M2000C_OCA_darkBackground
        },
        {
            id: 'pilot-5-aircraft',
            _description: 'Pilot 5 aircraft field',
            position: [6, 7, 8, 10],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center',
            backgroundColor: M2000C_OCA_darkBackground
        },
        {
            id: 'pilot-5-radar-channel',
            _description: 'Pilot 5 RADAR channel field',
            position: [6, 7, 10, 11],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center',
            backgroundColor: M2000C_OCA_darkBackground
        },
        {
            id: 'pilot-5-yardstick-1',
            _description: 'Pilot 5 yardstick 1 field',
            position: [6, 7, 11, 13],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center',
            backgroundColor: M2000C_OCA_darkBackground
        },
        {
            id: 'pilot-5-yardstick-2',
            _description: 'Pilot 5 yardstick 2 field',
            position: [6, 7, 13, 15],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center',
            backgroundColor: M2000C_OCA_darkBackground
        },
        {
            id: 'pilot-5-iff-mode-3',
            _description: 'Pilot 5 IFF mode 3 field',
            position: [6, 7, 15, 17],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center',
            backgroundColor: M2000C_OCA_darkBackground
        },
        {
            id: 'pilot-5-iff-mode-1',
            _description: 'Pilot 5 IFF mode 1 field',
            position: [6, 7, 17, 18],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center',
            backgroundColor: M2000C_OCA_darkBackground
        },
        {
            id: 'pilot-5-altitude-bloc',
            _description: 'Pilot 5 altitude bloc field',
            position: [6, 7, 18, 19],
            borderWidths: [1, 2, 1, 1],
            textAlign: 'center',
            padding: 0,
            backgroundColor: M2000C_OCA_darkBackground
        },
        // Row 8
        {
            id: 'pilot-6',
            _description: 'Pilot 6 field',
            position: [7, 8, 0, 3],
            borderWidths: [1, 2, 2, 2],
            textAlign: 'center'
        },
        {
            id: 'pilot-6-callsign',
            _description: 'Pilot 6 callsign field',
            position: [7, 8, 5, 7],
            borderWidths: [1, 1, 2, 1],
            textAlign: 'center'
        },
        {
            id: 'pilot-6-number',
            _description: 'Pilot 6 number field',
            position: [7, 8, 7, 8],
            borderWidths: [1, 1, 2, 1],
            textAlign: 'center'
        },
        {
            id: 'pilot-6-aircraft',
            _description: 'Pilot 6 aircraft field',
            position: [7, 8, 8, 10],
            borderWidths: [1, 1, 2, 1],
            textAlign: 'center'
        },
        {
            id: 'pilot-6-radar-channel',
            _description: 'Pilot 6 RADAR channel field',
            position: [7, 8, 10, 11],
            borderWidths: [1, 1, 2, 1],
            textAlign: 'center'
        },
        {
            id: 'pilot-6-yardstick-1',
            _description: 'Pilot 6 yardstick 1 field',
            position: [7, 8, 11, 13],
            borderWidths: [1, 1, 2, 1],
            textAlign: 'center'
        },
        {
            id: 'pilot-6-yardstick-2',
            _description: 'Pilot 6 yardstick 2 field',
            position: [7, 8, 13, 15],
            borderWidths: [1, 1, 2, 1],
            textAlign: 'center'
        },
        {
            id: 'pilot-6-iff-mode-3',
            _description: 'Pilot 6 IFF mode 3 field',
            position: [7, 8, 15, 17],
            borderWidths: [1, 1, 2, 1],
            textAlign: 'center'
        },
        {
            id: 'pilot-6-iff-mode-1',
            _description: 'Pilot 6 IFF mode 1 field',
            position: [7, 8, 17, 18],
            borderWidths: [1, 1, 2, 1],
            textAlign: 'center'
        },
        {
            id: 'pilot-6-altitude-bloc',
            _description: 'Pilot 6 altitude bloc field',
            position: [7, 8, 18, 19],
            borderWidths: [1, 2, 2, 1],
            textAlign: 'center',
            padding: 0,
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
            fontSize: '11',
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
            fontSize: '11',
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
            fontSize: '11',
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
            fontSize: '11',
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
            fontSize: '11',
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
            type: 'linked-text',
            _description: 'BAS altitude field',
            linkedFields: [
                ['M2000C-OCA-page-2', 'bas-altitude'],
            ],
            position: [12, 14, 1, 2],
            borderWidths: [1, 1, 2, 1],
            textAlign: 'center',
            padding: 0,
        },
        {
            id: 'bas-heading',
            type: 'linked-text',
            _description: 'BAS heading field',
            linkedFields: [
                ['M2000C-OCA-page-2', 'bas-heading'],
            ],
            position: [12, 14, 2, 3],
            borderWidths: [1, 1, 2, 1],
            textAlign: 'center',
            padding: 0,
        },
        {
            id: 'bas-number',
            type: 'linked-text',
            _description: 'BAS number field',
            linkedFields: [
                ['M2000C-OCA-page-2', 'bas-number'],
            ],
            position: [12, 14, 3, 4],
            borderWidths: [1, 2, 2, 1],
            textAlign: 'center',
            padding: 0,
        },
        {
            id: 'ramrod-0',
            type: 'chained-text',
            _description: 'Ramrod 0 field',
            chainedField: 'ramrod-1',
            characterLimit: 1,
            position: [12, 14, 5, 6],
            borderWidths: [1, 1, 2, 1],
            textAlign: 'center',
        },
        {
            id: 'ramrod-1',
            type: 'chained-text',
            _description: 'Ramrod 1 field',
            chainedField: 'ramrod-2',
            characterLimit: 1,
            position: [12, 14, 6, 7],
            borderWidths: [1, 1, 2, 1],
            textAlign: 'center',
        },
        {
            id: 'ramrod-2',
            type: 'chained-text',
            _description: 'Ramrod 2 field',
            chainedField: 'ramrod-3',
            characterLimit: 1,
            position: [12, 14, 7, 8],
            borderWidths: [1, 1, 2, 1],
            textAlign: 'center',
        },
        {
            id: 'ramrod-3',
            type: 'chained-text',
            _description: 'Ramrod 3 field',
            chainedField: 'ramrod-4',
            characterLimit: 1,
            position: [12, 14, 8, 9],
            borderWidths: [1, 1, 2, 1],
            textAlign: 'center',
        },
        {
            id: 'ramrod-4',
            type: 'chained-text',
            _description: 'Ramrod 4 field',
            chainedField: 'ramrod-5',
            characterLimit: 1,
            position: [12, 14, 9, 10],
            borderWidths: [1, 1, 2, 1],
            textAlign: 'center',
        },
        {
            id: 'ramrod-5',
            type: 'chained-text',
            _description: 'Ramrod 5 field',
            chainedField: 'ramrod-6',
            characterLimit: 1,
            position: [12, 14, 10, 11],
            borderWidths: [1, 1, 2, 1],
            textAlign: 'center',
        },
        {
            id: 'ramrod-6',
            type: 'chained-text',
            _description: 'Ramrod 6 field',
            chainedField: 'ramrod-7',
            characterLimit: 1,
            position: [12, 14, 11, 12],
            borderWidths: [1, 1, 2, 1],
            textAlign: 'center',
        },
        {
            id: 'ramrod-7',
            type: 'chained-text',
            _description: 'Ramrod 7 field',
            chainedField: 'ramrod-8',
            characterLimit: 1,
            position: [12, 14, 12, 13],
            borderWidths: [1, 1, 2, 1],
            textAlign: 'center',
        },
        {
            id: 'ramrod-8',
            type: 'chained-text',
            _description: 'Ramrod 8 field',
            chainedField: 'ramrod-9',
            characterLimit: 1,
            position: [12, 14, 13, 14],
            borderWidths: [1, 1, 2, 1],
            textAlign: 'center',
        },
        {
            id: 'ramrod-9',
            _description: 'Ramrod 9 field',
            characterLimit: 1,
            position: [12, 14, 14, 15],
            borderWidths: [1, 2, 2, 1],
            textAlign: 'center',
        },
        // Row 13
        {
            id: 'authenticate-1-top',
            type: 'chained-text',
            _description: 'Authenticate 1 top field',
            chainedField: 'authenticate-1-bottom',
            characterLimit: 3,
            position: [12, 13, 15, 16],
            borderWidths: [1, 1, 0, 2],
            textAlign: 'center',
            padding: 0,
        },
        {
            id: 'authenticate-2-top',
            type: 'chained-text',
            _description: 'Authenticate 2 top field',
            chainedField: 'authenticate-2-bottom',
            characterLimit: 3,
            position: [12, 13, 16, 17],
            borderWidths: [1, 1, 0, 1],
            textAlign: 'center',
            padding: 0,
        },
        {
            id: 'authenticate-3-top',
            type: 'chained-text',
            _description: 'Authenticate 3 top field',
            chainedField: 'authenticate-3-bottom',
            characterLimit: 3,
            position: [12, 13, 17, 18],
            borderWidths: [1, 1, 0, 1],
            textAlign: 'center',
            padding: 0,
        },
        {
            id: 'authenticate-4-top',
            type: 'chained-text',
            _description: 'Authenticate 4 top field',
            chainedField: 'authenticate-4-bottom',
            characterLimit: 3,
            position: [12, 13, 18, 19],
            borderWidths: [1, 2, 0, 1],
            textAlign: 'center',
            padding: 0,
        },
        // Row 14
        {
            id: 'authenticate-1-bottom',
            _description: 'Authenticate 1 bottom field',
            characterLimit: 1,
            position: [13, 14, 15, 16],
            borderWidths: [0, 1, 2, 2],
            textAlign: 'center',
        },
        {
            id: 'authenticate-2-bottom',
            _description: 'Authenticate 2 bottom field',
            characterLimit: 1,
            position: [13, 14, 16, 17],
            borderWidths: [0, 1, 2, 1],
            textAlign: 'center',
        },
        {
            id: 'authenticate-3-bottom',
            _description: 'Authenticate 3 bottom field',
            characterLimit: 1,
            position: [13, 14, 17, 18],
            borderWidths: [0, 1, 2, 1],
            textAlign: 'center',
        },
        {
            id: 'authenticate-4-bottom',
            _description: 'Authenticate 4 bottom field',
            characterLimit: 1,
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
            backgroundColor: M2000C_OCA_darkBackground
        },
        {
            id: 'inter-2-callsign',
            _description: 'Inter 2 callsign field',
            position: [15, 16, 4, 7],
            borderWidths: [1, 2, 1, 1],
            textAlign: 'center',
            backgroundColor: M2000C_OCA_darkBackground
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
            options: M2000C_OCA_lineupOptions,
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
            backgroundColor: M2000C_OCA_darkBackground
        },
        {
            id: 'gci-1-callsign',
            _description: 'GCI 1 callsign field',
            position: [17, 18, 4, 7],
            borderWidths: [1, 2, 1, 1],
            textAlign: 'center',
            backgroundColor: M2000C_OCA_darkBackground
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
            options: M2000C_OCA_takeoffOptions,
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
            backgroundColor: M2000C_OCA_darkBackground
        },
        {
            id: 'safety-callsign',
            _description: 'Safety callsign field',
            position: [19, 20, 4, 7],
            borderWidths: [1, 2, 1, 1],
            textAlign: 'center',
            backgroundColor: M2000C_OCA_darkBackground
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
            id: 'transit-formation',
            type: 'input-select',
            _description: 'Transit formation field',
            options: M2000C_OCA_formationOptions,
            selectColumns: 2,
            dropdownSide: 'left',
            position: [20, 21, 7, 9],
            borderWidths: [0, 2, 0, 2],
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
            backgroundColor: M2000C_OCA_darkBackground
        },
        {
            id: 'strike-common-callsign',
            _description: 'Strike common callsign field',
            position: [21, 22, 4, 7],
            borderWidths: [1, 2, 1, 1],
            textAlign: 'center',
            backgroundColor: M2000C_OCA_darkBackground
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
            fontSize: '11',
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
            id: 'recovery-type',
            type: 'input-select',
            _description: 'Recovery type field',
            options: M2000C_OCA_recoveryOptions,
            dropdownSide: 'left',
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
            default: 'CIV GUARD',
            textAlign: 'center',
            fontSize: '11',
            bold: true,
            backgroundColor: M2000C_OCA_darkBackground
        },
        {
            id: 'additional-freq-2-channel',
            _description: 'Additional freq 2 channel field',
            position: [23, 24, 3, 4],
            borderWidths: [1, 1, 1, 0],
            default: 'V20',
            textAlign: 'center',
            padding: 0,
            backgroundColor: M2000C_OCA_darkBackground
        },
        {
            id: 'additional-freq-2-callsign',
            _description: 'Additional freq 2 callsign field',
            position: [23, 24, 4, 7],
            borderWidths: [1, 2, 1, 1],
            textAlign: 'center',
            backgroundColor: M2000C_OCA_darkBackground
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
            borderWidths: [1, 0, 2, 2],
            default: 'MIL GUARD',
            textAlign: 'center',
            fontSize: '11',
            bold: true,
        },
        {
            id: 'additional-freq-3-channel',
            _description: 'Additional freq 3 channel field',
            position: [24, 25, 3, 4],
            borderWidths: [1, 1, 2, 0],
            default: 'R20',
            textAlign: 'center',
            padding: 0,
        },
        {
            id: 'additional-freq-3-callsign',
            _description: 'Additional freq 3 callsign field',
            position: [24, 25, 4, 7],
            borderWidths: [1, 2, 2, 1],
            textAlign: 'center',
        },
        {
            id: 'landing-type',
            type: 'input-select',
            _description: 'Landing type field',
            options: M2000C_OCA_landingOptions,
            dropdownSide: 'left',
            position: [24, 25, 7, 9],
            borderWidths: [0, 2, 2, 2],
            textAlign: 'right',
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
            id: 'perf-data-conf',
            type: 'linked-select',
            _description: 'Performance data CONF field',
            options: M2000C_OCA_confOptions,
            dropdownSide: 'left',
            linkedFields: [
                'perf-data-jx',
                'perf-data-rto',
                'perf-data-vr',
                'perf-data-vlof',
                'perf-data-vom-pg',
                'perf-data-vom-pc',
                'perf-data-dmf-ha',
                'perf-data-dmf-la',
                'perf-data-mlw-full',
                'perf-data-mlw-clean',
            ],
            position: [26, 27, 6, 9],
            borderWidths: [0, 2, 1, 1],
            textAlign: 'right',
        },
        {
            id: 'mission-commader-callsign',
            _description: 'Mission commander callsign field',
            position: [26, 27, 11, 13],
            borderWidths: [2, 2, 1, 1],
            textAlign: 'center',
            padding: 0
        },
        // Rows 28-31
        {
            id: 'Package-notes',
            type: 'textarea',
            _description: 'Pacakge notes field',
            position: [27, 31, 13, 19],
            borderWidths: [1, 2, 2, 2],
        },
        // Row 28
        {
            id: 'perf-data-jx',
            _description: 'Performance data Jx field',
            linkedOptions: [
                '',
                '0.69', // 6A
                '0.62', // 6F
                '0.50', // 6B
                '0.47', // 6K
                '0.65', // 6+8A
                '0.60', // 6+8F
                '0.49', // 6+8B
                '0.47', // 6+8K
                '0.57', // 6+8+8F
                '0.61', // 6+8+14A
                '0.56', // 6+8+14F
                '0.45', // 6+8B+4x250 kg
            ],
            position: [27, 28, 1, 2],
            borderWidths: [0, 1, 0, 0],
            textAlign: 'center',
            padding: 0,
        },
        {
            id: 'perf-data-vom-pg',
            _description: 'Performance data VOM PG field',
            linkedOptions: [
                '',
                '520 - 0.93', // 6A
                '505 - 0.91', // 6F
                '480 - 0.88', // 6B
                '465 - 0.85', // 6K
                '505 - 0.91', // 6+8A
                '490 - 0.89', // 6+8F
                '470 - 0.86', // 6+8B
                '445 - 0.83', // 6+8K
                '475 - 0.87', // 6+8+8F
                '480 - 0.88', // 6+8+14A
                '465 - 0.85', // 6+8+14F
                '445 - 0.83', // 6+8B+4x250 kg
            ],
            position: [27, 28, 4, 6],
            borderWidths: [0, 1, 0, 0],
            textAlign: 'center',
            padding: 0,
        },
        {
            id: 'deputy-mission-commander-callsign',
            _description: 'Deputy mission commander callsign field',
            position: [27, 28, 11, 13],
            borderWidths: [1, 2, 1, 1],
            textAlign: 'center',
            backgroundColor: M2000C_OCA_darkBackground,
            padding: 0
        },
        // Row 29
        {
            id: 'perf-data-rto',
            _description: 'Performance data Rto field',
            linkedOptions: [
                '',
                '147', // 6A
                '143', // 6F
                '133', // 6B
                '129', // 6K
                '146', // 6+8A
                '142', // 6+8F
                '132', // 6+8B
                '128', // 6+8K
                '141', // 6+8+8F
                '144', // 6+8+14A
                '139', // 6+8+14F
                '128', // 6+8B+4x250 kg
            ],
            position: [28, 29, 1, 2],
            borderWidths: [0, 1, 0, 0],
            textAlign: 'center',
            backgroundColor: M2000C_OCA_darkBackground,
            padding: 0,
        },
        {
            id: 'perf-data-vom-pc',
            _description: 'Performance data VOM PC field',
            linkedOptions: [
                '',
                '580 - 0.95', // 6A
                '575 - 0.93', // 6F
                '565 - 0.91', // 6B
                '560 - 0.89', // 6K
                '575 - 0.93', // 6+8A
                '570 - 0.91', // 6+8F
                '560 - 0.90', // 6+8B
                '555 - 0.87', // 6+8K
                '565 - 0.90', // 6+8+8F
                '565 - 0.90', // 6+8+14A
                '560 - 0.89', // 6+8+14F
                '555 - 0.87', // 6+8B+4x250 kg
            ],
            position: [28, 29, 4, 6],
            borderWidths: [0, 1, 0, 0],
            textAlign: 'center',
            backgroundColor: M2000C_OCA_darkBackground,
            padding: 0,
        },
        {
            id: 'perf-data-mlw-full',
            _description: 'Performance data MLW FULL field',
            linkedOptions: [
                '',
                '2500 kg', // 6A
                '2400 kg', // 6F
                '2000 kg', // 6B
                '1800 kg', // 6K
                '2200 kg', // 6+8A
                '2000 kg', // 6+8F
                '1700 kg', // 6+8B
                '1500 kg', // 6+8K
                '1800 kg', // 6+8+8F
                '1500 kg', // 6+8+14A
                '1400 kg', // 6+8+14F
                '700 kg', // 6+8B+4x250 kg
            ],
            position: [28, 29, 6, 9],
            borderWidths: [0, 2, 0, 1],
            textAlign: 'right',
            backgroundColor: M2000C_OCA_darkBackground,
        },
        {
            id: 'air-defense-package-lead-callsign',
            _description: 'Air defense package lead callsign field',
            position: [28, 29, 11, 13],
            borderWidths: [1, 2, 1, 1],
            textAlign: 'center',
            padding: 0,
        },
        // Row 30
        {
            id: 'perf-data-vr',
            _description: 'Performance data VR field',
            linkedOptions: [
                '',
                '120', // 6A
                '120', // 6F
                '138', // 6B
                '145', // 6K
                '120', // 6+8A
                '120', // 6+8F
                '141', // 6+8B
                '147', // 6+8K
                '122', // 6+8+8F
                '120', // 6+8+14A
                '124', // 6+8+14F
                '149', // 6+8B+4x250 kg
            ],
            position: [29, 30, 1, 2],
            borderWidths: [0, 1, 0, 0],
            textAlign: 'center',
            padding: 0,
        },
        {
            id: 'perf-data-dmf-ha',
            _description: 'Performance data DMF HA field',
            linkedOptions: [
                '',
                '0.90 - FL400', // 6A
                '0.90 - FL400', // 6F
                '0.90 - FL360', // 6B
                '0.83 - FL300', // 6K
                '0.90 - FL400', // 6+8A
                '0.90 - FL400', // 6+8F
                '0.90 - FL360', // 6+8B
                '0.81 - FL300', // 6+8K
                '0.88 - FL400', // 6+8+8F
                '0.89 - FL400', // 6+8+14A
                '0.84 - FL360', // 6+8+14F
                '0.81 - FL300', // 6+8B+4x250 kg
            ],
            position: [29, 30, 4, 6],
            borderWidths: [0, 1, 0, 0],
            textAlign: 'center',
            fontSize: 10,
            padding: 0,
        },
        {
            id: 'strike-package-lead-callsign',
            _description: 'Strike package lead callsign field',
            position: [29, 30, 11, 13],
            borderWidths: [1, 2, 1, 1],
            textAlign: 'center',
            backgroundColor: M2000C_OCA_darkBackground,
            padding: 0
        },
        // Row 31
        {
            id: 'perf-data-vlof',
            _description: 'Performance data Vlof field',
            linkedOptions: [
                '',
                '153', // 6A
                '153', // 6F
                '165', // 6B
                '170', // 6K
                '153', // 6+8A
                '153', // 6+8F
                '167', // 6+8B
                '172', // 6+8K
                '154', // 6+8+8F
                '153', // 6+8+14A
                '155', // 6+8+14F
                '173', // 6+8B+4x250 kg
            ],
            position: [30, 31, 1, 2],
            borderWidths: [0, 1, 2, 0],
            textAlign: 'center',
            backgroundColor: M2000C_OCA_darkBackground,
            padding: 0,
        },
        {
            id: 'perf-data-dmf-la',
            _description: 'Performance data DMF LA field',
            linkedOptions: [
                '',
                '360', // 6A
                '375', // 6F
                '385', // 6B
                '385', // 6K
                '370', // 6+8A
                '370', // 6+8F
                '385', // 6+8B
                '380', // 6+8K
                '380', // 6+8+8F
                '380', // 6+8+14A
                '365', // 6+8+14F
                '380', // 6+8B+4x250 kg
            ],
            position: [30, 31, 4, 6],
            borderWidths: [0, 1, 2, 0],
            textAlign: 'center',
            backgroundColor: M2000C_OCA_darkBackground,
            padding: 0,
        },
        {
            id: 'perf-data-mlw-clean',
            _description: 'Performance data MLW CLEAN field',
            linkedOptions: [
                '',
                '2500 kg', // 6A
                '2400 kg', // 6F
                '2000 kg', // 6B
                '1800 kg', // 6K
                '2400 kg', // 6+8A
                '2300 kg', // 6+8F
                '1900 kg', // 6+8B
                '1700 kg', // 6+8K
                '2100 kg', // 6+8+8F
                '2300 kg', // 6+8+14A
                '2100 kg', // 6+8+14F
                '1700 kg', // 6+8B+4x250 kg
            ],
            position: [30, 31, 6, 9],
            borderWidths: [0, 2, 2, 1],
            textAlign: 'right',
            backgroundColor: M2000C_OCA_darkBackground,
        },
        {
            id: 'additional-lead-type',
            _description: 'Additional lead type field',
            position: [30, 31, 9, 11],
            borderWidths: [1, 1, 2, 1],
            textAlign: 'center',
            fontSize: '11',
            bold: true,
        },
        {
            id: 'additional-lead-callsign',
            _description: 'Additional lead callsign field',
            position: [30, 31, 11, 13],
            borderWidths: [1, 2, 2, 1],
            textAlign: 'center',
            padding: 0
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
            id: 'fuel-1-name',
            _description: 'Fuel 1 name field',
            position: [31, 32, 0, 4],
            borderWidths: [2, 1, 1, 2],
            default: 'JOKER',
            textAlign: 'center',
            fontSize: '11',
            bold: true,
        },
        {
            id: 'fuel-1-quantity',
            _description: 'Fuel 1 quantity field',
            position: [31, 32, 4, 7],
            borderWidths: [2, 2, 1, 1],
            textAlign: 'center',
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
            id: 'fuel-2-name',
            _description: 'Fuel 2 name field',
            position: [32, 33, 0, 4],
            borderWidths: [1, 1, 1, 2],
            default: 'BINGO',
            textAlign: 'center',
            backgroundColor: M2000C_OCA_darkBackground,
            fontSize: '11',
            bold: true,
        },
        {
            id: 'fuel-2-quantity',
            _description: 'Fuel 3 name field',
            position: [32, 33, 4, 7],
            borderWidths: [1, 2, 1, 1],
            textAlign: 'center',
            backgroundColor: M2000C_OCA_darkBackground
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
            id: 'fuel-3-name',
            _description: 'Fuel 3 name field',
            position: [33, 34, 0, 4],
            borderWidths: [1, 1, 2, 2],
            textAlign: 'center',
            fontSize: '11',
            bold: true,
        },
        {
            id: 'fuel-3-quantity',
            _description: 'Fuel 3 quantity field',
            position: [33, 34, 4, 7],
            borderWidths: [1, 2, 2, 1],
            textAlign: 'center',
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
            type: 'linked-text',
            _description: 'Nav point 11 name field',
            linkedFields: [
                ['M2000C-OCA-page-2', 'nav-point-11-name'],
            ],
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
            type: 'linked-text',
            _description: 'Nav point 12 name field',
            linkedFields: [
                ['M2000C-OCA-page-2', 'nav-point-12-name'],
            ],
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
            type: 'linked-text',
            _description: 'Nav point 13 name field',
            linkedFields: [
                ['M2000C-OCA-page-2', 'nav-point-13-name'],
            ],
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
            type: 'linked-text',
            _description: 'Nav point 14 name field',
            linkedFields: [
                ['M2000C-OCA-page-2', 'nav-point-14-name'],
            ],
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
            type: 'linked-text',
            _description: 'Nav point 15 name field',
            linkedFields: [
                ['M2000C-OCA-page-2', 'nav-point-15-name'],
            ],
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
            type: 'linked-text',
            _description: 'Nav point 16 name field',
            linkedFields: [
                ['M2000C-OCA-page-2', 'nav-point-16-name'],
            ],
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
            type: 'linked-text',
            _description: 'Nav point 17 name field',
            linkedFields: [
                ['M2000C-OCA-page-2', 'nav-point-17-name'],
            ],
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
            type: 'linked-text',
            _description: 'Nav point 18 name field',
            linkedFields: [
                ['M2000C-OCA-page-2', 'nav-point-18-name'],
            ],
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
            type: 'linked-text',
            _description: 'Nav point 19 name field',
            linkedFields: [
                ['M2000C-OCA-page-2', 'nav-point-19-name'],
            ],
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
            position: [43, 44, 12, 14],
            borderWidths: [1, 1, 2, 1],
            textAlign: 'center',
            padding: 0,
            fontSize: 9,
        },
        {
            id: 'nav-point-20-name',
            type: 'linked-text',
            _description: 'Nav point 20 name field',
            linkedFields: [
                ['M2000C-OCA-page-2', 'nav-point-20-name'],
            ],
            position: [43, 44, 14, 18],
            borderWidths: [1, 2, 2, 1],
            textAlign: 'center',
            padding: 0,
            fontSize: 11,
        },
    ]
}

const M2000C_OCA_2 = {
    id: 'M2000C-OCA-page-2',
    _name: 'Mirage 2000C kneeboard page 2',
    rows: 44,
    columns: 19,
    // ----------------================ textCells ================----------------
    textCells: [
        // Row 1
        {
            _name: 'Magnetic variation',
            _description: 'Magnetic variation text',
            text: 'MAG VAR',
            position: [0, 1, 0, 2],
            borderWidths: [2, 0, 2, 2]
        },
        {
            _name: 'Sea level temperature',
            _description: 'Sea level temperature text',
            text: 'SL TEMP',
            position: [0, 1, 4, 6],
            borderWidths: [2, 0, 2, 2]
        },
        {
            _name: 'Contrails altitude',
            _description: 'Contrails altitud text',
            text: 'CONTRAILS',
            position: [0, 1, 8, 11],
            borderWidths: [2, 0, 2, 2]
        },
        // Row 2
        {
            _name: 'Pilot number',
            _description: 'Pilot number text',
            text: 'No',
            position: [1, 2, 0, 1],
            borderWidths: [2, 1, 1, 2]
        },
        {
            _name: 'Pilot target',
            _description: 'Pilot target text',
            text: 'TARGET',
            position: [1, 2, 1, 3],
            borderWidths: [2, 1, 1, 1]
        },
        {
            _name: 'Pilot sorting',
            _description: 'Pilot sorting text',
            text: 'SORTING',
            position: [1, 2, 3, 5],
            borderWidths: [2, 1, 1, 1]
        },
        {
            _name: 'Pilot lock Φ',
            _description: 'Pilot lock Φ text',
            text: 'LOCK Φ',
            position: [1, 2, 5, 8],
            borderWidths: [2, 1, 1, 1]
        },
        {
            _name: 'Pilot shot Φ',
            _description: 'Pilot shot Φ text',
            text: 'SHOT Φ',
            position: [1, 2, 8, 11],
            borderWidths: [2, 2, 1, 1]
        },
        // Row 3 - 9
        {
            _name: 'Threat 1 path',
            type: 'path',
            _description: 'Treat 1 path field',
            path: M2000C_OCA_reactionCanvasPath,
            position: [2, 9, 11, 15],
            borderWidths: [1, 1, 1, 2],
        },
        {
            _name: 'Threat 2 path',
            type: 'path',
            _description: 'Treat 1 path field',
            path: M2000C_OCA_reactionCanvasPath,
            position: [2, 9, 15, 19],
            borderWidths: [1, 2, 1, 1],
        },
        // Row 9
        {
            _name: 'Hold',
            _description: 'Hold text',
            text: 'HOLD',
            position: [8, 9, 0, 5],
            borderWidths: [2, 2, 1, 2],
            backgroundColor: M2000C_OCA_darkBackground
        },
        {
            _name: 'CAP',
            _description: 'CAP text',
            text: 'CAP',
            position: [8, 9, 6, 11],
            borderWidths: [2, 2, 1, 2],
            backgroundColor: M2000C_OCA_darkBackground
        },
        // Row 10
        {
            _name: 'Hold formation',
            _description: 'Hold formation text',
            text: 'FORM',
            position: [9, 10, 2, 4],
            borderWidths: [1, 0, 0, 0],
            textAlign: 'center'
        },
        {
            _name: 'Filler',
            _description: 'Filler',
            text: '',
            position: [9, 10, 4, 5],
            borderWidths: [1, 2, 0, 0],
        },
        {
            _name: 'CAP formation',
            _description: 'CAP formation text',
            text: 'FORM',
            position: [9, 10, 8, 10],
            borderWidths: [1, 0, 0, 0],
            textAlign: 'center'
        },
        {
            _name: 'Filler',
            _description: 'Filler',
            text: '',
            position: [9, 10, 10, 11],
            borderWidths: [1, 2, 0, 0],
        },
        // Row 11 - 17
        {
            _name: 'Threat 3 path',
            type: 'path',
            _description: 'Treat 3 path field',
            path: M2000C_OCA_reactionCanvasPath,
            position: [10, 17, 11, 15],
            borderWidths: [1, 1, 1, 2],
        },
        {
            _name: 'Threat 4 path',
            type: 'path',
            _description: 'Treat 4 path field',
            path: M2000C_OCA_reactionCanvasPath,
            position: [10, 17, 15, 19],
            borderWidths: [1, 2, 1, 1],
        },
        // Row 12
        {
            _name: 'Hold INS',
            _description: 'Hold INS text',
            text: 'INS',
            position: [11, 12, 2, 4],
            borderWidths: [0, 0, 0, 0],
        },
        {
            _name: 'CAP INS',
            _description: 'CAP INS text',
            text: 'INS',
            position: [11, 12, 8, 10],
            borderWidths: [0, 0, 0, 0],
        },
        // Row 13
        {
            _name: 'Hold altitude',
            _description: 'Hold altitude text',
            text: 'ALT',
            position: [12, 13, 2, 4],
            borderWidths: [0, 0, 0, 0],
        },
        {
            _name: 'CAP altitude',
            _description: 'CAP altitude text',
            text: 'ALT',
            position: [12, 13, 8, 10],
            borderWidths: [0, 0, 0, 0],
        },
        // Row 14
        {
            _name: 'Hold speed',
            _description: 'Hold speed text',
            text: 'SPEED',
            position: [13, 14, 2, 4],
            borderWidths: [0, 0, 0, 0],
        },
        {
            _name: 'CAP speed',
            _description: 'CAP speed text',
            text: 'SPEED',
            position: [13, 14, 8, 10],
            borderWidths: [0, 0, 0, 0],
        },
        // Row 15
        {
            _name: 'Hold reference',
            _description: 'Hold reference text',
            text: 'REF',
            position: [14, 15, 2, 4],
            borderWidths: [0, 0, 0, 0],
        },
        {
            _name: 'CAP reference',
            _description: 'CAP reference text',
            text: 'REF',
            position: [14, 15, 8, 10],
            borderWidths: [0, 0, 0, 0],
        },
        // Row 16
        {
            _name: 'Risk level',
            _description: 'Risk level text',
            text: 'RISK LEVEL',
            position: [15, 16, 0, 3],
            borderWidths: [2, 1, 1, 2],
            backgroundColor: M2000C_OCA_darkBackground
        },
        {
            _name: 'Flow',
            _description: 'Flow text',
            text: 'FLOW',
            position: [15, 16, 3, 6],
            borderWidths: [2, 1, 1, 1],
            backgroundColor: M2000C_OCA_darkBackground
        },
        {
            _name: 'Targeting ratio',
            _description: 'Targeting ratio text',
            text: 'TARGETING RATIO',
            position: [15, 16, 6, 11],
            borderWidths: [2, 2, 1, 1],
            backgroundColor: M2000C_OCA_darkBackground
        },
        // Row 18
        {
            _name: 'Gameplan',
            _description: 'Gameplan text',
            text: 'GAMEPLAN',
            position: [17, 18, 11, 19],
            borderWidths: [2, 2, 1, 2],
            backgroundColor: M2000C_OCA_darkBackground
        },
        // Row 20
        {
            _name: 'Aircraft merge ratio',
            _description: 'Aircraft merge ratio text',
            text: 'A/C MERGE RATIO',
            position: [19, 20, 0, 3],
            borderWidths: [1, 1, 1, 2],
            backgroundColor: M2000C_OCA_darkBackground
        },
        {
            _name: 'VID ratio',
            _description: 'VID ratio text',
            text: 'VID RATIO',
            position: [19, 20, 3, 6],
            borderWidths: [1, 1, 1, 1],
            backgroundColor: M2000C_OCA_darkBackground
        },
        {
            _name: 'Min range recommit',
            _description: 'Min range recommit text',
            text: 'MIN RANGE RECOMMIT',
            position: [19, 20, 6, 11],
            borderWidths: [1, 2, 1, 1],
            backgroundColor: M2000C_OCA_darkBackground
        },
        // Row 24
        {
            _name: 'Ingress',
            _description: 'Ingress text',
            text: 'INGRESS',
            position: [23, 24, 2, 5],
            borderWidths: [2, 1, 1, 1],
            backgroundColor: M2000C_OCA_darkBackground
        },
        {
            _name: 'CAP',
            _description: 'CAP text',
            text: 'CAP',
            position: [23, 24, 5, 8],
            borderWidths: [2, 1, 1, 1],
            backgroundColor: M2000C_OCA_darkBackground
        },
        {
            _name: 'Egress',
            _description: 'Egress text',
            text: 'EGRESS',
            position: [23, 24, 8, 11],
            borderWidths: [2, 2, 1, 1],
            backgroundColor: M2000C_OCA_darkBackground
        },
        // Row 25-26
        {
            _name: 'Commit criterias',
            _description: 'Commit criterias text',
            text: 'COMMIT\nCRITS',
            position: [24, 26, 0, 2],
            borderWidths: [1, 1, 1, 2],
            backgroundColor: M2000C_OCA_darkBackground
        },
        // Row 27-28
        {
            _name: 'Commit formation',
            _description: 'Commit formation text',
            text: 'COMMIT\nFORM',
            position: [26, 28, 0, 2],
            borderWidths: [1, 1, 1, 2],
            backgroundColor: M2000C_OCA_darkBackground
        },
        // Row 28
        {
            _name: 'Flow',
            _description: 'Flow text',
            text: 'FLOW',
            position: [27, 28, 11, 19],
            borderWidths: [2, 2, 1, 2],
            backgroundColor: M2000C_OCA_darkBackground
        },
        // Row 29-34
        {
            _name: 'Tactic',
            _description: 'Tactic text',
            text: 'TACTIC',
            position: [28, 34, 0, 2],
            borderWidths: [1, 1, 2, 2],
            backgroundColor: M2000C_OCA_darkBackground
        },
        // Row 35
        {
            _name: 'Nav point 11',
            _description: 'Nav point 11 text',
            text: '11',
            position: [34, 35, 0, 1],
            borderWidths: [2, 2, 1, 2]
        },
        {
            _name: 'Border cross authority',
            _description: 'Border cross authority text',
            text: 'BCA',
            position: [34, 35, 5, 6],
            borderWidths: [2, 0, 1, 2],
            padding: 0
        },
        {
            _name: 'Border shoot authority',
            _description: 'Border shoot authority text',
            text: 'BSA',
            position: [34, 35, 7, 8],
            borderWidths: [2, 0, 1, 1],
            padding: 0
        },
        {
            _name: 'Rules of engagement',
            _description: 'Rules of engagement text',
            text: 'ROEs',
            position: [34, 35, 9, 13],
            borderWidths: [2, 2, 0, 2],
            textAlign: 'left'
        },
        {
            _name: 'Code words',
            _description: 'Code words text',
            text: 'CODE WORDS',
            position: [34, 35, 13, 19],
            borderWidths: [2, 2, 1, 2],
            backgroundColor: M2000C_OCA_darkBackground
        },
        // Row 36
        {
            _name: 'Nav point 12',
            _description: 'Nav point 12 text',
            text: '12',
            position: [35, 36, 0, 1],
            borderWidths: [1, 2, 1, 2]
        },
        {
            _name: 'Weapon control status',
            _description: 'Weapon control status text',
            text: 'WCS',
            position: [35, 36, 5, 7],
            borderWidths: [1, 0, 2, 2]
        },
        // Row 37-40
        {
            _name: 'BAS',
            _description: 'BAS text',
            text: 'BAS',
            position: [36, 39, 5, 6],
            borderWidths: [2, 1, 2, 2],
            textOrientation: 'vertical',
            backgroundColor: M2000C_OCA_darkBackground
        },
        // Row 37
        {
            _name: 'Nav point 13',
            _description: 'Nav point 13 text',
            text: '13',
            position: [36, 37, 0, 1],
            borderWidths: [1, 2, 1, 2]
        },
        {
            _name: 'BAS altitude',
            _description: 'BAS altitude text',
            text: 'ALT',
            position: [36, 37, 6, 7],
            borderWidths: [2, 1, 1, 1],
        },
        {
            _name: 'BAS heading',
            _description: 'BAS heading text',
            text: 'HDG',
            position: [36, 37, 7, 8],
            borderWidths: [2, 1, 1, 1],
            padding: 0,
        },
        {
            _name: 'BAS number',
            _description: 'BAS number text',
            text: 'NBR',
            position: [36, 37, 8, 9],
            borderWidths: [2, 2, 1, 1],
        },
        // Row 38
        {
            _name: 'Nav point 14',
            _description: 'Nav point 14 text',
            text: '14',
            position: [37, 38, 0, 1],
            borderWidths: [1, 2, 1, 2]
        },
        // Row 39
        {
            _name: 'Nav point 15',
            _description: 'Nav point 15 text',
            text: '15',
            position: [38, 39, 0, 1],
            borderWidths: [1, 2, 1, 2]
        },
        // Row 40
        {
            _name: 'Nav point 16',
            _description: 'Nav point 16 text',
            text: '16',
            position: [39, 40, 0, 1],
            borderWidths: [1, 2, 1, 2]
        },
        {
            _name: 'Shotgun state',
            _description: 'Shotgun state text',
            text: 'SHOTGUN',
            position: [39, 40, 5, 9],
            borderWidths: [2, 2, 1, 2],
            backgroundColor: M2000C_OCA_darkBackground
        },
        // Row 41
        {
            _name: 'Nav point 17',
            _description: 'Nav point 17 text',
            text: '17',
            position: [40, 41, 0, 1],
            borderWidths: [1, 2, 1, 2]
        },
        // Row 42
        {
            _name: 'Nav point 18',
            _description: 'Nav point 18 text',
            text: '18',
            position: [41, 42, 0, 1],
            borderWidths: [1, 2, 1, 2]
        },
        {
            _name: 'Fuel conditions',
            _description: 'Fuel conditions text',
            text: 'FUEL CONDITIONS',
            position: [41, 42, 5, 9],
            borderWidths: [2, 2, 1, 2],
            backgroundColor: M2000C_OCA_darkBackground
        },
        // Row 43
        {
            _name: 'Nav point 19',
            _description: 'Nav point 19 text',
            text: '19',
            position: [42, 43, 0, 1],
            borderWidths: [1, 2, 1, 2]
        },
        {
            _name: 'Fuel state yellow',
            _description: 'Fuel state yellow text',
            text: 'YELLOW',
            position: [42, 43, 5, 7],
            borderWidths: [1, 0, 1, 2]
        },
        // Row 44
        {
            _name: 'Nav point 20',
            _description: 'Nav point 20 text',
            text: '20',
            position: [43, 44, 0, 1],
            borderWidths: [1, 2, 2, 2]
        },
        {
            _name: 'Fuel state red',
            _description: 'Fuel state red text',
            text: 'RED',
            position: [43, 44, 5, 7],
            borderWidths: [1, 0, 2, 2]
        },
    ],
    // ----------------================ textFieldCells ================----------------
    textFieldCells: [
        // Row 1
        {
            id: 'mag-var',
            _description: 'Magnetic variation text field',
            position: [0, 1, 2, 4],
            borderWidths: [2, 2, 2, 0],
            textAlign: 'center',
        },
        {
            id: 'sl-temp',
            _description: 'Sea level temperature text field',
            position: [0, 1, 6, 8],
            borderWidths: [2, 2, 2, 0],
            textAlign: 'center',
        },
        {
            id: 'contrails-alt',
            _description: 'Contrails altitude text field',
            position: [0, 1, 11, 14],
            borderWidths: [2, 2, 2, 0],
            textAlign: 'center',
        },
        // Row 2
        {
            id: 'targeting-fields-select',
            type: 'fields-select',
            _description: 'Targeting fields select field',
            options: ['INDIV', 'PAIR', 'FLIGHT', 'ALL'],
            fields: [
                {
                    textFieldCells: [
                        // Row 3
                        {
                            id: 'pilot-1-targeting',
                            type: 'input-select',
                            _description: 'Pilot 1 targeting text field',
                            options: M2000C_OCA_targetingOptions,
                            position: [2, 3, 1, 3],
                            borderWidths: [1, 1, 1, 1],
                            textAlign: 'center',
                            backgroundColor: M2000C_OCA_darkBackground
                        },
                        // Row 4
                        {
                            id: 'pilot-2-targeting',
                            type: 'input-select',
                            _description: 'Pilot 2 targeting text field',
                            options: M2000C_OCA_targetingOptions,
                            position: [3, 4, 1, 3],
                            borderWidths: [1, 1, 1, 1],
                            textAlign: 'center',
                        },
                        // Row 5
                        {
                            id: 'pilot-3-targeting',
                            type: 'input-select',
                            _description: 'Pilot 3 targeting text field',
                            options: M2000C_OCA_targetingOptions,
                            position: [4, 5, 1, 3],
                            borderWidths: [1, 1, 1, 1],
                            textAlign: 'center',
                            backgroundColor: M2000C_OCA_darkBackground
                        },
                        // Row 6
                        {
                            id: 'pilot-4-targeting',
                            type: 'input-select',
                            _description: 'Pilot 4 targeting text field',
                            options: M2000C_OCA_targetingOptions,
                            position: [5, 6, 1, 3],
                            borderWidths: [1, 1, 1, 1],
                            textAlign: 'center',
                        },
                        // Row 7
                        {
                            id: 'pilot-5-targeting',
                            type: 'input-select',
                            _description: 'Pilot 5 targeting text field',
                            options: M2000C_OCA_targetingOptions,
                            position: [6, 7, 1, 3],
                            borderWidths: [1, 1, 1, 1],
                            textAlign: 'center',
                            backgroundColor: M2000C_OCA_darkBackground
                        },
                        // Row 8
                        {
                            id: 'pilot-6-targeting',
                            type: 'input-select',
                            _description: 'Pilot 6 targeting text field',
                            options: M2000C_OCA_targetingOptions,
                            position: [7, 8, 1, 3],
                            borderWidths: [1, 1, 2, 1],
                            textAlign: 'center',
                        },
                    ]
                },
                {
                    textCells: [
                        // Row 3
                        {
                            name: 'Pilot 1-2 targeting background',
                            _description: 'Pilot 1-2 targeting background',
                            position: [2, 3, 1, 3],
                            borderWidths: [0, 0, 0, 0],
                            backgroundColor: M2000C_OCA_darkBackground
                        },
                        // Row 5
                        {
                            name: 'Pilot 3-4 targeting background',
                            _description: 'Pilot 1-2 targeting background',
                            position: [4, 5, 1, 3],
                            borderWidths: [0, 0, 0, 0],
                            backgroundColor: M2000C_OCA_darkBackground
                        },
                        // Row 7
                        {
                            name: 'Pilot 5-6 targeting background',
                            _description: 'Pilot 5-6 targeting background',
                            position: [6, 7, 1, 3],
                            borderWidths: [0, 0, 0, 0],
                            backgroundColor: M2000C_OCA_darkBackground
                        },
                    ],
                    textFieldCells: [
                        // Row 3-4
                        {
                            id: 'pilot-1-2-targeting',
                            type: 'input-select',
                            _description: 'Pilot 1-2 targeting text field',
                            options: M2000C_OCA_targetingOptions,
                            position: [2, 4, 1, 3],
                            borderWidths: [1, 1, 1, 1],
                            textAlign: 'center',
                            textareaCenter: true,
                        },
                        // Row 5-6
                        {
                            id: 'pilot-3-4-targeting',
                            type: 'input-select',
                            _description: 'Pilot 3-4 targeting text field',
                            options: M2000C_OCA_targetingOptions,
                            position: [4, 6, 1, 3],
                            borderWidths: [1, 1, 1, 1],
                            textAlign: 'center',
                            textareaCenter: true,
                        },
                        // Row 7-8
                        {
                            id: 'pilot-5-6-targeting',
                            type: 'input-select',
                            _description: 'Pilot 5-6 targeting text field',
                            options: M2000C_OCA_targetingOptions,
                            position: [6, 8, 1, 3],
                            borderWidths: [1, 1, 2, 1],
                            textAlign: 'center',
                            textareaCenter: true,
                        },
                    ]
                },
                {
                    textCells: [
                        // Row 3
                        {
                            name: 'Pilot 1-2 targeting background',
                            _description: 'Pilot 1-2 targeting background',
                            position: [2, 3, 1, 3],
                            borderWidths: [0, 0, 0, 0],
                            backgroundColor: M2000C_OCA_darkBackground
                        },
                        // Row 5
                        {
                            name: 'Pilot 3-4 targeting background',
                            _description: 'Pilot 1-2 targeting background',
                            position: [4, 5, 1, 3],
                            borderWidths: [0, 0, 0, 0],
                            backgroundColor: M2000C_OCA_darkBackground
                        },
                        // Row 7
                        {
                            name: 'Pilot 5-6 targeting background',
                            _description: 'Pilot 5-6 targeting background',
                            position: [6, 7, 1, 3],
                            borderWidths: [0, 0, 0, 0],
                            backgroundColor: M2000C_OCA_darkBackground
                        },
                    ],
                    textFieldCells: [
                        // Row 3-6
                        {
                            id: 'pilot-1-4-targeting',
                            type: 'input-select',
                            _description: 'Pilot 1-4 targeting text field',
                            options: M2000C_OCA_targetingOptions,
                            position: [2, 6, 1, 3],
                            borderWidths: [1, 1, 1, 1],
                            textAlign: 'center',
                            textareaCenter: true,
                        },
                        // Row 7-8
                        {
                            id: 'pilot-5-6-targeting',
                            type: 'input-select',
                            _description: 'Pilot 5-6 targeting text field',
                            options: M2000C_OCA_targetingOptions,
                            position: [6, 8, 1, 3],
                            borderWidths: [1, 1, 2, 1],
                            textAlign: 'center',
                            textareaCenter: true,
                        },
                    ]
                },
                {
                    textCells: [
                        // Row 3
                        {
                            name: 'Pilot 1-2 targeting background',
                            _description: 'Pilot 1-2 targeting background',
                            position: [2, 3, 1, 3],
                            borderWidths: [0, 0, 0, 0],
                            backgroundColor: M2000C_OCA_darkBackground
                        },
                        // Row 5
                        {
                            name: 'Pilot 3-4 targeting background',
                            _description: 'Pilot 1-2 targeting background',
                            position: [4, 5, 1, 3],
                            borderWidths: [0, 0, 0, 0],
                            backgroundColor: M2000C_OCA_darkBackground
                        },
                        // Row 7
                        {
                            name: 'Pilot 5-6 targeting background',
                            _description: 'Pilot 5-6 targeting background',
                            position: [6, 7, 1, 3],
                            borderWidths: [0, 0, 0, 0],
                            backgroundColor: M2000C_OCA_darkBackground
                        },
                    ],
                    textFieldCells: [
                        // Row 3-8
                        {
                            id: 'pilot-1-6-targeting',
                            type: 'input-select',
                            _description: 'Pilot 1-6 targeting text field',
                            options: M2000C_OCA_targetingOptions,
                            position: [2, 8, 1, 3],
                            borderWidths: [1, 1, 2, 1],
                            textAlign: 'center',
                            textareaCenter: true,
                        },
                    ]
                }
            ],
            position: [1, 2, 1, 3],
            borderWidths: [0, 0, 0, 0],
            default: 'INDIV',
        },
        {
            id: 'sorting-fields-select',
            type: 'fields-select',
            _description: 'Sorting fields select field',
            options: ['INDIV', 'PAIR', 'FLIGHT', 'ALL'],
            fields: [
                {
                    textFieldCells: [
                        // Row 3
                        {
                            id: 'pilot-1-sorting',
                            type: 'input-select',
                            _description: 'Pilot 1 sorting text field',
                            options: M2000C_OCA_sortingOptions,
                            position: [2, 3, 3, 5],
                            borderWidths: [1, 1, 1, 1],
                            textAlign: 'center',
                            backgroundColor: M2000C_OCA_darkBackground
                        },
                        // Row 4
                        {
                            id: 'pilot-2-sorting',
                            type: 'input-select',
                            _description: 'Pilot 2 sorting text field',
                            options: M2000C_OCA_sortingOptions,
                            position: [3, 4, 3, 5],
                            borderWidths: [1, 1, 1, 1],
                            textAlign: 'center',
                        },
                        // Row 5
                        {
                            id: 'pilot-3-sorting',
                            type: 'input-select',
                            _description: 'Pilot 3 sorting text field',
                            options: M2000C_OCA_sortingOptions,
                            position: [4, 5, 3, 5],
                            borderWidths: [1, 1, 1, 1],
                            textAlign: 'center',
                            backgroundColor: M2000C_OCA_darkBackground
                        },
                        // Row 6
                        {
                            id: 'pilot-4-sorting',
                            type: 'input-select',
                            _description: 'Pilot 4 sorting text field',
                            options: M2000C_OCA_sortingOptions,
                            position: [5, 6, 3, 5],
                            borderWidths: [1, 1, 1, 1],
                            textAlign: 'center',
                        },
                        // Row 7
                        {
                            id: 'pilot-5-sorting',
                            type: 'input-select',
                            _description: 'Pilot 5 sorting text field',
                            options: M2000C_OCA_sortingOptions,
                            position: [6, 7, 3, 5],
                            borderWidths: [1, 1, 1, 1],
                            textAlign: 'center',
                            backgroundColor: M2000C_OCA_darkBackground
                        },
                        // Row 8
                        {
                            id: 'pilot-6-sorting',
                            type: 'input-select',
                            _description: 'Pilot 6 sorting text field',
                            options: M2000C_OCA_sortingOptions,
                            position: [7, 8, 3, 5],
                            borderWidths: [1, 1, 2, 1],
                            textAlign: 'center',
                        },
                    ]
                },
                {
                    textCells: [
                        // Row 3
                        {
                            name: 'Pilot 1-2 sorting background',
                            _description: 'Pilot 1-2 sorting background',
                            position: [2, 3, 3, 5],
                            borderWidths: [0, 0, 0, 0],
                            backgroundColor: M2000C_OCA_darkBackground
                        },
                        // Row 5
                        {
                            name: 'Pilot 3-4 sorting background',
                            _description: 'Pilot 1-2 sorting background',
                            position: [4, 5, 3, 5],
                            borderWidths: [0, 0, 0, 0],
                            backgroundColor: M2000C_OCA_darkBackground
                        },
                        // Row 7
                        {
                            name: 'Pilot 5-6 sorting background',
                            _description: 'Pilot 5-6 sorting background',
                            position: [6, 7, 3, 5],
                            borderWidths: [0, 0, 0, 0],
                            backgroundColor: M2000C_OCA_darkBackground
                        },
                    ],
                    textFieldCells: [
                        // Row 3-4
                        {
                            id: 'pilot-1-2-sorting',
                            type: 'input-select',
                            _description: 'Pilot 1-2 sorting text field',
                            options: M2000C_OCA_sortingOptions,
                            position: [2, 4, 3, 5],
                            borderWidths: [1, 1, 1, 1],
                            textAlign: 'center',
                            textareaCenter: true,
                        },
                        // Row 5-6
                        {
                            id: 'pilot-3-4-sorting',
                            type: 'input-select',
                            _description: 'Pilot 3-4 sorting text field',
                            options: M2000C_OCA_sortingOptions,
                            position: [4, 6, 3, 5],
                            borderWidths: [1, 1, 1, 1],
                            textAlign: 'center',
                            textareaCenter: true,
                        },
                        // Row 7-8
                        {
                            id: 'pilot-5-6-sorting',
                            type: 'input-select',
                            _description: 'Pilot 5-6 sorting text field',
                            options: M2000C_OCA_sortingOptions,
                            position: [6, 8, 3, 5],
                            borderWidths: [1, 1, 2, 1],
                            textAlign: 'center',
                            textareaCenter: true,
                        },
                    ]
                },
                {
                    textCells: [
                        // Row 3
                        {
                            name: 'Pilot 1-2 sorting background',
                            _description: 'Pilot 1-2 sorting background',
                            position: [2, 3, 3, 5],
                            borderWidths: [0, 0, 0, 0],
                            backgroundColor: M2000C_OCA_darkBackground
                        },
                        // Row 5
                        {
                            name: 'Pilot 3-4 sorting background',
                            _description: 'Pilot 1-2 sorting background',
                            position: [4, 5, 3, 5],
                            borderWidths: [0, 0, 0, 0],
                            backgroundColor: M2000C_OCA_darkBackground
                        },
                        // Row 7
                        {
                            name: 'Pilot 5-6 sorting background',
                            _description: 'Pilot 5-6 sorting background',
                            position: [6, 7, 3, 5],
                            borderWidths: [0, 0, 0, 0],
                            backgroundColor: M2000C_OCA_darkBackground
                        },
                    ],
                    textFieldCells: [
                        // Row 3-6
                        {
                            id: 'pilot-1-4-sorting',
                            type: 'input-select',
                            _description: 'Pilot 1-4 sorting text field',
                            options: M2000C_OCA_sortingOptions,
                            position: [2, 6, 3, 5],
                            borderWidths: [1, 1, 1, 1],
                            textAlign: 'center',
                            textareaCenter: true,
                        },
                        // Row 7-8
                        {
                            id: 'pilot-5-6-sorting',
                            type: 'input-select',
                            _description: 'Pilot 5-6 sorting text field',
                            options: M2000C_OCA_sortingOptions,
                            position: [6, 8, 3, 5],
                            borderWidths: [1, 1, 2, 1],
                            textAlign: 'center',
                            textareaCenter: true,
                        },
                    ]
                },
                {
                    textCells: [
                        // Row 3
                        {
                            name: 'Pilot 1-2 sorting background',
                            _description: 'Pilot 1-2 sorting background',
                            position: [2, 3, 3, 5],
                            borderWidths: [0, 0, 0, 0],
                            backgroundColor: M2000C_OCA_darkBackground
                        },
                        // Row 5
                        {
                            name: 'Pilot 3-4 sorting background',
                            _description: 'Pilot 1-2 sorting background',
                            position: [4, 5, 3, 5],
                            borderWidths: [0, 0, 0, 0],
                            backgroundColor: M2000C_OCA_darkBackground
                        },
                        // Row 7
                        {
                            name: 'Pilot 5-6 sorting background',
                            _description: 'Pilot 5-6 sorting background',
                            position: [6, 7, 3, 5],
                            borderWidths: [0, 0, 0, 0],
                            backgroundColor: M2000C_OCA_darkBackground
                        },
                    ],
                    textFieldCells: [
                        // Row 3-8
                        {
                            id: 'pilot-1-6-sorting',
                            type: 'input-select',
                            _description: 'Pilot 1-6 sorting text field',
                            options: M2000C_OCA_sortingOptions,
                            position: [2, 8, 3, 5],
                            borderWidths: [1, 1, 2, 1],
                            textAlign: 'center',
                            textareaCenter: true,
                        },
                    ]
                }
            ],
            position: [1, 2, 3, 5],
            borderWidths: [0, 0, 0, 0],
            default: 'INDIV',
        },
        {
            id: 'lock-phi-fields-select',
            type: 'fields-select',
            _description: 'Lock Φ fields select field',
            options: ['INDIV', 'PAIR', 'FLIGHT', 'ALL'],
            fields: [
                {
                    textFieldCells: [
                        // Row 3
                        {
                            id: 'pilot-1-lock-phi',
                            _description: 'Pilot 1 lock phi text field',
                            position: [2, 3, 5, 8],
                            borderWidths: [1, 1, 1, 1],
                            textAlign: 'center',
                            backgroundColor: M2000C_OCA_darkBackground
                        },
                        // Row 4
                        {
                            id: 'pilot-2-lock-phi',
                            _description: 'Pilot 2 lock phi text field',
                            position: [3, 4, 5, 8],
                            borderWidths: [1, 1, 1, 1],
                            textAlign: 'center',
                        },
                        // Row 5
                        {
                            id: 'pilot-3-lock-phi',
                            _description: 'Pilot 3 lock phi text field',
                            position: [4, 5, 5, 8],
                            borderWidths: [1, 1, 1, 1],
                            textAlign: 'center',
                            backgroundColor: M2000C_OCA_darkBackground
                        },
                        // Row 6
                        {
                            id: 'pilot-4-lock-phi',
                            _description: 'Pilot 4 lock phi text field',
                            position: [5, 6, 5, 8],
                            borderWidths: [1, 1, 1, 1],
                            textAlign: 'center',
                        },
                        // Row 7
                        {
                            id: 'pilot-5-lock-phi',
                            _description: 'Pilot 5 lock phi text field',
                            position: [6, 7, 5, 8],
                            borderWidths: [1, 1, 1, 1],
                            textAlign: 'center',
                            backgroundColor: M2000C_OCA_darkBackground
                        },
                        // Row 8
                        {
                            id: 'pilot-6-shot-phi',
                            _description: 'Pilot 6 shot phi text field',
                            position: [7, 8, 5, 8],
                            borderWidths: [1, 1, 2, 1],
                            textAlign: 'center',
                        },
                    ]
                },
                {
                    textCells: [
                        // Row 3
                        {
                            name: 'Pilot 1-2 lock phi background',
                            _description: 'Pilot 1-2 lock phi background',
                            position: [2, 3, 5, 8],
                            borderWidths: [0, 0, 0, 0],
                            backgroundColor: M2000C_OCA_darkBackground
                        },
                        // Row 5
                        {
                            name: 'Pilot 3-4 lock phi background',
                            _description: 'Pilot 1-2 lock phi background',
                            position: [4, 5, 5, 8],
                            borderWidths: [0, 0, 0, 0],
                            backgroundColor: M2000C_OCA_darkBackground
                        },
                        // Row 7
                        {
                            name: 'Pilot 5-6 lock phi background',
                            _description: 'Pilot 5-6 lock phi background',
                            position: [6, 7, 5, 8],
                            borderWidths: [0, 0, 0, 0],
                            backgroundColor: M2000C_OCA_darkBackground
                        },
                    ],
                    textFieldCells: [
                        // Row 3-4
                        {
                            id: 'pilot-1-2-lock-phi',
                            type: 'textarea',
                            _description: 'Pilot 1-2 lock phi text field',
                            position: [2, 4, 5, 8],
                            borderWidths: [1, 1, 1, 1],
                            textAlign: 'center',
                            textareaCenter: true,
                        },
                        // Row 5-6
                        {
                            id: 'pilot-3-4-lock-phi',
                            type: 'textarea',
                            _description: 'Pilot 3-4 lock phi text field',
                            position: [4, 6, 5, 8],
                            borderWidths: [1, 1, 1, 1],
                            textAlign: 'center',
                            textareaCenter: true,
                        },
                        // Row 7-8
                        {
                            id: 'pilot-5-6-lock-phi',
                            type: 'textarea',
                            _description: 'Pilot 5-6 lock phi text field',
                            position: [6, 8, 5, 8],
                            borderWidths: [1, 1, 2, 1],
                            textAlign: 'center',
                            textareaCenter: true,
                        },
                    ]
                },
                {
                    textCells: [
                        // Row 3
                        {
                            name: 'Pilot 1-2 lock phi background',
                            _description: 'Pilot 1-2 lock phi background',
                            position: [2, 3, 5, 8],
                            borderWidths: [0, 0, 0, 0],
                            backgroundColor: M2000C_OCA_darkBackground
                        },
                        // Row 5
                        {
                            name: 'Pilot 3-4 lock phi background',
                            _description: 'Pilot 1-2 lock phi background',
                            position: [4, 5, 5, 8],
                            borderWidths: [0, 0, 0, 0],
                            backgroundColor: M2000C_OCA_darkBackground
                        },
                        // Row 7
                        {
                            name: 'Pilot 5-6 lock phi background',
                            _description: 'Pilot 5-6 lock phi background',
                            position: [6, 7, 5, 8],
                            borderWidths: [0, 0, 0, 0],
                            backgroundColor: M2000C_OCA_darkBackground
                        },
                    ],
                    textFieldCells: [
                        // Row 3-6
                        {
                            id: 'pilot-1-4-lock-phi',
                            type: 'textarea',
                            _description: 'Pilot 1-4 lock phi text field',
                            position: [2, 6, 5, 8],
                            borderWidths: [1, 1, 1, 1],
                            textAlign: 'center',
                            textareaCenter: true,
                        },
                        // Row 7-8
                        {
                            id: 'pilot-5-6-lock-phi',
                            type: 'textarea',
                            _description: 'Pilot 5-6 lock phi text field',
                            position: [6, 8, 5, 8],
                            borderWidths: [1, 1, 2, 1],
                            textAlign: 'center',
                            textareaCenter: true,
                        },
                    ]
                },
                {
                    textCells: [
                        // Row 3
                        {
                            name: 'Pilot 1-2 lock phi background',
                            _description: 'Pilot 1-2 lock phi background',
                            position: [2, 3, 5, 8],
                            borderWidths: [0, 0, 0, 0],
                            backgroundColor: M2000C_OCA_darkBackground
                        },
                        // Row 5
                        {
                            name: 'Pilot 3-4 lock phi background',
                            _description: 'Pilot 1-2 lock phi background',
                            position: [4, 5, 5, 8],
                            borderWidths: [0, 0, 0, 0],
                            backgroundColor: M2000C_OCA_darkBackground
                        },
                        // Row 7
                        {
                            name: 'Pilot 5-6 lock phi background',
                            _description: 'Pilot 5-6 lock phi background',
                            position: [6, 7, 5, 8],
                            borderWidths: [0, 0, 0, 0],
                            backgroundColor: M2000C_OCA_darkBackground
                        },
                    ],
                    textFieldCells: [
                        // Row 3-8
                        {
                            id: 'pilot-1-6-lock-phi',
                            type: 'textarea',
                            _description: 'Pilot 1-6 lock phi text field',
                            position: [2, 8, 5, 8],
                            borderWidths: [1, 1, 2, 1],
                            textAlign: 'center',
                            textareaCenter: true,
                        },
                    ]
                }
            ],
            position: [1, 2, 5, 8],
            borderWidths: [0, 0, 0, 0],
            default: 'INDIV',
        },
        {
            id: 'shot-phi-fields-select',
            type: 'fields-select',
            _description: 'Shot Φ fields select field',
            options: ['INDIV', 'PAIR', 'FLIGHT', 'ALL'],
            fields: [
                {
                    textFieldCells: [
                        // Row 3
                        {
                            id: 'pilot-1-shot-phi',
                            _description: 'Pilot 1 shot phi text field',
                            position: [2, 3, 8, 11],
                            borderWidths: [1, 2, 1, 1],
                            textAlign: 'center',
                            backgroundColor: M2000C_OCA_darkBackground
                        },
                        // Row 4
                        {
                            id: 'pilot-2-shot-phi',
                            _description: 'Pilot 2 shot phi text field',
                            position: [3, 4, 8, 11],
                            borderWidths: [1, 2, 1, 1],
                            textAlign: 'center',
                        },
                        // Row 5
                        {
                            id: 'pilot-3-shot-phi',
                            _description: 'Pilot 3 shot phi text field',
                            position: [4, 5, 8, 11],
                            borderWidths: [1, 2, 1, 1],
                            textAlign: 'center',
                            backgroundColor: M2000C_OCA_darkBackground
                        },
                        // Row 6
                        {
                            id: 'pilot-4-shot-phi',
                            _description: 'Pilot 4 shot phi text field',
                            position: [5, 6, 8, 11],
                            borderWidths: [1, 2, 1, 1],
                            textAlign: 'center',
                        },
                        // Row 7
                        {
                            id: 'pilot-5-shot-phi',
                            _description: 'Pilot 5 shot phi text field',
                            position: [6, 7, 8, 11],
                            borderWidths: [1, 2, 1, 1],
                            textAlign: 'center',
                            backgroundColor: M2000C_OCA_darkBackground
                        },
                        // Row 8
                        {
                            id: 'pilot-6-shot-phi',
                            _description: 'Pilot 6 shot phi text field',
                            position: [7, 8, 8, 11],
                            borderWidths: [1, 2, 2, 1],
                            textAlign: 'center',
                        },
                    ]
                },
                {
                    textCells: [
                        // Row 3
                        {
                            name: 'Pilot 1-2 shot phi background',
                            _description: 'Pilot 1-2 shot phi background',
                            position: [2, 3, 8, 11],
                            borderWidths: [0, 0, 0, 0],
                            backgroundColor: M2000C_OCA_darkBackground
                        },
                        // Row 5
                        {
                            name: 'Pilot 3-4 shot phi background',
                            _description: 'Pilot 1-2 shot phi background',
                            position: [4, 5, 8, 11],
                            borderWidths: [0, 0, 0, 0],
                            backgroundColor: M2000C_OCA_darkBackground
                        },
                        // Row 7
                        {
                            name: 'Pilot 5-6 shot phi background',
                            _description: 'Pilot 5-6 shot phi background',
                            position: [6, 7, 8, 11],
                            borderWidths: [0, 0, 0, 0],
                            backgroundColor: M2000C_OCA_darkBackground
                        },
                    ],
                    textFieldCells: [
                        // Row 3-4
                        {
                            id: 'pilot-1-2-shot-phi',
                            type: 'textarea',
                            _description: 'Pilot 1-2 shot phi text field',
                            position: [2, 4, 8, 11],
                            borderWidths: [1, 2, 1, 1],
                            textAlign: 'center',
                            textareaCenter: true,
                        },
                        // Row 5-6
                        {
                            id: 'pilot-3-4-shot-phi',
                            type: 'textarea',
                            _description: 'Pilot 3-4 shot phi text field',
                            position: [4, 6, 8, 11],
                            borderWidths: [1, 2, 1, 1],
                            textAlign: 'center',
                            textareaCenter: true,
                        },
                        // Row 7-8
                        {
                            id: 'pilot-5-6-shot-phi',
                            type: 'textarea',
                            _description: 'Pilot 5-6 shot phi text field',
                            position: [6, 8, 8, 11],
                            borderWidths: [1, 2, 2, 1],
                            textAlign: 'center',
                            textareaCenter: true,
                        },
                    ]
                },
                {
                    textCells: [
                        // Row 3
                        {
                            name: 'Pilot 1-2 shot phi background',
                            _description: 'Pilot 1-2 shot phi background',
                            position: [2, 3, 8, 11],
                            borderWidths: [0, 0, 0, 0],
                            backgroundColor: M2000C_OCA_darkBackground
                        },
                        // Row 5
                        {
                            name: 'Pilot 3-4 shot phi background',
                            _description: 'Pilot 1-2 shot phi background',
                            position: [4, 5, 8, 11],
                            borderWidths: [0, 0, 0, 0],
                            backgroundColor: M2000C_OCA_darkBackground
                        },
                        // Row 7
                        {
                            name: 'Pilot 5-6 shot phi background',
                            _description: 'Pilot 5-6 shot phi background',
                            position: [6, 7, 8, 11],
                            borderWidths: [0, 0, 0, 0],
                            backgroundColor: M2000C_OCA_darkBackground
                        },
                    ],
                    textFieldCells: [
                        // Row 3-6
                        {
                            id: 'pilot-1-4-shot-phi',
                            type: 'textarea',
                            _description: 'Pilot 1-4 shot phi text field',
                            position: [2, 6, 8, 11],
                            borderWidths: [1, 2, 1, 1],
                            textAlign: 'center',
                            textareaCenter: true,
                        },
                        // Row 7-8
                        {
                            id: 'pilot-5-6-shot-phi',
                            type: 'textarea',
                            _description: 'Pilot 5-6 shot phi text field',
                            position: [6, 8, 8, 11],
                            borderWidths: [1, 2, 2, 1],
                            textAlign: 'center',
                            textareaCenter: true,
                        },
                    ]
                },
                {
                    textCells: [
                        // Row 3
                        {
                            name: 'Pilot 1-2 shot phi background',
                            _description: 'Pilot 1-2 shot phi background',
                            position: [2, 3, 8, 11],
                            borderWidths: [0, 0, 0, 0],
                            backgroundColor: M2000C_OCA_darkBackground
                        },
                        // Row 5
                        {
                            name: 'Pilot 3-4 shot phi background',
                            _description: 'Pilot 1-2 shot phi background',
                            position: [4, 5, 8, 11],
                            borderWidths: [0, 0, 0, 0],
                            backgroundColor: M2000C_OCA_darkBackground
                        },
                        // Row 7
                        {
                            name: 'Pilot 5-6 shot phi background',
                            _description: 'Pilot 5-6 shot phi background',
                            position: [6, 7, 8, 11],
                            borderWidths: [0, 0, 0, 0],
                            backgroundColor: M2000C_OCA_darkBackground
                        },
                    ],
                    textFieldCells: [
                        // Row 3-8
                        {
                            id: 'pilot-1-6-shot-phi',
                            type: 'textarea',
                            _description: 'Pilot 1-6 shot phi text field',
                            position: [2, 8, 8, 11],
                            borderWidths: [1, 2, 2, 1],
                            textAlign: 'center',
                            textareaCenter: true,
                        },
                    ]
                }
            ],
            position: [1, 2, 8, 11],
            borderWidths: [0, 0, 0, 0],
            default: 'INDIV',
        },
        {
            id: 'threat-1-name',
            _description: 'Threat 1 name text field',
            position: [1, 2, 11, 15],
            borderWidths: [2, 1, 1, 2],
            textAlign: 'center',
            bold: true,
        },
        {
            id: 'threat-2-name',
            _description: 'Threat 2 name text field',
            position: [1, 2, 15, 19],
            borderWidths: [2, 2, 1, 1],
            textAlign: 'center',
            bold: true,
        },
        // Row 3 - 9
        {
            id: 'threat-1-dap',
            type: 'path-field',
            _description: 'Treat 1 defensive action point field',
            position: [2, 9, 11, 15],
            internalPosition: [0.248, 0.075, 0.26, 0.26],
            borderWidths: [0, 0, 0, 0],
            fontSize: 20,
            textAlign: 'center',
            padding: 0,
        },
        {
            id: 'threat-1-abort-range',
            type: 'path-field',
            _description: 'Treat 1 abort range field',
            position: [2, 9, 11, 15],
            internalPosition: [0.584, 0.39, 0.26, 0.26],
            borderWidths: [0, 0, 0, 0],
            fontSize: 20,
            textAlign: 'center',
            padding: 0,
        },
        {
            id: 'threat-1-nez',
            type: 'path-field',
            _description: 'Treat 1 no escape zone field',
            position: [2, 9, 11, 15],
            internalPosition: [0.256, 0.63, 0.26, 0.26],
            borderWidths: [0, 0, 0, 0],
            fontSize: 20,
            textAlign: 'center',
            padding: 0,
        },
        {
            id: 'threat-1-bloc',
            type: 'path-field',
            _description: 'Treat 1 bloc field',
            position: [2, 9, 11, 15],
            internalPosition: [0.14, 0.385, 0.14, 0.20],
            borderWidths: [0, 0, 0, 0],
            fontSize: 20,
            textAlign: 'center',
            padding: 0,
        },
        {
            id: 'threat-1-bloc-diff',
            type: 'path-field',
            _description: 'Treat 1 bloc-diff field',
            position: [2, 9, 11, 15],
            internalPosition: [0.38, 0.385, 0.14, 0.20],
            borderWidths: [0, 0, 0, 0],
            fontSize: 20,
            textAlign: 'center',
            padding: 0,
        },
        {
            id: 'threat-2-dap',
            type: 'path-field',
            _description: 'Treat 2 defensive action point field',
            position: [2, 9, 15, 19],
            internalPosition: [0.25, 0.075, 0.26, 0.26],
            borderWidths: [0, 0, 0, 0],
            fontSize: 20,
            textAlign: 'center',
            padding: 0,
        },
        {
            id: 'threat-2-abort-range',
            type: 'path-field',
            _description: 'Treat 2 abort range field',
            position: [2, 9, 15, 19],
            internalPosition: [0.584, 0.39, 0.26, 0.26],
            borderWidths: [0, 0, 0, 0],
            fontSize: 20,
            textAlign: 'center',
            padding: 0,
        },
        {
            id: 'threat-2-nez',
            type: 'path-field',
            _description: 'Treat 2 no escape zone field',
            position: [2, 9, 15, 19],
            internalPosition: [0.256, 0.63, 0.26, 0.26],
            borderWidths: [0, 0, 0, 0],
            fontSize: 20,
            textAlign: 'center',
            padding: 0,
        },
        {
            id: 'threat-2-bloc',
            type: 'path-field',
            _description: 'Treat 2 bloc field',
            position: [2, 9, 15, 19],
            internalPosition: [0.14, 0.385, 0.14, 0.20],
            borderWidths: [0, 0, 0, 0],
            fontSize: 20,
            textAlign: 'center',
            padding: 0,
        },
        {
            id: 'threat-2-bloc-diff',
            type: 'path-field',
            _description: 'Treat 2 bloc-diff field',
            position: [2, 9, 15, 19],
            internalPosition: [0.38, 0.385, 0.14, 0.20],
            borderWidths: [0, 0, 0, 0],
            fontSize: 20,
            textAlign: 'center',
            padding: 0,
        },
        // Row 3
        {
            id: 'pilot-1-number',
            _description: 'Pilot 1 number text field',
            position: [2, 3, 0, 1],
            borderWidths: [1, 1, 1, 2],
            textAlign: 'center',
            backgroundColor: M2000C_OCA_darkBackground
        },
        // Row 4
        {
            id: 'pilot-2-number',
            _description: 'Pilot 2 number text field',
            position: [3, 4, 0, 1],
            borderWidths: [1, 1, 1, 2],
            textAlign: 'center',
        },
        // Row 5
        {
            id: 'pilot-3-number',
            _description: 'Pilot 3 number text field',
            position: [4, 5, 0, 1],
            borderWidths: [1, 1, 1, 2],
            textAlign: 'center',
            backgroundColor: M2000C_OCA_darkBackground
        },
        // Row 6
        {
            id: 'pilot-4-number',
            _description: 'Pilot 4 number text field',
            position: [5, 6, 0, 1],
            borderWidths: [1, 1, 1, 2],
            textAlign: 'center',
        },
        // Row 7
        {
            id: 'pilot-5-number',
            _description: 'Pilot 5 number text field',
            position: [6, 7, 0, 1],
            borderWidths: [1, 1, 1, 2],
            textAlign: 'center',
            backgroundColor: M2000C_OCA_darkBackground
        },
        // Row 8
        {
            id: 'pilot-6-number',
            _description: 'Pilot 6 number text field',
            position: [7, 8, 0, 1],
            borderWidths: [1, 1, 2, 2],
            textAlign: 'center',
        },
        // Row 10 - 15
        {
            id: 'hold-racetrack',
            type: 'path-select',
            _description: 'Hold path field',
            options: M2000C_OCA_racetrackPathList,
            selectColumns: 7,
            position: [9, 15, 0, 2],
            borderWidths: [1, 0, 2, 2],
            default: 0,
        },
        {
            id: 'cap-racetrack',
            type: 'path-select',
            _description: 'CAP path field',
            options: M2000C_OCA_racetrackPathList,
            selectColumns: 7,
            position: [9, 15, 6, 8],
            borderWidths: [1, 0, 2, 2],
            default: 0,
        },
        // Row 10
        {
            id: 'threat-3-name',
            _description: 'Threat 4 name text field',
            position: [9, 10, 11, 15],
            borderWidths: [1, 1, 1, 2],
            textAlign: 'center',
            bold: true,
        },
        {
            id: 'threat-4-name',
            _description: 'Threat 4 name text field',
            position: [9, 10, 15, 19],
            borderWidths: [1, 2, 1, 1],
            textAlign: 'center',
            bold: true,
        },
        // Row 11 - 17
        {
            id: 'threat-3-dap',
            type: 'path-field',
            _description: 'Treat 3 defensive action point field',
            position: [10, 17, 11, 15],
            internalPosition: [0.248, 0.075, 0.26, 0.26],
            borderWidths: [0, 0, 0, 0],
            fontSize: 20,
            textAlign: 'center',
            padding: 0,
        },
        {
            id: 'threat-3-abort-range',
            type: 'path-field',
            _description: 'Treat 3 abort range field',
            position: [10, 17, 11, 15],
            internalPosition: [0.584, 0.39, 0.26, 0.26],
            borderWidths: [0, 0, 0, 0],
            fontSize: 20,
            textAlign: 'center',
            padding: 0,
        },
        {
            id: 'threat-3-nez',
            type: 'path-field',
            _description: 'Treat 3 no escape zone field',
            position: [10, 17, 11, 15],
            internalPosition: [0.256, 0.63, 0.26, 0.26],
            borderWidths: [0, 0, 0, 0],
            fontSize: 20,
            textAlign: 'center',
            padding: 0,
        },
        {
            id: 'threat-3-bloc',
            type: 'path-field',
            _description: 'Treat 3 bloc field',
            position: [10, 17, 11, 15],
            internalPosition: [0.14, 0.385, 0.14, 0.20],
            borderWidths: [0, 0, 0, 0],
            fontSize: 20,
            textAlign: 'center',
            padding: 0,
        },
        {
            id: 'threat-3-bloc-diff',
            type: 'path-field',
            _description: 'Treat 3 bloc-diff field',
            position: [10, 17, 11, 15],
            internalPosition: [0.38, 0.385, 0.14, 0.20],
            borderWidths: [0, 0, 0, 0],
            fontSize: 20,
            textAlign: 'center',
            padding: 0,
        },
        {
            id: 'threat-4-dap',
            type: 'path-field',
            _description: 'Treat 2 defensive action point field',
            position: [10, 17, 15, 19],
            internalPosition: [0.25, 0.075, 0.26, 0.26],
            borderWidths: [0, 0, 0, 0],
            fontSize: 20,
            textAlign: 'center',
            padding: 0,
        },
        {
            id: 'threat-4-abort-range',
            type: 'path-field',
            _description: 'Treat 4 abort range field',
            position: [10, 17, 15, 19],
            internalPosition: [0.584, 0.39, 0.26, 0.26],
            borderWidths: [0, 0, 0, 0],
            fontSize: 20,
            textAlign: 'center',
            padding: 0,
        },
        {
            id: 'threat-4-nez',
            type: 'path-field',
            _description: 'Treat 4 no escape zone field',
            position: [10, 17, 15, 19],
            internalPosition: [0.256, 0.63, 0.26, 0.26],
            borderWidths: [0, 0, 0, 0],
            fontSize: 20,
            textAlign: 'center',
            padding: 0,
        },
        {
            id: 'threat-4-bloc',
            type: 'path-field',
            _description: 'Treat 4 bloc field',
            position: [10, 17, 15, 19],
            internalPosition: [0.14, 0.385, 0.14, 0.20],
            borderWidths: [0, 0, 0, 0],
            fontSize: 20,
            textAlign: 'center',
            padding: 0,
        },
        {
            id: 'threat-4-bloc-diff',
            type: 'path-field',
            _description: 'Treat 4 bloc-diff field',
            position: [10, 17, 15, 19],
            internalPosition: [0.38, 0.385, 0.14, 0.20],
            borderWidths: [0, 0, 0, 0],
            fontSize: 20,
            textAlign: 'center',
            padding: 0,
        },
        // Row 11
        {
            id: 'hold-formation',
            type: 'input-select',
            _description: 'Hold formation field',
            options: M2000C_OCA_formationOptions,
            selectColumns: 2,
            dropdownSide: 'left',
            position: [10, 11, 3, 5],
            borderWidths: [0, 2, 0, 0],
            padding: 2,
        },
        {
            id: 'cap-formation',
            type: 'input-select',
            _description: 'CAP formation field',
            options: M2000C_OCA_formationOptions,
            selectColumns: 2,
            dropdownSide: 'left',
            position: [10, 11, 9, 11],
            borderWidths: [0, 2, 0, 0],
            padding: 2
        },
        // Row 12
        {
            id: 'hold-ins',
            _description: 'Hold INS text field',
            position: [11, 12, 4, 5],
            borderWidths: [0, 2, 0, 0],
            textAlign: 'center',
            padding: 0,
        },
        {
            id: 'cap-ins',
            _description: 'CAP INS text field',
            position: [11, 12, 10, 11],
            borderWidths: [0, 2, 0, 0],
            textAlign: 'center',
            padding: 0,
        },
        // Row 13
        {
            id: 'hold-alt',
            _description: 'Hold altitude text field',
            position: [12, 13, 4, 5],
            borderWidths: [0, 2, 0, 0],
            textAlign: 'center',
            padding: 0,
        },
        {
            id: 'cap-alt',
            _description: 'CAP altitude text field',
            position: [12, 13, 10, 11],
            borderWidths: [0, 2, 0, 0],
            textAlign: 'center',
            padding: 0,
        },
        // Row 14
        {
            id: 'hold-speed',
            _description: 'Hold speed text field',
            position: [13, 14, 4, 5],
            borderWidths: [0, 2, 0, 0],
            textAlign: 'center',
            padding: 0,
        },
        {
            id: 'cap-speed',
            _description: 'CAP speed text field',
            position: [13, 14, 10, 11],
            borderWidths: [0, 2, 0, 0],
            textAlign: 'center',
            padding: 0,
        },
        // Row 15
        {
            id: 'hold-ref',
            _description: 'Hold reference text field',
            position: [14, 15, 4, 5],
            borderWidths: [0, 2, 0, 0],
            textAlign: 'center',
            padding: 0,
        },
        {
            id: 'cap-ref',
            _description: 'CAP reference text field',
            position: [14, 15, 10, 11],
            borderWidths: [0, 2, 0, 0],
            textAlign: 'center',
            padding: 0,
        },
        // Row 17-19
        {
            id: 'risk-level',
            type: 'linked-select',
            _description: 'Risk level text field',
            options: M2000C_OCA_riskLevelOptions,
            linkedFields: [
                'risk-level-flow',
                'risk-level-targeting-ratio',
                'risk-level-aircraft-merge-ratio',
                'risk-level-vid-ratio',
                'risk-level-min-rage-recommit',
            ],
            position: [16, 19, 0, 3],
            borderWidths: [1, 1, 1, 2],
            textAlign: 'center',
        },
        {
            id: 'risk-level-flow',
            type: 'textarea',
            _description: 'Risk level flow text field',
            linkedOptions: [
                '',
                'Never below DAP',
                'Spiked > DAP\nNaked > MAR',
                'Spiked > MAR\nNaked < MAR'
            ],
            position: [16, 19, 3, 6],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center',
            textareaCenter: true,
        },
        {
            id: 'risk-level-targeting-ratio',
            type: 'textarea',
            _description: 'Risk level targeting ratio text field',
            linkedOptions: [
                '',
                '2v1 contact\n2v1 group if not heavy',
                '1v1 contact\n1v1 group if not heavy\n & not Alamo A/C capable',
                '1vX'
            ],
            position: [16, 19, 6, 11],
            borderWidths: [1, 2, 1, 1],
            textAlign: 'center',
            textareaCenter: true,
        },
        // Row 19-27
        {
            id: 'gameplan',
            type: 'textarea',
            _description: 'Gameplan text field',
            position: [18, 27, 11, 19],
            borderWidths: [1, 2, 2, 2],
        },
        // Row 21-23
        {
            id: 'risk-level-aircraft-merge-ratio',
            type: 'textarea',
            _description: 'Risk level aircraft-merge ratio text field',
            linkedOptions: [
                '',
                'Avoid if possible',
                'Yes but 2v1',
                'Yes 1vX',
            ],
            position: [20, 23, 0, 3],
            borderWidths: [1, 1, 2, 2],
            textAlign: 'center',
            textareaCenter: true,
        },
        {
            id: 'risk-level-vid-ratio',
            type: 'textarea',
            _description: 'Risk level VID ratio text field',
            linkedOptions: [
                '',
                '2v1 contact',
                '2v1 group if not heavy',
                '1v1',
            ],
            position: [20, 23, 3, 6],
            borderWidths: [1, 1, 2, 1],
            textAlign: 'center',
            textareaCenter: true,
        },
        {
            id: 'risk-level-min-rage-recommit',
            type: 'textarea',
            _description: 'Risk level min range recommit text field',
            linkedOptions: [
                '',
                'Naked/Nails > MAR + 10nm\nSpiked > MAP + 15nm',
                '> MAR + 10nm',
                'Naked if < MAR\nSpiked > MAR + 5nm',
            ],
            position: [20, 23, 6, 11],
            borderWidths: [1, 2, 2, 1],
            textAlign: 'center',
            textareaCenter: true,
            fontSize: 11,
            padding: 0
        },
        // Row 25-26
        {
            id: 'commit-criterias-ingress',
            type: 'textarea',
            _description: 'Commit criterias ingress text field',
            position: [24, 26, 2, 5],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center',
        },
        {
            id: 'commit-criterias-cap',
            type: 'textarea',
            _description: 'Commit criterias CAP text field',
            position: [24, 26, 5, 8],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center',
        },
        {
            id: 'commit-criterias-egress',
            type: 'textarea',
            _description: 'Commit criterias egress text field',
            position: [24, 26, 8, 11],
            borderWidths: [1, 2, 1, 1],
            textAlign: 'center',
        },
        // Row 27-28
        {
            id: 'commit-formation-ingress',
            type: 'input-select',
            _description: 'Commit formation ingress text field',
            options: M2000C_OCA_formationOptions,
            selectColumns: 2,
            position: [26, 28, 2, 5],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center',
        },
        {
            id: 'commit-formation-cap',
            type: 'input-select',
            _description: 'Commit formation CAP text field',
            options: M2000C_OCA_formationOptions,
            selectColumns: 2,
            position: [26, 28, 5, 8],
            borderWidths: [1, 1, 1, 1],
            textAlign: 'center',
        },
        {
            id: 'commit-formation-egress',
            type: 'input-select',
            _description: 'Commit formation egress text field',
            options: M2000C_OCA_formationOptions,
            selectColumns: 2,
            position: [26, 28, 8, 11],
            borderWidths: [1, 2, 1, 1],
            textAlign: 'center',
        },
        // Row 29-34
        {
            id: 'tactic-ingress',
            type: 'textarea',
            _description: 'Tactic ingress text field',
            position: [28, 34, 2, 5],
            borderWidths: [1, 1, 2, 1],
            type: 'textarea',
        },
        {
            id: 'tactic-cap',
            type: 'textarea',
            _description: 'Tactic CAP text field',
            position: [28, 34, 5, 8],
            borderWidths: [1, 1, 2, 1],
        },
        {
            id: 'tactic-egress',
            type: 'textarea',
            _description: 'Tactic egress text field',
            position: [28, 34, 8, 11],
            borderWidths: [1, 2, 2, 1],
        },
        {
            id: 'flow',
            type: 'textarea',
            _description: 'Flow text field',
            position: [28, 34, 11, 19],
            borderWidths: [1, 2, 2, 2],
        },
        // Row 35
        {
            id: 'nav-point-11-name',
            _description: 'Nav point 11 name text field',
            position: [34, 35, 1, 5],
            borderWidths: [1, 2, 1, 2],
            textAlign: 'center',
            padding: 0,
            fontSize: 11,
        },
        {
            id: 'bca',
            type: 'input-select',
            _description: 'Border cross authority text field',
            options: M2000C_OCA_yesNoOptions,
            position: [34, 35, 6, 7],
            borderWidths: [2, 1, 1, 0],
            textAlign: 'center',
        },
        {
            id: 'bsa',
            type: 'input-select',
            _description: 'Border shoot authority text field',
            options: M2000C_OCA_yesNoOptions,
            position: [34, 35, 8, 9],
            borderWidths: [2, 2, 1, 0],
            textAlign: 'center',
        },
        // Row 36-44
        {
            id: 'roes',
            type: 'textarea',
            _description: 'Rules of engagement text field',
            position: [35, 44, 9, 13],
            borderWidths: [0, 2, 2, 2],
        },
        {
            id: 'code-words',
            type: 'textarea',
            _description: 'Code words text field',
            position: [35, 44, 13, 19],
            borderWidths: [1, 2, 2, 2],
        },
        // Row 36
        {
            id: 'nav-point-12-name',
            _description: 'Nav point 12 name text field',
            position: [35, 36, 1, 5],
            borderWidths: [1, 2, 1, 2],
            textAlign: 'center',
            padding: 0,
            fontSize: 11,
        },
        {
            id: 'wcs',
            type: 'input-select',
            _description: 'Weapon control status text field',
            options: M2000C_OCA_wcsOptions,
            position: [35, 36, 7, 9],
            borderWidths: [1, 2, 1, 0],
            textAlign: 'center',
        },
        // Row 37
        {
            id: 'nav-point-13-name',
            _description: 'Nav point 13 name text field',
            position: [36, 37, 1, 5],
            borderWidths: [1, 2, 1, 2],
            textAlign: 'center',
            padding: 0,
            fontSize: 11,
        },
        // Row 38-40
        {
            id: 'bas-altitude',
            type: 'linked-text',
            _description: 'BAS altitude field',
            linkedFields: [
                ['M2000C-OCA-page-1', 'bas-altitude'],
            ],
            position: [37, 39, 6, 7],
            borderWidths: [1, 1, 2, 1],
            textAlign: 'center',
            padding: 0,
        },
        {
            id: 'bas-heading',
            type: 'linked-text',
            _description: 'BAS heading field',
            linkedFields: [
                ['M2000C-OCA-page-1', 'bas-heading'],
            ],
            position: [37, 39, 7, 8],
            borderWidths: [1, 1, 2, 1],
            textAlign: 'center',
            padding: 0,
        },
        {
            id: 'bas-number',
            type: 'linked-text',
            _description: 'BAS number field',
            linkedFields: [
                ['M2000C-OCA-page-1', 'bas-number'],
            ],
            position: [37, 39, 8, 9],
            borderWidths: [1, 2, 2, 1],
            textAlign: 'center',
            padding: 0,
        },
        // Row 38
        {
            id: 'nav-point-14-name',
            _description: 'Nav point 14 name text field',
            position: [37, 38, 1, 5],
            borderWidths: [1, 2, 1, 2],
            textAlign: 'center',
            padding: 0,
            fontSize: 11,
        },
        // Row 39
        {
            id: 'nav-point-15-name',
            _description: 'Nav point 15 name text field',
            position: [38, 39, 1, 5],
            borderWidths: [1, 2, 1, 2],
            textAlign: 'center',
            padding: 0,
            fontSize: 11,
        },
        // Row 40
        {
            id: 'nav-point-16-name',
            _description: 'Nav point 13 name text field',
            position: [39, 40, 1, 5],
            borderWidths: [1, 2, 1, 2],
            textAlign: 'center',
            padding: 0,
            fontSize: 11,
        },
        // Row 41
        {
            id: 'nav-point-17-name',
            _description: 'Nav point 17 name text field',
            position: [40, 41, 1, 5],
            borderWidths: [1, 2, 1, 2],
            textAlign: 'center',
            padding: 0,
            fontSize: 11,
        },
        {
            id: 'shotgun-state',
            _description: 'Shotgun state text field',
            position: [40, 41, 5, 9],
            borderWidths: [1, 2, 2, 2],
            default: '0 2 2+',
            textAlign: 'center',
        },
        // Row 42
        {
            id: 'nav-point-18-name',
            _description: 'Nav point 18 name text field',
            position: [41, 42, 1, 5],
            borderWidths: [1, 2, 1, 2],
            textAlign: 'center',
            padding: 0,
            fontSize: 11,
        },
        // Row 43
        {
            id: 'nav-point-19-name',
            _description: 'Nav point 19 name text field',
            position: [42, 43, 1, 5],
            borderWidths: [1, 2, 1, 2],
            textAlign: 'center',
            padding: 0,
            fontSize: 11,
        },
        {
            id: 'fuel-state-yellow',
            _description: 'Fuel state yellow text field',
            position: [42, 43, 7, 9],
            borderWidths: [1, 2, 1, 0],
            textAlign: 'center',
        },
        // Row 44
        {
            id: 'nav-point-20-name',
            _description: 'Nav point 20 name text field',
            position: [43, 44, 1, 5],
            borderWidths: [1, 2, 2, 2],
            textAlign: 'center',
            padding: 0,
            fontSize: 11,
        },
        {
            id: 'fuel-state-red',
            _description: 'Fuel state red text field',
            position: [43, 44, 7, 9],
            borderWidths: [1, 2, 2, 0],
            textAlign: 'center',
        },
    ]
}

const M2000C_OCA = {
    id: 'M2000C_OCA',
    name: 'Mirage 2000C OCA',
    pages: [M2000C_OCA_1, M2000C_OCA_2]
};