type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
interface RequestOptions {
  data?: unknown;
}

const BASE_URL = 'http://localhost:8000/api';
const defaultHeaders = {
  'Content-Type': 'application/json',
};

const getAccessToken = (): string => {
  return 'eyJraWQiOiJScUowUFd5XC92dGczSXhZY0I2NmJzZnVGWFIwXC9CVzlTeXRPWFwvZ3lqUTk4PSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJlZDJhNDY5ZC05NWE3LTQ5OTMtYTliYi01YWZjOTMyMTJlM2YiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuYXAtc291dGgtMS5hbWF6b25hd3MuY29tXC9hcC1zb3V0aC0xX3hvenJqUXJSdiIsImNsaWVudF9pZCI6IjNnMW9ucHEyNzcwanYxYmp2dTI4NWlpYjJnIiwib3JpZ2luX2p0aSI6ImQzNDQ4ZTA1LTI1MWQtNDljNi04NWFlLTg2YmU4NTRmY2U3ZCIsImV2ZW50X2lkIjoiYjJhYWYyNDgtMDI4MC00N2RiLTlkMDUtMmE0YzE2YzU2OGVmIiwidG9rZW5fdXNlIjoiYWNjZXNzIiwic2NvcGUiOiJhd3MuY29nbml0by5zaWduaW4udXNlci5hZG1pbiIsImF1dGhfdGltZSI6MTcxMjgxOTA1NiwiZXhwIjoxNzEzNzEzMjc5LCJpYXQiOjE3MTM2MjY4NzksImp0aSI6IjQyNTI5MmY4LThjZmItNGJmNy05MTBmLWE4N2JlOTZiMDU4YiIsInVzZXJuYW1lIjoiZWQyYTQ2OWQtOTVhNy00OTkzLWE5YmItNWFmYzkzMjEyZTNmIn0.VQhGp7ySOecitbG3KcDFLX89sY_h5sNpyEhKXKn-3IELUVqsPK2nZw1JGDgdj4skJnEfibCSoEG3nbG9DagqN66fsB4I0l1mQckKh_68Hm356to2un1CxhSZKrwQAU1crGL8utToRTKqENSAYuaFlU3IaJP4yKXp9ORGYNjtNT6jM-9k8eTQ31m0a1Lxm340NFps-NCg7WM_RRUL8POdrlOFlB_bJawYRwbHJ_6e9YjUQZsj9pJ9sd6SXae-SiwHC0hsfLM1O_W8UeF1Xq1wjS_wA4FMm8NlA1qKePHZOtuaspximFG8g7PIs2cVFv7kY5j7o0GJ25zudV48sfO-ng';
};

const request = async <T = unknown>(
  method: RequestMethod,
  url: string,
  options: RequestOptions = {}
): Promise<T> => {
  const input = `${BASE_URL}${url}`;
  const headers = { ...defaultHeaders, Authorization: `Bearer ${getAccessToken()}` };
  const body = method === 'GET' ? undefined : JSON.stringify(options.data);
  
  try {
    const response = await fetch(input, {
      method,
      headers,
      body,
    });

    if (!response.ok) {
      throw new Error(`API request failed with status: ${response.status}`);
    }

    const json = await response.json();

    if (json === null || json === undefined) {
      throw new Error('API request failed: json is null or undefined');
    }

    return json;
  } catch (error) {
    throw new Error(`API request failed: ${error}`);
  }
};

export default {
  get: <T>(url: string, options?: RequestOptions) => request<T>('GET', url, options),
  post: <T>(url: string, options?: RequestOptions) => request<T>('POST', url, options),
  put: <T>(url: string, options?: RequestOptions) => request<T>('PUT', url, options),
  delete: <T>(url: string, options?: RequestOptions) => request<T>('DELETE', url, options),
};
