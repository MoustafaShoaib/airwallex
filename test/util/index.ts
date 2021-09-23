/*
 * Module dependencies
 */
import * as request from "supertest";

const serviceUrl = `${process.env.serviceUrl}`;

const createToken = async () => {
  return request(serviceUrl)
    .post(`/authentication/login`)
    .set("Content-Type", "application/json")
    .set("x-client-id", "KJbr_Xs5TLmhY03JWSi3NQ")
    .set(
      "x-api-key",
      "2308e2dd300f6b959b7f4e0a52ba9181186fc92f075f7e64ee9fa0b6b1ada094c39c9a9f39f06693d06b17067f78d4e7"
    )
    .send()
    .expect(201)
    .then((response: any) => {
      const tokenResponse = JSON.parse(response.res.text);
      const token = tokenResponse.token;
      return token;
    });
};
export { createToken, serviceUrl };
export * from "../util/schemas/beneficiary.schema";
