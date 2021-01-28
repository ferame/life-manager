// all weather choices:
// sunny/clear, mostlysunny/partlycloudy, mostlycloudy/partlysunny,
// cloudy, fog/hazy, chancerain/rain, chancetstorms/tstorms,
// chancesleet/sleet, chanceflurries/flurries, chancesnow/snow

const thunderstormConditions = [
    { id: 200, icon: "tstorms"},
    { id: 201, icon: "tstorms"},
    { id: 202, icon: "tstorms"},
    { id: 210, icon: "tstorms"},
    { id: 211, icon: "tstorms"},
    { id: 212, icon: "tstorms"},
    { id: 221, icon: "tstorms"},
    { id: 230, icon: "tstorms"},
    { id: 231, icon: "tstorms"},
    { id: 232, icon: "tstorms"}
];

// TODO: add a more fitting icon
const drizzleConditions = [
    { id: 300, icon: "rain"},
    { id: 301, icon: "rain"},
    { id: 302, icon: "rain"},
    { id: 310, icon: "rain"},
    { id: 311, icon: "rain"},
    { id: 312, icon: "rain"},
    { id: 313, icon: "rain"},
    { id: 314, icon: "rain"},
    { id: 321, icon: "rain"}
];

const rainConditions = [
    { id: 500, icon: "rain"},
    { id: 501, icon: "rain"},
    { id: 502, icon: "rain"},
    { id: 503, icon: "rain"},
    { id: 504, icon: "rain"},
    { id: 511, icon: "rain"},
    { id: 520, icon: "rain"},
    { id: 521, icon: "rain"},
    { id: 522, icon: "rain"},
    { id: 531, icon: "rain"},
];

const snowConditions = [
    { id: 600, icon: "snow"},
    { id: 601, icon: "snow"},
    { id: 602, icon: "snow"},
    { id: 611, icon: "sleet"},
    { id: 612, icon: "sleet"},
    { id: 613, icon: "sleet"},
    { id: 615, icon: "sleet"},
    { id: 616, icon: "sleet"},
    { id: 620, icon: "sleet"},
    { id: 621, icon: "sleet"},
    { id: 622, icon: "sleet"}
];

const atmosphereConditions = [
    { id: 701, icon: "fog"},
    { id: 711, icon: "fog"},
    { id: 721, icon: "fog"},
    { id: 731, icon: "fog"},
    { id: 741, icon: "fog"},
    { id: 751, icon: "fog"},
    { id: 761, icon: "fog"},
    { id: 762, icon: "fog"},
    { id: 771, icon: "fog"},
    { id: 781, icon: "fog"}
];

const clearConditions = [
    { id: 800, icon: "clear"}
];

const cloudsConditions = [
    { id: 801, icon: "mostlysunny"},
    { id: 802, icon: "partlysunny"},
    { id: 803, icon: "mostlycloudy"},
    { id: 804, icon: "cloudy"}
];

const weatherConditions = [...thunderstormConditions, ...drizzleConditions,
     ...rainConditions, ...snowConditions, ...atmosphereConditions, ...clearConditions, ...cloudsConditions];
export default weatherConditions;