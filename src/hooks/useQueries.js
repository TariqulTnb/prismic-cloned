import { useQuery, useQueries } from "@tanstack/react-query";

const filterNodesByNodeNamesArray = (nodes, nodeNames) => {
  const nodesArray = Object.values(nodes);

  return nodesArray.filter((node) => nodeNames.includes(node.name));
};

export const useListNodes = (apiInstance) => {
  const result = useQuery({
    queryKey: ["listNodes"],
    queryFn: () => {
      return listNodes(apiInstance);
    },
  });

  return result?.data;
};

const listNodes = function (instance) {
  return new Promise((resolve, reject) => {
    instance.getNodeMap(function (err, nodes) {
      if (!err) {
        resolve(nodes);
      } else reject(new Error(nodes));
    });
  });
};

const addTexture = function (apiInstance, textureData) {
  console.log("calling add texture");
  return new Promise((resolve, reject) => {
    apiInstance.addTexture(textureData.image.url, (err, uid) => {
      if (!err) {
        console.log("got it!", uid);
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
        resolve("shown");
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
        resolve("hidden");
      } else {
        reject(new Error(err));
      }
    });
  });
};

export const setUserInteraction = function (enable, apiInstance) {
  console.log("calling set upser interaction", enable);
  return new Promise((resolve, reject) => {
    apiInstance.setUserInteraction(enable, function (err) {
      if (!err) {
        console.log("user interaction disabled");
        resolve(false);
      } else reject(new Error(err));
    });
  });
};
const setCameraLookAt = async function ({
  position,
  target,
  duration,
  apiInstance,
}) {
  // window.console.log('setting look at with',{ position, target, duration } )
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

// give a list of nodes to hide and nodes to show
// check the values of the keys to see which ones need to be called

export const useSetCameraLookAt = ({
  position,
  target,
  duration,
  apiInstance,
}) => {
  return useQuery({
    queryKey: ["cameraLookAt"],
    queryFn: () => setCameraLookAt({ position, target, duration, apiInstance }),
  });
};

export const useUserInteraction = (enable, apiInstance) => {
  return useQuery({
    queryKey: ["userInteraction"],
    queryFn: () => setUserInteraction(enable, apiInstance),
  });
};

export const useToggleNodes = (
  apiInstance,
  modelNodes,
  nodesToHide,
  nodesToShow
) => {
  const hideNodeNamesArray = nodesToHide.map((nodeObj) => nodeObj.name);
  const filteredNodesToHide = filterNodesByNodeNamesArray(
    modelNodes,
    hideNodeNamesArray
  );

  const showNodeNamesArray = nodesToShow.map((nodeObj) => nodeObj.name);
  const filteredNodesToShow = filterNodesByNodeNamesArray(
    modelNodes,
    showNodeNamesArray
  );

  useQueries({
    queries: modelNodes
      ? filteredNodesToHide.map((node) => {
          return {
            queryKey: ["node", node.name, node.instanceID],
            queryFn: () => hideNode(apiInstance, node),
          };
        })
      : [],
  });

  useQueries({
    queries: modelNodes
      ? filteredNodesToShow.map((node) => {
          return {
            queryKey: ["node", node.name, node.instanceID],
            queryFn: () => showNode(apiInstance, node),
          };
        })
      : [],
  });
};

export const useAddTexture = (apiInstance, textureData) => {
  console.log("api", apiInstance);

  useQueries({
    queries: textureData.cabinets.map((texture) => {
      return {
        queryKey: ["cabinetTexture", texture.key_name],
        queryFn: () => addTexture(apiInstance, texture),
        retry: 5,
      };
    }),
  });

  useQueries({
    queries: textureData.floors.map((texture) => {
      return {
        queryKey: ["floorTexture", texture.key_name],
        queryFn: () => addTexture(apiInstance, texture),
        retry: 5,
      };
    }),
  });

  useQueries({
    queries: textureData.ceilings.map((texture) => {
      return {
        queryKey: ["ceilingTexture", texture.key_name],
        queryFn: () => addTexture(apiInstance, texture),
        retry: 5,
      };
    }),
  });

  useQueries({
    queries: textureData.seats.map((texture) => {
      return {
        queryKey: ["seatTexture", texture.key_name],
        queryFn: () => addTexture(apiInstance, texture),
        retry: 5,
      };
    }),
  });

  return;
};
