type ResponseType = {
  success: boolean;
  data: unknown;
};

export const checkResponse = (res: Response): ResponseType | Promise<any> => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};
