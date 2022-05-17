import React from "react";

import OrganizationTable from "main/components/Organization/OrganizationTable";
import { organizationFixtures } from "fixtures/organizationFixtures";

export default {
  title: "components/Organization/OrganizationTable",
  component: OrganizationTable,
};

const Template = (args) => {
  return <OrganizationTable {...args} />;
};

export const Empty = Template.bind({});

Empty.args = {
  organization: [],
};

export const ThreeOrganization = Template.bind({});

ThreeOrganization.args = {
  organization: organizationFixtures.threeOrganization,
};
