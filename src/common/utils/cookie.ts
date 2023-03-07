import { Cookies } from 'react-cookie';

const cookie = new Cookies();

export const setCookie = (name: string, value: string, options?: any) => {
	return cookie.set(name, value, { ...options });
};

export const getCookie = (name: string) => {
	return cookie.get(name);
};
export const removeCookie = (name: string) => {
	return cookie.remove(name);
};

//쿠키 값 가져오는 함수
export function BrowserGetCookie(key: string) {
	const value = document.cookie.match(`(^|;) ?${key}=([^;]*)(;|$)`);
	return value ? value[2] : null;
}

// 쿠키 삭제하는 함수
export function BrowserDelCookie(key) {
	document.cookie = `${encodeURIComponent(
		key,
	)}=; expires=Thu, 01 JAN 1999 00:00:10 GMT`;
}
