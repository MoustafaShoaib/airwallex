const beneficiaryBody = () => {
  return {
    beneficiary: {
      additional_info: {
        personal_email: "john.walker@gmail.com",
      },
      address: {
        city: "Seattle",
        country_code: "US",
        postcode: "98104",
        state: "Washington",
        street_address: "412 5th Avenue",
      },
      bank_details: {
        account_currency: "USD",
        account_name: "John Walker",
        account_number: "50001121",
        account_routing_type1: "aba",
        account_routing_value1: "021000021",
        bank_country_code: "US",
        bank_name: "JP Morgan Chase Bank",
        swift_code: "CHASUS33",
        local_clearing_system: "ACH",
      },
      company_name: "ABC University",
      entity_type: "COMPANY",
    },
    nickname: "ABC University",
    payer_entity_type: "PERSONAL",
    payment_methods: ["LOCAL"],
  };
};

/*
 * Module exports
 */

export { beneficiaryBody };
