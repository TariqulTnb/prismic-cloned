/// Remember to update reducer function below - if you add new properties to data_options you must include them as arguments in hashData.
// App is rellying on data provided through hashData in data-hooks.jsx

export const data_options = [
  {
    id: "kuma",
    optionType: "Model",
    category: "model",
    name: "KUMA Q",
    nameJap: "KUMAQ",
    presence: true,
    defaults: {
      rack: false,
      awning: false,
      fourwd: false,
      sideWindow: false,
    },
    doors: ["BACKDOOR", "LDOOR"],

    defaultMode: {
      id: "defaultMode",
      nodesToShow: [
        "BEDKIT",
        "Living",
        "Stool",
        "TABLE",
        "Matress_folded",
        "Bedpanels",
        "Rwall",
        "Lwall",
      ],
      nodesToHide: ["Driving", "Sleeping", "Matress_sleep", "Bedpanel"],
      annotations: [],
    },
    drivingMode: {
      id: "drivingMode",
      nodesToShow: ["Driving"],
      nodesToHide: ["BEDKIT", "Living", "Sleeping", "Stool", "TABLE"],
      annotations: [
        {
          scenePosition: [
            0.13467884506907696, 0.8775028457490269, 0.44521280869652685,
          ],
          camera: {
            position: [
              0.12750341167882606, 5.516076577288255, 2.6405214983897656,
            ],
            target: [
              0.006106505842395782, 0.5127495344866357, 0.44521286812250127,
            ],
          },
          titleEn: "Cargo Mode",
          textEn:
            "If additional storage space is needed for moving large items, the queen-size bed panels can neatly store away, opening up the bed space for items to be stored and moved. ",
          titleJap: "カーゴモード",
          textJap:
            "大きな荷物の移動のために、収納スペースを増やしたい場合。クイーンサイズのベッドパネルがすっきりと収納でき、ベッドスペースが広がるので、物の収納や移動に便利です。",
        },
      ],
    },
    livingMode: {
      id: "livingMode",
      nodesToShow: [
        "BEDKIT",
        "Living",
        "Stool",
        "TABLE",
        "Matress_folded",
        "Bedpanels",
      ],
      nodesToHide: ["Driving", "Sleeping", "Matress_sleep", "Bedpanel"],

      annotations: [
        {
          scenePosition: [
            0.16832122902234864, -1.1618520603162394, 0.816289835437854,
          ],
          camera: {
            position: [
              4.862845871532647, -0.3530783247114883, 2.6728987750165887,
            ],
            target: [
              -0.15024339535840614, -0.5753018632208095, 1.2175176738512132,
            ],
          },
          titleEn: "Dining Mode",
          textEn:
            "To convert into dinnette mode or a comfortable workspace, the rear seat can flip to face backwards.",
          titleJap: "ダイニングモード",
          textJap:
            "ダイネットモードや快適なワークスペースにするために、リアシートは後ろ向きにフリップすることができます。",
        },
        {
          scenePosition: [
            0.04284784800894914, -0.5008196210501161, 1.193710042531565,
          ],
          camera: {
            position: [
              4.862845871532647, -0.3530783247114883, 2.6728987750165887,
            ],
            target: [
              -0.15024339535840614, -0.5753018632208095, 1.2175176738512132,
            ],
          },
          titleEn: "Dining Mode",
          textEn:
            "To sit around the table the bed panels can store away to create a comfortable social table space. ",
          titleJap: "ダイニングモード",
          textJap:
            "ベッドパネルを収納すれば、テーブルを囲む快適なソーシャルテーブルスペースとして利用できます。",
        },
      ],
    },
    sleepingMode: {
      id: "sleepingMode",
      nodesToShow: [
        "Sleeping",
        "BEDKIT",
        "Stool",
        "Matress_sleep",
        "Bedpanels",
        "Bedpanel",
      ],
      nodesToHide: ["Driving", "Living", "TABLE", "Matress_folded"],
      annotations: [
        {
          scenePosition: [
            -0.17478962368380116, 0.7168496402561405, 1.360880010163301,
          ],
          camera: {
            position: [
              6.492187780918641, -0.3199382353503833, 3.4010172732903623,
            ],
            target: [
              -0.15024339535840608, -0.5753018632208095, 1.2175176738512132,
            ],
          },
          titleEn: "Sleeping Mode",
          textEn: "The KUMA Q comes with a Queen-size main bed.",
          titleJap: "スリーピングモード",
          textJap: "「KUMA Q」はクイーンサイズのメインベッドを搭載しています。",
        },
        {
          scenePosition: [
            0.2843754463344677, -1.1655466101327143, 0.8166586249834434,
          ],
          camera: {
            position: [
              6.492187780918641, -0.3199382353503833, 3.4010172732903623,
            ],
            target: [
              -0.15024339535840608, -0.5753018632208095, 1.2175176738512132,
            ],
          },
          titleEn: "Sleeping Mode",
          textEn:
            "If more sleeping space is needed, the rear FASP seat can fold flat to sleep up to two additional persons.",
          titleJap: "スリーピングモード",
          textJap:
            "「さらに就寝スペースが必要な場合は、リアFASPシートをフラットにすることで、最大2名まで追加で就寝することが可能です。",
        },
      ],
    },
    price: 6550000,
    image: "/assets/models/kuma_elevation.png",
    sketchfabId: "385f73d0e5aa41338a52b63b4d08ba90",
    // experimental upload that shows obj names from fbx file
    // sketchfabId: '82529d6c6f9248b7b96f7b16ae5761f6',
    camera: {
      interior: {
        position: [1.0466278957474726, 5.126113729687705, 1.3321372051006426],
        target: [0.9223889454108516, 0.09134459528137807, 1.239639127960609],
      },

      exterior: {
        position: [15.928606306502076, 0.8367370365096211, 1.2205871767304888],
        target: [0.5775262890338881, -0.38633494893022957, 1.3124414946536478],
      },
      cabinets: {
        position: [1.876218309962165, -1.8484182302655663, 1.3995179752887257],
        target: [0.17240855533079305, -0.44439069192253633, 1.0955861139459964],
      },
      floor: {
        position: [0.46479499949916814, 5.340529911984371, 1.703856419073102],
        target: [
          -0.18255185890115364, -0.21685166746955523, 0.8833244844151104,
        ],
      },
      ceiling: {
        position: [0.46479499949916814, 5.340529911984371, 1.703856419073102],
        target: [
          -0.18255185890115364, -0.21685166746955523, 0.8833244844151104,
        ],
      },
      seats: {
        position: [3.3682640191040303, -0.4285112289943269, 1.1968148334481128],
        target: [0.038908600814918384, -1.0158921023955376, 1.0453364204032756],
      },
      wheels: {
        position: [3.4160657573490956, -2.271352559885621, 0.5125287008286146],
        target: [0.5059132892756754, -2.1702489678966757, 0.3495043957807926],
      },
    },
  },
  {
    id: "tama",
    optionType: "Model",
    category: "model",
    name: "TAMA",
    nameJap: "TAMA",
    doors: ["BACKDOOR", "LDOOR"],
    presence: false,
    defaults: {
      rack: false,
      awning: false,
      fourwd: false,
    },
    price: 4000000,
    image: "/assets/models/tamathumbnail.jpeg",
    sketchfabId: "b2a56330de674c9fa8b93a70f8a5e631",
    defaultMode: {
      id: "defaultMode",
      nodesToShow: [
        "BEDKIT",
        "Living",
        "Stool",
        "TABLE",
        "Matress_folded",
        "Bedpanels",
        "Rwall",
        "Lwall",
      ],
      nodesToHide: ["Driving", "Sleeping", "Matress_sleep", "Bedpanel"],
      annotations: [],
    },
    drivingMode: {
      id: "drivingMode",
      nodesToShow: ["Driving"],
      nodesToHide: ["BEDKIT", "Living", "Sleeping", "Stool", "TABLE"],
      annotations: [
        {
          scenePosition: [
            0.21998116663853023, 1.003716128211009, 0.6564078564931134,
          ],
          camera: {
            position: [
              0.14522904189241134, 4.976378277286796, 1.5035018273165204,
            ],
            target: [
              0.06224893531827197, -0.21000599727327504, 0.7532709058266981,
            ],
          },
          titleEn: "Cargo Mode",
          textEn:
            "If additional storage space is needed for moving large items, the bed panels can be removed to open up more floor space.",
          titleJap: "カーゴモード",
          textJap:
            "大きな荷物を運ぶ際に収納スペースを確保する必要がある場合、ベッドパネルを取り外すことで床面積を広くとることができます。",
        },
      ],
    },
    livingMode: {
      id: "livingMode",
      nodesToShow: [
        "BEDKIT",
        "Living",
        "Stool",
        "TABLE",
        "Matress_folded",
        "Bedpanels",
      ],
      nodesToHide: ["Driving", "Sleeping", "Matress_sleep", "Bedpanel"],
      annotations: [
        {
          scenePosition: [
            0.13328741375134637, -0.6114848435648536, 1.2849837790996024,
          ],
          camera: {
            position: [
              -0.25499461478616237, 2.028830764122275, 1.7612413497827157,
            ],
            target: [
              0.0530816149003959, -0.2864806742117465, 0.9761244885214668,
            ],
          },
          titleEn: "Dining Mode / Workspace",
          textEn:
            "To convert into dinnette mode or a comfortable workspace, the rear seat can flip to face the rear of the campervan and the table angle and height can swivel and adjust.",
          titleJap: "ダイニングモード/ワークスペース",
          textJap:
            "リアシートをキャンピングカーの後方に向け、テーブルの角度と高さを回転させながら調整することで、ダイニングモードや快適なワークスペースにすることができます。",
        },
      ],
    },
    sleepingMode: {
      id: "sleepingMode",
      nodesToShow: [
        "Sleeping",
        "BEDKIT",
        "Stool",
        "Matress_sleep",
        "Bedpanels",
        "Bedpanel",
      ],
      nodesToHide: [
        "Driving",
        "Living",
        "TABLE",
        "Matress_folded",
        "Matress_square",
      ],
      annotations: [
        {
          scenePosition: [
            0.0072715173093886795, 0.8226624101317465, 1.0551592784877708,
          ],
          camera: {
            position: [
              -0.04537712046315834, 3.256362749886799, 1.6267924071926436,
            ],
            target: [
              0.06572616713009147, -0.1455618992072285, 0.5500257290756722,
            ],
          },
          titleEn: "Sleeping Mode",
          textEn:
            "The TAMA main bed space is semi-double size. If more sleeping space is needed, the rear FASP seat can fold flat to sleep up to two small children. ",
          titleJap: "スリーピングモード",
          textJap:
            "TAMAのメインベッドスペースはセミダブルサイズです。さらに就寝スペースが必要な場合は、リアFASPシートをフラットにすることで、小さなお子様を2名まで寝かせることが可能です。",
        },
      ],
    },
    camera: {
      interior: {
        position: [1.0466278957474726, 5.126113729687705, 1.3321372051006426],
        target: [0.9223889454108516, 0.09134459528137807, 1.239639127960609],
      },

      exterior: {
        position: [9.871595222098863, 0.7837210920487763, 1.2384271027141176],
        target: [0.2591913048228825, 0.17953328441592134, 0.8466993597904776],
      },
      cabinets: {
        position: [
          -0.005547525204216419, 3.9191725137131015, 1.4230481019668735,
        ],
        target: [0.28591460908053423, -0.37204741000629454, 0.7237261231734088],
      },
      floor: {
        position: [0.14522904189241134, 4.976378277286796, 1.5035018273165204],
        target: [0.06224893531827197, -0.21000599727327504, 0.7532709058266981],
      },
      ceiling: {
        position: [0.14522904189241134, 4.976378277286796, 1.5035018273165204],
        target: [0.06224893531827197, -0.21000599727327504, 0.7532709058266981],
      },
      seats: {
        position: [3.2675335285565152, -0.8433354416728809, 1.6933266448972197],
        target: [0.04652241055084586, -0.10112903061245677, 0.9710534127868446],
      },
      wheels: {
        position: [2.930355323362628, -1.379406919758386, 0.5572608903795164],
        target: [0.527057124627268, -1.31952975480087, 0.5215835246492861],
      },
    },
  },
  {
    id: "rack",
    nodeId: "358",
    sketchfabMaterial: ["ROOFRACK_frontrunner"],
    name: "Front runner Rack",
    nameJap: "ルーフラック",
    showNodeNames: "Roofrack",
    presence: false,
    toggleNodes: true,
    price: 200000,
    optionType: "Exterior Add-On",
    category: "exteriorAddOns",
    categoryJap: "外装オプション",
  },
  {
    id: "standardWheels",
    name: "Standard Wheels",
    nameJap: "スタンダードタイヤ",
    presence: true,
    sketchfabMaterial: [
      "DEFAULT_WHEEL",
      "DEFAULT_tire",
      "DEFAULT_core",
      "DEFAULT_circle",
    ],
    showNodesMaterials:
      "DEFAULT_WHEEL, DEFAULT_tire, DEFAULT_core, DEFAULT_circle",
    toggleNodes: true,
    nodeNames: "Default_toyota",
    showNodeNames: "Default_toyota",
    hideNodeNames: "Opencountry",
    price: 0,
    optionType: "Wheels",
    category: "wheels",
    categoryJap: "タイヤ",
  },
  {
    id: "fourwd",
    name: "4WD Wheels Set",
    nameJap: "4WD TOYOタイヤ・ホイールセット",
    presence: false,
    sketchfabMaterial: [
      "OPENCOUNTRY_16_tire",
      "OPENCOUNTRY_16_metal",
      "OPENCOUNTRY_16_white",
      "OPENCOUNTRY_16_Deco",
      "OPENCOUNTRY_16_rim",
    ],
    hideNodesMaterials:
      "DEFAULT_WHEEL, DEFAULT_tire, DEFAULT_core, DEFAULT_circle",
    toggleNodes: true,
    nodeNames: "Opencountry",
    showNodeNames: "Opencountry",
    hideNodeNames: "Default_toyota",
    price: 185000,
    optionType: "Wheels",
    category: "wheels",
    categoryJap: "タイヤ",
  },
  {
    id: "awning",
    name: "Awning",
    nameJap: "サイドオーニング",
    sketchfabMaterial: [
      "SUNSEEKER_AWNING_2_5m_frame",
      "SUNSEEKER_AWNING_2_5m_roof",
      "SUNSEEKER_AWNING_2_5m_red",
    ],
    presence: false,
    showNodeNames: "Awning_Fiamma",
    toggleNodes: true,
    price: 210000,
    optionType: "Exterior Add-On",
    category: "exteriorAddOns",
    categoryJap: "外装オプション",
  },
  {
    id: "sideWindow",
    name: "Side Window",
    nameJap: "後部窓小窓",
    presence: false,
    showNodeNames: "Lwall_window",
    hideNodeNames: "Lwall",
    toggleNodes: true,
    price: 120000,
    optionType: "Exterior Add-On",
    category: "",
    categoryJap: "外装オプション",
  },
  {
    id: "khakiGreenWrap",
    sketchfabMaterial: ["WRAP_GREEN", "Ldoor_WRAP_GREEN", "Bdoor_WRAP_GREEN"],
    name: "Khaki Green",
    nameJap: "カーキグリーン",
    presence: true,
    price: 205000,
    color: true,
    optionType: "Wrap",
    albedoPBR: [0.20031649743366164, 0.21404114048223255, 0.17352978112893008],
    hexColor: "#51554c",
    category: "exterior",
    categoryJap: "ボディカラー",
  },
  {
    id: "steelWrap",
    sketchfabMaterial: ["WRAP_GREEN", "Ldoor_WRAP_GREEN", "Bdoor_WRAP_GREEN"],
    name: "Steel",
    nameJap: "スチール(970MRA-795)",
    presence: true,
    price: 205000,
    color: true,
    optionType: "Wrap",
    albedoPBR: [0.06480326669290577, 0.08021982031446831, 0.09305896284668747],
    hexColor: "#485056",
    category: "exterior",
    categoryJap: "ボディカラー",
  },
  {
    id: "papyrusWrap",
    sketchfabMaterial: ["WRAP_GREEN", "Ldoor_WRAP_GREEN", "Bdoor_WRAP_GREEN"],
    name: "Papyrus (816)",
    nameJap: "パピルス(816)",
    presence: true,
    price: 205000,
    color: true,
    optionType: "Wrap",
    albedoPBR: [0.7605245046752922, 0.6514056374198239, 0.4969329950608704],
    hexColor: "#E2D3BB",
    category: "exterior",
    categoryJap: "ボディカラー",
  },
  {
    id: "whiteWrap",
    sketchfabMaterial: ["WRAP_GREEN", "Ldoor_WRAP_GREEN", "Bdoor_WRAP_GREEN"],
    name: "White",
    nameJap: "ホワイト",
    presence: false,
    color: true,
    price: 0,
    optionType: "Wrap",
    albedoPBR: [0.9804, 0.9804, 0.9804],
    hexColor: "#fff",
    category: "exterior",
    categoryJap: "ボディカラー",
  },

  {
    id: "whiteCabinets",
    sketchfabMaterial: ["CABINET", "Table_top"],
    nameJap: "ホワイト（K-6000KN）",
    name: "White",
    textureName: "cabinets-white",
    presence: true,
    price: 60000,
    optionType: "Interior Cabinets",
    hexColor: "#fff",
    category: "cabinets",
    categoryJap: "キャビネットカラー",
  },
  {
    id: "blackCabinets",
    name: "Black",
    nameJap: "ブラック（TK-6400K）",
    sketchfabMaterial: ["CABINET", "Table_top"],
    textureName: "cabinets-black",
    presence: false,
    price: 60000,
    optionType: "Interior Cabinets",
    hexColor: "#2f3538",
    category: "cabinets",
    categoryJap: "キャビネットカラー",
  },
  {
    id: "darkBlueCabinets",
    name: "Navy blue",
    nameJap: "ネイビー（TK-6614K）",
    sketchfabMaterial: ["CABINET", "Table_top"],
    textureName: "cabinets-blue",
    presence: false,
    price: 60000,
    optionType: "Interior Cabinets",
    hexColor: "#5f8999",
    category: "cabinets",
    categoryJap: "キャビネットカラー",
  },
  {
    id: "darkGreyCabinets",
    name: "Dark grey",
    nameJap: "ダークグレー（TK-6306K）",
    sketchfabMaterial: ["CABINET", "Table_top"],
    textureName: "cabinets-grey",
    presence: false,
    price: 60000,
    optionType: "Interior Cabinets",
    hexColor: "#5f8999",
    category: "cabinets",
    categoryJap: "キャビネットカラー",
  },
  {
    id: "beigeCabinets",
    name: "Beige",
    nameJap: "ベージュ（K-6203KN）",
    sketchfabMaterial: ["CABINET", "Table_top"],
    textureName: "cabinets-beige",
    presence: false,
    price: 60000,
    optionType: "Interior Cabinets",
    hexColor: "#998978",
    category: "cabinets",
    categoryJap: "キャビネットカラー",
  },
  {
    id: "oliveCabinets",
    name: "Dark Olive",
    nameJap: "ダークオリーブ（TK-6607K）",
    sketchfabMaterial: ["CABINET", "Table_top"],
    textureName: "cabinets-olive",
    presence: false,
    price: 60000,
    optionType: "Interior Cabinets",
    hexColor: "#998978",
    category: "cabinets",
    categoryJap: "キャビネットカラー",
  },
  {
    id: "brownCabinets",
    name: "Brown",
    nameJap: "ブラウン（TK-6207K）",
    sketchfabMaterial: ["CABINET", "Table_top"],
    textureName: "cabinets-brown",
    presence: false,
    price: 60000,
    optionType: "Interior Cabinets",
    hexColor: "#998978",
    category: "cabinets",
    categoryJap: "キャビネットカラー",
  },

  {
    id: "lightWoodFloor",
    name: "Light wood",
    nameJap: "ビーチ(SDF7075)",
    presence: true,
    sketchfabMaterial: ["FLOORS"],
    textureName: "floors-lightwood",
    price: 0,
    optionType: "Interior Floor",
    category: "floors",
    categoryJap: "フロア",
  },

  {
    id: "walnutStyleFloor",
    name: "Walnut",
    nameJap: "ウォールナット(SDF7073)",
    presence: false,
    sketchfabMaterial: ["FLOORS"],
    textureName: "floors-walnut",
    price: 0,
    optionType: "Interior Floor",
    category: "floors",
    categoryJap: "フロア",
  },
  {
    id: "teakFloor",
    name: "Teak",
    nameJap: "チーク(SDF7072) ",
    presence: false,
    sketchfabMaterial: ["FLOORS"],
    textureName: "floors-teakwood",
    price: 0,
    optionType: "Interior Floor",
    category: "floors",
    categoryJap: "フロア",
  },
  {
    id: "lightCanvasFloor",
    name: "Light Canvas",
    nameJap: "ホワイトキャンバス(PF-20331)",
    presence: false,
    sketchfabMaterial: ["FLOORS"],
    textureName: "floors-light-canvas",
    price: 0,
    optionType: "Interior Floor",
    category: "floors",
    categoryJap: "フロア",
  },
  {
    id: "greyCanvasFloor",
    name: "Grey Canvas",
    nameJap: "グレーキャンバス(PF-20334)",
    presence: false,
    sketchfabMaterial: ["FLOORS"],
    textureName: "floors-grey-canvas",
    price: 0,
    optionType: "Interior Floor",
    category: "floors",
    categoryJap: "フロア",
  },
  {
    id: "darkCanvasFloor",
    name: "Dark Canvas",
    nameJap: "ダークキャンバス(PF-20336)",
    presence: false,
    sketchfabMaterial: ["FLOORS"],
    textureName: "floors-dark-canvas",
    price: 0,
    optionType: "Interior Floor",
    category: "floors",
    categoryJap: "フロア",
  },
  {
    id: "stainPineCeiling",
    name: "Natural Pine",
    nameJap: "ナチュラルパイン",
    presence: true,
    sketchfabMaterial: ["CEILING"],
    textureName: "ceiling-natural-pine",
    price: -20000,
    optionType: "Interior Ceiling",
    category: "ceiling",
    categoryJap: "天井羽目板",
  },
  {
    id: "teakCeiling",
    name: "Teak",
    nameJap: "チーク",
    presence: false,
    sketchfabMaterial: ["CEILING"],
    textureName: "ceiling-teakwood",
    price: 65000,
    optionType: "Interior Ceiling",
    category: "ceiling",
    categoryJap: "天井羽目板",
  },
  {
    id: "walnutCeiling",
    name: "Walnut",
    nameJap: "ウォルナット",
    presence: false,
    sketchfabMaterial: ["CEILING"],
    textureName: "ceiling-walnut",
    price: 65000,
    optionType: "Interior Ceiling",
    category: "ceiling",
    categoryJap: "天井羽目板",
  },
  {
    id: "whiteCeiling",
    name: "White",
    nameJap: "ホワイト",
    sketchfabMaterial: ["CEILING"],
    textureName: "ceiling-white",
    presence: false,
    price: 90000,
    optionType: "Interior Ceiling",
    category: "ceiling",
  },
  {
    id: "blueSeat",
    name: "Marine Blue",
    nameJap: "マリンブルー（T-7509）",
    sketchfabMaterial: ["FASP_seat"],
    presence: true,
    price: 0,
    textureName: "seats-blue",
    models: ["kuma", "superTama"],
    optionType: "Interior Rear Seat Fabric",
    category: "seats",
    categoryJap: "FASPシートカラー",
  },
  {
    id: "yellowSeat",
    name: "Sunset Yellow",
    nameJap: "サンセットイエロー（T-7504）",
    sketchfabMaterial: ["FASP_seat"],
    presence: false,
    price: 0,
    textureName: "seats-sunset-yellow",
    models: ["kuma", "superTama"],
    optionType: "Interior Rear Seat Fabric",
    category: "seats",
    categoryJap: "FASPシートカラー",
  },
  {
    id: "lightGreySeat",
    name: "Light Grey",
    nameJap: "ライトグレー（T-7511）",
    sketchfabMaterial: ["FASP_seat"],
    presence: false,
    price: 0,
    textureName: "seats-light-grey",
    models: ["kuma", "superTama"],
    optionType: "Interior Rear Seat Fabric",
    category: "seats",
    categoryJap: "FASPシートカラー",
  },
  {
    id: "greenSeat",
    name: "Green",
    nameJap: "グリーン（T-7505）",
    sketchfabMaterial: ["FASP_seat"],
    presence: false,
    price: 0,
    textureName: "seats-green",
    models: ["kuma", "superTama"],
    optionType: "Interior Rear Seat Fabric",
    category: "seats",
    categoryJap: "FASPシートカラー",
  },
  {
    id: "creamSeat",
    name: "Cream",
    nameJap: "クリーム（T-7506）",
    sketchfabMaterial: ["FASP_seat"],
    presence: false,
    price: 0,
    textureName: "seats-cream",
    models: ["kuma", "superTama"],
    optionType: "Interior Rear Seat Fabric",
    category: "seats",
    categoryJap: "FASPシートカラー",
  },
  {
    id: "blackSeat",
    name: "Black",
    nameJap: "ブラック（T-7515）",
    sketchfabMaterial: ["FASP_seat"],
    presence: false,
    price: 0,
    textureName: "seats-black",
    models: ["kuma", "superTama"],
    optionType: "Interior Rear Seat Fabric",
    category: "seats",
    categoryJap: "FASPシートカラー",
  },
  {
    id: "brownSeat",
    name: "Brown",
    nameJap: "ブラウン（T-7510）",
    sketchfabMaterial: ["FASP_seat"],
    presence: false,
    price: 0,
    textureName: "seats-brown",
    models: ["kuma", "superTama"],
    optionType: "Interior Rear Seat Fabric",
    category: "seats",
    categoryJap: "FASPシートカラー",
  },
  {
    id: "webastoHeater",
    name: "Webasto Heater",
    nameJap: "WebastoFFヒーター",
    presence: false,
    price: 300000,
    optionType: "Option",
    image: "/assets/options/Webastoheater1b.jpg",
    category: "options",
    categoryJap: "内装オプション",
  },
  {
    id: "shorePower",
    name: "Shore Power",
    nameJap: "外部充電源",
    presence: false,
    price: 100000,
    optionType: "Option",
    image: "/assets/options/shorepower.jpg",
    category: "options",
    categoryJap: "内装オプション",
  },
  {
    id: "maxFan",
    name: "Max Fan with remote",
    nameJap: "MaxxFan（リモコン付き）",
    presence: false,
    price: 110000,
    optionType: "Option",
    image: "/assets/options/Maxxfan.jpg",
    category: "options",
    categoryJap: "内装オプション",
  },
  {
    id: "curtains",
    name: "Curtains",
    nameJap: "遮光カーテン",
    presence: false,
    price: 96000,
    optionType: "Option",
    image: "/assets/options/curtains.jpg",
    category: "options",
    categoryJap: "内装オプション",
  },
];

export const hashData = data_options.reduce(
  (
    hash,
    {
      id,
      name,
      nodeId,
      presence,
      defaults,
      price,
      optionType,
      image,
      albedoPBR,
      hexColor,
      sketchfabId,
      camera,
      sketchfabMaterial,
      toggleNodes,
      textureName,
      nodeIds,
      hideNodesMaterials,
      showNodesMaterials,
      nodeNames,
      drivingMode,
      livingMode,
      sleepingMode,
      defaultMode,
      doors,
      color,
      category,
      showNodeNames,
      hideNodeNames,
      nameJap,
      categoryJap,
    }
  ) => {
    hash[id] = {
      id,
      name,
      nodeId,
      presence,
      defaults,
      price,
      optionType,
      image,
      albedoPBR,
      hexColor,
      sketchfabId,
      camera,
      sketchfabMaterial,
      toggleNodes,
      textureName,
      nodeIds,
      hideNodesMaterials,
      showNodesMaterials,
      nodeNames,
      drivingMode,
      livingMode,
      sleepingMode,
      defaultMode,
      doors,
      color,
      category,
      showNodeNames,
      hideNodeNames,
      nameJap,
      categoryJap,
    };
    return hash;
  },
  {}
);
