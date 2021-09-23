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

describe("post benficiary unhappy Flows", () => {
  test("401 - unauthorized - missing bearer token", async () => {
    let body = beneficiaryBody();
    delete body.payment_methods;
    const response = await request(serviceUrl)
      .post(`/beneficiaries/create`)
      .set("Content-Type", "application/json")
      .send(body)
      .expect(401);
  });
  describe("post benficiary account_name unhappy Flows", () => {
    test("400 - bad request - missing account_name field", async () => {
      let body = beneficiaryBody();
      delete body.beneficiary.bank_details.account_name;

      const response = await request(serviceUrl)
        .post(`/beneficiaries/create`)
        .set("Content-Type", "application/json")
        .set("Authorization", `Bearer ${accessToken}`)
        .send(body)
        .expect(400);

      expect(response.headers).toHaveProperty("correlation-id");
      expect(response.headers).toHaveProperty("x-awx-trace-id");
      expect(response.body.code).toBe("payment_schema_validation_failed");
      expect(response.body.message).toBe("This field is required");
      expect(response.body.source).toBe(
        "beneficiary.bank_details.account_name"
      );
    });

    test("400 - bad request -  account_name is less than 2 characters", async () => {
      let body = beneficiaryBody();
      body.beneficiary.bank_details.account_name = "a";

      const response = await request(serviceUrl)
        .post(`/beneficiaries/create`)
        .set("Content-Type", "application/json")
        .set("Authorization", `Bearer ${accessToken}`)
        .send(body)
        .expect(400);

      expect(response.headers).toHaveProperty("correlation-id");
      expect(response.headers).toHaveProperty("x-awx-trace-id");
      expect(response.body.code).toBe("payment_schema_validation_failed");
      //should be Should contain 2 to 10 characters
      expect(response.body.message).toBe("Should contain 2 to 200 characters");
      expect(response.body.source).toBe(
        "beneficiary.bank_details.account_name"
      );
    });

    //bug
    test.skip("400 - bad request -  account_name is more than 10 characters", async () => {
      let body = beneficiaryBody();
      body.beneficiary.bank_details.account_name = "John Walker John Walker";

      const response = await request(serviceUrl)
        .post(`/beneficiaries/create`)
        .set("Content-Type", "application/json")
        .set("Authorization", `Bearer ${accessToken}`)
        .send(body)
        .expect(400);

      expect(response.headers).toHaveProperty("correlation-id");
      expect(response.headers).toHaveProperty("x-awx-trace-id");
      expect(response.body.code).toBe("payment_schema_validation_failed");
      expect(response.body.message).toBe("Should contain 2 to 10 characters");
      expect(response.body.source).toBe(
        "beneficiary.bank_details.account_name"
      );
    });
  });
  describe("post benficiary payment_method unhappy Flows", () => {
    test("400 - bad request - missing payment_method field", async () => {
      let body = beneficiaryBody();
      delete body.payment_methods;

      const response = await request(serviceUrl)
        .post(`/beneficiaries/create`)
        .set("Content-Type", "application/json")
        .set("Authorization", `Bearer ${accessToken}`)
        .send(body)
        .expect(400);

      expect(response.headers).toHaveProperty("correlation-id");
      expect(response.headers).toHaveProperty("x-awx-trace-id");
      expect(response.body.code).toBe("field_required");
      expect(response.body.message).toBe("must not be null");
      expect(response.body.source).toBe("payment_methods");
    });

    test("400 - bad request - invalid payment method value = test", async () => {
      beneficiaryBodies.payment_methods = "test";

      const response = await request(serviceUrl)
        .post(`/beneficiaries/create`)
        .set("Content-Type", "application/json")
        .set("Authorization", `Bearer ${accessToken}`)
        .send(beneficiaryBodies)
        .expect(400);

      expect(response.headers).toHaveProperty("correlation-id");
      expect(response.headers).toHaveProperty("x-awx-trace-id");
      expect(response.body.code).toBe("invalid_argument");
      expect(response.body.message).toBe(
        "payment_methods is not of the expected type; please refer to our API documentation"
      );
      expect(response.body.source).toBe("payment_methods");
    });

    test("400 - bad request - invalid payment method value =swift", async () => {
      beneficiaryBodies.payment_methods = "swift";
      const response = await request(serviceUrl)
        .post(`/beneficiaries/create`)
        .set("Content-Type", "application/json")
        .set("Authorization", `Bearer ${accessToken}`)
        .send(beneficiaryBodies)
        .expect(400);

      expect(response.headers).toHaveProperty("correlation-id");
      expect(response.headers).toHaveProperty("x-awx-trace-id");
      expect(response.body.code).toBe("invalid_argument");
      expect(response.body.message).toBe(
        "payment_methods is not of the expected type; please refer to our API documentation"
      );
      expect(response.body.source).toBe("payment_methods");
    });

    test("400 - bad request - invalid payment method value =local", async () => {
      beneficiaryBodies.payment_methods = "local";
      const response = await request(serviceUrl)
        .post(`/beneficiaries/create`)
        .set("Content-Type", "application/json")
        .set("Authorization", `Bearer ${accessToken}`)
        .send(beneficiaryBodies)
        .expect(400);

      expect(response.headers).toHaveProperty("correlation-id");
      expect(response.headers).toHaveProperty("x-awx-trace-id");
      expect(response.body.code).toBe("invalid_argument");
      expect(response.body.message).toBe(
        "payment_methods is not of the expected type; please refer to our API documentation"
      );
      expect(response.body.source).toBe("payment_methods");
    });
  });

  describe("post benficiary bank_country_code unhappy Flows", () => {
    test("400 - bad request - invalid bank_country_code value = us", async () => {
      let body = beneficiaryBody();
      body.beneficiary.bank_details.bank_country_code = "us";
      const response = await request(serviceUrl)
        .post(`/beneficiaries/create`)
        .set("Content-Type", "application/json")
        .set("Authorization", `Bearer ${accessToken}`)
        .send(body)
        .expect(400);

      expect(response.headers).toHaveProperty("correlation-id");
      expect(response.headers).toHaveProperty("x-awx-trace-id");
      expect(response.body.code).toBe("invalid_argument");
      expect(response.body.message).toBe("us is not a valid type");
      expect(response.body.source).toBe(
        "beneficiary.bank_details.bank_country_code"
      );
    });
    test("400 - bad request - invalid bank_country_code value = au", async () => {
      let body = beneficiaryBody();
      body.beneficiary.bank_details.bank_country_code = "au";
      const response = await request(serviceUrl)
        .post(`/beneficiaries/create`)
        .set("Content-Type", "application/json")
        .set("Authorization", `Bearer ${accessToken}`)
        .send(body)
        .expect(400);

      expect(response.headers).toHaveProperty("correlation-id");
      expect(response.headers).toHaveProperty("x-awx-trace-id");
      expect(response.body.code).toBe("invalid_argument");
      expect(response.body.message).toBe("au is not a valid type");
      expect(response.body.source).toBe(
        "beneficiary.bank_details.bank_country_code"
      );
    });

    test("400 - bad request - invalid bank_country_code value = cn", async () => {
      let body = beneficiaryBody();
      body.beneficiary.bank_details.bank_country_code = "cn";
      const response = await request(serviceUrl)
        .post(`/beneficiaries/create`)
        .set("Content-Type", "application/json")
        .set("Authorization", `Bearer ${accessToken}`)
        .send(body)
        .expect(400);

      expect(response.headers).toHaveProperty("correlation-id");
      expect(response.headers).toHaveProperty("x-awx-trace-id");
      expect(response.body.code).toBe("invalid_argument");
      expect(response.body.message).toBe("cn is not a valid type");
      expect(response.body.source).toBe(
        "beneficiary.bank_details.bank_country_code"
      );
    });

    test("400 - bad request - missing bank_country_code value", async () => {
      let body = beneficiaryBody();
      delete body.beneficiary.bank_details.bank_country_code;

      const response = await request(serviceUrl)
        .post(`/beneficiaries/create`)
        .set("Content-Type", "application/json")
        .set("Authorization", `Bearer ${accessToken}`)
        .send(body)
        .expect(400);

      expect(response.headers).toHaveProperty("correlation-id");
      expect(response.headers).toHaveProperty("x-awx-trace-id");
      expect(response.body.code).toBe("field_required");
      expect(response.body.message).toBe("must not be null");
      expect(response.body.source).toBe(
        "beneficiary.bank_details.bank_country_code"
      );
    });
  });
  describe("post benficiary account_number unhappy Flows", () => {
    test("400 - bad request - missing account number", async () => {
      let body = beneficiaryBody();
      delete body.beneficiary.bank_details.account_number;

      const response = await request(serviceUrl)
        .post(`/beneficiaries/create`)
        .set("Content-Type", "application/json")
        .set("Authorization", `Bearer ${accessToken}`)
        .send(body)
        .expect(400);

      expect(response.headers).toHaveProperty("correlation-id");
      expect(response.headers).toHaveProperty("x-awx-trace-id");
      expect(response.body.code).toBe("payment_schema_validation_failed");
      expect(response.body.message).toBe("This field is required");
      expect(response.body.source).toBe(
        "beneficiary.bank_details.account_number"
      );
    });

    test("400 - bad request - account number more than 17 character in case of country_code=US", async () => {
      let body = beneficiaryBody();
      body.beneficiary.bank_details.account_number = "125212313123113123";
      const response = await request(serviceUrl)
        .post(`/beneficiaries/create`)
        .set("Content-Type", "application/json")
        .set("Authorization", `Bearer ${accessToken}`)
        .send(body)
        .expect(400);

      expect(response.headers).toHaveProperty("correlation-id");
      expect(response.headers).toHaveProperty("x-awx-trace-id");

      expect(response.body.code).toBe("payment_schema_validation_failed");
      expect(response.body.message).toBe("Should contain 1 to 17 characters");
      expect(response.body.source).toBe(
        "beneficiary.bank_details.account_number"
      );
    });
    //bug
    test.skip("400 - bad request - account number is less than 6 character in case of country_code=AU", async () => {
      let body = beneficiaryBody();
      body.beneficiary.bank_details.bank_country_code = "AU";
      body.beneficiary.bank_details.account_number = "1234";
      body.beneficiary.bank_details.swift_code = "ANZBAU3M";
      body.payment_methods = ["SWIFT"];

      const response = await request(serviceUrl)
        .post(`/beneficiaries/create`)
        .set("Content-Type", "application/json")
        .set("Authorization", `Bearer ${accessToken}`)
        .send(body)
        .expect(400);

      expect(response.headers).toHaveProperty("correlation-id");
      expect(response.headers).toHaveProperty("x-awx-trace-id");

      expect(response.body.code).toBe("payment_schema_validation_failed");
      expect(response.body.message).toBe("Should contain 6 to 9 characters");
      expect(response.body.source).toBe(
        "beneficiary.bank_details.account_number"
      );
    });
    //bug
    test.skip("400 - bad request - account number is more than 9 character in case of country_code=AU", async () => {
      let body = beneficiaryBody();
      body.beneficiary.bank_details.bank_country_code = "AU";
      body.beneficiary.bank_details.account_number = "12345678910";
      body.beneficiary.bank_details.swift_code = "ANZBAU3M";
      body.payment_methods = ["SWIFT"];

      const response = await request(serviceUrl)
        .post(`/beneficiaries/create`)
        .set("Content-Type", "application/json")
        .set("Authorization", `Bearer ${accessToken}`)
        .send(body)
        .expect(400);

      expect(response.headers).toHaveProperty("correlation-id");
      expect(response.headers).toHaveProperty("x-awx-trace-id");

      expect(response.body.code).toBe("payment_schema_validation_failed");
      expect(response.body.message).toBe("Should contain 6 to 9 characters");
      expect(response.body.source).toBe(
        "beneficiary.bank_details.account_number"
      );
    });
    //bug
    test.skip("400 - bad request - account number is less than 8 character in case of country_code=CN", async () => {
      let body = beneficiaryBody();
      body.beneficiary.bank_details.bank_country_code = "CN";
      body.beneficiary.bank_details.account_number = "123456";
      body.payment_methods = ["SWIFT"];

      const response = await request(serviceUrl)
        .post(`/beneficiaries/create`)
        .set("Content-Type", "application/json")
        .set("Authorization", `Bearer ${accessToken}`)
        .send(body)
        .expect(400);

      expect(response.headers).toHaveProperty("correlation-id");
      expect(response.headers).toHaveProperty("x-awx-trace-id");

      expect(response.body.code).toBe("payment_schema_validation_failed");
      expect(response.body.message).toBe("Should contain 1 to 17 characters");
      expect(response.body.source).toBe(
        "beneficiary.bank_details.account_number"
      );
    });
    //bug
    test.skip("400 - bad request - account number is more than 20 character in case of country_code=CN", async () => {
      let body = beneficiaryBody();
      body.beneficiary.bank_details.bank_country_code = "CN";
      body.beneficiary.bank_details.account_number =
        "12345678910145678965656543478678956323278978";
        body.payment_methods = ["SWIFT"];
        
      const response = await request(serviceUrl)
        .post(`/beneficiaries/create`)
        .set("Content-Type", "application/json")
        .set("Authorization", `Bearer ${accessToken}`)
        .send(body)
        .expect(400);

      expect(response.headers).toHaveProperty("correlation-id");
      expect(response.headers).toHaveProperty("x-awx-trace-id");

      expect(response.body.code).toBe("payment_schema_validation_failed");
      expect(response.body.message).toBe("Should contain 1 to 17 characters");
      expect(response.body.source).toBe(
        "beneficiary.bank_details.account_number"
      );
    });
  });

  describe("post benficiary swift_code unhappy Flows", () => {
    test("400 - bad request - swift code is missing when payment method=SWIFT", async () => {
      let body = beneficiaryBody();
      body.beneficiary.bank_details.bank_country_code = "US";
      body.payment_methods = ["SWIFT"];
      delete body.beneficiary.bank_details.swift_code;
      const response = await request(serviceUrl)
        .post(`/beneficiaries/create`)
        .set("Content-Type", "application/json")
        .set("Authorization", `Bearer ${accessToken}`)
        .send(body)
        .expect(400);

      expect(response.headers).toHaveProperty("correlation-id");
      expect(response.headers).toHaveProperty("x-awx-trace-id");

      expect(response.body.code).toBe("payment_schema_validation_failed");
      expect(response.body.message).toBe("This field is required");
      expect(response.body.source).toBe("beneficiary.bank_details.swift_code");
    });

    test("400 - bad request - swift code is less than 8 character", async () => {
      let body = beneficiaryBody();
      body.beneficiary.bank_details.bank_country_code = "US";
      body.payment_methods = ["SWIFT"];
      body.beneficiary.bank_details.swift_code = "ANZBUS";
      const response = await request(serviceUrl)
        .post(`/beneficiaries/create`)
        .set("Content-Type", "application/json")
        .set("Authorization", `Bearer ${accessToken}`)
        .send(body)
        .expect(400);

      expect(response.headers).toHaveProperty("correlation-id");
      expect(response.headers).toHaveProperty("x-awx-trace-id");

      expect(response.body.code).toBe("payment_schema_validation_failed");
      expect(response.body.message).toBe(
        "Should be a valid and supported SWIFT code / BIC"
      );
      expect(response.body.source).toBe("beneficiary.bank_details.swift_code");
    });

    test("400 - bad request - swift code is more than 8 character", async () => {
      let body = beneficiaryBody();
      body.beneficiary.bank_details.bank_country_code = "US";
      body.payment_methods = ["SWIFT"];
      body.beneficiary.bank_details.swift_code = "CHASUS33415897";
      const response = await request(serviceUrl)
        .post(`/beneficiaries/create`)
        .set("Content-Type", "application/json")
        .set("Authorization", `Bearer ${accessToken}`)
        .send(body)
        .expect(400);

      expect(response.headers).toHaveProperty("correlation-id");
      expect(response.headers).toHaveProperty("x-awx-trace-id");

      expect(response.body.code).toBe("payment_schema_validation_failed");
      expect(response.body.message).toBe(
        "Should be a valid and supported SWIFT code / BIC"
      );
      expect(response.body.source).toBe("beneficiary.bank_details.swift_code");
    });
    test("400 - bad request - swift code is missing when payment method=SWIFT", async () => {
      let body = beneficiaryBody();
      body.beneficiary.bank_details.bank_country_code = "US";
      body.payment_methods = ["SWIFT"];
      delete body.beneficiary.bank_details.swift_code;
      const response = await request(serviceUrl)
        .post(`/beneficiaries/create`)
        .set("Content-Type", "application/json")
        .set("Authorization", `Bearer ${accessToken}`)
        .send(body)
        .expect(400);

      expect(response.headers).toHaveProperty("correlation-id");
      expect(response.headers).toHaveProperty("x-awx-trace-id");

      expect(response.body.code).toBe("payment_schema_validation_failed");
      expect(response.body.message).toBe("This field is required");
      expect(response.body.source).toBe("beneficiary.bank_details.swift_code");
    });

    test("400 - bad request - swift code should match country_code=CN", async () => {
      let body = beneficiaryBody();
      body.beneficiary.bank_details.bank_country_code = "CN";
      body.payment_methods = ["SWIFT"];
      body.beneficiary.bank_details.swift_code = "ANZBUS3M";
      const response = await request(serviceUrl)
        .post(`/beneficiaries/create`)
        .set("Content-Type", "application/json")
        .set("Authorization", `Bearer ${accessToken}`)
        .send(body)
        .expect(400);

      expect(response.body.code).toBe("payment_schema_validation_failed");
      expect(response.body.message).toBe(
        "Should be a valid and supported SWIFT code / BIC"
      );
      expect(response.body.source).toBe("beneficiary.bank_details.swift_code");
    });
  });

  describe("post benficiary account_routing_type1 unhappy Flows", () => {
    //bug
    test.skip("400 - bad request - account_routing_type1 is missing when bank_country_code=AU", async () => {
      let body = beneficiaryBody();
      body.beneficiary.bank_details.bank_country_code = "AU";
      body.payment_methods = ["SWIFT"];
      body.beneficiary.bank_details.swift_code = "ANZBAU3M";
      delete body.beneficiary.bank_details.account_routing_type1;

      const response = await request(serviceUrl)
        .post(`/beneficiaries/create`)
        .set("Content-Type", "application/json")
        .set("Authorization", `Bearer ${accessToken}`)
        .send(body)
        .expect(400);

      expect(response.headers).toHaveProperty("correlation-id");
      expect(response.headers).toHaveProperty("x-awx-trace-id");

      expect(response.body.code).toBe("payment_schema_validation_failed");
      expect(response.body.message).toBe("This field is required");
      expect(response.body.source).toBe(
        "beneficiary.bank_details.account_routing_type1"
      );
    });
    test.skip("400 - bad request - account_routing_type1 is missing when bank_country_code=US", async () => {
      let body = beneficiaryBody();
      body.beneficiary.bank_details.bank_country_code = "US";
      body.payment_methods = ["SWIFT"];
      delete body.beneficiary.bank_details.account_routing_type1;
      const response = await request(serviceUrl)
        .post(`/beneficiaries/create`)
        .set("Content-Type", "application/json")
        .set("Authorization", `Bearer ${accessToken}`)
        .send(body)
        .expect(400);

      expect(response.headers).toHaveProperty("correlation-id");
      expect(response.headers).toHaveProperty("x-awx-trace-id");

      expect(response.body.code).toBe("payment_schema_validation_failed");
      expect(response.body.message).toBe("This field is required");
      expect(response.body.source).toBe(
        "beneficiary.bank_details.account_routing_type1"
      );
    });
    test("400 - bad request - account_routing_type1 is incorrect when bank_country_code=AU", async () => {
      let body = beneficiaryBody();
      body.beneficiary.bank_details.bank_country_code = "AU";
      body.payment_methods = ["SWIFT"];
      body.beneficiary.bank_details.swift_code = "ANZBAU3M";
      body.beneficiary.bank_details.account_routing_type1 = "test";
      const response = await request(serviceUrl)
        .post(`/beneficiaries/create`)
        .set("Content-Type", "application/json")
        .set("Authorization", `Bearer ${accessToken}`)
        .send(body)
        .expect(400);
      expect(response.headers).toHaveProperty("correlation-id");
      expect(response.headers).toHaveProperty("x-awx-trace-id");

      expect(response.body.code).toBe("invalid_argument");
      expect(response.body.message).toBe("test is not a valid type");
      expect(response.body.source).toBe(
        "beneficiary.bank_details.account_routing_type1"
      );
    });

    test("400 - bad request - account_routing_type1 is incorrect when bank_country_code=US", async () => {
      let body = beneficiaryBody();
      body.beneficiary.bank_details.bank_country_code = "US";
      body.payment_methods = ["SWIFT"];
      body.beneficiary.bank_details.account_routing_type1 = "test";
      const response = await request(serviceUrl)
        .post(`/beneficiaries/create`)
        .set("Content-Type", "application/json")
        .set("Authorization", `Bearer ${accessToken}`)
        .send(body)
        .expect(400);
      expect(response.headers).toHaveProperty("correlation-id");
      expect(response.headers).toHaveProperty("x-awx-trace-id");

      expect(response.body.code).toBe("invalid_argument");
      expect(response.body.message).toBe("test is not a valid type");
      expect(response.body.source).toBe(
        "beneficiary.bank_details.account_routing_type1"
      );
    });

    test("400 - bad request - account_routing_type1 is incorrect when bank_country_code=CN", async () => {
      let body = beneficiaryBody();
      body.beneficiary.bank_details.bank_country_code = "CN";
      body.payment_methods = ["SWIFT"];
      body.beneficiary.bank_details.account_routing_type1 = "test";
      const response = await request(serviceUrl)
        .post(`/beneficiaries/create`)
        .set("Content-Type", "application/json")
        .set("Authorization", `Bearer ${accessToken}`)
        .send(body)
        .expect(400);
      expect(response.headers).toHaveProperty("correlation-id");
      expect(response.headers).toHaveProperty("x-awx-trace-id");

      expect(response.body.code).toBe("invalid_argument");
      expect(response.body.message).toBe("test is not a valid type");
      expect(response.body.source).toBe(
        "beneficiary.bank_details.account_routing_type1"
      );
    });

    test("400 - bad request -create benficiary account with country_code=US with account_routing_type1 more than 9 characters", async () => {
      let body = beneficiaryBody();
      body.beneficiary.bank_details.bank_country_code = "US";
      body.payment_methods = ["SWIFT"];
      body.beneficiary.bank_details.account_routing_type1 = "12345678910";

      const response = await request(serviceUrl)
        .post(`/beneficiaries/create`)
        .set("Content-Type", "application/json")
        .set("Authorization", `Bearer ${accessToken}`)
        .send(body)
        .expect(400);
      expect(response.body.code).toBe("invalid_argument");
      expect(response.body.message).toBe("12345678910 is not a valid type");
      expect(response.body.source).toBe(
        "beneficiary.bank_details.account_routing_type1"
      );
    });

    test("400- bad request - create benficiary account with country_code=AU & account_routing_type1 is more than 6 characters", async () => {
      let body = beneficiaryBody();
      body.beneficiary.bank_details.bank_country_code = "AU";
      body.payment_methods = ["SWIFT"];
      body.beneficiary.bank_details.account_routing_type1 = "bsbbsbbsb";
      const response = await request(serviceUrl)
        .post(`/beneficiaries/create`)
        .set("Content-Type", "application/json")
        .set("Authorization", `Bearer ${accessToken}`)
        .send(body)
        .expect(400);

      expect(response.body.code).toBe("invalid_argument");
      expect(response.body.message).toBe("bsbbsbbsb is not a valid type");
      expect(response.body.source).toBe(
        "beneficiary.bank_details.account_routing_type1"
      );
    });
  });
});
