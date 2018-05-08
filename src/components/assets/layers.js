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
            [0.1, "#bff2ba"],
            [0.2, "#aee7a9"],
            [0.3, "#9edc98"],
            [0.4, "#7dc776"],
            [0.5, "#5dbc54"],
            [0.6, "#4ca743"],
            [0.7, "#3c9d32"],
            [0.9, "#2c9221"],
            [1, "#1c8811"]
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
            [0.1, "#ffffd9"],
            [0.2, "#edf8b1"],
            [0.3, "#c7e9b4"],
            [0.4, "#7fcdbb"],
            [0.5, "#41b6c4"],
            [0.6, "#1d91c0"],
            [0.7, "#225ea8"],
            [0.9, "#253494"],
            [1, "#081d58"]
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
          stops: [[1, "#0000ff"]]
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
          stops: [[1, "#7fcdbb"]]
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
          stops: [[1, "#332a85"]]
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
          stops: [[1, "#225ea8"]]
        },
        "fill-opacity": {
          stops: [[0, 0.5], [8, 0.5], [10, 0]]
        }
      }
    }
  ]
];
