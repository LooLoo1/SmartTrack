
const Requirement = `
  type Requirement {
    label: String!
    must: Boolean!
  }

  input RequirementInput {
    label: String!
    must: Boolean!
  }
`;

module.exports = Requirement;
