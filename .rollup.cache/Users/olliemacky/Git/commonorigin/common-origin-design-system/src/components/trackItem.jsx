import { __makeTemplateObject } from "tslib";
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { IconButton, Stack, Typography } from './';
import tokens from '@/styles/tokens.json';
var _a = tokens.base, spacing = _a.spacing, color = _a.color, border = _a.border;
var TrackItemStyled = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  width: 100%;\n  background-color: ", ";\n  padding: ", ";\n  padding-left: ", ";\n  border-radius: ", ";\n  transition: background-color 0.2s ease;\n"], ["\n  display: flex;\n  width: 100%;\n  background-color: ", ";\n  padding: ", ";\n  padding-left: ", ";\n  border-radius: ", ";\n  transition: background-color 0.2s ease;\n"])), function (_a) {
    var $isPlaying = _a.$isPlaying;
    return $isPlaying ? color.neutral['000'] : tokens.semantic.color.background.surface;
}, spacing[2], spacing[4], border.radius[3]);
var TrackContentWrapper = styled.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  display: flex;\n  justify-content: space-between;\n  width: 100%;\n  align-items: center;\n\n  button {\n    background-color: transparent;\n    margin: 0;\n    transition: background-color 0.2s ease;\n\n    &:hover {\n      background-color: ", ";\n    }\n\n    &:focus {\n      outline: 2px solid ", ";\n      outline-offset: 2px;\n    }\n  }\n"], ["\n  display: flex;\n  justify-content: space-between;\n  width: 100%;\n  align-items: center;\n\n  button {\n    background-color: transparent;\n    margin: 0;\n    transition: background-color 0.2s ease;\n\n    &:hover {\n      background-color: ", ";\n    }\n\n    &:focus {\n      outline: 2px solid ", ";\n      outline-offset: 2px;\n    }\n  }\n"])), color.neutral[300], tokens.semantic.color.border.strong);
var TrackingBar = styled.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  width: 100%;\n  height: ", ";\n  background-color: ", ";\n  cursor: pointer;\n  position: relative;\n  margin: ", " 0;\n  border-radius: ", ";\n  overflow: hidden;\n  transition: height 0.2s ease;\n\n  &:focus {\n    outline: 2px solid ", ";\n    outline-offset: 2px;\n  }\n"], ["\n  width: 100%;\n  height: ", ";\n  background-color: ", ";\n  cursor: pointer;\n  position: relative;\n  margin: ", " 0;\n  border-radius: ", ";\n  overflow: hidden;\n  transition: height 0.2s ease;\n\n  &:focus {\n    outline: 2px solid ", ";\n    outline-offset: 2px;\n  }\n"])), function (_a) {
    var $isPlaying = _a.$isPlaying;
    return $isPlaying ? '8px' : '0px';
}, color.neutral[400], spacing[2], border.radius[1], tokens.semantic.color.border.strong);
var Progress = styled.div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  height: 100%;\n  background-color: ", ";\n  width: ", "%;\n  transition: width 0.1s ease;\n  border-radius: ", ";\n"], ["\n  height: 100%;\n  background-color: ", ";\n  width: ", "%;\n  transition: width 0.1s ease;\n  border-radius: ", ";\n"])), tokens.semantic.color.background.inverse, function (_a) {
    var $progress = _a.$progress;
    return $progress;
}, border.radius[1]);
var TrackContainer = styled.div(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n"], ["\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n"])));
export var TrackItem = function (_a) {
    var track = _a.track;
    var audioRef = useRef(null);
    var _b = useState(false), isPlaying = _b[0], setIsPlaying = _b[1];
    var _c = useState(0), currentTime = _c[0], setCurrentTime = _c[1];
    var _d = useState(0), duration = _d[0], setDuration = _d[1];
    useEffect(function () {
        var audio = audioRef.current;
        if (audio) {
            var updateCurrentTime_1 = function () { return setCurrentTime(audio.currentTime); };
            var updateDuration_1 = function () { return setDuration(audio.duration); };
            var handleEnded_1 = function () { return setIsPlaying(false); };
            audio.addEventListener('timeupdate', updateCurrentTime_1);
            audio.addEventListener('loadedmetadata', updateDuration_1);
            audio.addEventListener('ended', handleEnded_1);
            return function () {
                audio.removeEventListener('timeupdate', updateCurrentTime_1);
                audio.removeEventListener('loadedmetadata', updateDuration_1);
                audio.removeEventListener('ended', handleEnded_1);
            };
        }
        return undefined;
    }, [track.audioUrl]);
    var progress = duration ? (currentTime / duration) * 100 : 0;
    var handleProgressBarClick = function (e) {
        var target = e.currentTarget;
        var rect = target.getBoundingClientRect();
        var clickPosition = e.clientX - rect.left;
        var totalWidth = rect.width;
        var clickPositionRatio = clickPosition / totalWidth;
        var newCurrentTime = duration * clickPositionRatio;
        if (audioRef.current) {
            audioRef.current.currentTime = newCurrentTime;
        }
    };
    var handleProgressBarKeyDown = function (e) {
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            e.preventDefault();
            var audio = audioRef.current;
            if (audio) {
                var seekAmount = 5; // seconds
                var newTime = e.key === 'ArrowLeft'
                    ? Math.max(0, audio.currentTime - seekAmount)
                    : Math.min(duration, audio.currentTime + seekAmount);
                audio.currentTime = newTime;
            }
        }
    };
    var togglePlayPause = function () {
        var audio = audioRef.current;
        if (audio) {
            if (isPlaying) {
                audio.pause();
            }
            else {
                audio.play();
            }
            setIsPlaying(!isPlaying);
        }
    };
    var resetTrack = function () {
        if (audioRef.current) {
            audioRef.current.currentTime = 0;
        }
    };
    var formatTime = function (time) {
        var minutes = Math.floor(time / 60);
        var seconds = Math.floor(time % 60);
        return "".concat(minutes, ":").concat(seconds.toString().padStart(2, '0'));
    };
    return (<TrackItemStyled $isPlaying={isPlaying}>
      <audio ref={audioRef} src={track.audioUrl} preload="none" aria-label={"Audio track: ".concat(track.title)}/>
      <TrackContainer>
        <TrackContentWrapper>
          <Stack direction='row' gap='sm' alignItems='center'>
            <Typography variant='body' color='default'>{track.title}</Typography>
            {isPlaying && duration > 0 && (<Typography variant='small' color='subdued'>
                {formatTime(currentTime)} / {formatTime(duration)}
              </Typography>)}
          </Stack>
          <Stack direction='row' gap='sm' alignItems='center'>
            {isPlaying && (<IconButton iconName='playBack' size='small' variant='secondary' onClick={resetTrack} aria-label='Reset track to beginning'/>)}
            <IconButton iconName={isPlaying ? 'pause' : 'play'} size='small' variant='secondary' onClick={togglePlayPause} aria-label={isPlaying ? 'Pause track' : 'Play track'}/>
          </Stack>
        </TrackContentWrapper>
        {isPlaying && (<TrackingBar $isPlaying={isPlaying} onClick={handleProgressBarClick} onKeyDown={handleProgressBarKeyDown} tabIndex={0} role="slider" aria-label="Track progress" aria-valuemin={0} aria-valuemax={duration} aria-valuenow={currentTime} aria-valuetext={"".concat(formatTime(currentTime), " of ").concat(formatTime(duration))}>
            <Progress $progress={progress}/>
          </TrackingBar>)}
      </TrackContainer>
    </TrackItemStyled>);
};
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
//# sourceMappingURL=trackItem.jsx.map