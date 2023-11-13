import { ColorId, SearchOrderBy, createApi } from 'unsplash-js';
import { ApiResponse } from 'unsplash-js/dist/helpers/response';
import { Photos } from 'unsplash-js/dist/methods/search/types/response';

export type Photo = {
  id: number;
  width: number;
  height: number;
  urls: { large: string; regular: string; raw: string; small: string };
  color: string | null;
  user: {
    username: string;
    name: string;
  };
  alt_description: string;
};

export const colorOptions: Record<ColorId | 'none', string> = {
  white: 'White',
  black: 'Black',
  yellow: 'Yellow',
  orange: 'Orange',
  red: 'Red',
  purple: 'Purple',
  magenta: 'Magenta',
  green: 'Green',
  teal: 'Teal',
  blue: 'Blue',
  black_and_white: 'Black and White',
  none: 'None',
};

const unsplash = createApi({
  accessKey: 'ukJyK7f_oSD8sRs6GytnZxaxCnv8XCiFi05QKrF_BeQ',
});

export const getPhotos = ({
  color,
  query,
  orderBy,
  page = 1,
}: {
  query: string;
  orderBy: SearchOrderBy;
  color?: ColorId;
  page?: number;
}): Promise<ApiResponse<Photos>> => {
  return unsplash.search.getPhotos({
    color,
    query,
    page,
    orderBy,
  });
};
