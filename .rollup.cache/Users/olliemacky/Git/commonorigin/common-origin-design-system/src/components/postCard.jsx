import { __makeTemplateObject } from "tslib";
import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { Avatar, CoverImage, DateFormatter } from './';
import tokens from '@/styles/tokens.json';
var _a = tokens.base, spacing = _a.spacing, fontSize = _a.fontSize, lineHeight = _a.lineHeight, text = tokens.semantic.color.text;
var CardContainer = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n"], ["\n  display: flex;\n  flex-direction: column;\n"])));
var ImageWrapper = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  margin-bottom: ", ";\n"], ["\n  margin-bottom: ", ";\n"])), spacing[6]);
var Title = styled.h3(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  font-size: ", ";\n  margin-bottom: ", ";\n  line-height: 1.2;\n  \n  a {\n    color: ", ";\n    text-decoration: none;\n    \n    &:hover {\n      text-decoration: underline;\n    }\n  }\n"], ["\n  font-size: ", ";\n  margin-bottom: ", ";\n  line-height: 1.2;\n  \n  a {\n    color: ", ";\n    text-decoration: none;\n    \n    &:hover {\n      text-decoration: underline;\n    }\n  }\n"])), fontSize[8], spacing[3], text.default);
var DateWrapper = styled.div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  font-size: ", ";\n  margin-bottom: ", ";\n  color: ", ";\n"], ["\n  font-size: ", ";\n  margin-bottom: ", ";\n  color: ", ";\n"])), fontSize[2], spacing[4], text.subdued);
var Excerpt = styled.p(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  font-size: ", ";\n  line-height: ", ";\n  margin-bottom: ", ";\n  color: ", ";\n"], ["\n  font-size: ", ";\n  line-height: ", ";\n  margin-bottom: ", ";\n  color: ", ";\n"])), fontSize[4], lineHeight[4], spacing[4], text.default);
export var PostCard = function (_a) {
    var title = _a.title, coverImage = _a.coverImage, date = _a.date, excerpt = _a.excerpt, author = _a.author, slug = _a.slug;
    return (<CardContainer>
      <ImageWrapper>
        <CoverImage slug={slug} title={title} src={coverImage}/>
      </ImageWrapper>
      <Title>
        <Link href={"/posts/".concat(slug)}>
          {title}
        </Link>
      </Title>
      <DateWrapper>
        <DateFormatter dateString={date}/>
      </DateWrapper>
      <Excerpt>{excerpt}</Excerpt>
      <Avatar name={author.name} picture={author.picture}/>
    </CardContainer>);
};
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
//# sourceMappingURL=postCard.jsx.map