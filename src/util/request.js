export const AUTH_SERVICE = "http://localhost:8080";
export const CHAT_SERVICE = "http://localhost:8080";

export const request = (options) => {
  const headers = new Headers();

  if (options.headers) {
    headers.append("Content-Type", options.headers["Content-Type"]);
  } else {
    headers.append("Content-Type", "application/json");
  }

  if (localStorage.getItem("accessToken")) {
    headers.append(
      "Authorization",
      "Bearer " + localStorage.getItem("accessToken")
    );
  }

  const defaults = { headers: headers };
  console.log(options)
  options = Object.assign({}, defaults, options);
  console.log(options)

  return fetch(options.url, options).then((response) =>
    response.json().then((json) => {
      if (!response.ok) {
        return Promise.reject(json);
      }
      return json;
    })
  );
};