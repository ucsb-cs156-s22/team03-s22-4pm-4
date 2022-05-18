const organizationFixtures = {
  oneOrganization: {
    orgCode: "ABC",
    orgTranslationShort: "ABC",
    orgTranslation: "ABCABC",
    inactive: false,
  },
  threeOrganization: [
    {
      orgCode: "ABC",
      orgTranslationShort: "ABC",
      orgTranslation: "ABCABC",
      inactive: false,
    },
    {
      orgCode: "DEF",
      orgTranslationShort: "DEF",
      orgTranslation: "DEFDEF",
      inactive: false,
    },
    {
      orgCode: "GHI",
      orgTranslationShort: "GHI",
      orgTranslation: "GHIGHI",
      inactive: true,
    },
  ],
};

export { organizationFixtures };
