import { NormalizedConfig } from "@/symbols";

/**
 * @public
 */
declare type HttpMethod =
  | AnyCase<"get">
  | AnyCase<"post">
  | AnyCase<"put">
  | AnyCase<"patch">
  | AnyCase<"delete">;

/**
 * @public
 */
declare type HttpConfig<Args> = Partial<{
  url: string | Expression<Args, string>;
  method: HttpMethod;
  headers: Record<string, unknown> | Headers | Expression<Args, Record<string, unknown> | Headers>;
  params:
    | Record<string, unknown>
    | URLSearchParams
    | Expression<Args, Record<string, unknown> | URLSearchParams>;
  body: Record<string, unknown> | FormData | Expression<Args, Record<string, unknown> | FormData>;
  [NormalizedConfig]: HttpConfigNormalized<Args>;
}>;

/**
 * @private
 */
declare type HttpConfigNormalized<Args> = {
  url: Expression<Args, string>;
  method?: HttpMethod;
  headers: Expression<Args, Record<string, unknown> | Headers>;
  params: Expression<Args, Record<string, unknown> | URLSearchParams>;
  body: Expression<Args, Record<string, unknown> | FormData>;
};

/**
 * @public
 */
declare type HttpContext = {
  url: string;
  method: HttpMethod;
  headers: Headers;
  params: URLSearchParams;
  body: Record<string, unknown> | FormData;
};

/**
 * @public
 */
declare type HttpConfigSource<Args = unknown> = Iterable<HttpConfigOrSource<Args>>;

/**
 * @public
 */
declare type HttpConfigSourceNormalized<Args = unknown> = Array<
  HttpConfigNormalized<Args> | HttpConfigSourceNormalized<Args>
>;

/**
 * @public
 */
declare type HttpConfigOrSource<Args> = HttpConfig<Args> | HttpConfigSource<Args>;
