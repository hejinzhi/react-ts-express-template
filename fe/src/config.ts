let host = 'https://cgo-feedback-server.fosun.com/api';
if (window.location.href.includes('localhost') || window.location.href.includes('127.0.0.1')) {
  host = 'http://localhost:8080/api';
} else if (window.location.href.includes('uat.fosun')) {
  host = 'https://cgo-feedback-server.uat.fosun.com/api';
} else {
  host = 'https://cgo-feedback-server.fosun.com/api';
}

// host = 'https://cgo-feedback-server.uat.fosun.com/api';
host = 'http://localhost:8080/api';
const baseUrl = host;

export { baseUrl };
