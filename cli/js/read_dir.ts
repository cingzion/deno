// Copyright 2018-2020 the Deno authors. All rights reserved. MIT license.
import { sendSync, sendAsync } from "./ops/dispatch_json.ts";
import { FileInfo, FileInfoImpl } from "./file_info.ts";
import { StatResponse } from "./stat.ts";

interface ReadDirResponse {
  entries: StatResponse[];
}

function res(response: ReadDirResponse): FileInfo[] {
  return response.entries.map(
    (statRes: StatResponse): FileInfo => {
      return new FileInfoImpl(statRes);
    }
  );
}

/** Synchronously reads the directory given by `path` and returns an array of
 * `Deno.FileInfo`.
 *
 *       const files = Deno.readdirSync("/");
 *
 * Requires `allow-read` permission. */
export function readdirSync(path: string): FileInfo[] {
  return res(sendSync("op_read_dir", { path }));
}

/** UNSTABLE: Maybe need to return an `AsyncIterable`.
 *
 * Reads the directory given by `path` and resolves to an array of `Deno.FileInfo`.
 *
 *       const files = await Deno.readdir("/");
 *
 * Requires `allow-read` permission. */
export async function readdir(path: string): Promise<FileInfo[]> {
  return res(await sendAsync("op_read_dir", { path }));
}
