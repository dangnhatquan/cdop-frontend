import { IContact, Maybe, TLocale } from "@models/common";
import { axiosInstance } from "@providers/utils/strapiAxios";
import { contactResource } from "@resources";
import { LANGUAGE_MAPPING_STRAPI } from "@utils/constants";
import { get } from "lodash";
import qs from "qs";

export const getContact = async ({ queryLocale }: { queryLocale?: TLocale }) => {
    try {
        const locale = LANGUAGE_MAPPING_STRAPI[queryLocale ?? "vi"];
        const populate = "*"

        const query = {
            locale,
            populate,
        };

        const response: Maybe<{
            data: { data: IContact };
        }> = await axiosInstance.get(
            `/api/${contactResource}?${qs.stringify(query, {
                encode: false,
            })}`
        );

        return get(response, "data.data");
    } catch (_) {
        return undefined;
    }
};
