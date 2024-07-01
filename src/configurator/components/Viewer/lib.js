export const parseArrayString = (str) => {
  if (!str) return [];
  return JSON.parse(str.replace(/'/g, '"'));
};

export const calculateVanObj = ({
  queryClient,
  pageData,
  packages,
  comparison = false,
  mainModel,
}) => {
  const findProperty = (slice, key_value) => {
    return slice?.items?.find((item) => item?.key_name === key_value);
  };

  // if comparison is true we want to pull the same option that is selected but from the comparison page,
  // note that it may not exist as a property on that page so we have to be careful here to check for undefined
  // we need to get the key from the main model
  // we look up this key in the comparison page data

  const findSliceType = ({ slice_type, variation }) => {
    if (variation) {
      return pageData.data.slices.find((s) => s.variation === variation);
    } else if (slice_type) {
      return pageData.data.slices.find((s) => s.slice_type === slice_type);
    }
  };

  const defaultOptions = findSliceType({ slice_type: "default_options" });

  const compareSlice = findSliceType({ slice_type: "summary_comparison" });

  const baseKey =
    queryClient.getQueryData([mainModel, "baseConfig"]) ||
    defaultOptions.primary.base_key;

  const getRoofKey = () => {
    if (mainModel === "tama" && !comparison) {
      const queryData = queryClient.getQueryData([mainModel, "roof"]);
      return queryData ? queryData : defaultOptions.primary.roof_key;
    } else if (mainModel === "kumaq" && comparison) {
      // we need a roof key here to compare to, even though none is available in the cache
      return "low-roof";
    } else {
      return null;
    }
  };

  const exteriorKey =
    queryClient.getQueryData([mainModel, "option", "exterior"]) ||
    defaultOptions.primary.exterior_key;
  const ceilingsKey =
    queryClient.getQueryData([mainModel, "ceilings"]) ||
    defaultOptions.primary.ceilings_key;
  const floorsKey =
    queryClient.getQueryData([mainModel, "floors"]) ||
    defaultOptions.primary.floors_key;
  const cabinetsKey =
    queryClient.getQueryData([mainModel, "cabinets"]) ||
    defaultOptions.primary.cabinets_key;
  const wallsKey =
    queryClient.getQueryData([mainModel, "walls"]) ||
    defaultOptions.primary.walls_key;
  const seatsKey =
    queryClient.getQueryData([mainModel, "seats"]) ||
    defaultOptions.primary.seats_key;
  const tyresKey =
    queryClient.getQueryData([mainModel, "option", "tyres"]) ||
    defaultOptions.primary.tyres_key;

  console.log("exterior key is", exteriorKey);
  console.log("ceilings key is", ceilingsKey);
  console.log("roof key is", getRoofKey(), mainModel);

  const buildSliceObj = ({ slice_type = null, variation = null, key_name }) => {
    const slice = findSliceType({ slice_type, variation });

    console.log("finding property with slice and key_name", slice, key_name);
    const property = findProperty(slice, key_name);

    console.log(
      "building slice object with",
      slice_type,
      variation,
      key_name,
      slice,
      property
    );

    return {
      key: key_name,
      name: property.name,
      price: property.price_in_yen,
    };
  };

  console.log("compare slice", compareSlice);

  const getTamaBaseProperty = (items) => {
    if (comparison && mainModel === "kumaq") {
      const property = items.find((item) => item.key_name === baseKey);
      if (property) {
        return property;
      } else {
        // in this case there is no exact key match for the key gas-4wd in tama - so just search for gas-
        return items.find((item) =>
          item.key_name.includes(baseKey.slice(0, 3))
        );
      }
    } else {
      return items.find(
        (item) =>
          item.key_name === baseKey && item.roof_type_key === getRoofKey()
      );
    }
  };

  const baseSlice = findSliceType({ slice_type: "base_options" });

  console.log(
    "model",
    pageData.data.model,
    "base slice is",
    baseSlice,
    "base key is",
    baseKey
  );

  const buildTaxesObj = () => {
    const baseProperty =
      pageData.data.model === "tama"
        ? getTamaBaseProperty(baseSlice.items)
        : findProperty(baseSlice, baseKey);

    // get tama base property is not returning anything
    // this is the comparison object
    // the problem is there is no roof key selected so we need to just arbitarily choose on
    // if it's the comparison object - just assign a roof key

    const emissionsTaxAmount = parseInt(baseProperty.emissions_tax_amount);
    const emissionsTaxText = baseSlice.primary.emissions_tax_label;

    const estimatedExpenseValue = parseInt(
      pageData.data.estimated_expense_value
    );

    const carWeightTaxAmount = parseInt(
      compareSlice.primary.car_weight_tax_amount
    );

    const liabilityInsuranceAmount = parseInt(
      compareSlice.primary.liability_insurance_amount
    );

    const carTaxRates = JSON.parse(compareSlice.primary.car_rate_tax_amounts);

    const currentMonth = new Date().getMonth() + 1;

    const currentCarTaxRate = carTaxRates[currentMonth];

    const carTaxRate = parseInt(currentCarTaxRate);

    return {
      taxes: {
        emissionsTax: {
          key: "emissions-tax",
          name: emissionsTaxText,
          amount: emissionsTaxAmount,
        },
        carWeightTax: {
          amount: carWeightTaxAmount,
          key: "car-weight-tax",
          name: compareSlice.primary.car_weight_tax,
        },
        registrationFee: {
          key: "registration-fee",
          amount: estimatedExpenseValue,
          name: compareSlice.primary.registration_fee_text,
        },
        carTaxRate: {
          key: "car-tax-rate",
          month: currentMonth,
          amount: carTaxRate,
          name: compareSlice.primary.car_tax_rate,
        },
        liabilityInsurance: {
          key: "liability-insurance",
          amount: liabilityInsuranceAmount,
          name: compareSlice.primary.liability_insurance_text,
        },
        totalAmount:
          emissionsTaxAmount +
          carWeightTaxAmount +
          estimatedExpenseValue +
          liabilityInsuranceAmount +
          carTaxRate,
      },
    };
  };

  const buildBaseAndRoofObjs = () => {
    if (getRoofKey()) {
      const property = getTamaBaseProperty(baseSlice.items);

      // in the case of kuma gas 4wd there is no equivalent tama
      // in this case match a tama with just gas

      console.log(
        "base key",
        baseKey,
        getRoofKey(),
        "found property",
        property,
        "page data is",
        pageData,
        "main model is",
        mainModel
      );

      const baseObj = {
        key: property.key_name,
        name: property.title,
        price: property.price_in_yen_value,
      };

      return {
        base: baseObj,
        roof: {
          key: property.roof_type_key,
          name: property.roof_type,
        },
      };
    } else {
      const property = baseSlice.items.find(
        (item) => item.key_name === baseKey
      );

      const baseObj = {
        base: {
          key: property.key_name,
          name: property.title,
          price: property.price_in_yen_value,
        },
      };

      return baseObj;
    }
  };

  const chosenPackages = queryClient
    .getQueriesData({
      predicate: (query) => {
        return (
          query.queryKey[0] === mainModel && query.queryKey[1] === "package"
        );
      },
    })
    .filter((item) => item[1] === true)
    .map((item) => item[0][2]);

  const findPackageFeatures = (packageKey) => {
    const result = packages.data.slices.find((packageItem) => {
      return packageItem.primary.package_key === packageKey;
    });
    return result;
  };

  const findSliceTypes = ({ slice_type, variation }) => {
    if (variation) {
      return pageData.data.slices.filter((s) => s.variation === variation);
    } else if (slice_type) {
      return pageData.data.slices.filter((s) => s.slice_type === slice_type);
    }
  };

  const buildExtrasObjArray = () => {
    const extrasSlices = findSliceTypes({ variation: "extrasOptions" });

    const tyresSlice = extrasSlices[0];
    const optionsSlice = extrasSlices[1];
    const batterySlice = extrasSlices[2];

    const tyresProperty = findProperty(tyresSlice, tyresKey);

    const tyresObj = {
      name: tyresProperty.name,
      price: tyresProperty.price_in_yen,
      key: tyresProperty.key_name,
    };

    const options = queryClient
      .getQueriesData({
        predicate: (query) => {
          return (
            query.queryKey[0] === mainModel && query.queryKey[1] === "option"
          );
        },
      })
      .filter((item) => item[1] === true)
      .map((item) => item[0][2])
      .filter((item) =>
        ["roof-rack", "side-awning", "additional-battery"].includes(item)
      );

    let roofRackObj = null;
    let sideAwningObj = null;
    let batteryObj = null;

    if (options.includes("roof-rack")) {
      const roofRackProperty = findProperty(optionsSlice, "roof-rack");
      roofRackObj = {
        key: "roof-rack",
        name: roofRackProperty.name,
        price: roofRackProperty.price_in_yen,
      };
    }
    if (options.includes("side-awning")) {
      const sideAwningProperty = findProperty(optionsSlice, "side-awning");
      sideAwningObj = {
        key: "side-awning",
        name: sideAwningProperty.name,
        price: sideAwningProperty.price_in_yen,
      };
    }

    if (options.includes("additional-battery")) {
      const batteryProperty = findProperty(batterySlice, "additional-battery");
      batteryObj = {
        key: "additional-battery",
        name: batteryProperty.name,
        price: batteryProperty.price_in_yen,
      };
    }

    return {
      options: {
        tyres: tyresObj,
        roofRack: roofRackObj,
        sideAwning: sideAwningObj,
        batterySlice: batteryObj,
        exterior: buildSliceObj({
          variation: "outerColor",
          key_name: exteriorKey,
        }),
      },
    };
  };

  console.log("extras", buildExtrasObjArray());

  const buildPackagesObjArray = () => {
    return chosenPackages.map((packageKey) => {
      const packageSlice = findSliceType({ slice_type: "package_options" });

      const foundPackage = findProperty(packageSlice, packageKey);
      const packageFeature = findPackageFeatures(packageKey);

      return {
        key: packageKey,
        name: foundPackage.title,
        price: parseInt(foundPackage.package_price_value),
        items: packageFeature,
      };
    });
  };

  console.log(
    "chosen packages",
    chosenPackages,
    "packages obj",
    buildPackagesObjArray()
  );

  const chosenOptionsObj = {
    ...buildBaseAndRoofObjs(),
    ...buildExtrasObjArray(),
    ...buildTaxesObj(),
    model: pageData.data.model,
    seats: buildSliceObj({ slice_type: "seat_options", key_name: seatsKey }),
    floors: buildSliceObj({ variation: "floorOptions", key_name: floorsKey }),
    cabinets: buildSliceObj({
      variation: "cabinetOptions",
      key_name: cabinetsKey,
    }),
    ceilings: buildSliceObj({
      variation: "ceilingOptions",
      key_name: ceilingsKey,
    }),
    walls: buildSliceObj({
      variation: "wallOptions",
      key_name: wallsKey,
    }),
    packages: buildPackagesObjArray(),
  };

  const sumFunction = (a, c) => a + c;

  const interiorProperties = [
    chosenOptionsObj.seats,
    chosenOptionsObj.cabinets,
    chosenOptionsObj.floors,
    chosenOptionsObj.ceilings,
  ];

  const getPackagesAmount = () => {
    if (chosenOptionsObj.packages.length > 0) {
      return chosenOptionsObj.packages.map((i) => i?.price).reduce(sumFunction);
    }
    return 0;
  };

  const getOptionsAmount = () => {
    return Object.values(chosenOptionsObj.options)
      .filter((i) => i !== null)
      .filter((i) => i.price !== null)
      .map((i) => parseInt(i.price))
      .reduce(sumFunction);
  };

  const getInteriorsAmount = () => {
    if (interiorProperties.filter((i) => i.price !== null).length > 0) {
      return interiorProperties
        .filter((i) => i.price !== null)
        .map((i) => parseInt(i?.price))
        .reduce(sumFunction);
    }
    return 0;
  };

  const calculateOptions = () => {
    return getPackagesAmount() + getOptionsAmount() + getInteriorsAmount();
  };

  chosenOptionsObj.totals = {
    taxes: chosenOptionsObj.taxes.totalAmount,
    options: calculateOptions(),
    base: parseInt(chosenOptionsObj.base.price),
    final:
      parseInt(chosenOptionsObj.base.price) +
      calculateOptions() +
      chosenOptionsObj.taxes.totalAmount,
  };

  return chosenOptionsObj;
};
