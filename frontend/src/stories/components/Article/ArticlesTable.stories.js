import React from 'react';

import ArticlesTable from "main/components/Article/ArticlesTable";
import { articlesFixtures } from 'fixtures/articlesFixtures';

export default {
    title: 'components/Article/ArticlesTable',
    component: ArticlesTable
};

const Template = (args) => {
    return (
        <ArticlesTable {...args} />
    )
};

export const Empty = Template.bind({});

Empty.args = {
    articles: []
};

export const ThreeDates = Template.bind({});

ThreeDates.args = {
    articles: articlesFixtures.threeArticles
};

