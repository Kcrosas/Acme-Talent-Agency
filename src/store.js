import { createStore } from "redux";

const initState = {
  //List all clients
  clients: [],
  //List all skills
  skills: [],
  //List all connections between a skill and a client
  connections: [],
};

const store = createStore((state = initState, action) => {
  if (action.type === "FIRST_LOAD") {
    state = {
      //Line not needed because we're replacing the entire state either way but it's good to leave for best practice
      ...state,
      //Should receive an object that looks like {client, skills, connections}
      clients: action.clients,
      skills: action.skills,
      connections: action.connections,
    };
  }
  return state;
});

export default store;
