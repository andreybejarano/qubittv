export default function request(url, options = {}) {
  if (typeof fetch !== 'undefined') {
    options = {
      ...options,
      headers: {
        'Content-Type': 'application/json'
      }
    };
    return new Promise((resolve, reject) => {
      fetch(url, options)
        .then(res => res.json())
        .catch(error => reject(error))
        .then(response => resolve(response));
    });
  }
}
