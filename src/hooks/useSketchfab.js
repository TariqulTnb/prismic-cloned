import { createContext, useContext, useEffect, useState, useRef } from "react";
// import { useAddTexture } from "./useQueries";
// import { useData } from "./useData";
// import { textures } from "../data/textures.js";
// import { useLocation } from "react-router-dom";

// all methods in here must be async requests to Sketchfab

// these hooks cannot use anything in datahooks because at this point in the app they are not defined

// communication with data-hooks must be done by setting state variables and using effects from data hooks

// at any step on the journey we need to do a few things..
// 1. init the viewer DONE
// 2. setup event listeners DONE
// 3. add textures and save their ids to the cache DONE
// 4. setup default nodes for current step DONE
// 7. set the camera look at for the current step - DONE
// 8. set user interaction to true / false for the current step - DONE
// 5. hide / show nodes based on user selections - IGNORE FOR NOW
// 6. hide / show textures based on the user's selections at the current step - IGNORE FOR NOW

export const SketchFabContext = createContext();

export const useSketchFab = () => useContext(SketchFabContext);

export default function SketchFabProvider({ children }) {
  const [texturesLoaded, setTexturesLoaded] = useState(false);
  const [texturesAdded, setTexturesAdded] = useState(false);

  const [viewerReady, setViewerReady] = useState(false);
  const [viewerStarted, setViewerStarted] = useState(false);

  const nodeMapRef = useRef(null);
  const nodesToShowRef = useRef([]);
  const nodesToHideRef = useRef([]);
  const queryClientRef = useRef(null);
  const cameraPositionRef = useRef(null);
  const modelRef = useRef(null);
  const texturesRef = useRef([]);
  const materialsRef = useRef([]);
  const startingWrapColorRef = useRef([]);
  const modelLoadProgress = useRef(0);

  const [readyForAction, setReadyForAction] = useState(false);
  const [apiInstance, setApiInstance] = useState(null);
  const [modelLoaded, setModelLoaded] = useState(false);

  const filterNodesByNodeNamesArray = (nodes, nodeNames) => {
    console.log("filtering nodes by names", nodes, nodeNames);
    const nodesArray = Object.values(nodes);

    const result = nodesArray.filter((node) => nodeNames.includes(node.name));

    console.log("result", result);
    return result;
  };

  useEffect(() => {
    if (viewerReady && texturesLoaded && modelLoaded) {
      setReadyForAction(true);
    }
  }, [viewerReady, texturesLoaded, modelLoaded]);

  useEffect(() => {
    if (viewerReady) {
      console.log("viewer ready, adding textures etc...");
      addTextures();
      setUserInteraction(false);
      getMaterialList().then((materials) => {
        materialsRef.current = materials;
        console.log("starting color is", startingWrapColorRef.current);
        updateMaterials(
          ["WRAP_GREEN", "Ldoor_WRAP_GREEN", "Bdoor_WRAP_GREEN"],
          null,
          false,
          startingWrapColorRef.current
        ).then(() => {
          queryClientRef.current.setQueryData(
            [modelRef.current, "exterior"],
            () => {
              return "white";
            }
          );
        });
      });
    }
  }, [viewerReady]);

  useEffect(() => {
    if (modelLoaded && viewerReady) {
      setupNodes();
    }
  }, [modelLoaded, viewerReady]);

  useEffect(() => {
    if (materialsRef.current.length > 0) {
      console.log("called", startingWrapColorRef.current);
      updateMaterials(
        ["WRAP_GREEN", "Ldoor_WRAP_GREEN", "Bdoor_WRAP_GREEN"],
        null,
        false,
        startingWrapColorRef.current
      );
    }
  }, [materialsRef.current]);

  useEffect(() => {
    if (readyForAction) {
      setCameraLookAt(JSON.parse(cameraPositionRef.current));
    }
  }, [readyForAction]);

  const VIEWER_INIT_OPTIONS = {
    ui_controls: 0,
    ui_annotations: 0,
    ui_fullscreen: 0,
    ui_help: 1,
    ui_infos: 0,
    ui_settings: 0,
    ui_stop: 0,
    ui_start: 0,
    ui_watermark: 0,
    ui_hint: 0,
    transparent: 0,
    autostart: 1,
    api_log: 1,
    ui_loading: 0,
    // IMPORTANT - do not change preload setting to 1
    preload: 0,
  };

  const initSketchfabViewer = ({
    iframeRef,
    modelId,
    textures,
    queryClient,
    nodesToShow,
    nodesToHide,
    cameraPosition,
    startingWrapColor,
    model,
  }) => {
    let client = new window.Sketchfab(iframeRef.current, "1.12.1");
    nodesToHideRef.current = nodesToHide;
    nodesToShowRef.current = nodesToShow;
    queryClientRef.current = queryClient;
    modelRef.current = model;
    cameraPositionRef.current = cameraPosition;
    console.log("startingWrapColor", startingWrapColor);
    startingWrapColorRef.current = startingWrapColor;
    texturesRef.current = textures;
    client.init(modelId, {
      ...VIEWER_INIT_OPTIONS,
      success: (api) => {
        console.log("api successfully loaded", api);
        setupEventListeners(api);
      },
      error: (e) => {
        // setAppError(e);
        console.log("error occurred initializing sketchfab", e);
      },
    });
  };

  const toggleNodes = async (nodes, show = true) => {
    const filteredNodes = filterNodesByNodeNamesArray(
      nodeMapRef.current,
      nodes
    );

    const promises = filteredNodes.map((node) => {
      if (show) {
        return showNode(apiInstance, node);
      } else {
        return hideNode(apiInstance, node);
      }
    });

    await Promise.all(promises);

    promises.forEach((node) => {
      queryClientRef.current.setQueryData(
        [node.name, node.instanceID],
        node.shown
      );
    });
  };

  const getCameraLookAt = function () {
    console.log("in get camera look at!", apiInstance);
    return new Promise((resolve, reject) => {
      apiInstance.getCameraLookAt(function (err, camera) {
        if (err) {
          reject(new Error(err));
        } else {
          window.console.log(camera.position); // [x, y, z]
          window.console.log(camera.target); // [x, y, z]
          resolve();
        }
      });
    });
  };
  const setupNodes = async () => {
    const nodes = await listNodes(apiInstance);

    console.log("got these nodes", nodes);

    nodeMapRef.current = nodes;

    const hideNodeNamesArray = nodesToHideRef.current.map(
      (nodeObj) => nodeObj.name
    );
    const showNodeNamesArray = nodesToShowRef.current.map(
      (nodeObj) => nodeObj.name
    );

    const filteredNodesToShow = filterNodesByNodeNamesArray(
      nodes,
      showNodeNamesArray
    );

    const filteredNodesToHide = filterNodesByNodeNamesArray(
      nodes,
      hideNodeNamesArray
    );

    const NodesToShowPromises = await Promise.all(
      filteredNodesToShow.map((node) => {
        return showNode(apiInstance, node);
      })
    );

    const NodesToHidePromises = await Promise.all(
      filteredNodesToHide.map((node) => {
        return hideNode(apiInstance, node);
      })
    );

    console.log("promise results", NodesToShowPromises, NodesToHidePromises);

    NodesToShowPromises.forEach((node) => {
      queryClientRef.current.setQueryData(
        [node.name, node.instanceID],
        node.shown
      );
    });

    NodesToHidePromises.forEach((node) => {
      queryClientRef.current.setQueryData(
        [node.name, node.instanceID],
        node.shown
      );
    });
  };

  function setupEventListeners(instance) {
    instance.addEventListener("modelLoadProgress", function (eventData) {
      let percent = Math.floor(eventData.progress * 100);
      modelLoadProgress.current = percent;
      console.log("model load progress ref", modelLoadProgress.current);
      if (percent === 100) {
        setModelLoaded(true);
      }
    });

    instance.addEventListener("textureLoadProgress", function (eventData) {
      let percent = Math.floor(eventData.progress * 100);
      if (percent === 100) {
        setTexturesLoaded(true);
      }
    });

    instance.addEventListener("viewerready", function () {
      setApiInstance(instance);
      console.log("viewer is ready, setting ready");
      setViewerReady(true);
    });

    instance.addEventListener("viewerstart", function () {
      console.log("viewer is started, setting started");

      setViewerStarted(true);
    });
  }

  const listNodes = function (instance) {
    return new Promise((resolve, reject) => {
      instance.getNodeMap(function (err, nodes) {
        if (!err) {
          resolve(nodes);
        } else reject(new Error(nodes));
      });
    });
  };

  const getMaterialList = function () {
    return new Promise((resolve, reject) => {
      apiInstance.getMaterialList(function (err, materials) {
        if (!err) {
          resolve(materials);
        } else reject(new Error(err));
      });
    });
  };

  const updateMaterials = async (
    materialsToUpdate,
    textureUid,
    texture = true,
    colorCode
  ) => {
    // find the materials to update in the material list
    const filteredMaterials = materialsRef.current.filter((material) =>
      materialsToUpdate.includes(material.name)
    );

    if (texture) {
      filteredMaterials.forEach((material) => {
        material.channels.AlbedoPBR.texture.uid = textureUid;
      });
    } else {
      filteredMaterials.forEach((material) => {
        material.channels.AlbedoPBR.color = colorCode;
      });
    }

    const promises = filteredMaterials.map((material) => {
      return setMaterial(material);
    });

    return await Promise.all(promises);
  };

  const createAnnotation = function (scenePosition, camera, title, text) {
    return new Promise((resolve, reject) => {
      console.log("your api instance is", apiInstance);
      apiInstance.createAnnotationFromScenePosition(
        scenePosition,
        camera.position,
        camera.target,
        title,
        text,
        function (err, index) {
          if (!err) {
            resolve(index);
          } else reject(new Error(err));
        }
      );
    });
  };

  const removeAllAnnotations = function () {
    return new Promise((resolve, reject) => {
      apiInstance.removeAllAnnotations(function (err) {
        if (!err) {
          console.log("Removed all annotations");
          resolve();
        } else reject("error removing annotations");
      });
    });
  };

  const removeAnnotation = function (idx) {
    return new Promise((resolve) => {
      apiInstance.removeAnnotation(idx, function (err) {
        if (!err) {
          console.log("Removed annotations", idx);
          resolve();
        } else resolve("error resolving annotation", err);
      });
    });
  };

  const showAnnotation = function (index) {
    return new Promise((resolve, reject) => {
      apiInstance.showAnnotation(index, function (err) {
        if (!err) {
          resolve(index);
        } else reject("could not show annotation", err);
      });
    });
  };

  const getAnnotations = function () {
    return new Promise((resolve, reject) => {
      apiInstance.getAnnotationList(function (err, annotations) {
        if (!err) {
          resolve(annotations);
        } else reject(new Error(err));
      });
    });
  };

  const hideAnnotation = function (index) {
    return new Promise((resolve) => {
      apiInstance.hideAnnotation(index, function (err) {
        if (!err) {
          resolve(index);
        } else resolve("error hiding annotation", err);
      });
    });
  };

  const gotoAnnotation = function (index) {
    return new Promise((resolve, reject) => {
      apiInstance.gotoAnnotation(index, {}, function (err) {
        if (!err) {
          resolve(index);
        } else {
          console.log("error going to annotation", err);
          reject(new Error(err));
        }
      });
    });
  };

  const setMaterial = function (material) {
    return new Promise((resolve, reject) => {
      apiInstance.setMaterial(material, function (err) {
        if (!err) {
          resolve(material);
        } else reject(new Error(err));
      });
    });
  };

  const [textureUids, setTextureUids] = useState([]);

  useEffect(() => {
    if (textureUids.length > 0) {
      console.log("in use effect with texture uids");
      textureUids.forEach((uid, idx) => {
        console.log("setting uid!", uid, idx);
        let returnValue = queryClientRef.current.setQueryData(
          [texturesRef.current[idx].key_name],
          uid
        );

        console.log("return value was", returnValue);
      });
      setTexturesAdded(true);
    }
  }, [textureUids]);

  const addTextures = async function () {
    const textureUids = await Promise.all(
      texturesRef.current.map((texture) => addTexture(apiInstance, texture))
    );

    setTextureUids(textureUids);

    console.log("texture uids are", textureUids);
    // set texture uids in query client
    console.log("loggined textures Ref", texturesRef);
    console.log("logging queryClientRef Ref", queryClientRef);
  };

  const addTexture = function (apiInstance, textureData) {
    return new Promise((resolve, reject) => {
      apiInstance.addTexture(textureData.thumbnail.url, (err, uid) => {
        if (!err) {
          console.log("added texture!", uid);
          resolve(uid);
        } else {
          console.log("error", err);
          reject(new Error(err));
        }
      });
    });
  };

  const showNode = async (apiInstance, node) => {
    return new Promise((resolve, reject) => {
      apiInstance.show(node.instanceID, function (err) {
        if (!err) {
          resolve({
            name: node.name,
            instanceID: node.instanceID,
            shown: true,
          });
        } else {
          reject(new Error(err));
        }
      });
    });
  };

  const hideNode = async (apiInstance, node) => {
    return new Promise((resolve, reject) => {
      apiInstance.hide(node.instanceID, function (err) {
        if (!err) {
          resolve({
            name: node.name,
            instanceID: node.instanceID,
            shown: false,
          });
        } else {
          reject(new Error(err));
        }
      });
    });
  };

  const setUserInteraction = function (enable) {
    console.log("calling set upser interaction", enable, apiInstance);
    return new Promise((resolve, reject) => {
      apiInstance.setUserInteraction(enable, function (err) {
        if (!err) {
          console.log("user interaction disabled");
          resolve(false);
        } else reject(new Error(err));
      });
    });
  };

  const setCameraLookAt = async function ({ position, target, duration = 2 }) {
    return new Promise((resolve, reject) => {
      apiInstance.setCameraLookAt(position, target, duration, function (err) {
        if (!err) {
          console.log("setting camera");
          resolve([position, target, duration]);
        } else {
          reject(new Error(err));
        }
      });
    });
  };

  return (
    <SketchFabContext.Provider
      value={{
        apiInstance,
        initSketchfabViewer,
        toggleNodes,
        readyForAction,
        modelLoaded,
        viewerReady,
        texturesAdded,
        updateMaterials,
        setCameraLookAt,
        getCameraLookAt,
        createAnnotation,
        gotoAnnotation,
        hideAnnotation,
        showAnnotation,
        removeAnnotation,
        removeAllAnnotations,
        getAnnotations,
        setUserInteraction,
        viewerStarted,
      }}
    >
      {children}
    </SketchFabContext.Provider>
  );
}
