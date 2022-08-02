import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";

const appId = "4f972959772e4611ad2d7e64998a3b1e";
const token =
"0064f972959772e4611ad2d7e64998a3b1eIACCT2o5coIZgxAmzpHvycReUGcXtxC2DoREn2aalqZYNZv/YjcAAAAAEABUJOp9j7ToYgEAAQCPtOhi";
export const config = { mode: "live", codec: "vp8", appId: appId, token: token};
export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
export const channelName = "bbc";
