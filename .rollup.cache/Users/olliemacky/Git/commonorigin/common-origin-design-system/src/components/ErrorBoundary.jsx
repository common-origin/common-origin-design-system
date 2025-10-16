import { __extends, __makeTemplateObject } from "tslib";
import React, { Component } from 'react';
import styled from 'styled-components';
import { Container } from './atoms/Container';
import { Stack } from './atoms/Stack';
import { Typography } from './atoms/Typography';
import { Button } from './atoms/Button';
import { captureException } from '../lib/errorReporting';
import tokens from '@/styles/tokens.json';
var semantic = tokens.semantic;
var ErrorContainer = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  min-height: 400px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background-color: ", ";\n  border: ", ";\n  border-radius: ", ";\n  padding: ", ";\n  margin: ", " 0;\n"], ["\n  min-height: 400px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background-color: ", ";\n  border: ", ";\n  border-radius: ", ";\n  padding: ", ";\n  margin: ", " 0;\n"])), semantic.color.background.subtle, semantic.border.subtle, tokens.base.border.radius[4], tokens.base.spacing[8], tokens.base.spacing[4]);
var ErrorContent = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  text-align: center;\n  max-width: 600px;\n"], ["\n  text-align: center;\n  max-width: 600px;\n"])));
var ErrorIcon = styled.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  font-size: 4rem;\n  margin-bottom: ", ";\n  color: ", ";\n"], ["\n  font-size: 4rem;\n  margin-bottom: ", ";\n  color: ", ";\n"])), tokens.base.spacing[4], semantic.color.text.subdued);
var ErrorDetails = styled.details(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  margin-top: ", ";\n  padding: ", ";\n  background-color: ", ";\n  border-radius: ", ";\n  border: ", ";\n  \n  summary {\n    cursor: pointer;\n    font-weight: ", ";\n    color: ", ";\n    margin-bottom: ", ";\n    \n    &:hover {\n      color: ", ";\n    }\n  }\n"], ["\n  margin-top: ", ";\n  padding: ", ";\n  background-color: ", ";\n  border-radius: ", ";\n  border: ", ";\n  \n  summary {\n    cursor: pointer;\n    font-weight: ", ";\n    color: ", ";\n    margin-bottom: ", ";\n    \n    &:hover {\n      color: ", ";\n    }\n  }\n"])), tokens.base.spacing[6], tokens.base.spacing[4], semantic.color.background.surface, tokens.base.border.radius[3], semantic.border.subtle, tokens.base.fontWeight[3], semantic.color.text.subdued, tokens.base.spacing[2], semantic.color.text.default);
var ErrorStack = styled.pre(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  background-color: ", ";\n  padding: ", ";\n  border-radius: ", ";\n  font-size: ", ";\n  color: ", ";\n  overflow-x: auto;\n  white-space: pre-wrap;\n  word-break: break-word;\n"], ["\n  background-color: ", ";\n  padding: ", ";\n  border-radius: ", ";\n  font-size: ", ";\n  color: ", ";\n  overflow-x: auto;\n  white-space: pre-wrap;\n  word-break: break-word;\n"])), semantic.color.background.default, tokens.base.spacing[3], tokens.base.border.radius[2], tokens.base.fontSize[2], semantic.color.text.subdued);
var ErrorBoundary = /** @class */ (function (_super) {
    __extends(ErrorBoundary, _super);
    function ErrorBoundary(props) {
        var _this = _super.call(this, props) || this;
        _this.handleRetry = function () {
            _this.setState({
                hasError: false,
                error: null,
                errorInfo: null,
            });
        };
        _this.handleReload = function () {
            window.location.reload();
        };
        _this.state = {
            hasError: false,
            error: null,
            errorInfo: null,
        };
        return _this;
    }
    ErrorBoundary.getDerivedStateFromError = function (error) {
        // Update state so the next render will show the fallback UI
        return {
            hasError: true,
            error: error,
            errorInfo: null,
        };
    };
    ErrorBoundary.prototype.componentDidCatch = function (error, errorInfo) {
        // Log error details
        console.error('ErrorBoundary caught an error:', error, errorInfo);
        // Update state with error info
        this.setState({
            error: error,
            errorInfo: errorInfo,
        });
        // Call optional error handler
        if (this.props.onError) {
            this.props.onError(error, errorInfo);
        }
        // Report error to monitoring service
        captureException(error, { errorInfo: errorInfo });
        // In production, you might want to send this to an error reporting service
        if (process.env.NODE_ENV === 'production') {
            // Additional production-specific error handling
            console.error('Production error boundary triggered:', error.message);
        }
    };
    ErrorBoundary.prototype.render = function () {
        var _a;
        if (this.state.hasError) {
            // Custom fallback UI
            if (this.props.fallback) {
                return this.props.fallback;
            }
            // Default error UI
            return (<Container>
          <ErrorContainer>
            <ErrorContent>
              <ErrorIcon>⚠️</ErrorIcon>
              
              <Stack direction="column" gap="md" alignItems="center">
                <Typography variant="h3" color="default">
                  Something went wrong
                </Typography>
                
                <Typography variant="body" color="subdued">
                  We're sorry, but something unexpected happened. You can try refreshing the page or go back to continue browsing.
                </Typography>
                
                <Stack direction="row" gap="md" justifyContent="center">
                  <Button variant="primary" onClick={this.handleRetry} aria-label="Try again">
                    Try Again
                  </Button>
                  
                  <Button variant="secondary" onClick={this.handleReload} aria-label="Reload page">
                    Reload Page
                  </Button>
                </Stack>
              </Stack>

              {/* Development error details */}
              {process.env.NODE_ENV === 'development' && this.state.error && (<ErrorDetails>
                  <summary>Error Details (Development Only)</summary>
                  
                  <Stack direction="column" gap="md">
                    <div>
                      <Typography variant="small" color="subdued">
                        <strong>Error:</strong> {this.state.error.message}
                      </Typography>
                    </div>
                    
                    {this.state.error.stack && (<div>
                        <Typography variant="small" color="subdued">
                          <strong>Stack Trace:</strong>
                        </Typography>
                        <ErrorStack>{this.state.error.stack}</ErrorStack>
                      </div>)}
                    
                    {((_a = this.state.errorInfo) === null || _a === void 0 ? void 0 : _a.componentStack) && (<div>
                        <Typography variant="small" color="subdued">
                          <strong>Component Stack:</strong>
                        </Typography>
                        <ErrorStack>{this.state.errorInfo.componentStack}</ErrorStack>
                      </div>)}
                  </Stack>
                </ErrorDetails>)}
            </ErrorContent>
          </ErrorContainer>
        </Container>);
        }
        return this.props.children;
    };
    return ErrorBoundary;
}(Component));
export { ErrorBoundary };
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
//# sourceMappingURL=ErrorBoundary.jsx.map