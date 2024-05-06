type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
interface RequestOptions {
  data?: unknown;
}

const BASE_URL = 'https://api.flolite.in';
const defaultHeaders = {
  'Content-Type': 'application/json',
};

const getAccessToken = (): string => {
  return 'eyJraWQiOiJScUowUFd5XC92dGczSXhZY0I2NmJzZnVGWFIwXC9CVzlTeXRPWFwvZ3lqUTk4PSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJlZDJhNDY5ZC05NWE3LTQ5OTMtYTliYi01YWZjOTMyMTJlM2YiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuYXAtc291dGgtMS5hbWF6b25hd3MuY29tXC9hcC1zb3V0aC0xX3hvenJqUXJSdiIsImNsaWVudF9pZCI6IjNnMW9ucHEyNzcwanYxYmp2dTI4NWlpYjJnIiwib3JpZ2luX2p0aSI6ImQzNDQ4ZTA1LTI1MWQtNDljNi04NWFlLTg2YmU4NTRmY2U3ZCIsImV2ZW50X2lkIjoiYjJhYWYyNDgtMDI4MC00N2RiLTlkMDUtMmE0YzE2YzU2OGVmIiwidG9rZW5fdXNlIjoiYWNjZXNzIiwic2NvcGUiOiJhd3MuY29nbml0by5zaWduaW4udXNlci5hZG1pbiIsImF1dGhfdGltZSI6MTcxMjgxOTA1NiwiZXhwIjoxNzE1MDIzNTUzLCJpYXQiOjE3MTQ5MzcxNTMsImp0aSI6IjY3YzA0ZjhlLTU2ODQtNGVhNy05ZjE5LTg3Mzk2ODBhZTYyMCIsInVzZXJuYW1lIjoiZWQyYTQ2OWQtOTVhNy00OTkzLWE5YmItNWFmYzkzMjEyZTNmIn0.oh31jvBrb6-GC62daF19wgurkl8kac6QeE7DmtEqwJQ9gVLmvz1CJDRY6QekVPxocblMcVgw5OlRZdyQxfXvH2YIWUi5SmLnTttl-GSmJYfGKwNx3jDa0QZVi00xrrYTASQI3n8zhr9SX6Qem5tCN_embYxPtRCIQVteoE-hnZtc8dmQ8NjW7AccFRaSz0gjMm6tRi5M4JkZZOjoncwZ-Gu61EWw5vrcOgShb7FprGxwMYZafV4mdXXjIiJamooQNp52zIshqSF8HdQIbIKe7MsIyRDAobEnh9K6IIfc3eFNImg3LtybMGYZmnEF6etw1smalCDd1lIINvvYq73vSQ';
};

export const request = async (
  method: RequestMethod,
  url: string,
  options: RequestOptions = {}
): Promise<any> => {
  const input = `${BASE_URL}${url}`;
  const headers = { ...defaultHeaders, Authorization: `Bearer ${getAccessToken()}` };
  const body = method === 'GET' ? undefined : JSON.stringify(options.data);

  console.log(`API request: ${method} ${input} ${body}`);

  try {
    const response = await fetch(input, { method, headers, body });

    if (!response.ok) {
      throw new Error(`API request failed with status: ${response.status}`);
    }

    const json = await response.json();

    if (json === null || typeof json !== 'object') {
      throw new Error('API request failed: json is null or not an object');
    }

    return json;
  } catch (error) {
    throw new Error(`API request failed: ${error}`);
  }
};

export default {
  get: (url: string, options?: RequestOptions) => request('GET', url, options),
  post: (url: string, options?: RequestOptions) => request('POST', url, options),
  put: (url: string, options?: RequestOptions) => request('PUT', url, options),
  delete: (url: string, options?: RequestOptions) => request('DELETE', url, options),
};
