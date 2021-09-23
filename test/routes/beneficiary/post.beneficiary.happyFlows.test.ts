import "jest";
import * as request from "supertest";
import "jest";
import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  test,
} from "@jest/globals";
import { createToken, serviceUrl, beneficiaryBody } from "../../util";
/*
 * Module
 */
let accessToken: string;
let beneficiaryBodies: any;
beforeAll(async (): Promise<void> => {
  accessToken = await createToken();
  beneficiaryBodies = beneficiaryBody();
});

describe("post beneficiary endpoint tests", () => {
  describe("post benficiary Happy Flows", () => {
    describe("post benficiary Happy Flows with Payment_methods = Local", () => {
      test("create benficiary account with country_code=US", async () => {
        let body = beneficiaryBody();
        body.beneficiary.bank_details.bank_country_code = "US";
        body.payment_methods = ["LOCAL"];

        const response = await request(serviceUrl)
          .post(`/beneficiaries/create`)
          .set("Content-Type", "application/json")
          .set("Authorization", `Bearer ${accessToken}`)
          .send(beneficiaryBodies)
          .expect(201);

        expect(response.headers).toHaveProperty("correlation-id");
        expect(response.headers).toHaveProperty("x-awx-trace-id");

        expect(response.body.beneficiary_id).toBeTruthy();
        expect(response.body.beneficiary.additional_info).toEqual(
          beneficiaryBodies.beneficiary.additional_info
        );
        expect(response.body.beneficiary.address).toEqual(
          beneficiaryBodies.beneficiary.address
        );
        expect(response.body.beneficiary.bank_details).toEqual(
          beneficiaryBodies.beneficiary.bank_details
        );
        expect(response.body.beneficiary.company_name).toEqual(
          beneficiaryBodies.beneficiary.company_name
        );
        expect(response.body.beneficiary.entity_type).toEqual(
          beneficiaryBodies.beneficiary.entity_type
        );
        expect(response.body.payer_entity_type).toBeTruthy();
        expect(response.body.payment_methods).toEqual(
          beneficiaryBodies.payment_methods
        );
      });

      test("create benficiary account with country_code=AU", async () => {
        let body = beneficiaryBody();
        body.beneficiary.bank_details.bank_country_code = "AU";
        body.payment_methods = ["LOCAL"];

        const response = await request(serviceUrl)
          .post(`/beneficiaries/create`)
          .set("Content-Type", "application/json")
          .set("Authorization", `Bearer ${accessToken}`)
          .send(beneficiaryBodies)
          .expect(201);

        expect(response.headers).toHaveProperty("correlation-id");
        expect(response.headers).toHaveProperty("x-awx-trace-id");

        expect(response.body.beneficiary_id).toBeTruthy();
        expect(response.body.beneficiary.additional_info).toEqual(
          beneficiaryBodies.beneficiary.additional_info
        );
        expect(response.body.beneficiary.address).toEqual(
          beneficiaryBodies.beneficiary.address
        );
        expect(response.body.beneficiary.bank_details).toEqual(
          beneficiaryBodies.beneficiary.bank_details
        );
        expect(response.body.beneficiary.company_name).toEqual(
          beneficiaryBodies.beneficiary.company_name
        );
        expect(response.body.beneficiary.entity_type).toEqual(
          beneficiaryBodies.beneficiary.entity_type
        );
        expect(response.body.payer_entity_type).toBeTruthy();
        expect(response.body.payment_methods).toEqual(
          beneficiaryBodies.payment_methods
        );
      });

      test("create benficiary account with country_code=CN", async () => {
        let body = beneficiaryBody();
        body.beneficiary.bank_details.bank_country_code = "CN";
        body.payment_methods = ["LOCAL"];

        const response = await request(serviceUrl)
          .post(`/beneficiaries/create`)
          .set("Content-Type", "application/json")
          .set("Authorization", `Bearer ${accessToken}`)
          .send(beneficiaryBodies)
          .expect(201);

        expect(response.headers).toHaveProperty("correlation-id");
        expect(response.headers).toHaveProperty("x-awx-trace-id");

        expect(response.body.beneficiary_id).toBeTruthy();
        expect(response.body.beneficiary.additional_info).toEqual(
          beneficiaryBodies.beneficiary.additional_info
        );
        expect(response.body.beneficiary.address).toEqual(
          beneficiaryBodies.beneficiary.address
        );
        expect(response.body.beneficiary.bank_details).toEqual(
          beneficiaryBodies.beneficiary.bank_details
        );
        expect(response.body.beneficiary.company_name).toEqual(
          beneficiaryBodies.beneficiary.company_name
        );
        expect(response.body.beneficiary.entity_type).toEqual(
          beneficiaryBodies.beneficiary.entity_type
        );
        expect(response.body.payer_entity_type).toBeTruthy();
        expect(response.body.payment_methods).toEqual(
          beneficiaryBodies.payment_methods
        );
      });
    });
    describe("post benficiary Happy Flows with Payment_methods =SWIFT", () => {
      test("create benficiary account with country_code=US", async () => {
        let body = beneficiaryBody();
        body.beneficiary.bank_details.bank_country_code = "US";
        body.payment_methods = ["SWIFT"];

        const response = await request(serviceUrl)
          .post(`/beneficiaries/create`)
          .set("Content-Type", "application/json")
          .set("Authorization", `Bearer ${accessToken}`)
          .send(beneficiaryBodies)
          .expect(201);

        expect(response.headers).toHaveProperty("correlation-id");
        expect(response.headers).toHaveProperty("x-awx-trace-id");

        expect(response.body.beneficiary_id).toBeTruthy();
        expect(response.body.beneficiary.additional_info).toEqual(
          beneficiaryBodies.beneficiary.additional_info
        );
        expect(response.body.beneficiary.address).toEqual(
          beneficiaryBodies.beneficiary.address
        );
        expect(response.body.beneficiary.bank_details).toEqual(
          beneficiaryBodies.beneficiary.bank_details
        );
        expect(response.body.beneficiary.company_name).toEqual(
          beneficiaryBodies.beneficiary.company_name
        );
        expect(response.body.beneficiary.entity_type).toEqual(
          beneficiaryBodies.beneficiary.entity_type
        );
        expect(response.body.payer_entity_type).toBeTruthy();
        expect(response.body.payment_methods).toBeTruthy();
      });

      test("create benficiary account with country_code=CN & bank_country_code is 8 characters", async () => {
        let body = beneficiaryBody();
        body.beneficiary.bank_details.bank_country_code = "CN";
        body.payment_methods = ["SWIFT"];
        body.beneficiary.bank_details.swift_code = "ANZBCN3M";
        const response = await request(serviceUrl)
          .post(`/beneficiaries/create`)
          .set("Content-Type", "application/json")
          .set("Authorization", `Bearer ${accessToken}`)
          .send(beneficiaryBodies)
          .expect(201);

        expect(response.headers).toHaveProperty("correlation-id");
        expect(response.headers).toHaveProperty("x-awx-trace-id");

        expect(response.body.beneficiary_id).toBeTruthy();
        expect(response.body.beneficiary.additional_info).toEqual(
          beneficiaryBodies.beneficiary.additional_info
        );

        expect(
          Object.keys(body.beneficiary.bank_details.swift_code).length
        ).toEqual(8);

        expect(
          body.beneficiary.bank_details.swift_code.charAt(4) +
            body.beneficiary.bank_details.swift_code.charAt(5)
        ).toEqual(body.beneficiary.bank_details.bank_country_code);

        expect(response.body.beneficiary.address).toEqual(
          beneficiaryBodies.beneficiary.address
        );
        expect(response.body.beneficiary.bank_details).toEqual(
          beneficiaryBodies.beneficiary.bank_details
        );
        expect(response.body.beneficiary.company_name).toEqual(
          beneficiaryBodies.beneficiary.company_name
        );
        expect(response.body.beneficiary.entity_type).toEqual(
          beneficiaryBodies.beneficiary.entity_type
        );
        expect(response.body.payer_entity_type).toBeTruthy();
        expect(response.body.payment_methods).toBeTruthy();
      });

      test("create benficiary account with country_code=AU & bank_country_code is 8 characters", async () => {
        let body = beneficiaryBody();
        body.beneficiary.bank_details.bank_country_code = "AU";
        body.payment_methods = ["SWIFT"];
        body.beneficiary.bank_details.swift_code = "ANZBAU3MPOA";
        const response = await request(serviceUrl)
          .post(`/beneficiaries/create`)
          .set("Content-Type", "application/json")
          .set("Authorization", `Bearer ${accessToken}`)
          .send(beneficiaryBodies)
          .expect(201);

        expect(response.headers).toHaveProperty("correlation-id");
        expect(response.headers).toHaveProperty("x-awx-trace-id");

        expect(response.body.beneficiary_id).toBeTruthy();
        expect(response.body.beneficiary.additional_info).toEqual(
          beneficiaryBodies.beneficiary.additional_info
        );
        expect(
          Object.keys(body.beneficiary.bank_details.swift_code).length
        ).toEqual(11);

        expect(
          body.beneficiary.bank_details.swift_code.charAt(4) +
            body.beneficiary.bank_details.swift_code.charAt(5)
        ).toEqual(body.beneficiary.bank_details.bank_country_code);
        
        
        expect(response.body.beneficiary.address).toEqual(
          beneficiaryBodies.beneficiary.address
        );
        expect(response.body.beneficiary.bank_details).toEqual(
          beneficiaryBodies.beneficiary.bank_details
        );
        expect(response.body.beneficiary.company_name).toEqual(
          beneficiaryBodies.beneficiary.company_name
        );
        expect(response.body.beneficiary.entity_type).toEqual(
          beneficiaryBodies.beneficiary.entity_type
        );
        expect(response.body.payer_entity_type).toBeTruthy();
        expect(response.body.payment_methods).toBeTruthy();
      });
    });
  });
});
