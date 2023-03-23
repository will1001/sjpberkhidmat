import wilayahReducer from "./wilayahReducer";
import userReducer from "./userReducer";
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";
import popUpReducer from "./button/popUpReducer";
import artikelReducer from "./artikel/programReducer";
import editReducer from "./artikel/getIdArtikel";
import panelReducer from "./panelReducer";
import toolMobileReducer from "./toolMobileReducer";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const wilayah = persistReducer(persistConfig, wilayahReducer);
const user = persistReducer(persistConfig, userReducer);
const button = persistReducer(persistConfig, popUpReducer);
const artikel = persistReducer(persistConfig, artikelReducer);
const edit = persistReducer(persistConfig, editReducer);
const panel = persistReducer(persistConfig, panelReducer);
const toolMobile = persistReducer(persistConfig, toolMobileReducer);

export const store = configureStore({
  reducer: {
    wilayah,
    user,
    button,
    artikel,
    edit,
    panel,
    toolMobile,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
