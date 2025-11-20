import { Maybe, TLocale } from "@models/common";
import { IContactUs } from "@models/contact";
import { axiosInstance } from "@providers/utils/strapiAxios";
import { contactUsResource, galleryResource } from "@resources";
import { LANGUAGE_MAPPING_STRAPI } from "@utils/constants";
import { get } from "lodash";
import qs from "qs";

export const getContactUs = async ({ queryLocale }: { queryLocale?: TLocale }) => {
    try {
        const locale = LANGUAGE_MAPPING_STRAPI[queryLocale ?? "vi"];
        const populate = {
            hero: {
                populate: {
                    media: {
                        populate: "*",
                    },
                },
            },
            contactImage: {
                populate: "*"
            },
            block: {
                populate: "*"
            },
            posts: {
                populate: "*"
            }
        };

        const query = {
            locale,
            populate,
        };

        const response: Maybe<{
            data: { data: IContactUs };
        }> = await axiosInstance.get(
            `/api/${contactUsResource}?${qs.stringify(query, {
                encode: false,
            })}`
        );

        return get(response, "data.data");
    } catch (_) {
        return undefined;
    }
};
