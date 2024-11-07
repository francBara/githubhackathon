import {
	useEffect,
	useState,
	lazy,
	Suspense,
	createContext,
	useReducer,
} from "react";

export const ReducerContext = createContext();

export function rootReducer(state, action) {
	if (action.type === "show_sidebar_phone") {
		return { ...state, showSidebarPhone: true };
	} else if (action.type === "hide_sidebar_phone") {
		return { ...state, showSidebarPhone: false };
	} 
}

export const initialState = {
    showSidebarPhone: true,
	codiceBenvenutoValido: false,
};