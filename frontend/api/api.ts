import axios from "axios";
export const baseUrl = "http://localhost:5000";
export const api = {
  header: () => {
    const header = {};
    return header;
  },
  getToken: (isPublic?: boolean) => {
    const token = localStorage.getItem("token");
    let headers = api.header();
    if (token) {
      const header = !isPublic
        ? {
            Authorization: `${token}`,
          }
        : {};
      headers = { ...headers, ...header };
      return headers;
    }
    return headers;
  },
  get: (url: string, isPublic?: boolean) => {
    const headers = api.getToken(isPublic);

    return new Promise((resolve, reject) => {
      axios
        .get(`${baseUrl}${url}`, {
          headers,
        })
        .then((res) => {
          if (res.status === 200) {
            resolve(res.data);
          }
        })
        .catch((err) => {
          if (axios.isCancel(err)) {
            reject(err);
          } else {
            reject(err);
          }
        });
    });
  },

  delete: (url: string) => {
    const headers = api.getToken();
    return new Promise((resolve, reject) => {
      axios
        .delete(`${baseUrl}${url}`, {
          headers,
        })
        .then((res) => {
          if (res.status === 200) {
            resolve(res.data);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  patch: (url: string, data: Record<string, any>) => {
    const headers = api.getToken();
    return new Promise((resolve, reject) => {
      axios
        .patch(`${baseUrl}${url}`, data, {
          headers,
        })
        .then((res) => {
          if (res.status === 200) {
            resolve(res.data);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  post: (url: string, data: Record<string, any>, isPublic?: boolean) => {
    const headers = api.getToken(isPublic);
    return new Promise((resolve, reject) => {
      axios
        .post(`${baseUrl}${url}`, data, {
          // headers: header ? header : headers,
          headers,
        })
        .then((res) => {
          if (res.status === 201 || res.status === 200) {
            resolve(res.data);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  put: (url: string, data: Record<string, any>) => {
    const headers = api.getToken();
    return new Promise((resolve, reject) => {
      axios
        .put(`${baseUrl}${url}`, data, {
          headers,
        })
        .then((res) => {
          if (res.status === 200) {
            resolve(res.data);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};
