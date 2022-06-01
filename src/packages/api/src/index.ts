import { makeApi } from "./api";

const api = makeApi();

api.listen(80, function () {
  console.log(`Listening on port: 80`);
});
