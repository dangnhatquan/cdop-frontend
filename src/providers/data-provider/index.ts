import { API_BASE_URL } from "@/api";
import { axiosInstance } from "@providers/utils/axiosInstance";
import { DataProvider, LogicalFilter } from "@refinedev/core";

export const coreDataProvider: DataProvider = {
  getList: async ({ resource, pagination, sorters, filters }) => {
    const { current = 1, pageSize = 20 } = pagination ?? {};
    const { field, order } = sorters?.[0] ?? {};

    const params: Record<string, any> = {
      page: current,
      limit: pageSize,
    };

    if (field) params.sort_by = field;
    if (order) params.sort_dir = order.toLowerCase();

    filters?.forEach((filter) => {
      if ((filter as LogicalFilter).field) {
        const f = filter as LogicalFilter;
        if (f.value !== undefined) {
          params[f.field] = f.value;
        }
      }
    });

    const response = await axiosInstance.get(`/${resource}`, {
      params,
    });

    return {
      data: response.data,
      total: response.data?.length,
    };
  },

  getOne: async ({ resource, id }) => {
    const response = await axiosInstance.get(`/${resource}/${id}`);
    return {
      data: response.data,
    };
  },

  create: async ({ resource, variables }) => {
    const response = await axiosInstance.post(`/${resource}`, variables);
    return {
      data: response.data,
    };
  },

  update: async ({ resource, id, variables }) => {
    const response = await axiosInstance.put(`/${resource}/${id}`, variables);
    return {
      data: response.data,
    };
  },

  deleteOne: async ({ resource, id }) => {
    const response = await axiosInstance.delete(`/${resource}/${id}`);
    return {
      data: response.data,
    };
  },

  getApiUrl: function (): string {
    return API_BASE_URL;
  },
  custom: async ({ url, method, headers, payload }) => {
    const response = await axiosInstance.request({
      url: url,
      method,
      headers,
      data: payload,
    });
    return {
      data: response.data,
    };
  },
};
