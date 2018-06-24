export const mapLayers = [
    [
        {
            id: "highlight",
            type: "line",
            source: "highlight",
            layout: {},
            paint: {
                "line-color": "#000000",
                "line-width": 3
            }
        }
    ],
    [
        {
            id: "idh-peru",
            type: "fill",
            source: "maps",
            "source-layer": "idh_peru",
            maxzoom: 20,
            paint: {
                "fill-color": {
                    property: "IDH",
                    type: "exponential",
                    stops: [
                        [0.2, "#bff2ba"],
                        [0.3, "#aee7a9"],
                        [0.4, "#9edc98"],
                        [0.45, "#7dc776"],
                        [0.5, "#5dbc54"],
                        [0.55, "#4ca743"],
                        [0.6, "#3c9d32"],
                        [0.65, "#2c9221"],
                        [0.7, "#1c8811"]
                    ]
                },
                "fill-opacity": {
                    stops: [[0, 0.5], [8, 0.5], [10, 0]]
                }
            }
        }
    ],
    [
        {
            id: "poblacion",
            type: "fill",
            source: "maps",
            "source-layer": "idh_peru",
            maxzoom: 20,
            layout: {
                visibility: "none"
            },
            paint: {
                "fill-color": {
                    property: "Poblacion",
                    type: "exponential",
                    stops: [
                        [10000, "#ffffd9"],
                        [30000, "#d4eaf8"],
                        [50000, "#9aceee"],
                        [100000, "#60b1e4"],
                        [300000, "#359cdc"],
                        [500000, "#196492"],
                        [800000, "#145075"],
                        [1200000, "#0f3c58"],
                        [1500000, "#081d58"]
                    ]
                },
                "fill-opacity": {
                    stops: [[0, 0.5], [8, 0.5], [10, 0]]
                }
            }
        }
    ],
    [
        {
            id: "evn",
            type: "fill",
            source: "maps",
            "source-layer": "idh_peru",
            maxzoom: 20,
            layout: {
                visibility: "none"
            },
            paint: {
                "fill-color": {
                    property: "EVN",
                    type: "exponential",
                    stops: [
                        [60, "#fed3d5"],
                        [63, "#fdb2b5"],
                        [66, "#fc9195"],
                        [69, "#fb7076"],
                        [72, "#fa4f56"],
                        [75, "#f92d36"],
                        [78, "#f90c17"],
                        [81, "#dd060f"],
                        [85, "#bc050d"]
                    ]
                },
                "fill-opacity": {
                    stops: [[0, 0.5], [8, 0.5], [10, 0]]
                }
            }
        }
    ],
    [
        {
            id: "pob_esc",
            type: "fill",
            source: "maps",
            "source-layer": "idh_peru",
            maxzoom: 20,
            layout: {
                visibility: "none"
            },
            paint: {
                "fill-color": {
                    property: "POB_ESC",
                    type: "exponential",
                    stops: [
                        [20, "#dcc6f5"],
                        [25, "#caa9f0"],
                        [30, "#b98ceb"],
                        [40, "#9e61e3"],
                        [50, "#8435dc"],
                        [60, "#6b21bd"],
                        [70, "#521a91"],
                        [75, "#3a1266"],
                        [80, "#210a3b"]
                    ]
                },
                "fill-opacity": {
                    stops: [[0, 0.5], [8, 0.5], [10, 0]]
                }
            }
        }
    ],
    [
        {
            id: "poredad_25",
            type: "fill",
            source: "maps",
            "source-layer": "idh_peru",
            maxzoom: 20,
            layout: {
                visibility: "none"
            },
            paint: {
                "fill-color": {
                    property: "POREDAD_25",
                    type: "exponential",
                    stops: [
                        [3, "#ffdbaf"],
                        [5, "#ffcc8d"],
                        [6, "#febd6c"],
                        [7, "#fea639"],
                        [8, "#fe9f28"],
                        [9, "#fe9717"],
                        [9.5, "#fe8f06"],
                        [10, "#f28701"],
                        [10.5, "#e17d01"],
                        [11, "#d07401"]
                    ]
                },
                "fill-opacity": {
                    stops: [[0, 0.5], [8, 0.5], [10, 0]]
                }
            }
        }
    ],
    [
        {
            id: "ing_promed",
            type: "fill",
            source: "maps",
            "source-layer": "idh_peru",
            maxzoom: 20,
            layout: {
                visibility: "none"
            },
            paint: {
                "fill-color": {
                    property: "ING_PROMED",
                    type: "exponential",
                    stops: [
                        [100, "#e9f4ea"],
                        [200, "#bcddbe"],
                        [300, "#a5d1a8"],
                        [400, "#8fc693"],
                        [500, "#6db572"],
                        [600, "#519e56"],
                        [700, "#3f7d44"],
                        [900, "#2e5b31"],
                        [1000, "#1d391f"]
                    ]
                },
                "fill-opacity": {
                    stops: [[0, 0.5], [8, 0.5], [10, 0]]
                }
            }
        }
    ]
];
