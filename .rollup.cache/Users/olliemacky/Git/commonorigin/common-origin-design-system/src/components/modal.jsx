import { __makeTemplateObject } from "tslib";
import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { Icon } from './atoms/Icon';
import tokens from '@/styles/tokens.json';
var _a = tokens.base, spacing = _a.spacing, border = _a.border, color = _a.color, semantic = tokens.semantic;
var ModalShader = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  background-color: rgba(255, 255, 255, 0.80);\n  position: fixed;\n  height: 100vh;\n  width: 100vw;\n  left: 0;\n  top: 0;\n  z-index: ", ";\n"], ["\n  background-color: rgba(255, 255, 255, 0.80);\n  position: fixed;\n  height: 100vh;\n  width: 100vw;\n  left: 0;\n  top: 0;\n  z-index: ", ";\n"])), tokens.base.zIndex[5]);
var BaseModalWrapper = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  box-shadow: ", ";\n  border-radius: ", ";\n  background-color: ", ";\n  transform: translate(-50%, -50%);\n  color: ", ";\n  position: absolute;\n  max-width: 1280px;\n  display: flex;\n  z-index: ", ";\n  width: 80vw;\n  left: 50%;\n  top: 50%;\n"], ["\n  box-shadow: ", ";\n  border-radius: ", ";\n  background-color: ", ";\n  transform: translate(-50%, -50%);\n  color: ", ";\n  position: absolute;\n  max-width: 1280px;\n  display: flex;\n  z-index: ", ";\n  width: 80vw;\n  left: 50%;\n  top: 50%;\n"])), tokens.base.shadow[6], border.radius[5], semantic.color.background.default, semantic.color.text.default, tokens.base.zIndex[6]);
var ArtModalWrapper = styled(BaseModalWrapper)(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  flex-direction: column;\n  justify-content: flex-start;\n"], ["\n  flex-direction: column;\n  justify-content: flex-start;\n"])));
var MusicModalWrapper = styled(BaseModalWrapper)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  flex-direction: row;\n  justify-content: flex-start;\n"], ["\n  flex-direction: row;\n  justify-content: flex-start;\n"])));
var ModalContent = styled.div(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  padding: ", " ", ";\n"], ["\n  padding: ", " ", ";\n"])), spacing[4], spacing[6]);
var MusicModalContent = styled.div(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n  width: 50%;\n  padding: ", " ", " 0 ", ";\n  margin-top: ", ";\n"], ["\n  width: 50%;\n  padding: ", " ", " 0 ", ";\n  margin-top: ", ";\n"])), spacing[8], spacing[24], spacing[8], spacing[24]);
var ImageWrapper = styled.div(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n  width: 50%;\n  margin-right: ", ";\n"], ["\n  width: 50%;\n  margin-right: ", ";\n"])), spacing[4]);
var ModalImage = styled(Image)(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n  width: 100%;\n  height: auto;\n"], ["\n  width: 100%;\n  height: auto;\n"])));
var CloseButton = styled.button(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n  background-color: ", ";\n  transition: ease background-color 0.2s;\n  justify-content: center;\n  align-items: center;\n  position: absolute;\n  display: flex;\n  border: none;\n  height: ", ";\n  width: ", ";\n  right: 0;\n  top: 0;\n  cursor: pointer;\n  border-radius: 0 ", " 0 ", ";\n\n  &:hover {\n    background-color: ", ";\n  }\n\n  &:focus {\n    outline: 2px solid ", ";\n    outline-offset: 2px;\n  }\n"], ["\n  background-color: ", ";\n  transition: ease background-color 0.2s;\n  justify-content: center;\n  align-items: center;\n  position: absolute;\n  display: flex;\n  border: none;\n  height: ", ";\n  width: ", ";\n  right: 0;\n  top: 0;\n  cursor: pointer;\n  border-radius: 0 ", " 0 ", ";\n\n  &:hover {\n    background-color: ", ";\n  }\n\n  &:focus {\n    outline: 2px solid ", ";\n    outline-offset: 2px;\n  }\n"])), semantic.color.background.default, spacing[8], spacing[8], border.radius[5], border.radius[3], color.neutral[100], semantic.color.border.default);
export var Modal = function (_a) {
    var children = _a.children, imgsrc = _a.imgsrc, title = _a.title, tag = _a.tag, onClose = _a.onClose, _link = _a.link;
    if (tag === 'art') {
        return (<ModalShader>
        <ArtModalWrapper>
          <CloseButton onClick={onClose} title='Close' aria-label="Close modal">
            <Icon name='close' size={'md'}/>
          </CloseButton>
          <ModalImage src={imgsrc} alt={title} width={1280} height={960} blurDataURL={imgsrc}/>
          <ModalContent>
            {children}
          </ModalContent>
        </ArtModalWrapper>
      </ModalShader>);
    }
    else if (tag === 'release') {
        return (<ModalShader>
        <MusicModalWrapper>
          <CloseButton onClick={onClose} title='Close' aria-label="Close modal">
            <Icon name='close' size={'md'}/>
          </CloseButton>
          <ImageWrapper>
            <ModalImage src={imgsrc} alt={title} width={480} height={300} blurDataURL={imgsrc}/>
          </ImageWrapper>
          <MusicModalContent>
            {children}
          </MusicModalContent>
        </MusicModalWrapper>
      </ModalShader>);
    }
    return null;
};
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9;
//# sourceMappingURL=modal.jsx.map