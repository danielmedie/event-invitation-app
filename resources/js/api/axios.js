/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

import axios from 'axios';

class AxiosWrapper {

	constructor() {
        this.instance = axios.create({
			withCredentials: true,
			baseURL: import.meta.env.VITE_APP_URL
		});

		// Set Helpers
		this.instance.setBearerToken = this.setBearerToken.bind(this);
		this.instance.deleteBearerToken = this.deleteBearerToken.bind(this);
		this.instance.setCsrfToken = this.setCsrfToken.bind(this);

		return this
			.defaultHeaders()
			.requestInterceptor()
			.responseInterceptor()
			.instance;
	}
	
    /**
     * Set Default Headers
     */
	defaultHeaders() {
		this.setBearerOrCsrfToken()

		this.instance.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
		this.instance.defaults.headers.common['Accept'] = 'application/json'
		this.instance.defaults.headers.post['Content-Type'] = 'multipart/form-data';
		
        return this;
	}
	
    /**
     * Perform a task before the request is sent
     */
	requestInterceptor() {
		this.instance.interceptors.request.use(
			config => config,
			error => Promise.reject(error)
		);
        return this;
	}
	
    /**
     * Perform a task after the response is received
     */
	responseInterceptor() {
		this.instance.interceptors.response.use(
			response => response,
			error => {
				if (error.response && 419 === error.response.status) {
					window.location.reload();
				}
				return Promise.reject(error)
			}
		);
        return this;
	}

	/**
     * Set Bearer or CSRF Token
     */
	setBearerOrCsrfToken() { 
		this.setBearerToken()
		if (!this.getBearerToken()) {
			this.setCsrfToken()
		}
	}

	/**
     * Set Bearer Token
     */
	setBearerToken(token) {
		if (!token) {
			token = window.localStorage.getItem('user_token') || ''
		}
		if (!token) { return }
		window.localStorage.setItem('user_token', token)
		this.instance.defaults.headers.common['Authorization'] = 'Bearer ' + token
	}

	/**
     * Get Bearer Token
     */
	getBearerToken() { 
		return this.instance.defaults.headers.common['Authorization'] || null;
	}

	/**
     * Delete Bearer Token
     */
	deleteBearerToken() {
		window.localStorage.removeItem('user_token')
		this.instance.defaults.headers.common['Authorization'] = undefined
	}

	/**
     * Set CSRF Token
     */
	setCsrfToken() {
		let token = document.head.querySelector('meta[name="csrf-token"]') || this.getCookie('XSRF-TOKEN');
		if (token) {
			this.instance.defaults.headers.common['X-XSRF-TOKEN'] = decodeURI(token.content);
		}
	}

	/**
     * Get CSRF Token
     */
	getCsrfToken() { 
		return this.instance.defaults.headers.common['X-XSRF-TOKEN'] || null;
	}

	/**
     * Get Cookie
     */
	getCookie (name) {
		var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
		if (match) return match[2];
	}

}

window.api = () => new AxiosWrapper;