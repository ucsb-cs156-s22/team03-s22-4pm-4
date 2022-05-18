import React from 'react';

import MenuItemReviewTable from "main/components/MenuItemReview/MenuItemReviewTable";
import { menuItemReviewFixtures } from 'fixtures/menuItemReviewFixtures';

export default {
    title: 'components/MenuItemReview/MenuItemReviewTable',
    component: MenuItemReviewTable
};

const Template = (args) => {
    return (
        <MenuItemReviewTable {...args} />
    )
};

export const Empty = Template.bind({});

Empty.args = {
    menuItemReview: []
};

export const ThreeReviews = Template.bind({});

ThreeReviews.args = {
    menuItemReview: menuItemReviewFixtures.threeReviews
};


