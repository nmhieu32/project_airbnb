
import axios from "axios";

interface CountryResponse {
  error: boolean;
  msg: string;
  data: { name: string; iso2: string; iso3: string }[];
}

interface StateResponse {
  error: boolean;
  msg: string;
  data: {
    name: string;
    iso2: string;
    iso3: string;
    states: { name: string; state_code: string }[];
  };
}

// Lấy danh sách quốc gia
export const getCountriesApi = async (): Promise<string[]> => {
  try {
    const res = await axios.get<CountryResponse>(
      "https://countriesnow.space/api/v0.1/countries/positions"
    );
    return res.data.data.map((c) => c.name);
  } catch (error) {
    console.log("❌ ~ getCountriesApi error:", error);
    return [];
  }
};

// Lấy danh sách tỉnh/thành theo quốc gia
export const getStatesByCountryApi = async (
  country: string
): Promise<string[]> => {
  try {
    const res = await axios.post<StateResponse>(
      "https://countriesnow.space/api/v0.1/countries/states",
      { country }
    );
    return res.data.data.states.map((s) => s.name);
  } catch (error) {
    console.log("❌ ~ getStatesByCountryApi error:", error);
    return [];
  }
};