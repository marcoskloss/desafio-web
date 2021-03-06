/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import http from 'http';

async function doRequest(url: string, body?: any, opts?: any): Promise<any> {
  const route = `http://localhost:${process.env.PORT}${url}`;
  const bodyData = JSON.stringify(body);

  const { headers, ...restOpts } = opts;

  const options = {
    ...restOpts,
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': body ? Buffer.byteLength(bodyData) : 0,
      ...headers,
    },
  };

  return new Promise((resolve) => {
    const request = http.request(route, options, async (res) => {
      const chunks: string[] = [];

      res.on('data', (chunk) => chunks.push(chunk));

      res.on('end', () => {
        const response = chunks.length ? JSON.parse(chunks.join('')) : null;
        resolve({ data: response, status: res.statusCode });
      });
    });

    request.write(bodyData);
    request.end();
  });
}

enum Methods {
  post = 'POST',
  get = 'GET',
  put = 'PUT',
  delete = 'DELETE',
}

export { doRequest, Methods };
